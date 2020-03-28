using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;

using System.Security.Cryptography;
using System.Text;

using CMS.PortalEngine;
using CMS.PortalControls;
using CMS.Helpers;
using CMS.Membership;
using CMS.MembershipProvider;
using CMS.DataEngine;




public partial class aspx_webparts_aspxcode : CMSAbstractWebPart
{

#region "Properties"

   


    /// <summary>
    /// Gets or sets the return url
    /// </summary>
    public string ReturnURL
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("ReturnURL"), "");
        }
        set
        {
            this.SetValue("ReturnURL", value);
        }
    }






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

            if ((PortalContext.ViewMode == ViewModeEnum.LiveSite) || (PortalContext.ViewMode == ViewModeEnum.Preview))
            {
                CurrentUserInfo user = MembershipContext.AuthenticatedUser;

                if (!user.IsPublic()) // only proceed if user is authenticated
                {
                }

                ltlPlaceholder.Text = user.UserName;
    
            }



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



