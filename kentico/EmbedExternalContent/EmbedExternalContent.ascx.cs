using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;

using CMS.DocumentEngine.Web.UI;
using CMS.Base.Web.UI;
using CMS.FormEngine.Web.UI;
using CMS.Base;
using CMS.Base.Web.UI;
using CMS.Core;
using CMS.DataProtection;
using CMS.Helpers;
using CMS.MacroEngine;
using CMS.PortalEngine.Web.UI;
using CMS.PortalEngine;
using CMS.DocumentEngine;
using CMS.Localization;


public partial class EmbedExternalContent : CMSAbstractLayoutWebPart
{    
    private readonly ICurrentCookieLevelProvider cookieLevelProvider = Service.Resolve<ICurrentCookieLevelProvider>();

    #region "Public properties"

    
    /// <summary>
    /// Responsive
    /// </summary>
    public bool Responsive
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Responsive"), true);
        }
        set
        {
            SetValue("Responsive", value);
        }
    }


    /// <summary>
    /// Video URL
    /// </summary>
    public string VideoURL
    {
        get
        {
            return ValidationHelper.GetString(GetValue("VideoURL"), "");
        }
        set
        {
            SetValue("VideoURL", value);
        }
    }

    /// <summary>
    /// Width
    /// </summary>
    public string Width
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Width"), "");
        }
        set
        {
            SetValue("Width", value);
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
    /// Aspect Ratio
    /// </summary>
    public string AspectRatio
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("AspectRatio"), "");
        }
        set
        {
            this.SetValue("AspectRatio", value);
        }
    }

        
    /// <summary>
    /// Embed Code
    /// </summary>
    public string EmbedCode
    {
        get
        {
            return ValidationHelper.GetString(GetValue("EmbedCode"), "");
        }
        set
        {
            SetValue("EmbedCode", value);
        }
    }

    /// <summary>
    /// Additional Embed Tags (ReferrerPolicy, Sandbox, etc)
    /// </summary>
    public string EmbedTags
    {
        get
        {
            return ValidationHelper.GetString(GetValue("EmbedTags"), "");
        }
        set
        {
            SetValue("EmbedTags", value);
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
    /// LazyLoad
    /// </summary>
    public bool LazyLoad
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("LazyLoad"), false);
        }
        set
        {
            SetValue("LazyLoad", value);
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

        // if (Cookies["CMSCookieLevel"]>="1000")

        int currentCookieLevel = GetCurrentCookieLevel();

        if (currentCookieLevel >= 1000)
        {

            if (!String.IsNullOrEmpty(EmbedCode))
            {            
                Append(EmbedCode);
            }

            else 
            {

                if (Responsive)
                {

                    //Append("<div class=\"embed-responsive\"><iframe class=\"embed-responsive-item ");

                    Append("<div class=\"embed-responsive ");

                    switch (AspectRatio)
                    {
                        
                        case "21by9":
                        Append("embed-responsive-21by9\">");
                        break;

                        case "4by3":
                        Append("embed-responsive-4by3\">");
                        break;

                        case "1by1":
                        Append("embed-responsive-1by1\">");
                        break;

                        default:
                        Append("embed-responsive-16by9\">");
                        break;

                    }

                    Append("<iframe class=\"embed-responsive-item ");

                    if (!String.IsNullOrEmpty(VideoURL))
                    {
                        if (LazyLoad)
                        {

                            Append("lazyload ");

                            if (!String.IsNullOrEmpty(CSSClass))
                            {
                                Append("", CSSClass,"\"");
                            }
                            else
                            {
                                Append("\"");
                            }
                            if (VideoURL.Contains("youtube"))
                            {
                                Append(" data-src=\"",VideoURL.Trim(),"?hl=",CMS.Localization.LocalizationContext.CurrentCulture.CultureCode,"&modestbranding=1&rel=0\"");
                            }
                            else
                            {
                                Append(" data-src=\"",VideoURL.Trim(),"?dnt=1&autoplay=0&byline=0&color=2f75bb&title=0\"");
                            }
                            //Append(" data-src=\"",VideoURL.Trim(),"\" ");
                        }
                        else
                        {
                            if (!String.IsNullOrEmpty(CSSClass))
                            {
                                Append(" ", CSSClass,"\"");
                            }
                            else
                            {
                                Append("\"");
                            }
                            if (VideoURL.Contains("youtube"))
                            {
                                Append(" src=\"",VideoURL.Trim(),"?hl=",CMS.Localization.LocalizationContext.CurrentCulture.CultureCode,"&modestbranding=1&rel=0\"");
                            }
                            else
                            {
                                Append(" src=\"",VideoURL.Trim(),"?dnt=1&autoplay=0&byline=0&color=2f75bb&title=0\"");
                            }
                            //Append(" src=\"",VideoURL.Trim(),"\" ");
                        }
                        
                    }

                    if (!String.IsNullOrEmpty(EmbedTags))
                    {
                        Append(" ",EmbedTags," ");
                    }

                    Append("frameborder=\"0\" allow=\"accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen\" allowfullscreen></iframe></div>");
                    
                }

                else
                {
                    Append("<iframe ");
                    if (LazyLoad)
                    {
                        Append("data-src=\"",VideoURL,"\" " );
                        if (!String.IsNullOrEmpty(CSSClass))
                        {
                            Append(" class=\"lazyload ", CSSClass,"\" ");
                        }
                        else
                        {
                            Append(" class=\"lazyload ");
                        }
                    }
                    else
                    {
                        Append("src=\"",VideoURL,"\" " );
                        if (!String.IsNullOrEmpty(CSSClass))
                        {
                            Append(" class=\"", CSSClass,"\" ");
                        }
                    }

                    if (!String.IsNullOrEmpty(Width))
                    {
                        Append("width=\"",Width,"\" ");
                    }

                    if (!String.IsNullOrEmpty(Height))
                    {
                        Append("height=\"",Height,"\" ");
                    }

                    if (!String.IsNullOrEmpty(CSSClass))
                    {
                        Append(" class=\"", CSSClass,"\" ");
                    }

                    if (!String.IsNullOrEmpty(EmbedTags))
                    {
                        Append(EmbedTags," ");
                    }

                    Append("frameborder=\"0\" allow=\"accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen\" allowfullscreen></iframe>");
                }

            }
        } // End Cookie check

        FinishLayout();
        
}
    private int GetCurrentCookieLevel()
    {
        return cookieLevelProvider.GetCurrentCookieLevel();
    }

    #endregion

}