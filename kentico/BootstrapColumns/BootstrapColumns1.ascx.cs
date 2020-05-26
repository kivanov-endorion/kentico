using System;
using System.Collections;

using CMS.Helpers;
using CMS.PortalEngine.Web.UI;

public partial class CMSWebParts_Layouts_ColumnsBootstrap : CMSAbstractLayoutWebPart
{
    #region "Variables"

    /// <summary>
    /// List of div IDs.
    /// </summary>
    private ArrayList divIds = new ArrayList();

    #endregion


    #region "Properties"

    /// <summary>
    /// Number of left columns.
    /// </summary>
    public int Columns
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("Columns"), 1);
        }
        set
        {
            SetValue("Columns", value);
        }
    }


    /// <summary>
    /// Container DIV class
    /// </summary>
    public string RowCSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("RowCSSClass"), "");
        }
        set
        {
            SetValue("RowCSSClass", value);
        }
    }


    /// <summary>
    /// First column CSS class.
    /// </summary>
    public string Column1CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column1CSSClass"), "");
        }
        set
        {
            SetValue("Column1CSSClass", value);
        }
    }


     /// <summary>
    /// Second column CSS class.
    /// </summary>
    public string Column2CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column2CSSClass"), "");
        }
        set
        {
            SetValue("Column2CSSClass", value);
        }
    }


    /// <summary>
    /// Third column CSS class.
    /// </summary>
    public string Column3CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column3CSSClass"), "");
        }
        set
        {
            SetValue("Column3CSSClass", value);
        }
    }

    /// <summary>
    /// 4ht column CSS class.
    /// </summary>
    public string Column4CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column4CSSClass"), "");
        }
        set
        {
            SetValue("Column4CSSClass", value);
        }
    }

    /// <summary>
    /// 5th column CSS class.
    /// </summary>
    public string Column5CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column5CSSClass"), "");
        }
        set
        {
            SetValue("Column5CSSClass", value);
        }
    }

    /// <summary>
    /// 6th column CSS class.
    /// </summary>
    public string Column6CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column6CSSClass"), "");
        }
        set
        {
            SetValue("Column6CSSClass", value);
        }
    }

    /// <summary>
    /// 7th column CSS class.
    /// </summary>
    public string Column7CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column7CSSClass"), "");
        }
        set
        {
            SetValue("Column7CSSClass", value);
        }
    }

    /// <summary>
    /// 8th column CSS class.
    /// </summary>
    public string Column8CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column8CSSClass"), "");
        }
        set
        {
            SetValue("Column8CSSClass", value);
        }
    }

    /// <summary>
    /// 9th column CSS class.
    /// </summary>
    public string Column9CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column9CSSClass"), "");
        }
        set
        {
            SetValue("Column9CSSClass", value);
        }
    }

    /// <summary>
    /// 10th column CSS class.
    /// </summary>
    public string Column10CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column10CSSClass"), "");
        }
        set
        {
            SetValue("Column10CSSClass", value);
        }
    }

    /// <summary>
    /// 11th column CSS class.
    /// </summary>
    public string Column11CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column11CSSClass"), "");
        }
        set
        {
            SetValue("Column11CSSClass", value);
        }
    }

    /// <summary>
    /// 12th column CSS class.
    /// </summary>
    public string Column12CSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Column12CSSClass"), "");
        }
        set
        {
            SetValue("Column12CSSClass", value);
        }
    }

    /// <summary>
    /// UseBackground
    /// </summary>
    public bool UseBackground
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("UseBackground"), false);
        }
        set
        {
            SetValue("UseBackground", value);
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
    /// Repeat
    /// </summary>
    public string Repeat
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Repeat"), "");
        }
        set
        {
            SetValue("Repeat", value);
        }
    }

    /// <summary>
    /// Xposition
    /// </summary>
    public string Xposition
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Xposition"), "");
        }
        set
        {
            SetValue("Xposition", value);
        }
    }

    /// <summary>
    /// Yposition
    /// </summary>
    public string Yposition
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Yposition"), "");
        }
        set
        {
            SetValue("Yposition", value);
        }
    }

    /// <summary>
    /// Repeat
    /// </summary>
    public string Color
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Color"), "");
        }
        set
        {
            SetValue("Color", value);
        }
    }

    /// <summary>
    /// CSSClass
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
    /// Size
    /// </summary>
    public string Size
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Size"), "");
        }
        set
        {
            SetValue("Size", value);
        }
    }

    /// <summary>
    /// Attachment
    /// </summary>
    public string Attachment
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Attachment"), "");
        }
        set
        {
            SetValue("Attachment", value);
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


    #endregion


    #region "Methods"

    /// <summary>
    /// Prepares the layout of the web part.
    /// </summary>
    protected override void PrepareLayout()
    {
        StartLayout();


        if (IsDesign)
        {
            Append("<table class=\"LayoutTable\" cellspacing=\"0\" style=\"width: 100%;\">");

            if (ViewModeIsDesign())
            {
                Append("<tr><td class=\"LayoutHeader\">");

                // Add header container
                AddHeaderContainer();

                Append("</td></tr>");
            }

            Append("<tr><td>");
        }

        // Prepare automatic width
        string autoWidth = null;
        int numCol = 0;

        int cols = Columns;

        if (cols > 0)
        {
            autoWidth = ((100 - cols) / cols) + "%";
            numCol = 12 / cols;


        }

        // If UseBackground beginn outer div
        if (UseBackground)
        {
            Append("<div id=\"", ClientID, "\" ");

            if (CSSClass != "")
            {
                Append("class=\"", CSSClass, "\" ");
            }

            Append("style=\"");


            if (Color != "") {
                Append("background-color:", Color, ";");
            }

            

            if (URL != "")
            {
                

                if ( URL.Contains(".webp") && CMS.DocumentEngine.DocumentContext.CurrentBodyClass.Contains("InternetExplorer") )
                {
                    Append("background-image:url(", URL.Replace(".webp", ".jpg"), ");"); 
                }
                else
                {
                    Append("background-image:url(", URL, ");");
                }

                if (Xposition+Yposition != "")
                {
                    Append("background-position:", Xposition," ", Yposition, ";");
                }
                if (Repeat != "")
                {
                    Append("background-repeat:", Repeat, ";");
                }
                if (Size != "")
                {
                    Append("background-size:", Size, ";");
                }
                if (Attachment != "")
                {
                    Append("background-attachment:", Attachment, ";");
                }
                if (Width != "")
                {
                    Append("min-width:", Width, ";");
                }
                if (Height != "")
                {
                    Append("min-height:", Height, ";");
                }
            }


            Append("\">");


        } // end if Background

        // Encapsulating div
        if (IsDesign && AllowDesignMode)
        {
            Append("<div id=\"", ShortClientID, "_all\"  class=\"row ", RowCSSClass, "\">");
        }
        else
        {
            Append("<div class=\"row ", RowCSSClass, "\">");
        }

        // Create columns
        CreateColumns(Columns, autoWidth, numCol);



        // End of encapsulating div
        Append("</div>");

        if (IsDesign)
        {
            Append("</td></tr>");

            // Footer with actions
            if (AllowDesignMode)
            {

                Append("<tr><td class=\"LayoutFooter cms-bootstrap\"><div class=\"LayoutFooterContent\">");

                // Pane actions
                Append("<div class=\"LayoutLeftActions\">");
                AppendAddAction(ResHelper.GetString("Layout.AddColumn"), "Columns");
                if (Columns > 0)
                {
                    AppendRemoveAction(ResHelper.GetString("Layout.RemoveColumn"), "Columns");
                }
                Append("</div>");

                Append("</div></td></tr>");
            }

            Append("</table>");
        }

        // If UseBackground finish outer div
        if (UseBackground)
        {
            Append("</div>");
        } // end if Background

        FinishLayout();

    }


    /// <summary>
    /// Creates the columns in the layout.
    /// </summary>
    /// <param name="cols">Number of columns</param>
    /// <param name="autoWidth">Automatic width</param>
    /// <param name="numCol">Number of columns in Bootstrap notation (n/12th)</param>
    protected void CreateColumns(int cols, string autoWidth, int numCol)
    {
        for (int i = 1; i <= cols; i++)
        {
            
            // Do not use automatic width in case of design mode
            if (IsDesign)
            {
                autoWidth = "";
            }

            string ColClass = "col-md-" + numCol.ToString();

            Append("<div");

            string colId = "col" + i;

            string thisColumnClass = null;


            if (IsDesign)
            {

                // Cell class
                thisColumnClass = ValidationHelper.GetString(GetValue("Column" + i + "CSSClass"), "");
               
                if (!String.IsNullOrEmpty(thisColumnClass))
                {
                    Append(" class=\"", thisColumnClass, "\"");
                }
                else
                {

                    Append(" class=\"", ColClass, "\"");
                    
                }

                Append("><table style=\"width:100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr>");
               
                Append("<td style=\"vertical-align: top;\">");

                Append("<div");

            }


            // Cell class
            thisColumnClass = ValidationHelper.GetString(GetValue("Column" + i + "CSSClass"), "");
            

            if (!IsDesign)
            {
                if (!String.IsNullOrEmpty(thisColumnClass))
                {
                    Append(" class=\"", thisColumnClass, "\"");
                }
                else
                {
                    Append(" class=\"", ColClass, "\"");               
                }
            }

            if (IsDesign)
            {
                Append(" id=\"", ShortClientID, "_", colId, "\"");
            }

            Append(">");

            // Add the zone
            AddZone(ID + "_" + i, "[" + "COL" + i + "]");

            Append("</div>");

            if (IsDesign)
            {
                // Right column
                Append("</td>");

                Append("</tr></table>");

                Append("</div>");
            }
        }
    }

    #endregion
}