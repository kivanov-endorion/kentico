using System.Text;

using CMS.Helpers;
using CMS.PortalControls;
using CMS.PortalEngine;

public partial class CMSWebParts_SocialMedia_Yammer_YammerFollowButton : CMSAbstractWebPart
{
    #region "Properties"
    public string ScriptSource
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ScriptSource"), string.Empty);
        }
        set
        {
            SetValue("ScriptSource", value);
        }
    }

    public string ContainerName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ContainerName"), string.Empty);
        }
        set
        {
            SetValue("ContainerName", value);
        }
    }

    public string Network
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Network"), string.Empty);
        }
        set
        {
            SetValue("Network", value);
        }
    }

    #endregion

    #region "Methods"

    /// <summary>
    /// Content loaded event handler
    /// </summary>
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
        SetupControl();
    }


    /// <summary>
    /// Initializes the control properties
    /// </summary>
    protected void SetupControl()
    {
        if (this.StopProcessing)
        {

        }
        else
        {
            if (PortalContext.ViewMode == ViewModeEnum.LiveSite || PortalContext.ViewMode == ViewModeEnum.Preview)
            {
                //Build the Container DOM separately
                StringBuilder sbDom = new StringBuilder();
                sbDom.AppendFormat("<div id=\"{0}\"></div>", ContainerName);

                
                //ensure we only load the include script once in case we are using multiple Yammer web parts at the same time
                StringBuilder sbScript = new StringBuilder();

                string key = string.Format("yam-{0}", ScriptSource);
                if (!ScriptHelper.IsClientScriptBlockRegistered(key))
                {
                    sbScript.AppendFormat("<script src=\"{0}\"></script>", ScriptSource);
                    ScriptHelper.AddToRegisteredClientScripts(key);
                }

                sbScript.Append("<script>yam.connect.actionButton({");
                sbScript.AppendFormat("   container:  \"#{0}\",", ContainerName);
                sbScript.AppendFormat("   network:    \"{0}\",", Network);
                sbScript.Append("   action:   \"follow\"");
                sbScript.Append("});");
                sbScript.AppendFormat("</script>");

                //render DOM inline
                ltYamFollowCode.Text = sbDom.ToString();

                //render startup script
                ScriptHelper.RegisterStartupScript(Page, typeof(string), ClientID + "inlinescript", sbScript.ToString());
            }
        }
    }


    /// <summary>
    /// Reloads the control data
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();
        SetupControl();
    }
    #endregion
}