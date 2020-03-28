using System;
using System.Data;

using CMS.CustomTables;
using CMS.DataEngine;
using CMS.Helpers;
using CMS.Localization;
using CMS.Membership;
using CMS.PortalControls;
using CMS.SiteProvider;
using CMS.WebAnalytics;

public partial class CMSWebParts_CustomTables_CustomTableForm_CCP : CMSAbstractWebPart
{
    #region "Public properties"

    public string EditStatus { get; set; }

    /// <summary>
    /// Custom table used for edit item.
    /// </summary>
    public string CustomTable
    {
        get
        {
            return ValidationHelper.GetString(GetValue("CustomTable"), String.Empty);
        }
        set
        {
            SetValue("CustomTable", value);
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
    /// Key name used to identify edited object.
    /// </summary>
    public string ItemKeyName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ItemKeyName"), "edititemid");
        }
        set
        {
            SetValue("ItemKeyName", value);
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
    /// Gets or sets the alternative form full name (ClassName.AlternativeFormName).
    /// </summary>
    public string AlternativeForms
    {
        get
        {
            return ValidationHelper.GetString(GetValue("AlternativeForms"), "");
        }
        set
        {
            SetValue("AlternativeForms", value);
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

     /// <summary>
    /// Gets or sets the conversion value used after successful registration.
    /// </summary>
    public bool EditMode
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("EditMode"), true);
        }
        set
        {
            SetValue("EditMode", value);
        }
    }
    


    #endregion


    #region "Methods"

    /// <summary>
    /// Load event handler.
    /// </summary>
    protected override void OnLoad(EventArgs e)
    {
        form.OnAfterSave += form_OnAfterSave;
        form.OnBeforeSave += form_OnBeforeSave;
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
    /// Setups control.
    /// </summary>
    private void SetupControl()
    {
        if (StopProcessing)
        {
            form.StopProcessing = true;
        }
        else
        {
            //System.Web.HttpContext.Current.Response.Write(QueryHelper.GetString("ItemId", ""));
            //string WhereCon1 = "ItemID = " + QueryHelper.GetInteger("ItemId", 0);
            string WhereCon1 = "ItemID = dbo.Sfn_GetIdFromSEO('" + SqlHelper.EscapeQuotes(QueryHelper.GetString("ItemId", "")) + "')";
            // Get the data set according to the parameters 
            ObjectQuery<CustomTableItem> dataSet1 = CustomTableItemProvider.GetItems("oneIM.CCPHeader", WhereCon1, null, 1, "Type,Status");
            
            string type = "";
            int status = 0;
            int EditState = 0;

            if (!DataHelper.DataSourceIsEmpty(dataSet1))
            {
                // Get the custom table item ID
                type = ValidationHelper.GetString(dataSet1.Tables[0].Rows[0][0], "CP");
                status = ValidationHelper.GetInteger(dataSet1.Tables[0].Rows[0][1], 0);
              
                if ((status == 0) || (status == 2))
                {
                    EditState = 1;
                }

                if (status == -1) 
                {
                    status = 0;
                }

            }

           
            string EditForm ="Edit";
            EditMode = true;    
            
            if (EditState == 0 )
            {
                EditForm = "Read";
                EditMode = false;
            }

            switch (status)
            {
                case 0:
                    EditForm = "New";
                    EditMode = true;
                    break;
                case 1:
                    EditForm = "Read";
                    EditMode = false;
                    break;
                case 2:
                    EditForm = "Edit";
                    EditMode = true;
                    break;
                case 3:
                    EditForm = "Read";
                    EditMode = false;
                    break;
                case 4:
                    EditForm = "Read";
                    EditMode = false;
                    break;
                default:
                    EditForm = "Read";
                    EditMode = false;
                    break;


            }

            if (AlternativeForms != "")
            {

                string[] arAltForms = AlternativeForms.Split(';');


                string curForm = "";

                //System.Web.HttpContext.Current.Response.Write("ARRAY:" + arAltForms.Length.ToString()+" : "+status.ToString());

                if ((status) <arAltForms.Length)
                {
                    //System.Web.HttpContext.Current.Response.Write("ARRAY4:" + arAltForms.Length.ToString() + " : " + status.ToString());
                    curForm = ValidationHelper.GetString(arAltForms[status], "");

                }

                if (curForm != "")
                {
                    EditForm = curForm;
                }


            }

            if (CustomTable != "oneIM.CCPHeader")
            {
                CustomTable = "oneIM.CCPDetails" + type;
            }

            AlternativeFormName = CustomTable + "." + EditForm;
           
            DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(CustomTable);
            if (customTable != null)
            {

               
                
                
                
                
                // hole custom table name
                string customTableClassName = customTable.ClassName;

                

                // Prepare the parameters 
                //string where = "ItemCreatedBy =" + CMS.Membership.MembershipContext.AuthenticatedUser.UserID + " AND ItemID=" + QueryHelper.GetInteger(ItemKeyName, 0); ;

                //string where = WhereCondition + " AND ItemID=" + QueryHelper.GetInteger(ItemKeyName, 0); ;
                string where = WhereCondition; 

                int topN = 1;
                string columns = "ItemID";

                //System.Web.HttpContext.Current.Response.Write("<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>");
                //System.Web.HttpContext.Current.Response.Write(where);

                // Get the data set according to the parameters 
                ObjectQuery <CustomTableItem> dataSet = CustomTableItemProvider.GetItems(customTableClassName, where, null, topN, columns);
                int itemID = 0;


                if (!DataHelper.DataSourceIsEmpty(dataSet))
                {
                    // Get the custom table item ID
                    itemID = ValidationHelper.GetInteger(dataSet.Tables[0].Rows[0][0], 0);
                }
                
                form.CustomTableId = customTable.ClassID;
                form.UseColonBehindLabel = UseColonBehindLabel;
                form.MarkRequiredFields = MarkRequiredFields;
                form.ValidationErrorMessage = ValidationErrorMessage;
                form.AlternativeFormFullName = AlternativeFormName;
                form.FieldValueCellCssClass = "col-md-8 testClass";
                
                //form.ItemID = QueryHelper.GetInteger(ItemKeyName, 0);
                form.ItemID = itemID;
                //if (EditState == 1)
                if (EditMode)
                {

                    form.SubmitButton.CssClass = "btn-submit";
                    //System.Web.HttpContext.Current.Response.Write(CustomTable + " : " + AlternativeFormName + " : " + form.SubmitButton.Enabled.ToString());
                }
                else
                {
                    form.SubmitButton.Enabled = false;
                    //form.SubmitButton.CssClass = "btn-disabled";
                    form.SubmitButton.CssClass = "btn-submit";
                }
                
                
            }
        }
    }


    /// <summary>
    /// OnBeforeSave event handler
    /// </summary>
    protected void form_OnBeforeSave(object sender, EventArgs e)
    {
       // System.Web.HttpContext.Current.Response.Write(CustomTable + " : " + AlternativeFormName);
        CheckPermissions();
    }


    /// <summary>
    /// OnAfterSave event handler
    /// </summary>
    protected void form_OnAfterSave(object sender, EventArgs e)
    {
        if (form.IsInsertMode)
        {
            if ((TrackConversionName != String.Empty))
            {
                string siteName = SiteContext.CurrentSiteName;

                if (AnalyticsHelper.AnalyticsEnabled(siteName) && AnalyticsHelper.TrackConversionsEnabled(siteName) && !AnalyticsHelper.IsIPExcluded(siteName, RequestContext.UserHostAddress))
                {
                    HitLogProvider.LogConversions(SiteContext.CurrentSiteName, LocalizationContext.PreferredCultureCode, TrackConversionName, 0, ConversionValue);
                }
            }

            // Redirect to edit mode after new item submit
            URLHelper.Redirect(URLHelper.AddParameterToUrl(RequestContext.CurrentURL, ItemKeyName, form.ItemID.ToString()));
        }
    }

    #endregion


    #region "Private methods"

    /// <summary>
    /// Checks create or modify permission.
    /// </summary>
    private void CheckPermissions()
    {
        CustomTableItem ctItem = form.EditedObject;
        // If editing item
        if (ctItem.ItemID > 0)
        {
            // Check 'Modify' permission
            if (!ctItem.CheckPermissions(PermissionsEnum.Modify, SiteContext.CurrentSiteName, MembershipContext.AuthenticatedUser))
            {
                // Show error message
                form.MessagesPlaceHolder.ClearLabels();
                form.ShowError(String.Format(GetString("customtable.permissiondenied.modify"), ctItem.ClassName));
                form.StopProcessing = true;
            }
        }
        else
        {
            // Check 'Create' permission
            if (!ctItem.CheckPermissions(PermissionsEnum.Create, SiteContext.CurrentSiteName, MembershipContext.AuthenticatedUser))
            {
                // Show error message
                form.MessagesPlaceHolder.ClearLabels();
                form.ShowError(String.Format(GetString("customtable.permissiondenied.create"), ctItem.ClassName));
                form.StopProcessing = true;
            }
        }
    }
    
    #endregion
}
