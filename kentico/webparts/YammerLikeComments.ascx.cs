using System;
using System.Text;

using CMS.Helpers;
using CMS.PortalControls;
using CMS.PortalEngine;

public partial class CMSWebParts_SocialMedia_Yammer_YammerLikeComments : CMSAbstractWebPart
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

    public int ContainerHeight
    {
        get
        {
            //Can't hardly use this if you don't give at least 300px in height according to Yammer
            return ValidationHelper.GetInteger(GetValue("ContainerHeight"), 300);
        }
        set
        {
            SetValue("ContainerHeight", value);
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

    public bool Header
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Header"), true);
        }
        set
        {
            SetValue("Header", value);
        }
    }

    public bool Footer
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Footer"), true);
        }
        set
        {
            SetValue("Footer", value);
        }
    }

    public bool Preview
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Preview"), false);
        }
        set
        {
            SetValue("Preview", value);
        }
    }

    public string PromptText
    {
        get
        {
            return ValidationHelper.GetString(GetValue("PromptText"), string.Empty);
        }
        set
        {
            SetValue("PromptText", value);
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
                sbDom.AppendFormat("<div id=\"{0}\" style=\"height:{1}px;\"></div>", ContainerName, ContainerHeight);
                
                //ensure we only load the include script once in case we are using multiple Yammer web parts at the same time
                StringBuilder sbScript = new StringBuilder();

                string key = string.Format("yam-{0}", ScriptSource);
                if (!ScriptHelper.IsClientScriptBlockRegistered(key))
                {
                    sbScript.AppendFormat("<script src=\"{0}\"></script>", ScriptSource);
                    ScriptHelper.AddToRegisteredClientScripts(key);
                }

                sbScript.Append("<script>yam.connect.embedFeed({");
                sbScript.AppendFormat("   container:  \"#{0}\",", ContainerName);
                sbScript.AppendFormat("   network:    \"{0}\",", Network);
                sbScript.Append("   feedType:   \"open-graph\",");
                sbScript.Append("   private:   true,");
                sbScript.Append("config: {");
                sbScript.AppendFormat("   header: {0},", Header.ToString().ToLower());
                sbScript.AppendFormat("   footer: {0},", Footer.ToString().ToLower());
                sbScript.AppendFormat("   showOpenGraphPreview: {0}", Preview.ToString().ToLower());

                if (!String.IsNullOrEmpty(PromptText))
                {
                    sbScript.AppendFormat("   ,promptText: \"{0}\"", PromptText);    
                }

                sbScript.Append(" }");
                sbScript.Append("});");
                sbScript.AppendFormat("</script>");

                //render DOM inline
                ltYamCommentCode.Text = sbDom.ToString();

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