using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using CMS.PortalControls;
using CMS.Helpers;
using CMS.DocumentEngine;
using CMS.Controls;
using CMS.SiteProvider;
using System.Text;
using CMS.IO;
using CMS.PortalEngine;

public partial class oneIM_CustomResponseRepeater : CMSAbstractWebPart
{
    #region "Properties"

    public string PageType
    {
        get
        {
            return DataHelper.GetNotEmpty(ValidationHelper.GetString(GetValue("PageType"), "CMS.MenuItem"), "CMS.MenuItem");
        }
        set
        {
            SetValue("PageType", value);
        }
    }

    public string Path
    {
        get
        {
            return DataHelper.GetNotEmpty(ValidationHelper.GetString(GetValue("Path"), "/%"), "/%");
        }
        set
        {
            SetValue("Path", value);
        }
    }

    public int NestingLevel
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("NestingLevel"), -1);
        }
        set
        {
            SetValue("NestingLevel", value);
        }
    }

    public string Transformation
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Transformation"), "");
        }
        set
        {
            SetValue("Transformation", value);
        }
    }

    public int TopN
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("TopN"), 0);
        }
        set
        {
            SetValue("TopN", value);
        }
    }

    public string Columns
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Columns"), "");
        }
        set
        {
            SetValue("Columns", value);
        }
    }

    public string Where
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Where"), "");
        }
        set
        {
            SetValue("Where", value);
        }
    }

    public string OrderBy
    {
        get
        {
            return ValidationHelper.GetString(GetValue("OrderBy"), "");
        }
        set
        {
            SetValue("OrderBy", value);
        }
    }

    public string DataSourceName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("DataSourceName"), "");
        }
        set
        {
            SetValue("DataSourceName", value);
            br.DataSourceName = value;
        }
    }

    public CMSBaseDataSource DataSourceControl
    {
        get
        {
            return br.DataSourceControl;
        }
    }

    public string ContentType
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ContentType"), "text/plain");
        }
        set
        {
            SetValue("ContentType", value);
        }
    }

    public string CharsEncoding
    {
        get
        {
            return ValidationHelper.GetString(GetValue("CharsEncoding"), "utf8");
        }
        set
        {
            SetValue("CharsEncoding", value);
        }
    }

    public int StatusCode
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("StatusCode"), 200);
        }
        set
        {
            SetValue("StatusCode", value);
        }
    }

    public string ContentDisposition
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ContentDisposition"), "inline");
        }
        set
        {
            SetValue("ContentDisposition", value);
        }
    }


    /// <summary>
    /// Gets or sets HideControlForZeroRows property.
    /// </summary>
    public bool HideControlForZeroRows
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("HideControlForZeroRows"), true);
        }
        set
        {
            SetValue("HideControlForZeroRows", value);
        }
    }


    /// <summary>
    /// Gets or sets ZeroRowsText property.
    /// </summary>
    public string ZeroRowsText
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ZeroRowsText"), "");
        }
        set
        {
            SetValue("ZeroRowsText", value);
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
        if (this.StopProcessing)
        {
            // Do not process
        }
        else
        {

            // Set properties
            if (!String.IsNullOrEmpty(ZeroRowsText))
            {
                br.ZeroRowsText = ZeroRowsText;
            }
            br.HideControlForZeroRows = HideControlForZeroRows;

            br.ItemTemplate = CMSDataProperties.LoadTransformation(this, Transformation);
            br.DataSourceName = DataSourceName;

            if (DataSourceControl != null)
            {
                br.DataSource = DataSourceControl.LoadData(true);
            }
            else
            {
                DataSet ds = new DataSet();
                if (ValidationHelper.GetString(GetValue("Columns"), "") != "")
                {
                    ds = DocumentHelper.GetDocuments()
                                      .TopN(TopN)
                                      .Type(PageType)
                                      .Path(Path)
                                      .NestingLevel(NestingLevel)
                                      .Columns(Columns)
                                      .WithCoupledColumns()
                                      .Where(Where)
                                      .OrderBy(OrderBy);
                }
                else
                {
                    ds = DocumentHelper.GetDocuments()
                                  .TopN(TopN)
                                  .Type(PageType)
                                  .Path(Path)
                                  .NestingLevel(NestingLevel)
                                  .WithCoupledColumns()
                                  .Where(Where)
                                  .OrderBy(OrderBy);
                }
                // Assigns the DataSet as the data source of the BasicRepeater control
                br.DataSource = ds;
            }
            br.DataBind();

            if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
            {
                // Keep current response
                HttpResponse response = Context.Response;

                // Render XML
                response.Clear();
                response.ClearContent();
                response.ContentType = ContentType;
                switch (CharsEncoding)
                {
                    case "ascii":
                        response.ContentEncoding = Encoding.ASCII;
                        break;
                    case "bigendianunicode":
                        response.ContentEncoding = Encoding.BigEndianUnicode;
                        break;
                    case "default":
                        response.ContentEncoding = Encoding.Default;
                        break;
                    case "unicode":
                        response.ContentEncoding = Encoding.Unicode;
                        break;
                    case "utf32":
                        response.ContentEncoding = Encoding.UTF32;
                        break;
                    case "utf7":
                        response.ContentEncoding = Encoding.UTF7;
                        break;
                    default:
                        response.ContentEncoding = Encoding.UTF8; 
                        break;
                }
                response.StatusCode = StatusCode;
                response.AddHeader("Content-Disposition", ContentDisposition);
                
                // Render control
                StringBuilder stringBuilder = new StringBuilder();
                using (StringWriter textWriter = new StringWriter(stringBuilder))
                {
                    using (HtmlTextWriter writer = new HtmlTextWriter(textWriter))
                    {
                        RenderChildren(writer);
                    }
                }

                // Add to the response an end response
                response.Write(this.ContentBefore + stringBuilder.ToString() + this.ContentAfter);
                RequestHelper.EndResponse();
            }
        }
    }


    /// <summary>
    /// Reloads the control data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();

        SetupControl();
    }

    #endregion
}



