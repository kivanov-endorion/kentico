using System;

using CMS.CustomTables;
using CMS.DataEngine;
using CMS.Helpers;
using CMS.Localization;
using CMS.Membership;
using CMS.PortalControls;
using CMS.SiteProvider;
using CMS.WebAnalytics;

public partial class CMSWebParts_CustomTables_CustomTableForm_ato : CMSAbstractWebPart
{
    #region "Public properties"

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
        //System.Web.HttpContext.Current.Response.Write("StropProc: " + AlternativeFormName + " | ");
        SetupControl(); 
        //System.Web.HttpContext.Current.Response.Write("SetupCtrlZ: " + form.AlternativeFormFullName + " | ");
        
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
            DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(CustomTable);
            if (customTable != null)
            {
                // hole custom table name
                string customTableClassName = customTable.ClassName;

                

                // Prepare the parameters 
                //string where = "ItemCreatedBy =" + CMS.Membership.MembershipContext.AuthenticatedUser.UserID + " AND ItemID=" + QueryHelper.GetInteger(ItemKeyName, 0); ;

                string where = WhereCondition + " AND ItemID=" + QueryHelper.GetInteger(ItemKeyName, 0); ;

                int topN = 1;
                string columns = "ItemID";

                //System.Web.HttpContext.Current.Response.Write("<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>");
                

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
                form.ValidationErrorMessage = ValidationErrorMessage;
                form.AlternativeFormFullName = AlternativeFormName;
                //form.ItemID = QueryHelper.GetInteger(ItemKeyName, 0);
                form.ItemID = itemID;
                form.SubmitButton.Text = "{$ button.submit $}";
              

                //System.Web.HttpContext.Current.Response.Write("AltForm: "+AlternativeFormName + " | ");
                

                
                
            }
        }
    }


    /// <summary>
    /// OnBeforeSave event handler
    /// </summary>
    protected void form_OnBeforeSave(object sender, EventArgs e)
    {
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
