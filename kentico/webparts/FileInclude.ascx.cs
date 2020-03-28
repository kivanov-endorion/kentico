using System;
using System.Diagnostics;
using System.Web.UI;

using CMS.Base;
using CMS.Helpers;
using CMS.PortalControls;
using CMS.PortalEngine;

using IMTools;

public partial class FileInclude : CMSAbstractWebPart
{
    #region "Properties"
    public bool bDebug
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Debug"), false);
        }
    }
    public string[] sFiles
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Files"), "").ToLower().Split(new char[] { '|' });
        }

    }
    public string sRoot
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Root"), "").ToLower();
        }
    }
    public string sSource
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Source"), "").ToLower();
        }
    }
    public string sType
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Type"), "").ToLower();
        }
    }
    #endregion

    #region "Methods"
    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);
        
        if (!StopProcessing)
        {
            foreach (string sFile in sFiles)
            {
                string sResource = "/" + sRoot + "/" + sSource + "/" + sFile;

                if (PortalContext.ViewMode == ViewModeEnum.Design)
                {
                    ltlIncludeDebug.Text += sResource + "<br>";
                }

                sResource = "~/pages/GetResource.aspx?" + sType + "=" + Uri.EscapeDataString(CryptoUtil.Encrypt("~" + sResource));
                
                if (bDebug)
                    sResource += "&dbg=1IM";

                if (sType == "css")
                {
                    Page.Header.Controls.Add(new LiteralControl("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + sResource + "\"/>\r\n"));
                }
                else if (sType == "js")
                {
                    if (PortalContext.ViewMode != ViewModeEnum.Design)
                    {
                        ScriptHelper.RegisterStartupScript(Page, typeof(string), ClientID + Stopwatch.GetTimestamp(), "<script type=\"text/javascript\" src=\"" + sResource + "\"></script>\r\n");
                    }
                }
            }
        }
    }

    #endregion
}