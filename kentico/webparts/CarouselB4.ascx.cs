using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

//using AjaxControlToolkit;

using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.PortalControls;
using CMS.PortalEngine;
using CMS.Base;

public partial class CarouselB4 : CMSAbstractLayoutWebPart
{
    #region "Variables"

   // private TabContainer tabs = null;

    #endregion


    #region "Public properties"

    /// <summary>
    /// Number of tabs.
    /// </summary>
    public int Tabs
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("Tabs"), 2);
        }
        set
        {
            SetValue("Tabs", value);
        }
    }


    /// <summary>
    /// Tab headers.
    /// </summary>
    public string TabHeaders
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TabHeaders"), "");
        }
        set
        {
            SetValue("TabHeaders", value);
        }
    }


    /// <summary>
    /// Active tab index.
    /// </summary>
    public int ActiveTabIndex
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("ActiveTabIndex"), 0);
        }
        set
        {
            SetValue("ActiveTabIndex", value);
        }
    }

    /// <summary>
    /// Controls.
    /// </summary>
    public string Controls
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Controls"), "controls");
        }
        set
        {
            SetValue("Controls", value);
        }
    }


    /// <summary>
    /// Controls.
    /// </summary>
    public string Speed
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Speed"), "0");
        }
        set
        {
            SetValue("Speed", value);
        }
    }

    /// <summary>
    /// Pause.
    /// </summary>
    public bool Pause
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Pause"), false);
        }
        set
        {
            SetValue("Pause", value);
        }
    }

    /// <summary>
    /// Wrap.
    /// </summary>
    public bool Wrap
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Wrap"), true);
        }
        set
        {
            SetValue("Wrap", value);
        }
    }

    /// <summary>
    /// Keyboard.
    /// </summary>
    public bool Keyboard
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Keyboard"), true);
        }
        set
        {
            SetValue("Keyboard", value);
        }
    }

 /// <summary>
    /// Fade.
    /// </summary>
    public bool Fade
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("Fade"), false);
        }
        set
        {
            SetValue("Fade", value);
        }
    }


    /// <summary>
    /// Tabs Design.
    /// </summary>
    public string TabsDesign
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TabsDesign"), "pills");
        }
        set
        {
            SetValue("TabsDesign", value);
        }
    }

    /// <summary>
    /// Hide empty tabs
    /// </summary>
    public bool HideEmptyTabs
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("HideEmptyTabs"), false);
        }
        set
        {
            SetValue("HideEmptyTabs", value);
        }
    }


    /// <summary>
    /// Hide if no tabs are visible
    /// </summary>
    public bool HideIfNoTabsVisible
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("HideIfNoTabsVisible"), true);
        }
        set
        {
            SetValue("HideIfNoTabsVisible", value);
        }
    }


    /// <summary>
    /// Tab strip placement.
    /// </summary>
    public string TabStripPlacement
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TabStripPlacement"), "top");
        }
        set
        {
            SetValue("TabStripPlacement", value);
        }
    }


    /// <summary>
    /// Tabs CSS class.
    /// </summary>
    public string TabsCSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TabsCSSClass"), "");
        }
        set
        {
            SetValue("TabsCSSClass", value);
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

        switch (Controls)
            {
                case "controls":
                    Append("<!-- BEGIN Carousel B4 --><div data-ride=\"carousel\"");
                    if (!IsDesign)
                    {
                        if (Fade)
                        {
                            Append(" class=\"carousel slide carousel-fade\"");
                        }
                        else
                        {
                            Append(" class=\"carousel slide\"");
                        }

                        Append(" data-interval=\"", Speed.ToString(), "\"");

                        if (Pause)
                        {
                            Append(" data-pause=\"hover\"");
                        }
                        else
                        {
                            Append(" data-pause=\"null\"");
                        }
                        
                        Append(" data-wrap=\"", Wrap.ToString().ToLower(), "\"");
                        Append(" data-keyboard=\"", Keyboard.ToString().ToLower(), "\"");

                        
                        Append(" id=\"", ShortClientID, "\">");
                    }
                    else
                    {
                        Append(" data-interval=\"0\"");
                        Append(" id=\"", ShortClientID, "_env\">");
                    }

                    break;
                case "tabs":
                    Append("<!-- BEGIN Tabs B4 -->");
                    break;

                case "accordion":
                    Append("<!-- BEGIN Accordion B4 --><div  class=\"accordion arrows\" id=\"", ShortClientID, "\">");
                    break;

            }



        if (IsDesign)
        {
            

            Append("<table class=\"LayoutTable\" cellspacing=\"0\" style=\"width: 100%;\">");

            switch (ViewMode)
            {
                case ViewModeEnum.Design:
                case ViewModeEnum.DesignDisabled:
                    {
                        Append("<tr><td class=\"LayoutHeader\" colspan=\"2\">");

                        // Add header container
                        AddHeaderContainer();

                        Append("</td></tr>");
                    }
                    break;
            }

            Append("<tr><td style=\"width: 100%;\">");
        }
        else
        {
            
        }

        // Create headers

        // Tab headers
        if (IsDesign)
        {
           //Append("<tr><td>");
        }
        else
        {
            switch (Controls)
            {
                case "controls":
                    Append("<ol class=\"carousel-indicators dropped\">");
                    break;
                case "tabs":
                    if (TabsDesign=="pills") {
                        Append("<ul class=\"nav nav-pills mb-5 nav-justified flex-md-row align-items-start\">");
                        break;
                    }
                    else {
                        if (TabsDesign=="icons") {
                            Append("<ul class=\"nav icon-pills nav-pills mb-5 nav-justified flex-md-row align-items-start\">");
                            break;
                        }
                        else
                        {
                            Append("<ul class=\"nav nav-tabs mb-5 nav-justified flex-md-row align-items-start\">");
                            break;
                        }
                    }
            }
           
        }
       

        string[] headers = TextHelper.EnsureLineEndings(TabHeaders, "\n").Split('\n');
        for (int i = 0; i < Tabs; i++)
        {
            // Prepare the header
            string header = null;
            if (headers.Length > i)
            {
                header = ResHelper.LocalizeString(headers[i]);
            }
            if (String.IsNullOrEmpty(header))
            {
                header = "Tab " + i;
            }
            
            string IsActive = "";
            
            if (!IsDesign)
            {
        
                switch (Controls)
                {
                    case "controls":
                        if (i == ActiveTabIndex)
                        {
                            IsActive = "active";
                        }
                        Append("<li class=\"", IsActive, "\" data-target=\"#", ShortClientID, "\" data-slide-to=\"", i, "\"></li>");
                        break;
                    case "tabs":
                        if (i == ActiveTabIndex)
                        {
                            IsActive = "active";
                        }
                        Append("<li class=\"nav-item text-truncate\"><a aria-controls=\"pill-",ShortClientID+i, "\" aria-selected=\"true\" class=\"nav-link ", IsActive, "\" data-scroll-ignore data-toggle=\"pill\" href=\"#pill-",ShortClientID+i, "\" id=\"pills-",ShortClientID+i, "-tab\" role=\"tab\">", header, "</a></li>");
                        break;

                    
                }
            }
            
        }     
        

        if (IsDesign)
        {
            //Append("</td></tr>");
        }
        else
        {
            switch (Controls)
            {
                case "controls":
                    Append("</ol>");
                    break;
                case "tabs":
                    Append("</ul>");
                    break;
                case "accordion":
                    Append("");
                    break;
            }
        }

        if (!IsDesign)
        {
            switch (Controls)
            {
                case "controls":
                    Append("<div class=\"carousel-inner\">");
                    break;
                case "tabs":
                    Append("<div class=\"tab-content\" id=\"pills-tabContent\">");
                    break;
                case "accordion":
                    Append("");
                    break;
            }
        }

        

        if (!IsDesign)
        {

            // Create Zones
            for (int i = 0; i < Tabs; i++)
            {
                string IsActive = "";
                switch (Controls)
                {
                    case "controls":
                        if (i == ActiveTabIndex)
                        {
                            IsActive = "active";
                        }
                        Append("<div class=\"carousel-item ",IsActive,"\">");
                        break;
                    case "tabs":
                        if (i == ActiveTabIndex)
                        {
                            IsActive = "active show";
                        }
                        Append("<div id=\"pill-",ShortClientID+i,"\" aria-labelledby=\"pills-",ShortClientID+i,"-tab\" class=\"tab-pane ",IsActive," fade text-left\" role=\"tabpanel\">");
                        break;

                    case "accordion":
                        // Prepare the header
                        string header = null;
                        if (headers.Length > i)
                        {
                            header = ResHelper.LocalizeString(headers[i]);
                        }
                        if (String.IsNullOrEmpty(header))
                        {
                            header = "Tab " + i;
                        }
                        if (i == ActiveTabIndex)
                        {
                            IsActive = "show";
                        }
                        
                        Append("<div class=\"card border-0\">");
                        Append("<div class=\"card-header my-1 p-2\" id=\"heading-",ShortClientID+i, "\"><h2 class=\"mb-0\"><button aria-controls=\"collapse-",ShortClientID+i, "\" class=\"btn btn-link w-100 text-left \" data-target=\"#collapse-",ShortClientID+i, "\" data-toggle=\"collapse\" type=\"button\">", header, "</button></h2></div>");
                        Append("<div aria-labelledby=\"heading-",ShortClientID+i,"\" class=\"collapse ",IsActive,"\" data-parent=\"#",ShortClientID,"\" id=\"collapse-",ShortClientID+i,"\"><div class=\"card-body\">");
                        break;
                }

                // Add the zone
                AddZone(ID + "_" + i, "[" + "TAB" + i + "]");
                switch (Controls)
                {
                    case "controls":
                        Append("</div>");
                        break;
                    case "tabs":
                        Append("</div>");
                        break;
                    case "accordion":
                        Append("</div></div></div>");
                        break;
                }
            }    
            
        }

        if (IsDesign)
        {

            // Create Zones
            for (int i = 0; i < Tabs; i++)
            {

                Append("<div>");
        
                // Add the zone
                AddZone(ID + "_" + i, "[" + "TAB" + i + "]");

                Append("</div>");
                
            }
        }

        if((!IsDesign) && (Controls=="controls"))
        {
            Append("<!-- Controls -->");
            Append("<a class=\"carousel-control-prev\" data-scroll-ignore href=\"#", ShortClientID, "\" data-target=\"#", ShortClientID, "\" role=\"button\" data-slide=\"prev\">");
            Append("<i class=\"fas fa-chevron-left text-primary fa-2x\" aria-hidden=\"true\">&nbsp;</i>");
            Append("<span class=\"sr-only\">Previous</span>");
            Append("</a>");
            Append("<a class=\"carousel-control-next\" data-scroll-ignore href=\"#", ShortClientID, "\" data-target=\"#", ShortClientID, "\"role=\"button\" data-slide=\"next\">");
            Append("<i class=\"fas fa-chevron-right text-primary fa-2x\" aria-hidden=\"true\">&nbsp;</i>");
            Append("<span class=\"sr-only\">Next</span>");
            Append("</a>");
        }

        if (IsDesign)
        {
            Append("</td>");
            Append("</tr>");
        }


        if (IsDesign)
        {
            // Footer
            if (AllowDesignMode)
            {
                Append("<tr><td class=\"LayoutFooter cms-bootstrap\" colspan=\"2\"><div class=\"LayoutFooterContent\">");

                Append("<div class=\"LayoutLeftActions\">");

                // Pane actions
                AppendAddAction(ResHelper.GetString("Layout.AddTab"), "Tabs");
                if (Tabs > 1)
                {
                    AppendRemoveAction(ResHelper.GetString("Layout.RemoveTab"), "Tabs");
                }

                Append("</div></div></td></tr>");
            }

            Append("</table>");
        }

        if (!IsDesign)
        {
           Append("</div>");
        }


        switch (Controls)
        {
            case "controls":
                Append("</div> <!-- END Carousel B4 -->");
                break;
            case "tabs":
                Append("<!-- END Tabs B4 -->");
                break;
            case "accordion":
                Append("<!-- END Accordion B4 -->");
                break;
        }


        FinishLayout();
    }


    #endregion
}