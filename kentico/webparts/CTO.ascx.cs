// System
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml;

// CMS
using CMS.DataEngine;
using CMS.Helpers;
using CMS.Membership;
using CMS.PortalControls;
using CMS.PortalEngine;

using IMTools;

public class Basket
{
    public int id { get; set; }
    public int skValid { get; set; }
    public int skCust { get; set; }
    public string companyCd { get; set; }
    public string branchNbr { get; set; }
    public string customerNbr { get; set; }
    public string eMail { get; set; }
    public string custPo { get; set; }
    public string actionName { get; set; }
    public string backorderCd { get; set; }
    public string carrierCd { get; set; }
    public string slPremium { get; set; }
    public string orderType { get; set; }
    public double freightCost { get; set; }
    public List<Configuration> configs { get; set; }
}

public class Configuration
{
    public int id { get; set; }
    public string name { get; set; }
    public string description { get; set; }
    public int qty { get; set; }
    public string foreignId { get; set; }
    public List<Product> items { get; set; }
}

public class Product
{
    public string type { get; set; }
    public long skSku { get; set; }
    public string sku { get; set; }
    public string mfrPart { get; set; }
    public string description { get; set; }
    public string posText { get; set; }
    public int qty { get; set; }
    public double price { get; set; }
    public string currency { get; set; }
}

public partial class CTO : CMSAbstractWebPart
{
    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);
        if (!StopProcessing)
        {
            if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
            {
                string sCTO = ValidationHelper.GetString(GetValue("Code"), "");
                string sType = ValidationHelper.GetString(GetValue("Type"), "").ToLower();
                string sFile = "~/1IMv2/im/cto/widget.";

                string sResource = "~/pages/GetResource.aspx?css=" + Uri.EscapeDataString(CryptoUtil.Encrypt(sFile + "css"));
                Page.Header.Controls.Add(new LiteralControl("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + sResource + "\"/>\r\n"));

                sResource = "~/pages/GetResource.aspx?js=" + Uri.EscapeDataString(CryptoUtil.Encrypt(sFile + "js")) + "&type=" + sType;
                ScriptHelper.RegisterStartupScript(Page, typeof(string), ClientID + Stopwatch.GetTimestamp(), "<script type=\"text/javascript\" src=\"" + sResource + "\"></script>\r\n");

                if (sType == "popup")
                {
                    sResource = "~/pages/GetResource.aspx?js=" + Uri.EscapeDataString(CryptoUtil.Encrypt("~/1IMv2/ext/js/jquery.blockUI-2.70.0.js"));
                    ScriptHelper.RegisterStartupScript(Page, typeof(string), ClientID + Stopwatch.GetTimestamp(), "<script type=\"text/javascript\" src=\"" + sResource + "\"></script>\r\n");
                } 
            }
        }
    }

    protected void Page_Init(object sender, EventArgs e)
    {
        string sCTO = ValidationHelper.GetString(GetValue("Code"), "");
        string sType = ValidationHelper.GetString(GetValue("Type"), "").ToLower();

        if (PortalContext.ViewMode == ViewModeEnum.LiveSite && AuthenticationHelper.IsAuthenticated())
        {
            if (sType == "iframe")
            {
                this.Controls.Remove(this.FindControl("ctoPopUp"));
                HtmlControl eCto = (HtmlControl)this.FindControl("ctoIFrame");
                eCto.Attributes["src"] = "/cto/punchout?a14=" + Uri.EscapeDataString(CryptoUtil.Encrypt(sCTO));

            } else if (sType == "popup")
            {
                this.Controls.Remove(this.FindControl("ctoIFrame"));
                HtmlControl eCto = (HtmlControl)this.FindControl("ctoWindow");
                eCto.Attributes["src"] = "/cto/punchout?a14=" + Uri.EscapeDataString(CryptoUtil.Encrypt(sCTO));
            }

            this.Controls.Remove(this.FindControl("adminInfo"));
        }
        else if (PortalContext.ViewMode != ViewModeEnum.LiveSite)
        {
            HtmlGenericControl eInfo = (HtmlGenericControl)this.FindControl("adminInfo");
            eInfo.InnerHtml = string.Concat(Enumerable.Repeat("&nbsp;", 10)) + sType + " Placeholder for CTO Engine for " + sCTO;

            this.Controls.Remove(this.FindControl("ctoIFrame"));
            this.Controls.Remove(this.FindControl("ctoPopUp"));
        }
    }
}

public partial class CallBack : CMSAbstractWebPart
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
        {
            Response.Clear();
            Response.ContentType = "text/plain";

            QueryDataParameters oParameters = new QueryDataParameters();
            oParameters.Add("@SessionId", SessionHelper.GetSessionID());
            oParameters.Add("@ItemId", QueryHelper.GetInteger("id", 0));

            var oQuery = new DataQuery("CTO.Container.GlobalCallBack");
            oQuery.Parameters = oParameters;
            DataSet oDataSet = oQuery.Result;

            DataTable dtBasket = oDataSet.Tables[0];
            DataTable dtConfig = oDataSet.Tables[1];
            DataTable dtLines = oDataSet.Tables[2];

            if (dtBasket.Rows.Count > 0)
            {
                Basket oBasket = ObjectUtil.ToObject<Basket>(dtBasket.Rows[0]);
                oBasket.configs = new List<Configuration>();
                foreach (DataRow drConfig in dtConfig.Rows)
                {
                    oBasket.configs.Add(ObjectUtil.ToObject<Configuration>(drConfig));
                }
                foreach (Configuration oConfig in oBasket.configs)
                {
                    oConfig.items = new List<Product>();
                    foreach (DataRow drLine in dtLines.Select("SK_Quote = " + oConfig.id))
                    {
                        oConfig.items.Add(ObjectUtil.ToObject<Product>(drLine));
                    }
                }
                oBasket.configs.RemoveAll(NoItems);
                
                Response.Write(new JavaScriptSerializer().Serialize(oBasket));
            }
            Response.Flush();
            Response.End();
        }
    }

    private static bool NoItems(Configuration oConfig)
    {
        return oConfig.items.Count == 0;
    }
}

public partial class ChannelCentral : CMSAbstractWebPart
{
    private class channelCentral
    {
        public string companyCd { get; set; }
        public string branchNbr { get; set; }
        public string customerNbr { get; set; }
        public string customerName { get; set; }
        public string zipCode { get; set; }
        public string countryCd { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string eMail { get; set; }
        public string languageCd { get; set; }
        public string transactionId { get; set; }
        public string host { get; set; }
        public string token { get; set; }
        public string gateKeeper { get; set; }
        public string basketUrl { get; set; }
        public string returnUrl { get; set; }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
        {
            IMUser iUser = Webservice.AuthUser();
            DataRow drSettings = new DataQuery("CTO.Container.ChannelCentral")
            {
                Parameters = new QueryDataParameters
                {
                    { "@SessionId", SessionHelper.GetSessionID() }
                }
            }.Result.Tables[0].Rows[0];

            channelCentral ccUser = ObjectUtil.ToObject<channelCentral>(drSettings);

            string sXml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:sch=\"http://schemas.channelcentral.net\">" +
                            "<soapenv:Header/>\n" +
                            "<soapenv:Body>" +
                              "<sch:generateToken>" +
                                "<sch:userInfo>" +
                                  "<sch:accountNum>" + ccUser.companyCd + ccUser.branchNbr + ccUser.customerNbr + "</sch:accountNum>" +
                                  "<sch:company_buyer>" +
                                    "<sch:companyType>RESEL</sch:companyType>" +
                                    "<sch:countryCode>" + ccUser.countryCd + "</sch:countryCode>" +
                                    "<sch:frontEndName>" + ccUser.customerName + "</sch:frontEndName>" +
                                    "<sch:name>" + ccUser.customerName + "</sch:name>" +
                                    "<sch:postCode>" + ccUser.zipCode + "</sch:postCode>" +
                                  "</sch:company_buyer>" +
                                  "<sch:email>" + ccUser.eMail + "</sch:email>" +
                                  "<sch:firstName>" + ccUser.firstName + "</sch:firstName>" +
                                  "<sch:lastName>" + ccUser.lastName + "</sch:lastName>" +
                                  "<sch:passedOverSessionID>" + ccUser.transactionId + " </sch:passedOverSessionID>" +
                                "</sch:userInfo>" +
                                "<sch:instanceInfo>" +
                                  "<sch:countryCode>" + ccUser.countryCd + "</sch:countryCode>" +
                                  "<sch:instanceTag>" + ccUser.host + "</sch:instanceTag>" +
                                  "<sch:langCode>" + ccUser.languageCd + "</sch:langCode>" +
                                  "<sch:basketURL>" + ccUser.basketUrl + "/proceed</sch:basketURL>" +
                                  "<sch:returnURL>" + ccUser.returnUrl + "/proceed</sch:returnURL>" +
                                  "<sch:sharedSecret>" + ccUser.token + "</sch:sharedSecret>" +
                                "</sch:instanceInfo>" +
                              "</sch:generateToken>" +
                            "</soapenv:Body>" +
                          "</soapenv:Envelope>";

            HttpWebRequest hRequest = (HttpWebRequest)HttpWebRequest.Create(drSettings["GateKeeper"].ToString());
            hRequest.Method = "POST";
            hRequest.ContentType = "text/xml; charset=utf-8";
            hRequest.ContentLength = sXml.Length;
            hRequest.Headers.Add("soapAction", "http://schemas.channelcentral.net/IGatekeeper/generateToken");
            hRequest.Headers.Add("soapVersion", "1.1");
            hRequest.GetRequestStream().Write(new ASCIIEncoding().GetBytes(sXml), 0, sXml.Length);

            try
            {

                XmlDocument xResponse = new XmlDocument();
                xResponse.LoadXml(new StreamReader(hRequest.GetResponse().GetResponseStream()).ReadToEnd());

                XmlNamespaceManager xNS = new XmlNamespaceManager(xResponse.NameTable);
                xNS.AddNamespace("s", "http://schemas.xmlsoap.org/soap/envelope/");
                xNS.AddNamespace("x", "http://schemas.channelcentral.net");
                xNS.AddNamespace("i", "http://www.w3.org/2001/XMLSchema-instance");

                Response.Redirect(xResponse.SelectSingleNode("//s:Envelope/s:Body/x:generateTokenResponse/x:generateTokenResult/x:fullAddress", xNS).InnerText);
            }
            catch (Exception ex)
            {
                Response.Clear();
                Response.ContentType = "text/plain";
                Response.Write("Error! " + ex.Message + "\n\n");
                Response.Write(sXml);
                Response.Flush();
                Response.End();
           }
        }
    }
}

// https://one.ingrammicro.eu/1IM/oneingram-1.9.13/aspx/system/cto.aspx?id=82
public partial class Copy2EQM : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Clear();
        Response.ContentType = "text/plain";

        QueryDataParameters oParameters = new QueryDataParameters();
        oParameters.Add("@SessionId", "");
        oParameters.Add("@ItemId", QueryHelper.GetInteger("id", 0));

        var oQuery = new DataQuery("CTO.Container.GlobalCallBack");
        oQuery.Parameters = oParameters;
        DataSet oDataSet = oQuery.Result;

        DataTable dtBasket = oDataSet.Tables[0];
        DataTable dtConfig = oDataSet.Tables[1];
        DataTable dtLines = oDataSet.Tables[2];

        if (dtBasket.Rows.Count > 0)
        {
            Basket oBasket = ObjectUtil.ToObject<Basket>(dtBasket.Rows[0]);
            oBasket.configs = new List<Configuration>();
            foreach (DataRow drConfig in dtConfig.Rows)
            {
                oBasket.configs.Add(ObjectUtil.ToObject<Configuration>(drConfig));
            }
            foreach (Configuration oConfig in oBasket.configs)
            {
                oConfig.items = new List<Product>();
                foreach (DataRow drLine in dtLines.Select("SK_Quote = " + oConfig.id))
                {
                    oConfig.items.Add(ObjectUtil.ToObject<Product>(drLine));
                }
            }
            oBasket.configs.RemoveAll(NoItems);

            Response.Write(new JavaScriptSerializer().Serialize(oBasket));
        }
        Response.Flush();
        Response.End();
    }

    private static bool NoItems(Configuration oConfig)
    {
        return oConfig.items.Count == 0;
    }
}

public partial class Punchout : CMSAbstractWebPart
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
        {
            IMUser iUser = Webservice.AuthUser();
            IMTools.Kentico.getUser(iUser);

            string sCtoCode = CryptoUtil.Decrypt(Uri.UnescapeDataString(QueryHelper.GetString("a14", "")));
            string sCallback = CryptoUtil.Decrypt(Uri.UnescapeDataString(QueryHelper.GetString("a15", ""))).Replace("Error", "");
            string sTransactionId = CryptoUtil.Decrypt(Uri.UnescapeDataString(QueryHelper.GetString("c1", ""))).Replace("Error", "");

            QueryDataParameters oParameters = new QueryDataParameters();
            oParameters.Add("@BrCustNbr", iUser.BranchNbr + iUser.CustomerNbr);
            oParameters.Add("@Callback", sCallback);
            oParameters.Add("@CompanyCd", iUser.CompanyCd);
            oParameters.Add("@CtoCode", sCtoCode);
            oParameters.Add("@NodeId", CurrentPageInfo.NodeID);
            oParameters.Add("@RemoteIp", RequestContext.UserHostAddress);
            oParameters.Add("@SessionId", SessionHelper.GetSessionID());
            oParameters.Add("@UserName", iUser.UserName);
            oParameters.Add("@TransactionId", sTransactionId);

            DataQuery oQuery = new DataQuery("CTO.Container.GlobalPunchOut");
            oQuery.Parameters = oParameters;
            DataSet oDataSet = oQuery.Result;

            foreach (DataRow oDataRow in oDataSet.Tables[0].Rows)
            {
                if (oDataRow["Error"].ToString().Equals("0"))
                {
                    Response.Redirect(oDataRow["Redirect"].ToString(), true);
                }
                else
                {
                    Response.Write("Error: " + oDataRow["Message"].ToString() + "<br><br>");
                    if (UserRoleInfoProvider.IsUserInRole(iUser.KenticoId, RoleInfoProvider.GetRoleInfo("global-debuguser", "").RoleID))
                    {
                        Response.Write("Debug Data:<br>" +
                                        "@CompanyCd: " + iUser.CompanyCd + "<br>" +
                                        "@BrCustNbr: " + iUser.BranchNbr + iUser.CustomerNbr + "<br>" +
                                        "@UserName: " + iUser.UserName + "<br>" +
                                        "@SessionId: " + SessionHelper.GetSessionID() + "<br>" +
                                        "@RemoteIp: " + RequestContext.UserHostAddress + "<br>" +
                                        "@NodeId: " + CurrentPageInfo.NodeID + "<br>" +
                                        "@CtoCode: " + sCtoCode + "<br>" +
                                        "@Callback: " + sCallback + "<br>" +
                                        "@TransactionId: " + sTransactionId + "<br><br>" +
                                        "SKValid: " + iUser.SK_Valid + "<br>" +
                                        "SKCust: " + iUser.SK_Cust + "<br>" +
                                        "Kentico Id: " + iUser.KenticoId + "<br>" +
                                        "Kentico Name: " + iUser.KenticoName);
                    }
                }
            }
        }
    }
}