using System;
using System.Diagnostics;
using System.Web.UI;

using CMS.Helpers;
using CMS.PortalEngine.Web.UI;
using CMS.PortalEngine;

using IMTools;
using CMS.Base.Web.UI;

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
    public string sParameter
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Parameter"), "").ToLower();
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
                while (sResource.IndexOf("//") != -1)
                    sResource = sResource.Replace("//", "/");

                if (PortalContext.ViewMode == ViewModeEnum.Design)
                {
                    ltlIncludeDebug.Text += sResource + "<br>";
                }

                string sType = "";
                if (sFile.ToLower().EndsWith(".css"))
                    sType = "css";
                else if (sFile.ToLower().EndsWith(".js"))
                    sType = "js";

                sResource = "~/pages/GetResource.ashx?" + sType + "=" + Uri.EscapeDataString(CryptoUtil.Encrypt("~" + sResource));

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
                        ScriptHelper.RegisterStartupScript(Page, typeof(string), ClientID + Stopwatch.GetTimestamp(), "<script " + (string.IsNullOrEmpty(sParameter) ? "" : sParameter + "=\"" + sParameter + "\"") + " type=\"text/javascript\" src=\"" + sResource + "\"></script>\r\n");
                    }
                }
            }
        }
    }

    #endregion
}