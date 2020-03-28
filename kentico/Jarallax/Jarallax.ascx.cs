using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;
using System.Xml;

using CMS.FormEngine.Web;
using CMS.Base.Web.UI;
using CMS.Helpers;
using CMS.PortalEngine.Web.UI;
using CMS.PortalEngine;
using CMS.Base;
using CMS.DocumentEngine;

public partial class JarallaxImage : CMSAbstractEditableWebPart, IDialogControl
{
    #region "Public properties"

    /// <summary>
    /// Configuration of the dialog for inserting Images.
    /// </summary>
    public DialogConfiguration DialogConfig
    {
        get
        {
            return ucEditableImage.DialogConfig;
        }
        set
        {
            ucEditableImage.DialogConfig = value;
        }
    }


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
    public bool Overlay
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("UseOverlay"), false);
        }
        set
        {
            SetValue("UseOverlay", value);
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
        this.Visible = true;

        // Do not hide for roles in edit or preview mode
        switch (ViewMode)
        {
            case ViewModeEnum.Edit:
            case ViewModeEnum.EditLive:
            case ViewModeEnum.EditDisabled:
            case ViewModeEnum.Design:
            case ViewModeEnum.DesignDisabled:
            case ViewModeEnum.EditNotCurrent:
            case ViewModeEnum.Preview:
                DisplayToRoles = "";
                break;
        }

        ucEditableImage.StopProcessing = StopProcessing;

        if (!StopProcessing)
        {
            ucEditableImage.ContentID = this.WebPartID;
            ucEditableImage.DataControl = this as ISimpleDataContainer;
            ucEditableImage.PageManager = PageManager;
            ucEditableImage.PagePlaceholder = PagePlaceholder;
            ucEditableImage.SetupControl();
        }
    }


    /// <summary>
    /// Overridden CreateChildControls method.
    /// </summary>
    protected override void CreateChildControls()
    {
        SetupControl();
        base.CreateChildControls();
    }


    /// <summary>
    /// Loads the control content.
    /// </summary>
    /// <param name="content">Content to load</param>
    /// <param name="forceReload">If true, the content is forced to reload</param>
    public override void LoadContent(string content, bool forceReload)
    {
        if (!StopProcessing)
        {
            ucEditableImage.LoadContent(content, forceReload);

            if (!string.IsNullOrEmpty(ucEditableImage.DefaultImage))
            {
                // Default image defined => content is not empty
                EmptyContent = false;
            }

            
            if (URL != "")
                {
                    Append("<a href=\"",URL,"\" ");

                    if (Target != "")
                    {
                        Append("Target=\"",Target,"\">");
                    }

                }   // end URL

                Append("<div id=\"", ucEditableImage.ContentID, "\" ");

                if (UseJarallax)
                {
                    Append("class=\"jarallax position-relative d-print-none\" ");

                    if (JarallaxSpeed)
                    {
                        Append("data-speed=\"",JarallaxSpeed,"\" ");
                    }
                    
                }

                Append("style=\"");


                if (BackgroundColor != "") {
                    Append("background-color:", BackgroundColor, ";");
                }                

                if (BackgroundPosition != "")
                {
                    Append("background-position:", BackgroundPosition, ";");
                }
                if (BackgroundRepeat != "")
                {
                    Append("background-repeat:", BackgroundRepeat, ";");
                }
                if (BackgroundSize != "")
                {
                    Append("background-size:", BackgroundSize, ";");
                }
                if (BackgroundAttachment != "")
                {
                    Append("background-attachment:", BackgroundAttachment, ";");
                }
                if (Height != "")
                {
                    Append("background-height:", Height, ";");
                }

                // HOW TO GET THE EDITABLE IMAGE?????
                // Append("background-image:url(", ucEditableImage, ");");
                
                Append("background-image:");

                if (Overlay != "")
                {
                    Append("",Overlay,",");
                }

                Append("url(", ucEditableImage.GetContent(), ");");




            Append("\">");

            if (URL != "")
            {
                Append("</a>");
            }
            
        }
    }


    /// <summary>
    /// Gets the current control content.
    /// </summary>
    public override string GetContent()
    {
        if (!StopProcessing)
        {
            EnsureChildControls();

            return ucEditableImage.GetContent();
        }
        return null;
    }


    /// <summary>
    /// Reloads the control data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();
        SetupControl();
    }


    /// <summary>
    /// OnPreRender event
    /// </summary>
    protected override void OnPreRender(EventArgs e)
    {
        if (!ViewMode.IsEditLive())
        {
            // Use the control visibility
            this.Visible = ucEditableImage.Visible;
        }

        base.OnPreRender(e);
    }

    #endregion
}