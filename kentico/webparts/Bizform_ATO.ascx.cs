using System;

using CMS.Helpers;
using CMS.Localization;
using CMS.PortalControls;
using CMS.SiteProvider;
using CMS.WebAnalytics;
using CMS.OnlineForms;
using CMS.DataEngine;
using CMS.FormEngine;

public partial class CMSWebParts_BizForms_bizform_ato : CMSAbstractWebPart
{
    #region "Properties"

    /// <summary>
    /// Gets or sets the form name of BizForm.
    /// </summary>
    public string BizFormName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("BizFormName"), "");
        }
        set
        {
            SetValue("BizFormName", value);
        }
    }

    /// <summary>
    /// Gets or sets the where condition.
    /// </summary>
    public string WhereCondition
    {
        get
        {
            // System.Web.HttpContext.Current.Response.Write(GetValue("WhereCondition"));
            return DataHelper.GetNotEmpty(GetValue("WhereCondition"), "");

        }
        set
        {
            SetValue("WhereCondition", value);
            // repItems.WhereCondition = value;
        }

    }


    /// <summary>
    /// Gets or sets the check for duplicates.
    /// </summary>
    public bool CheckDuplicates
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("CheckDuplicates"), false);
        }
        set
        {
            SetValue("CheckDuplicates", value);
        }

    }

    /// <summary>
    /// Gets or sets the duplicates msg.
    /// </summary>
    public string DuplicatesMsg
    {
        get
        {
            return ValidationHelper.GetString(GetValue("DuplicatesMsg"), "");
        }
        set
        {
            SetValue("DuplicatesMsg", value);
        }
    }


    /// <summary>
    /// Gets or sets the threshold.
    /// </summary>
    public int Threshold
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("Threshold"), -1);
        }
        set
        {
            SetValue("Threshold", value);
        }

    }


    /// <summary>
    /// Gets or sets the threshold reached msg.
    /// </summary>
    public string ThresholdMsg
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ThresholdMsg"), "");
        }
        set
        {
            SetValue("ThresholdMsg", value);
        }
    }



    /// <summary>
    /// Gets or sets the alternative form full name (ClassName.AlternativeFormName).
    /// </summary>
    public string AlternativeFormName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("AlternativeFormName"), "");
        }
        set
        {
            SetValue("AlternativeFormName", value);
        }
    }


    /// <summary>
    /// Gets or sets the default from layout.
    /// </summary>
    public int FormLayout
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("FormLayout"), 0);
        }
        set
        {
            SetValue("FormLayout", value);
        }
    }


    /// <summary>
    /// Gets or sets the site name.
    /// </summary>
    public string SiteName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("SiteName"), "");
        }
        set
        {
            SetValue("SiteName", value);
        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether the WebPart use colon behind label.
    /// </summary>
    public bool UseColonBehindLabel
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("UseColonBehindLabel"), true);
        }
        set
        {
            SetValue("UseColonBehindLabel", value);
        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether the WebPart mark required fields behind label.
    /// </summary>
    public bool MarkRequiredFields
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("MarkRequiredFields"), true);
        }
        set
        {
            SetValue("MarkRequiredFields", value);
        }
    }


    /// <summary>
    /// Gets or sets the message which is displayed after validation failed.
    /// </summary>
    public string ValidationErrorMessage
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ValidationErrorMessage"), "");
        }
        set
        {
            SetValue("ValidationErrorMessage", value);
        }
    }


    /// <summary>
    /// Gets or sets the conversion track name used after successful registration.
    /// </summary>
    public string TrackConversionName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TrackConversionName"), "");
        }
        set
        {
            if (value.Length > 400)
            {
                value = value.Substring(0, 400);
            }
            SetValue("TrackConversionName", value);
        }
    }


    /// <summary>
    /// Gets or sets the conversion value used after successful registration.
    /// </summary>
    public double ConversionValue
    {
        get
        {
            return ValidationHelper.GetDoubleSystem(GetValue("ConversionValue"), 0);
        }
        set
        {
            SetValue("ConversionValue", value);
        }
    }

    #endregion


    #region "Methods"

    protected override void OnLoad(EventArgs e)
    {
        viewBiz.OnAfterSave += viewBiz_OnAfterSave;
        viewBiz.OnBeforeSave += viewBiz_OnBeforeSave;

        //ForumGroupInfo.TYPEINFO.Events.Insert.After +=
        //BizFormInfo.TYPEINFO.Events.Insert.Before += viewBiz_OnBeforeSave;
        
        base.OnLoad(e);
    }


    /// <summary>
    /// Content loaded event handler.
    /// </summary>
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
        SetupControl();        
    }


    /// <summary>
    /// Reloads data for partial caching.
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
            viewBiz.StopProcessing = true;
        }
        else
        {
            // Set BizForm properties
            viewBiz.FormName = BizFormName;
            viewBiz.SiteName = SiteName;
            viewBiz.UseColonBehindLabel = UseColonBehindLabel;
            viewBiz.MarkRequiredFields = MarkRequiredFields;
            viewBiz.AlternativeFormFullName = AlternativeFormName;
            viewBiz.ValidationErrorMessage = ValidationErrorMessage;
            viewBiz.DefaultFormLayout = (FormLayoutEnum)FormLayout;
            //viewBiz.CssClass = "form-inline";
            //System.Web.HttpContext.Current.Response.Write("FormLayout: " + viewBiz.CssClass);
           

                      
            
            //ltlPlaceholder.Visible = true;
            //ltlPlaceholder.Text = "Hier ist der Placeholder: ";

                      
            // Set the live site context
            if (viewBiz != null)
            {
                viewBiz.ControlContext.ContextName = CMS.ExtendedControls.ControlContext.LIVE_SITE;
            }

            // Gets the form info object
            var bizFormInfo = BizFormInfoProvider.GetBizFormInfo(viewBiz.FormName, viewBiz.SiteName);
            

            if (bizFormInfo != null)
            {
                // Gets the class name of the 'ContactUs' form
                DataClassInfo formClass = DataClassInfoProvider.GetDataClassInfo(bizFormInfo.FormClassID);
                string className = formClass.ClassName;


                if (WhereCondition != "")
                {

                    // Loads the form's data
                    ObjectQuery<BizFormItem> dataSet = BizFormItemProvider.GetItems(className)
                        .Where(WhereCondition);
                    //.WhereEquals("UserId", CurrentUser.UserID)
                    //.Columns("UserId")
                    //.TopN(1);

                    if (!DataHelper.DataSourceIsEmpty(dataSet) && dataSet.Tables[0].Rows.Count == 1)
                    {
                        var formRecordId = ValidationHelper.GetInteger(dataSet.Tables[0].Rows[0][0], 0);
                        viewBiz.ItemID = formRecordId;
                        return;
                    }
                }

               if (CheckDuplicates)
               {

                    if (formClass.ClassFormDefinition.Contains("FormCreatedBy") && formClass.ClassFormDefinition.Contains("FormInserted"))
                    {

                        //ltlPlaceholder.Text = ltlPlaceholder.Text + formClass.ClassTableName + " | Field: " + formClass.ClassFormDefinition.Contains("FormCreatedBy") + " | " + formClass.ClassFormDefinition.ToString();
                        // Loads the form's data
                        ObjectQuery<BizFormItem> dataSet1 = BizFormItemProvider.GetItems(className)

                        .WhereEquals("FormCreatedBy", CurrentUser.UserID)
                        .Columns("FormCreatedBy,FormInserted")
                        .TopN(1);

                        //ltlPlaceholder.Text = ltlPlaceholder.Text + CurrentUser.UserID.ToString() +" |"+ CheckDuplicates.ToString();
                       
                        if (!DataHelper.DataSourceIsEmpty(dataSet1) && dataSet1.Tables[0].Rows.Count == 1)
                        {
                            //var formInserted = ValidationHelper.GetInteger(dataSet1.Tables[0].Rows[0][1], 0);
                            //var formInserted = ValidationHelper.GetDate(dataSet1.Tables[0].Rows[0][1], DateTime.Now.AddDays(10)).ToString();
                            var formInserted = ValidationHelper.GetDateTime(dataSet1.Tables[0].Rows[0][1], DateTime.Now).ToString();
                            var formCreatedBy = ValidationHelper.GetInteger(dataSet1.Tables[0].Rows[0][0], 0);
                            
                            viewBiz.Visible = false;
                            ltlPlaceholder.Text = "<p>" + DuplicatesMsg + " " + formInserted+"</p>";
                            ltlPlaceholder.Visible = true;

                        }
                       
                    }

                }


               if (Threshold>-1)
               {

                  
                   // Loads the form's data
                   ObjectQuery<BizFormItem> dataSet2 = BizFormItemProvider.GetItems(className);



                  int cnt = dataSet2.Tables[0].Rows.Count;


                  if (!DataHelper.DataSourceIsEmpty(dataSet2) && dataSet2.Tables[0].Rows.Count >= Threshold )
                  {

                        viewBiz.Visible = false;
                        ltlPlaceholderCap.Text = "<p>" + ThresholdMsg + "</p>"; // +"R: " + cnt.ToString() + " : " + Threshold.ToString() + "</p>";
                        ltlPlaceholderCap.Visible = true;

                  }
                  

               }



            }

        }
    }

    private void viewBiz_OnBeforeSave(object sender, EventArgs e)
    {

        ltlPlaceholder.Visible = true;
        //ltlPlaceholder.Text = "Speichern: ";

        // Gets the form info object
        var bizFormInfo = BizFormInfoProvider.GetBizFormInfo(viewBiz.FormName, viewBiz.SiteName);

        // Gets the class name of the 'ContactUs' form
        DataClassInfo formClass = DataClassInfoProvider.GetDataClassInfo(bizFormInfo.FormClassID);
        string className = formClass.ClassName;

        if (CheckDuplicates)
        {

            if ((formClass.ClassFormDefinition.Contains("FormCreatedBy")) && (formClass.ClassFormDefinition.Contains("FormInserted")))
            {

               
                // Loads the form's data
                ObjectQuery<BizFormItem> dataSet1 = BizFormItemProvider.GetItems(className)

                .WhereEquals("FormCreatedBy", CurrentUser.UserID)
                .Columns("FormCreatedBy,FormInserted")
                .TopN(1);

               

                if (!DataHelper.DataSourceIsEmpty(dataSet1) && dataSet1.Tables[0].Rows.Count == 1)
                {
                    //var formInserted = ValidationHelper.GetInteger(dataSet1.Tables[0].Rows[0][1], 0);
                    //var formInserted = ValidationHelper.GetDate(dataSet1.Tables[0].Rows[0][1], DateTime.Now.AddDays(10)).ToString();
                    var formInserted = ValidationHelper.GetDateTime(dataSet1.Tables[0].Rows[0][1], DateTime.Now).ToString();
                    var formCreatedBy = ValidationHelper.GetInteger(dataSet1.Tables[0].Rows[0][0], 0);

                    viewBiz.Visible = false;
                    ltlPlaceholder.Text = DuplicatesMsg + " " + formInserted;
                    ltlPlaceholder.Visible = true;

                    viewBiz.StopProcessing = true;

                }

            }

        }


       



    }

    private void viewBiz_OnAfterSave(object sender, EventArgs e)
    {
        if (TrackConversionName != String.Empty)
        {
            string siteName = SiteContext.CurrentSiteName;

            if (AnalyticsHelper.AnalyticsEnabled(siteName) && AnalyticsHelper.TrackConversionsEnabled(siteName) && !AnalyticsHelper.IsIPExcluded(siteName, RequestContext.UserHostAddress))
            {
                HitLogProvider.LogConversions(SiteContext.CurrentSiteName, LocalizationContext.PreferredCultureCode, TrackConversionName, 0, ConversionValue);
            }
        }
    }

    #endregion
}