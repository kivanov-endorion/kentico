using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.PortalControls;
using CMS.PortalEngine;
using CMS.Base;

public partial class SocialMedia : CMSAbstractWebPart
{
    #region "Public properties"

    /// <summary>
    /// Number of tabs.
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
    /// Number of tabs.
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
    /// Number of tabs.
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
    /// Number of tabs.
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
    /// Number of tabs.
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
    /// Number of tabs.
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
    /// Number of tabs.
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
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-facebook-f\">&nbsp;</i>";
                ltlSocialMedia.Text += "</a >";
            }
            if (Twitter != "")
            {
                ltlSocialMedia.Text += "<a class=\"col tw\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.twitter.com/" + Twitter + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " Twitter\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-twitter\">&nbsp;</i>";
                ltlSocialMedia.Text += "</a >";
            }
            if (LinkedIn != "")
            {
                ltlSocialMedia.Text += "<a class=\"col ln\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.linkedin.com/company/" + LinkedIn + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " LinkedIn\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-linkedin-in\">&nbsp;</i>";
                ltlSocialMedia.Text += "</a >";
            }
            if (Instagram != "")
            {
                ltlSocialMedia.Text += "<a class=\"col instagram\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.instagram.com/" + Instagram + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " Instagram\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-instagram\">&nbsp;</i>";
                ltlSocialMedia.Text += "</a >";
            }
            if (YouTube != "")
            {
                ltlSocialMedia.Text += "<a class=\"col yt\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.youtube.com/user/" + YouTube + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " YouTube\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-youtube\">&nbsp;</i>";
                ltlSocialMedia.Text += "</a >";
            }
            if (Xing != "")
            {
                ltlSocialMedia.Text += "<a class=\"col xi\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"//www.xing.com/companies/" + Xing + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + " Xing\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fab fa-xing\">&nbsp;</i>";
                ltlSocialMedia.Text += "</a >";
            }
            if (Other != "")
            {
                ltlSocialMedia.Text += "<a class=\"col ot\" data-placement=\"top\" data-toggle=\"tooltip\" href=\"" + Other + "\" target=\"_blank\" rel=\"noopener\" title=\"" + localizedString + "\">";
                ltlSocialMedia.Text += "<i aria-hidden=\"true\" class=\"fas fa-share\">&nbsp;</i>";
                ltlSocialMedia.Text += "</a >";
            }

            ltlSocialMedia.Text += "</aside>";

        }
    }

    #endregion
}


