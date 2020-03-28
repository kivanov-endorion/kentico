using System.Text;
using System.Web;
using CMS.DocumentEngine;
using CMS.Helpers;
using CMS.PortalControls;

public partial class VimeoVideo : CMSAbstractWebPart
{
    #region "Video properties"
    /*
    /// <summary>
    /// Gets or sets the value that indicates whether the vide is automatically activated.
    /// </summary>
    public bool AutoActivation
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("AutoActivation"), false);
        }
        set
        {
            SetValue("AutoActivation", value);
        }
    }
    */

    /// <summary>
    /// Gets or sets the URL of video to be displayed.
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
    /// Gets or sets the width of video.
    /// </summary>
    public int Width
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("Width"), 400);
        }
        set
        {
            SetValue("Width", value);
        }
    }


    /// <summary>
    /// Gets or sets the height of video.
    /// </summary>
    public int Height
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("Height"), 300);
        }
        set
        {
            SetValue("Height", value);
        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether video is automatically started.
    /// </summary>
    public bool Autostart
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Autostart"), false);
        }
        set
        {
            SetValue("Autostart", value);
        }
    }

    /// <summary>
    /// Gets or sets the value that indicates whether video is automatically started.
    /// </summary>
    public bool Autopause
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Autopause"), false);
        }
        set
        {
            SetValue("Autopause", value);
        }
    }



    /// <summary>
    /// Gets or sets the value that indicates whether video controller is displayed.
    /// </summary>
    public bool ShowControls
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("ShowControls"), true);
        }
        set
        {
            SetValue("ShowControls", value);
        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether author is displayed.
    /// </summary>
    public bool Author
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Author"), false);
        }
        set
        {
            SetValue("Author", value);
        }
    }

    /// <summary>
    /// Gets or sets the value that indicates whether title is displayed.
    /// </summary>
    public bool Title
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Title"), false);
        }
        set
        {
            SetValue("Title", value);
        }
    }

    /// <summary>
    /// Gets or sets the value that indicates whether protrait link is displayed.
    /// </summary>
    public bool Portrait
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Portrait"), false);
        }
        set
        {
            SetValue("Portrait", value);
        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether video after the end is automatically started again.
    /// </summary>
    public bool Loop
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Loop"), false);
        }
        set
        {
            SetValue("Loop", value);
        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether video after the end is automatically started again.
    /// </summary>
    public bool Responsive
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Responsive"), false);
        }
        set
        {
            SetValue("Responsive", value);
        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether video after the end is automatically started again.
    /// </summary>
    public string AspectRatio
    {
        get
        {
            return ValidationHelper.GetString(GetValue("AspectRatio"), "16by9");
        }
        set
        {
            SetValue("AspectRatio", value);
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
    /// Reloads data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();
        SetupControl();
    }


    /// <summary>
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        if (StopProcessing)
        {
            // Do nothing
        }
        else
        {
            //FF hack (must be 1 or 0 not true or false)
            int showControls = (ShowControls) ? 1 : 0;
            int autoStart = (Autostart) ? 1 : 0;
            int autoPause = (Autopause) ? 1 : 0;
            int loop = (Loop) ? 1 : 0;
            int author = (Author) ? 1 : 0;
            int title = (Title) ? 1 : 0;
            int portrait = (Portrait) ? 1 : 0;
               
            string ContainerClass = "";
            string IFrameClass = "";
            if (Responsive)
            {
                ContainerClass = "embed-responsive embed-responsive-" + AspectRatio;
                IFrameClass = "embed-responsive-item";
            }
            
            StringBuilder builder = new StringBuilder(512);

            builder.Append("<div class=\"", ContainerClass ,"\">");
            builder.Append("<iframe id=\"", ClientID, "\" width=\"", Width, "\" height=\"", Height , "\" class=\"", IFrameClass ,"\"");
               
            builder.Append(" src=\"https://player.vimeo.com/video/", VideoURL, "?title=", title,"&amp;byline=", author,"&amp;portrait=", portrait,"&amp;autoplay=", autoStart,"&amp;loop=", loop,"&amp;autopause=", autoPause,"\"");
                
            builder.Append(" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen>");
            builder.Append("</iframe>");
            builder.Append("</div>");

            ltlPlaceholder.Text = builder.ToString();
          
        }
    }

/*
    /// <summary>
    /// Creates a script block which loads a video at runtime.
    /// </summary>
    /// <param name="showControls">1 if ShowControls is true, otherwise 0</param>
    /// <param name="autoStart">1 if AutoStart is true, otherwise 0</param>
    /// <param name="loop">1 if Loop is true, otherwise 0</param>
    /// <returns>Script block that will load a video</returns>
    private string BuildScriptBlock(int showControls, int autoStart, int loop)
    {
        string scriptBlock = string.Format("LoadVideo('VideoPlaceholder_{0}', '{1}', {2}, {3}, '{4}', '{5}', '{6}', {7});",
                                           ltlScript.ClientID,
                                           HTMLHelper.HTMLEncode(URLHelper.ResolveUrl(VideoURL)),
                                           Width,
                                           Height,
                                           showControls,
                                           autoStart,
                                           loop,
                                           ScriptHelper.GetString(GetString("Media.NotSupported")));

        return ScriptHelper.GetScript(scriptBlock);
    }
*/
    #endregion
}