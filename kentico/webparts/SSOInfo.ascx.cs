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

using opentoken;
using opentoken.util;

public partial class oneIM_WebParts_SSOInfo : CMSAbstractWebPart
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

        CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.INFORMATION, "SSOTest1", "", "");
        //opentoken = "T1RLAQLMBjumSLQzz_38nO_XnMy7kDfLFxCSZm9UIfTl88U9Bwrrnn0cAAHgBaBT9Oh7puhXvgogiWszpTtsLaS0W75H2yEGatm4I_tOTM9JTXD9Y9fexEYULnvUPL5cPAKoRS1HTBlvY6Q2Pxk2h-o1KC-O9zPkPLoaZfc3Exk3w5B-TGOo8ql1UhiTlwA3tFNIqn6YU_YfHJlDx-ib7JAVmBv49oDA2Km3MfzEWQOffq8Mbf7jLwgbp6peV4ApVLLxolnJRm6BKAeU-iEPbp3f6umgNhY8hkgHiP9FxOQ1qdfs7WI7Rno334xobz7mniKnlx6kGZ7ahBsNYP-GhViPTUL65FmIVZuUvrI1Hu5g47X5sxwcUqoDehQpz-2obt0isY0PF_GTAIKEZATSRabq3Hhc_rvvZX9ZchFUMt8khIqkt2OOUEhA-QILGrUzYPA8U1rDAn4-VI16KIehmn32DvjHPVysoBySeyNWz-JksfjJNqqz7llCLwfIxqm6C-22tRk3lBH0XndX1J3OvOWy0V4qHklDm26TelVDtLlJveIjzfY3aUbc5dZ8XPmbjD76-rV1j5mgbCNzvfCYTwYL1aEKZUsJIqGsNCQjrdMUltFxECKsb_hsn9HaKbSFu17G9df7lp-Dka3utOP7TSOf6r5XDDQ2QAbPHpezhT_tQmq2OR_plO1LSL93";
        if (opentoken != null && agent!=null)
        {
            CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.INFORMATION, "SSOTest2", "", "");
            try
            {
                //read userInfo from session
                MultiStringDictionary userInfo = agent.ReadTokenMultiStringDictionary(opentoken);
                foreach (var arraykey in userInfo.Keys)
                {
                    CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.INFORMATION, "SSO:"+arraykey, userInfo[arraykey][0], "");
                }
                if (userInfo != null)
                {
                    String username = userInfo[Agent.TOKEN_SUBJECT][0];

           
                    CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.INFORMATION, "SSOTest3", username, opentoken);
                }
            }
            catch (TokenException ex)
            {
                CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.INFORMATION, "SSOTest4", "", "");
            }
            catch (TokenExpiredException ex)
            {
                CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.INFORMATION, "SSOTest5", "", "");
            }
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
}



