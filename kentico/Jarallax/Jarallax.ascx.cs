using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;

using CMS.DocumentEngine.Web.UI;
using CMS.Base.Web.UI;
using CMS.FormEngine.Web.UI;
using CMS.Base;
using CMS.Base.Web.UI;
using CMS.Helpers;
using CMS.MacroEngine;
using CMS.PortalEngine.Web.UI;
using CMS.PortalEngine;
using CMS.DocumentEngine;


public partial class Jarallax : CMSAbstractLayoutWebPart
{
    #region "Public properties"

    
    /// <summary>
    /// Use Jarallax
    /// </summary>
    public bool UseJarallax
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("UseJarallax"), false);
        }
        set
        {
            SetValue("UseJarallax", value);
        }
    }


    /// <summary>
    /// Jarallax Speed (default is 0.2)
    /// </summary>
    public string JarallaxSpeed
    {
        get
        {
            return ValidationHelper.GetString(GetValue("JarallaxSpeed"), "");
        }
        set
        {
            SetValue("JarallaxSpeed", value);
        }
    }
    

    /// <summary>
    /// Height
    /// </summary>
    public string Height
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Height"), "");
        }
        set
        {
            SetValue("Height", value);
        }
    }


    /// <summary>
    /// Gets the inner content on the image
    /// </summary>
    public string InnerContent
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("InnerContent"), "");
        }
        set
        {
            this.SetValue("InnerContent", value);
        }
    }

    
    /// <summary>
    /// URL
    /// </summary>
    public string URL
    {
        get
        {
            return ValidationHelper.GetString(GetValue("URL"), "");
        }
        set
        {
            SetValue("URL", value);
        }
    }

        
    /// <summary>
    /// URL Target
    /// </summary>
    public string Target
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Target"), "");
        }
        set
        {
            SetValue("Target", value);
        }
    }

    /// <summary>
    /// Background Image
    /// </summary>
    public string BackgroundImage
    {
        get
        {
            return ValidationHelper.GetString(GetValue("BackgroundImage"), "");
        }
        set
        {
            SetValue("BackgroundImage", value);
        }
    }

    /// <summary>
    /// Background Color
    /// </summary>
    public string BackgroundColor
    {
        get
        {
            return ValidationHelper.GetString(GetValue("BackgroundColor"), "");
        }
        set
        {
            SetValue("BackgroundColor", value);
        }
    }

    /// <summary>
    /// Background Position
    /// </summary>
    public string BackgroundPosition
    {
        get
        {
            return ValidationHelper.GetString(GetValue("BackgroundPosition"), "");
        }
        set
        {
            SetValue("BackgroundPosition", value);
        }
    }


    /// <summary>
    /// Background Size
    /// </summary>
    public string BackgroundSize
    {
        get
        {
            return ValidationHelper.GetString(GetValue("BackgroundSize"), "");
        }
        set
        {
            SetValue("BackgroundSize", value);
        }
    }


    /// <summary>
    /// Background Attachment
    /// </summary>
    public string BackgroundAttachment
    {
        get
        {
            return ValidationHelper.GetString(GetValue("BackgroundAttachment"), "");
        }
        set
        {
            SetValue("BackgroundAttachment", value);
        }
    }


    /// <summary>
    /// Background Repeat
    /// </summary>
    public string BackgroundRepeat
    {
        get
        {
            return ValidationHelper.GetString(GetValue("BackgroundRepeat"), "");
        }
        set
        {
            SetValue("BackgroundRepeat", value);
        }
    }


    /// <summary>
    /// Use Overlay (linear, radial gradient in rgba() format)
    /// </summary>
    public string Overlay
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Overlay"), "");
        }
        set
        {
            SetValue("Overlay", value);
        }
    }

    /// <summary>
    /// CSS Class
    /// </summary>
    public string CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("CSSClass"), "");
        }
        set
        {
            SetValue("CSSClass", value);
        }
    }

    /// <summary>
    /// CSS Inline Style
    /// </summary>
    public string CSSStyle
    {
        get
        {
            return ValidationHelper.GetString(GetValue("CSSStyle"), "");
        }
        set
        {
            SetValue("CSSStyle", value);
        }
    }


    #endregion


    #region "Methods"

    /// <summary>
    /// Prepares the layout of the web part.
    /// </summary>
    protected override void PrepareLayout()
    {
        StartLayout();

        if (!String.IsNullOrEmpty(URL) && PortalContext.ViewMode != ViewModeEnum.Edit)
        {
            Append("<a class=\"card-link\" href=\"",URL,"\" ");

            if (!String.IsNullOrEmpty(Target))
            {
                Append("Target=\"",Target,"\"");
            }

            Append(">");

        }   // end URL

        Append("<div id=\"", ShortClientID, "\" ");

        if (UseJarallax)
        {
            Append("class=\"jarallax position-relative d-print-none ", CSSClass,"\" ");

            if (!String.IsNullOrEmpty(JarallaxSpeed))
            {
                Append("data-speed=\"",JarallaxSpeed,"\" ");
            }
            
        }
        else
        {
            Append("class=\"", CSSClass,"\" ");
        }

        Append("style=\"");
        
        if (!String.IsNullOrEmpty(Height))
        {
            Append("height:", Height, ";");
        }

        if (!String.IsNullOrEmpty(CSSStyle))
        {
            Append(" ", CSSStyle);
        }

        if (!String.IsNullOrEmpty(BackgroundColor)) {
            Append("background-color:", BackgroundColor, ";");
        }                

        if (!String.IsNullOrEmpty(BackgroundImage) || !String.IsNullOrEmpty(Overlay))
        {
            Append("background-image:");
        }

        if (!String.IsNullOrEmpty(Overlay))
        {
            if (!UseJarallax)
            {
                Append("", Overlay, "");
            }
            else
            {

            }
        }
        
        if (!String.IsNullOrEmpty(BackgroundImage))
        {
            if (!String.IsNullOrEmpty(Overlay))
            {
                if (!UseJarallax)
                {
                    Append(", ");
                }
                else
                {

                }
            }

            if ( BackgroundImage.Contains(".webp") && CMS.DocumentEngine.DocumentContext.CurrentBodyClass.Contains("InternetExplorer") )
            {
                Append("url(", BackgroundImage.Replace(".webp", ".jpg"), ");");
            }
            else
            {
                Append("url(", BackgroundImage, ");");
            }

            if (!String.IsNullOrEmpty(BackgroundPosition))
            {
                Append("background-position:", BackgroundPosition, ";");
            }
            if (!String.IsNullOrEmpty(BackgroundRepeat))
            {
                Append("background-repeat:", BackgroundRepeat, ";");
            }
            if (!String.IsNullOrEmpty(BackgroundSize))
            {
                Append("background-size:", BackgroundSize, ";");
            }
            if (!String.IsNullOrEmpty(BackgroundAttachment))
            {
                Append("background-attachment:", BackgroundAttachment, ";");
            }
        }

        Append("\">");

        if (!String.IsNullOrEmpty(InnerContent))
            {
                Append("", InnerContent ,"");
            }

        Append("</div>");

        if (!String.IsNullOrEmpty(URL) && PortalContext.ViewMode != ViewModeEnum.Edit)
        {
            Append("</a>");
        }

         if (!String.IsNullOrEmpty(BackgroundImage))
        {
            if (!String.IsNullOrEmpty(Overlay))
            {
                if (UseJarallax)
                {
                    Append("<style type=\"text/css\">[id*=jarallax-container]:after {background-image: ", Overlay,"; content: \"\"; display: block; position: absolute; z-index: 1; width: 100%; height: 100%; top: 0; lefT: 0;}</style>");
                    Append("<style type=\"text/css\">.jarallax {position: relative;z-index: 0;min-height: 20vh;background-size: cover !important;background-repeat: no-repeat !important;} .jarallax>.jarallax-img {position: absolute;-o-object-fit: cover;object-fit: cover;font-family: 'object-fit: cover;';top: 0;left: 0;width: 100%;height: 100%;z-index: -1;}</style>");
                }
            }
        }
        if (PortalContext.ViewMode != ViewModeEnum.Design)
{
    ScriptHelper.RegisterStartupScript(Page, typeof(string),ShortClientID, "<script type=\"text/javascript\" src=\"~/pages/GetResource.ashx?js=/1IMv2/core/js/jarallax.min-1.10.7.js\"></script>\r\n");
}

        if (UseJarallax)
        {
            ScriptHelper.RegisterStartupScript(Page, typeof(string), "StartUpScript", "$(\".jarallax\").jarallax({ speed: 0.5 });", true);
        }

        FinishLayout();
        
    }
    #endregion



}