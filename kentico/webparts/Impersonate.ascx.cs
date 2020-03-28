using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

/*
using CMS.PortalEngine;



*/
using CMS.PortalControls;
using CMS.Membership;
using CMS.Helpers;
using CMS.Controls;
using CMS.SiteProvider;
using CMS.DocumentEngine;
using CMS.ExtendedControls;
using CMS.Base;
using CMS.EventLog;



public partial class Impersonate : CMSAbstractWebPart
{
    # region "Properties"

    /// <summary>
    /// Gets or sets the value that indicates whether permissions should be checked.
    /// </summary>
    public string DropDirection
    {
        get
        {
            return ValidationHelper.GetString(GetValue("DropDirection"),"dropdown");
        }
        set
        {
            SetValue("DropDirection", value);
            
        }
    }

    /// <summary>
    /// Gets or sets the value that indicates whether permissions should be checked.
    /// </summary>
    public string Alignment
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Alignment"), "left");
        }
        set
        {
            SetValue("Alignment", value);

        }
    }

    /// <summary>
    /// Gets or sets the value that indicates whether permissions should be checked.
    /// </summary>
    public string CSSClassPrefix
    {
        get
        {
            return ValidationHelper.GetString(GetValue("CSSClassPrefix"),"");
        }
        set
        {
            SetValue("CSSClassPrefix", value);
            
        }
    }

    /// <summary>
    /// Gets or sets the value that indicates whether permissions should be checked.
    /// </summary>
    public string Display
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Display"),"");
        }
        set
        {
            SetValue("Display", value);

        }
    }

    /// <summary>
    /// Gets or sets the value that indicates whether permissions should be checked.
    /// </summary>
    public string TargetURL
    {
        get
        {
            if(String.IsNullOrEmpty(GetValue("TargetURL").ToString()))
            {
                return  RequestContext.CurrentURL.ToString();
            }
            else
            {
                return GetValue("TargetURL").ToString();
            }
           
        }
        set
        {
            SetValue("TargetURL", value);

        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether permissions should be checked.
    /// </summary>
    public string UserRoles
    {
        get
        {
            return ValidationHelper.GetString(GetValue("UserRoles"), "");
        }
        set
        {
            SetValue("UserRoles", value);

        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether permissions should be checked.
    /// </summary>
    public string WhereCondition
    {
        get
        {
            return ValidationHelper.GetString(GetValue("WhereCondition"), "");
        }
        set
        {
            SetValue("WhereCondition", value);

        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether sign-out button should be displayed.
    /// </summary>
    public bool ShowSignOut
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("ShowSignOut"), false);
        }
        set
        {
            SetValue("ShowSignOut", value);

        }
    }

    #endregion

    #region "Methods"

    private bool CheckPermission(string roles)
    {

        bool retVal = false;

        string[] arUserRoles = roles.Split(';');
        

        if (arUserRoles.Length > 0)
        {
            foreach (string role in arUserRoles)
            {
                if (MembershipContext.AuthenticatedUser.IsInRole(role, SiteContext.CurrentSiteName))
                    retVal = true;

            }
        }

        return retVal;

    }

    private void CheckUserImpersonate()
    {
        CurrentUserInfo user = MembershipContext.AuthenticatedUser;



        string originalUserName = "";

        if (RequestHelper.IsFormsAuthentication())
        {
            originalUserName = ValidationHelper.GetString(SessionHelper.GetValue("OriginalUserName"), "");
        }
        else
        {
            originalUserName = ValidationHelper.GetString(SessionHelper.GetValue("ImpersonateUserName"), "");
        }


        // Show impersonate button for global admin only or impersonated user
        if ((user.IsGlobalAdministrator) || (!String.IsNullOrEmpty(originalUserName)) || (CheckPermission(UserRoles)))
        {
           
            pnlUsers.Visible = true;
          
            
            if (Display.ToString() == "Username")
            {
                lblLabel.Text = MembershipContext.AuthenticatedUser.UserName;
            }
            else
            {
                lblLabel.Text = "<i class='fa fa-cog'>&nbsp;</i>";
                lblLabel2.Text =  MembershipContext.AuthenticatedUser.GetValue("FullName").ToString();
                lblLabel3.Text = "<li role='separator' class='divider'></li>";
            }


            btnImpersonate.Visible = true;
            btnImpersonate.OnClientClick = ucUsers.GetSelectionDialogScript();
                
            btnSignOut.Visible = ShowSignOut;
            lblSignOutSeparator.Visible = ShowSignOut;

            htmlDIVDropdown.Attributes.Add("class", DropDirection);


            if (Alignment == "right")
            {
                htmlDIVDropdown.Attributes.Add("class", DropDirection + " text-right");
                htmlULDropdown.Attributes.Add("class", "dropdown-menu dropdown-menu-right");
            }

          
            
            if (user.IsGlobalAdministrator) // show all site users 
            {
                ucUsers.WhereCondition = "UserID IN (SELECT UserID FROM CMS_UserSite WHERE (UserIsGlobalAdministrator = 0) AND (SiteID=" + SiteContext.CurrentSiteID + ")) AND (UserID != " + user.UserID + ") AND (UserName != N'public')";
                pnlUsers.Visible = true;
            }
            else
            {
                ucUsers.EditItemPageUrl = "";

                ucUsers.WhereCondition = WhereCondition;
                pnlUsers.Visible = true;
            }

            //Script for open uniselector modal dialog
            //string impersonateScript = "function userImpersonateShowDialog () {US_SelectionDialog_" + ucUsers.ClientID + "()}";
           // US_SelectionDialog_UserSelector(); return false;WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;UserSelector$btnDialog&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))
            /*
            string impersonateScript = "function userImpersonateShowDialog () {US_SelectionDialog_" + ucUsers.ClientID + "()}";
            ScriptHelper.RegisterClientScriptBlock(this, typeof(string), "ImpersonateContextMenu", ScriptHelper.GetScript(impersonateScript));
            */

            string userName = HttpUtility.UrlDecode(ValidationHelper.GetString(ucUsers.Value, String.Empty));
            if (userName != String.Empty)
            {
                // Get selected user info
                UserInfo iui = UserInfoProvider.GetUserInfo(userName);
                SessionHelper.SetValue("OriginalUserName", MembershipContext.AuthenticatedUser.UserName);
                SessionHelper.SetValue("OriginalUserNameHash", EncryptionHelper.EncryptData(SecurityHelper.GetSHA2Hash(MembershipContext.AuthenticatedUser.GetStringValue("UserPassword", ""))));
                AuthenticationHelper.ImpersonateUser(iui, TargetURL);
                
            }

            // Set script for cancel impersonation only if original user name is specified
            if (!String.IsNullOrEmpty(originalUserName))
            {
                    
                string script = "function CancelImpersonation() {document.getElementById('" + btnImpersonate_Cancel.ClientID + "').click();return false;}";
                ScriptHelper.RegisterClientScriptBlock(this, typeof(string), "CancelImpersonation", ScriptHelper.GetScript(script));
            }


            // Set visibility of Cancel impersonation item in menu
            if (!String.IsNullOrEmpty(originalUserName))
            {
                btnImpersonate.Visible = false;
                btnImpersonate_Cancel.Visible = true;
                lblLabel.AddCssClass("impersonated");
            }
            else
            {
                btnImpersonate.Visible = true;
                btnImpersonate_Cancel.Visible = false;
            }

           

        }
    }


    protected void btnSignOut_Click(object sender, EventArgs e)
    {
        AuthenticationHelper.SignOut(TargetURL);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnImpersonate_Cancel_Click(object sender, EventArgs e)
    {
        string originalUserName = ValidationHelper.GetString(SessionHelper.GetValue("OriginalUserName"), "");

        if (RequestHelper.IsFormsAuthentication())
        {
            UserInfo ui = UserInfoProvider.GetUserInfo(originalUserName);
            AuthenticationHelper.ImpersonateUser(ui, TargetURL);
        }
        else
        {
            SessionHelper.SetValue("ImpersonateUserName", null);
            SessionHelper.SetValue("OriginalUserName", null);
            AuthenticationHelper.SignOut(TargetURL);
           
            // send them back where they came from
            URLHelper.Redirect(RequestContext.CurrentURL);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        CheckUserImpersonate();

    }

    #endregion
}