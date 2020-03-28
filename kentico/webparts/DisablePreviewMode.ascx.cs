using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using CMS.PortalControls;
using CMS.Helpers;
using CMS.PortalEngine;
using CMS.DocumentEngine;


/// <summary>
/// A simple web part that disabled Preview Mode under specific circumstances:
/// 1) You're not in the middle of a PostBack, but instead a fresh page load.
/// 2) You're not viewing the Permanent URL, which is used by the internal CMS Desk Preview page and the Transformations preview.
/// </summary>
/// <author>Chris Bass - Wakefly, inc.</author>
/// <created>2016/05/27</created>
public partial class CMSWebParts_General_DisablePreviewMode : CMSAbstractWebPart
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
            if (Request.RawUrl.Contains("/cmsctx/pv/"))
            {
                // Response.Write(Request.RawUrl.ToString());
            }
            else if (!IsPostBack && PortalContext.ViewMode == ViewModeEnum.Preview && !Request.RawUrl.StartsWith("/cms/getdoc"))
            {
                PortalContext.ViewMode = ViewModeEnum.LiveSite;
                Response.Redirect(Request.RawUrl);
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



