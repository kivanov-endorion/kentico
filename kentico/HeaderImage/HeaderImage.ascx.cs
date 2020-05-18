using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;

using CMS.DocumentEngine.Web.UI;
using CMS.Base.Web.UI;
using CMS.FormEngine.Web.UI;
using CMS.Base;
using CMS.Helpers;
using CMS.MacroEngine;
using CMS.PortalEngine.Web.UI;
using CMS.PortalEngine;
using CMS.DocumentEngine;


public partial class HeaderImage : CMSAbstractLayoutWebPart
{
    #region "Public properties"
    
    

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
    /// DesktopHeight
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
    /// Use Opacity to darken background
    /// </summary>
    public string Opacity
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Opacity"), "");
        }
        set
        {
            SetValue("Opacity", value);
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

    /// <summary>
    /// Mobile Background Image
    /// </summary>
    public string MobileBackgroundImage
    {
        get
        {
            return ValidationHelper.GetString(GetValue("MobileBackgroundImage"), "");
        }
        set
        {
            SetValue("MobileBackgroundImage", value);
        }
    }

    /// <summary>
    /// MobileHeight
    /// </summary>
    public string MobileHeight
    {
        get
        {
            return ValidationHelper.GetString(GetValue("MobileHeight"), "");
        }
        set
        {
            SetValue("MobileHeight", value);
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

        

        Append("<div id=\"hero", ShortClientID, "\" ");

        Append("class=\"", CSSClass,"\">");

        if (!String.IsNullOrEmpty(URL) && PortalContext.ViewMode != ViewModeEnum.Edit)
        {
            Append("<a class=\"card-link stretched-link\" href=\"",URL,"\" ");

            if (!String.IsNullOrEmpty(Target))
            {
                Append("target=\"",Target,"\"");
            }

            Append(">");

        }   // end URL

        if (!String.IsNullOrEmpty(InnerContent))
        {
            Append("<div class=\"hero-content\">");

            Append("", InnerContent ,"");

            

            Append("</div>");
        }

        if (!String.IsNullOrEmpty(URL) && PortalContext.ViewMode != ViewModeEnum.Edit)
        {
            Append("</a>");
        }

        Append("<a id=\"chevron\" aria-label=\"Scroll down\" data-scroll href=\"#after-hero\"><i class=\"fas fa-chevron-down fa-3x\"></i></a>");

        Append("</div>");

        

        Append("<div id=\"after-hero\"></div>");


        String cssinline = "";

        cssinline += "<style type=\"text/css\">";

        cssinline += "#hero" + ShortClientID + " {";

        cssinline += "position:relative;";

        if (!String.IsNullOrEmpty(CSSStyle))
        {
            cssinline += " " + CSSStyle;
        }

        if (!String.IsNullOrEmpty(BackgroundColor)) 
        {
            cssinline += "background-color:" + BackgroundColor + ";";
        }    
        if (!String.IsNullOrEmpty(BackgroundImage)) 
        {
            cssinline += "background-image:url(" + BackgroundImage + ");";
        }
        if (!String.IsNullOrEmpty(BackgroundPosition))
        {
            cssinline += "background-position:" + BackgroundPosition + ";";
        }
        if (!String.IsNullOrEmpty(BackgroundRepeat))
        {
            cssinline += "background-repeat:" + BackgroundRepeat + ";";
        }
        if (!String.IsNullOrEmpty(BackgroundAttachment))
        {
            cssinline += "background-attachment:" + BackgroundAttachment + ";";
        }
        if (!String.IsNullOrEmpty(Height))
        {
            cssinline += "height:" + Height + ";";
            cssinline += "background-size:" + BackgroundSize + ";";
        }
        else
        {
            if (!String.IsNullOrEmpty(BackgroundSize))
            {
                cssinline += "background-size:" + BackgroundSize + ";";
            }
            else
            {
                cssinline += "background-size:100%;";
            }
            cssinline += "padding-top:28.64%;";
        }

        cssinline += "}";

        if (!String.IsNullOrEmpty(Opacity))
        {
            cssinline += "#hero" + ShortClientID + "::before {content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:" + Opacity + ";}";
        }

        if (!String.IsNullOrEmpty(MobileBackgroundImage)) 
        {
            cssinline += "@media (max-width: 768px) {";

            cssinline += "#hero" + ShortClientID + " {";

            cssinline += "background-image:url(" + MobileBackgroundImage + ");";

            if (!String.IsNullOrEmpty(MobileHeight))
            {
                cssinline += "height:calc(" + MobileHeight + " - 3.3rem);";

                cssinline += "background-size:cover;padding-top:0px;";
            }
            else
            {
                cssinline += "background-size:100%;padding-top:100vh;";
            }

            cssinline += "}";
            cssinline += "}";
        }

        cssinline += "</style>";

        Page.Header.Controls.Add(new LiteralControl(cssinline));

        FinishLayout();
        
    }
    #endregion



}