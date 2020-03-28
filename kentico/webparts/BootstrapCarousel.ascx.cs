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

public partial class CMSWebParts_Layouts_BootstrapCarousel : CMSAbstractLayoutWebPart
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
            return ValidationHelper.GetBoolean(GetValue("Fade"), true);
        }
        set
        {
            SetValue("Fade", value);
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

        Append("<!-- BEGIN BT Carousel --><div data-ride=\"carousel\"");

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
        }
        else
        {
            Append(" data-interval=\"0\"");
        }


        if (IsDesign)
        {
            Append(" id=\"", ShortClientID, "_env\">");

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
            Append(" id=\"", ShortClientID, "\">");
        }


        // Create headers

        // Tab headers
        if (IsDesign)
        {
           // Append("<tr><td>");
        }
        else
        {
            switch (Controls)
            {
                case "controls":
                    Append("<ol class=\"carousel-indicators\">");
                    break;
                case "tabs":
                    Append("<div class=\"tab-container\">");
                    break;



            }
           // Append("<ol class=\"carousel-indicators\">");
           // Append("<div class=\"carousel-indicators\">");
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

            //Append("<li data-target=\"#carousel-example-generic\" data-slide-to=\"",i,"\">",header,"</li>");
            //Append("<span data-target=\"#",ShortClientID,"\" data-slide-to=\"", i, "\">", header, "</span>");

            switch (Controls)
            {
                case "controls":
                    if (!IsDesign)
                    {
                        Append("<li data-target=\"#", ShortClientID, "\" data-slide-to=\"", i, "\"></span>");
                    }
                    break;
                case "tabs":
                    Append("<span data-target=\"#", ShortClientID, "\" data-slide-to=\"", i, "\">", header, "</span>");
                    break;
            }
        }

        
        

        if (IsDesign)
        {
           // Append("</td></tr>");
        }
        else
        {
            //Append("</ol>");
            //Append("</div>");

            switch (Controls)
            {
                case "controls":
                    Append("</ol>");
                    break;
                case "tabs":
                    Append("</div>");
                    break;
            }
        }

        if (!IsDesign)
        {
            Append("<div class=\"row no-gutters carousel-inner\" role=\"listbox\">");
        }

        // Create Zones
        for (int i = 0; i < Tabs; i++)
        {

            string IsActive = "";
            if (i == ActiveTabIndex)
            {
                IsActive = "active";
            }
            
            Append("<div class=\"col-xs-12 item ",IsActive,"\">");
    
            // Add the zone
            AddZone(ID + "_" + i, "[" + "TAB" + i + "]");

            Append("</div>");
            
        }

        if((!IsDesign) && (Controls=="controls"))
        {
            Append("<!-- Controls -->");
            Append("<a class=\"left carousel-control\" href=\"#", ShortClientID, "\" role=\"button\" data-slide=\"prev\">");
            Append("<span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>");
            Append("<span class=\"sr-only\">Previous</span>");
            Append("</a>");
            Append("<a class=\"right carousel-control\" href=\"#", ShortClientID, "\" role=\"button\" data-slide=\"next\">");
            Append("<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>");
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




        Append("</div> <!-- END BT Catousel -->");


        FinishLayout();
    }


    ///// <summary>
    ///// Gets the tab strip placement based on the string representation
    ///// </summary>
    ///// <param name="placement">Placement</param>
    //protected TabStripPlacement GetTabStripPlacement(string placement)
    //{
    //    switch (placement.ToLowerCSafe())
    //    {
    //        case "bottom":
    //            return AjaxControlToolkit.TabStripPlacement.Bottom;

    //        case "bottomright":
    //            return AjaxControlToolkit.TabStripPlacement.BottomRight;

    //        case "topright":
    //            return AjaxControlToolkit.TabStripPlacement.TopRight;

    //        default:
    //            return AjaxControlToolkit.TabStripPlacement.Top;
    //    }
    //}

    #endregion
}