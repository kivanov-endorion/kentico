using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.IO;
using System.Net;

using CMS.PortalControls;
using CMS.Helpers;
using CMS.DocumentEngine;
using CMS.Controls;
using CMS.SiteProvider;
using CMS.IO;
using CMS.PortalEngine;
using CMS.ImportExport;


public partial class CustomResponseRepeaterExport : CMSAbstractWebPart
{
    #region "Properties"

    public int ExportFormat
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("ExportFormat"), 0);
        }
        set
        {
            SetValue("ExportFormat", value);
        }
    }

    public int UseTransformation
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("UseTransformation"), 0);
        }
        set
        {
            SetValue("UseTransformation", value);
        }
    }

    public string ExportFilename
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ExportFilename"), "Export");
        }
        set
        {
            SetValue("ExportFilename", value);
        }
    }

    public int PdfOrientation
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("PdfOrientation"), 1);
        }
        set
        {
            SetValue("PdfOrientation", value);
        }
    }

    public string PdfHeaderLogoPath
    {
        get
        {
            return ValidationHelper.GetString(GetValue("PdfHeaderLogoPath"), "");
        }
        set
        {
            SetValue("PdfHeaderLogoPath", value);
        }
    }

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
            br.ItemTemplate = CMSDataProperties.LoadTransformation(this, Transformation);
            br.DataSourceName = DataSourceName;
            //br.DataSourceControl.SelectedColumns = Columns;
            //br.DataSourceControl.TopN = TopN;
            //br.DataSourceControl.OrderBy = OrderBy;
            //br.DataSourceControl.WhereCondition = Where;

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
        }
    }

    protected override void Render(HtmlTextWriter writer)
    {
        if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
        {
            string html = string.Empty;
            StringBuilder stringBuilder = new StringBuilder();
            System.IO.StringWriter stringWriter = new System.IO.StringWriter(stringBuilder);
            HtmlTextWriter htmlWriter = new HtmlTextWriter(stringWriter);
            base.Render(htmlWriter);
            html = stringBuilder.ToString();
            ExportPage ce = new ExportPage();
            ce.ExportData((ExportPage.ExportFormats)ExportFormat, ExportFilename, Page, br.DataSource, PdfOrientation, PdfHeaderLogoPath, html, ContentType, UseTransformation);
        }
        else
        {
            base.Render(writer);
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



