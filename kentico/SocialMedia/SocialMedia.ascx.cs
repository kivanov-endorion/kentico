using System;

using CMS.Helpers;
using CMS.PortalEngine;
using CMS.PortalEngine.Web.UI;

public partial class SocialMedia : CMSAbstractWebPart
{
    #region "Public properties"

    /// <summary>
    /// Facebook user name.
    /// </summary>
    public string Facebook
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Facebook"), "");
        }
        set
        {
            SetValue("Facebook", value);
        }
    }

    /// <summary>
    /// Twitter handle.
    /// </summary>
    public string Twitter
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Twitter"), "");
        }
        set
        {
            SetValue("Twitter", value);
        }
    }

    /// <summary>
    /// LinkedIn user name.
    /// </summary>
    public string LinkedIn
    {
        get
        {
            return ValidationHelper.GetString(GetValue("LinkedIn"), "");
        }
        set
        {
            SetValue("LinkedIn", value);
        }
    }

    /// <summary>
    /// Instagram user name.
    /// </summary>
    public string Instagram
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Instagram"), "");
        }
        set
        {
            SetValue("Instagram", value);
        }
    }

    /// <summary>
    /// YouTube type.
    /// </summary>
    public string YouTubeType
    {
        get
        {
            return ValidationHelper.GetString(GetValue("YouTubeType"), "user");
        }
        set
        {
            SetValue("YouTubeType", value);
        }
    }

    /// <summary>
    /// YouTube user name.
    /// </summary>
    public string YouTube
    {
        get
        {
            return ValidationHelper.GetString(GetValue("YouTube"), "");
        }
        set
        {
            SetValue("YouTube", value);
        }
    }

    /// <summary>
    /// Xing channel name.
    /// </summary>
    public string Xing
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Xing"), "");
        }
        set
        {
            SetValue("Xing", value);
        }
    }

    /// <summary>
    /// Other.
    /// </summary>
    public string Other
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Other"), "");
        }
        set
        {
            SetValue("Other", value);
        }
    }

    #endregion

    #region "Methods"

    /// <summary>
    /// Page load.
    /// </summary>
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!StopProcessing)
        {
            SetupControl();
        }
    }


    /// <summary>
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        // If Content Slider is in design mode do not start scripts (IE z-index problem)
        if (PortalContext.ViewMode != ViewModeEnum.Design)
        {
            string localizedString = ResHelper.GetString("1IM.FollowUsOn");
            ltlSocialMedia.Text += "<aside class=\"social-container row no-gutters\">";

            if (Facebook != "")
            {
                ltlSocialMedia.Text += "<a class=\"col fb\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.facebook.com/" + Facebook + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " Facebook\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-facebook-f\">&nbsp;</i><span class=\"sr-only\">Facebook</span>";
                ltlSocialMedia.Text += "</a >";
            }
            if (Twitter != "")
            {
                ltlSocialMedia.Text += "<a class=\"col tw\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.twitter.com/" + Twitter + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " Twitter\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-twitter\">&nbsp;</i><span class=\"sr-only\">Twitter</span>";
                ltlSocialMedia.Text += "</a >";
            }
            if (LinkedIn != "")
            {
                ltlSocialMedia.Text += "<a class=\"col ln\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.linkedin.com/company/" + LinkedIn + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " LinkedIn\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-linkedin-in\">&nbsp;</i><span class=\"sr-only\">LinkedIn</span>";
                ltlSocialMedia.Text += "</a >";
            }
            if (Instagram != "")
            {
                ltlSocialMedia.Text += "<a class=\"col instagram\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.instagram.com/" + Instagram + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " Instagram\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-instagram\">&nbsp;</i><span class=\"sr-only\">Instagram</span>";
                ltlSocialMedia.Text += "</a >";
            }
            if (YouTube != "")
            {
                ltlSocialMedia.Text += "<a class=\"col yt\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.youtube.com/" + YouTubeType + "/"+ YouTube + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " YouTube\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-youtube\">&nbsp;</i><span class=\"sr-only\">YouTube</span>";
                ltlSocialMedia.Text += "</a >";
            }
            if (Xing != "")
            {
                ltlSocialMedia.Text += "<a class=\"col xi\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.xing.com/companies/" + Xing + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " Xing\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-xing\">&nbsp;</i><span class=\"sr-only\">Xing</span>";
                ltlSocialMedia.Text += "</a >";
            }
            if (Other != "")
            {
                ltlSocialMedia.Text += "<a class=\"col ot\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"" + Other + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + "\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fas fa-share\">&nbsp;</i><span class=\"sr-only\">Other</span>";
                ltlSocialMedia.Text += "</a >";
            }

            ltlSocialMedia.Text += "</aside>";

        }
    }

    #endregion
}



