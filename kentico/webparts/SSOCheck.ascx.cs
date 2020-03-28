// System
using System;
using System.Collections.Generic;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.Security;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

// CMS
using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.Localization;
using CMS.Base;
using CMS.SiteProvider;
using CMS.Membership;
using CMS.UIControls;
using CMS.DataEngine;
using CMS.MacroEngine;
using CMS.PortalEngine;
using CMS.MembershipProvider;
using CMS.PortalControls;

// Ping Federate
using opentoken;
using opentoken.util;

public partial class oneIM_WebParts_SSOCheck : CMSAbstractWebPart
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
            
        }
    }


    /// <summary>
    /// Reloads the control data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();

        SetupControl();
    }

    #endregion

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!CMS.PortalEngine.PortalContext.ViewMode.IsLiveSite()) return;

        string siteName = SiteContext.CurrentSiteName;
        string pf_IDP_Url = SettingsKeyInfoProvider.GetValue(siteName + ".pfidpurl");
        string SK_Valid = SettingsKeyInfoProvider.GetValue(siteName + ".SK_VALID");
        string SSOfailedurl = SettingsKeyInfoProvider.GetValue(siteName + ".pfidpfailedurl");
        string agentConfig = siteName.Split('.')[0] + ".txt";
        //string agentconfigfilepath = CMS.Base.SystemContext.WebApplicationPhysicalPath + "\\" + siteName + "\\sso\\agent-config.txt";
        string agentconfigfilepath = CMS.Base.SystemContext.WebApplicationPhysicalPath + @"\1IM\oneingram-1.9.13\sso\" + agentConfig;
        //read opentokende already existing session if available
        string opentoken = GetOpenTokenText(Context);

        /*
        CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.ERROR,
                 "SSO.Config",
                 "Agent",
                 agentconfigfilepath);
        */
        //create new PF Agent from API
        Agent agent = null;
        if (!String.IsNullOrEmpty(pf_IDP_Url))
        {
            try
            {
                agent = new Agent(agentconfigfilepath);
               
            }
            catch (Exception ex)
            {
            }
        }

        //if there is an existing session
        
        if (opentoken != null && agent!=null)
        {

            
            try
            {
                /*
                CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.ERROR,
                  "SSO.Login",
                  "User1",
                  opentoken);
                */
                
                //read userInfo from session
                MultiStringDictionary userInfo = agent.ReadTokenMultiStringDictionary(opentoken);
                
                /*
                  CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.ERROR,
                   "SSO.Login",
                   "User2",
                   Agent.TOKEN_SUBJECT.ToString());
                */

                //if valid use userInfo to do legacy login and redirect to TargetSource
                if (userInfo != null)
                {
                    String username = userInfo[Agent.TOKEN_SUBJECT][0];
                    //List<String> CCD = userInfo["CCD"];
                    //List<String> BNR = userInfo["BNR"];


                  

                    //UserInfo user = UserInfoProvider.GetUserInfo(username);
                    UserInfo user = IMTools.Kentico.getUser(username);

                    if (user==null)
                    {
                        user = UserInfoProvider.GetUserInfo(username);
                    }
                  
                    if (user != null)
                    {
                        //if legacy login has been successful redirect to TargetSource
                        //CMS.Membership.AuthenticationHelper.AuthenticateUser(username, true, true);
                        CMS.Membership.AuthenticationHelper.AuthenticateUser(user.UserName, true, true);

                        //set legacy auth cookie
                        //FormsAuthentication.SetAuthCookie(username, true);
                        //read url parameter TargetSource
                        
                        Response.Cookies["SSOTrack"].Value = "1";
                        Response.Cookies["SSOTrack"].Expires = DateTime.Now.AddDays(1825);
                        /*
                        string returnurl = GetReturnUrl(Context);

                        //redirect to TargetSource or home.aspx
                        if (returnurl.Length > 0)
                        {
                            SSORedirect(null, returnurl);
                        }
                        else
                        {
                            //SSORedirect(null, "~/");
                        }
                        */

                        string targetResource = GetTargetResource(Context);
                        string returnurl = GetReturnUrl(Context);
                        //redirect to TargetSource or home.aspx
                        if (targetResource.Length > 0)
                        {
                            SSORedirect(null, targetResource);
                        }
                        else if (returnurl.Length > 0)
                        {
                            SSORedirect(null, returnurl);
                        }
                        else
                        {
                            SSORedirect(null, "~/");
                        }





                    }
                    //if legacy login was not successful create new user
                    else
                    {
                        SqlConnection sConn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MsSqlWeb"].ConnectionString);

                        SqlCommand sCommand = new SqlCommand("SELECT * FROM OIS_CUSTOMER.dbo.Vw_CustomerUser WHERE SAMAccountName=@SAMAccountName AND SK_Valid=@SK_Valid", sConn);
                        SqlParameter spSAMAccount = new SqlParameter("@SAMAccountName", SqlDbType.VarChar, 153);
                        SqlParameter spSK_Valid = new SqlParameter("@SK_Valid", SqlDbType.Int);
                        spSAMAccount.Value = username;
                        spSK_Valid.Value = Convert.ToInt32(SK_Valid);
                        sCommand.Parameters.Add(spSAMAccount);
                        sCommand.Parameters.Add(spSK_Valid);

                        sConn.Open();
                        SqlDataReader sdReader = sCommand.ExecuteReader();
                        if (sdReader.Read())
                        {
                            //UserInfo user = UserInfoProvider.GetUserInfo(sdReader["Firstname"]);

                            int siteId = CMS.SiteProvider.SiteContext.CurrentSiteID;
                            // Create new user object
                            CMS.Membership.UserInfo newUser = new CMS.Membership.UserInfo();
                            // Set the properties
                            newUser.FullName = (sdReader["Firstname"] != null ? sdReader["Firstname"].ToString() : "") + " " + (sdReader["Lastname"] != null ? sdReader["Lastname"].ToString() : "");
                            //newUser.UserName = "IMONLINE-" + (sdReader["SAMAccountName"] != null ? sdReader["SAMAccountName"].ToString() : "");
                            newUser.UserName = (sdReader["SAMAccountName"] != null ? sdReader["SAMAccountName"].ToString() : "");
                            newUser.FirstName = sdReader["Firstname"] != null ? sdReader["Firstname"].ToString() : "";
                            newUser.LastName = sdReader["Lastname"] != null ? sdReader["Lastname"].ToString() : "";
                            newUser.Enabled = true;
                            newUser.IsExternal = true;
                            // Save the user
                            CMS.Membership.UserInfoProvider.SetUserInfo(newUser);
                            //CMS.Membership.UserInfoProvider.SetPassword(newUser.UserName, "abcde");
                            CMS.Membership.UserInfoProvider.AddUserToSite(newUser.UserName, siteName);
                            CMS.Membership.AuthenticationHelper.AuthenticateUser(newUser.UserName, true, true);
                            //set legacy auth cookie
                            FormsAuthentication.SetAuthCookie(newUser.UserName, true);
                            //read url parameter TargetSource
                            /*
                            string targetResource = GetTargetResource(Context);
                            //redirect to TargetSource or home.aspx
                            if (targetResource.Length > 0)
                            {
                                SSORedirect(null, targetResource);
                            }
                            else
                            {
                                SSORedirect(null, "~/");
                            }
                            */

                            string targetResource = GetTargetResource(Context);
                            string returnurl = GetReturnUrl(Context);
                            //redirect to TargetSource or home.aspx
                            if (targetResource.Length > 0)
                            {
                                SSORedirect(null, targetResource);
                            }
                            else if (returnurl.Length > 0)
                            {
                                SSORedirect(null, returnurl);
                            }
                            else
                            {
                                SSORedirect(null, "~/");
                            }
                          
                        }
                        else
                        {
                            agent.DeleteToken(Response);
                            SSORedirect("userinfo: not customer data found:" + username, SSOfailedurl);
                        }
                        sdReader.Close();
                        sdReader.Dispose();

                        sConn.Close();
                        

                    }
                }
                else
                {
                    agent.DeleteToken(Response);
                    SSORedirect("userinfo token empty", SSOfailedurl);
                }
            }
            catch (TokenException ex)
            {

                CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.ERROR,
                   "SSO.Login",
                   "SSOError",
                   ex.Message+": "+ex.StackTrace+" - "+ex.InnerException);

                
                
                agent.DeleteToken(Response);
                SSORedirect(ex.Message + ": " + ex.StackTrace + " - " + ex.InnerException, SSOfailedurl);
            }
            catch (TokenExpiredException ex)
            {
                agent.DeleteToken(Response);
                SSORedirect(ex.Message, SSOfailedurl);
            }
        }

    }

    private void SSORedirect(string errorMessageText, string Url)
    {
        if (errorMessageText != null)
        {
            try
            {
                UrlHelper urlHelper = new UrlHelper(Url);
                urlHelper.AddParameter("error", errorMessageText);
                Response.Redirect(urlHelper.ToString(), false);
            }
            catch (Exception ex)
            {
                Response.Redirect(Url + "?error=" + errorMessageText, false);
            }
        }
        else
        {
            Response.Redirect(Url, false);
            Context.ApplicationInstance.CompleteRequest();
        }
    }

    public static string GetOpenTokenText(HttpContext context)
    {

        string pf_tokenname = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".pfidptokenname");
        string openTokenText = null;
        // (1) Try to get parameters from POST method
        try
        {
            openTokenText = context.Request.Form[pf_tokenname];
            if (String.IsNullOrEmpty(openTokenText)) openTokenText = context.Request.Form["opentokenat"];
            if (String.IsNullOrEmpty(openTokenText)) openTokenText = context.Request.Form["opentokende"];
            if (String.IsNullOrEmpty(openTokenText)) openTokenText = context.Request.Form["opentoken"];
        }
        catch (Exception ex)
        {

        }

        // (2) Try to get parameters from GET method (If we cannot get any parameters from POST method):
        if (!string.IsNullOrEmpty(openTokenText)) return openTokenText;
        try
        {
            openTokenText = context.Request.QueryString[pf_tokenname];
            if (String.IsNullOrEmpty(openTokenText)) openTokenText = context.Request.QueryString["opentokenat"];
            if (String.IsNullOrEmpty(openTokenText)) openTokenText = context.Request.QueryString["opentokende"];
            if (String.IsNullOrEmpty(openTokenText)) openTokenText = context.Request.QueryString["opentoken"];
        }
        catch (Exception ex)
        {

        }
        return openTokenText;
    }

    public static string GetTargetResource(HttpContext context)
    {
        string targetResource = null;
        // (1) Try to get parameters from POST method
        try
        {
            targetResource = context.Request.Form["TargetResource"];
        }
        catch (Exception ex)
        {

        }

        // (2) Try to get parameters from GET method (If we cannot get any parameters from POST method):
        if (!string.IsNullOrEmpty(targetResource)) return targetResource;
        try
        {
            targetResource = context.Request.QueryString["TargetResource"];
        }
        catch (Exception ex)
        {

        }
        return string.IsNullOrEmpty(targetResource) ? "" : targetResource;
    }

    public static string GetReturnUrl(HttpContext context)
    {
        string returnurl = null;
        // (1) Try to get parameters from POST method
        try
        {
            returnurl = context.Request.Form["returnurl"];
        }
        catch (Exception ex)
        {

        }

        // (2) Try to get parameters from GET method (If we cannot get any parameters from POST method):
        if (!string.IsNullOrEmpty(returnurl)) return returnurl;
        try
        {
            returnurl = context.Request.QueryString["returnurl"];
        }
        catch (Exception ex)
        {

        }
        return string.IsNullOrEmpty(returnurl) ? "" : returnurl;
    }
}



