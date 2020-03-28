using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Cryptography;
using System.Text;

using CMS.PortalEngine;
using CMS.PortalControls;
using CMS.DataEngine;
using CMS.Helpers;
using CMS.Membership;
using CMS.MembershipProvider;
using CMS.DocumentEngine;

public partial class oneIM_Webparts_VoucherLogin : CMSAbstractWebPart
{
    #region "Properties"

    



    #endregion


    #region "Methods"


    /// <summary>
    /// Content loaded event handler.
    /// </summary>
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
        SetupControl();
    }


    /// <summary>
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        if (this.StopProcessing)
        {
            // Do not process
        }
        else
        {

            if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
            {

                var http_method = Request.HttpMethod;
                var c = HttpContext.Current;
                if (Page.IsPostBack)
                {
                    // HTTP Post
                    //System.Web.HttpContext.Current.Response.Write("Postback"+Request["Key"]);
                }
                else
                {
                    // HTTP Get
                }
              
               
                bool IsChecked= false;
                            
                string szFRVendorCheck = ValidationHelper.GetString(SessionHelper.GetValue("FRVendorCheck"), string.Empty);


                if (szFRVendorCheck == "True")
                {
                    IsChecked = true;
                }



                pnlVoucherLogin.Visible = !IsChecked;

                //ltlPlaceholder.Text = string.Empty;
                // lblUserName.Text = GetString("logonform.username");
                lbluserid.Text = "{$LogonForm.UserName$}";
                lbluserpw.Text = "{$LogonForm.password$}";
                btnSubmit1.Text = "{$LogonForm.logonbutton$}";


               
                if (http_method == "POST")
                {

                    string userid = Request["userid"];
                    string userpw = Request["userpw"];

                    //string userid = QueryHelper.GetString("userid", string.Empty);
                    //string userpw = QueryHelper.GetString("userpw", string.Empty);
                    

                    // check if User is PAX of program

                    string sql0 = "SELECT * FROM oneIM_accessvouchers av WHERE  VoucherName ='" + userid + "'  AND VoucherCode='" + userpw + "'";
                    //System.Web.HttpContext.Current.Response.Write(sql0);

                    string ItemID = "";


                    DataSet data_reg = ConnectionHelper.ExecuteQuery(sql0, null, QueryTypeEnum.SQLQuery, false);
                    foreach (DataRow dr in data_reg.Tables[0].Rows)
                    {
                        ItemID = dr["ItemID"].ToString();
                    }


                    // System.Web.HttpContext.Current.Response.Write("RegID: "+RegID);

                    if (ItemID != "")
                    {
                        //Session["FRVendorCheck"] = true;
                        SessionHelper.SetValue("FRVendorCheck", true);
                        Response.Redirect(Request.RawUrl);
                    }
                    else
                    {
                        //Session["FRVendorCheck"] = false;
                        SessionHelper.SetValue("FRVendorCheck", false);
                        FailureText.Text = GetString("logonform.LoginFailedText");
                        //ltlPlaceholder.Text = "Validation failed. Please review your input and try again.";
                    }


                }
                else
                {
                    if (Session["FRVendorCheck"] == "")
                    {
                        //Session["FRVendorCheck"] = false;
                        SessionHelper.SetValue("FRVendorCheck", false);
                    }
                    if (Request["logoff"] == "off")
                    {
                        //Session["FRVendorCheck"] = false;
                        SessionHelper.SetValue("FRVendorCheck", false);
                        string url = Request.RawUrl;

                        url = url.Substring(0, url.IndexOf("?"));

                        Response.Redirect(url);
                    }

                } // end if POST    
                                                     
            } // end if ViewMode
 
            


        } // end if Stop rPocessing
    } // end precedure



    /// <summary>
    /// Reloads the control data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();

        SetupControl();
    }

    #endregion
}



