using CMS.DataEngine;
using CMS.Helpers;
using CMS.Membership;
using CMS.PortalControls;
using CMS.EmailEngine;
using CMS.DocumentEngine;
using CMS.DataEngine;
using CMS.Base;
using CMS.UIControls;
using CMS.SiteProvider;
using CMS.MacroEngine;
using CMS.PortalEngine;
using CMS.IO;
using System;
using System.Net.Mail;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using CMS.FormEngine;
using System.Globalization;





public partial class CMSWebParts_CustomTables_CustomTableInputEditValidation : CMSAbstractWebPart
{
    #region Private properties
    private bool isSuccess = false;
    private DataClassInfo dci = null;

    #endregion

    #region Public properties

    /// <summary>
    /// Determine if permissions should be checked or not
    /// </summary>
    public bool CheckPermissions
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("CheckPermissions"), false);
        }
        set
        {
            SetValue("CheckPermissions", value);
        }
    }

    /// <summary>
    /// Gets or sets the custom table name
    /// </summary>
    public string CustomTableName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("CustomTableName"), "");
        }
        set
        {
            SetValue("CustomTableName", value);
        }
    }

    /// <summary>
    /// Alternative form to use
    /// </summary>
    public string AlternativeFormFullName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("AlternativeFormFullName"), "");
        }
        set
        {
            SetValue("AlternativeFormFullName", value);
        }
    }

    /// <summary>
    /// Gets or sets the value on whether to use a colon after the label
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
    /// Submit buttons css class
    /// </summary>
    public string SubmitButtonCssClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("SubmitButtonCssClass"), "");
        }
        set
        {
            SetValue("SubmitButtonCssClass", value);
        }
    }

    /// <summary>
    /// Submit buttons text
    /// </summary>
    public string SubmitButtonText
    {
        get
        {
            return ValidationHelper.GetString(GetValue("SubmitButtonText"), "");
        }
        set
        {
            SetValue("SubmitButtonText", value);
        }
    }

    /// <summary>
    /// Displays the form after submission
    /// </summary>
    public bool DisplayFormAfterSubmit
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("DisplayFormAfterSubmit"), false);
        }
        set
        {
            SetValue("DisplayFormAfterSubmit", value);
        }
    }

    /// <summary>
    /// Display a message after submit
    /// </summary>
    public bool DisplayMessageAfterSubmit
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("DisplayMessageAfterSubmit"), false);
        }
        set
        {
            SetValue("DisplayMessageAfterSubmit", value);
        }
    }

    /// <summary>
    /// Name of the email template to be send after submit
    /// </summary>
    public string EmailTemplateName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("EmailTemplateName"), "");
        }
        set
        {
            SetValue("EmailTemplateName", value);
        }
    }

    /// <summary>
    /// Name of the query based on custom table used to send email
    /// </summary>
    public string EmailQueryName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("EmailQueryName"), "");
        }
        set
        {
            SetValue("EmailQueryName", value);
        }
    }

    /// <summary>
    /// Message text to display if form is being inserted
    /// </summary>
    public string InsertMessageText
    {
        get
        {
            return ValidationHelper.GetString(GetValue("InsertMessageText"), "");
        }
        set
        {
            SetValue("InsertMessageText", value);
        }
    }

    /// <summary>
    /// Message text to display if form is being updated.
    /// </summary>
    public string UpdateMessageText
    {
        get
        {
            return ValidationHelper.GetString(GetValue("UpdateMessageText"), "");
        }
        set
        {
            SetValue("UpdateMessageText", value);
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
    /// Redirect after a submit
    /// </summary>
    public bool RedirectAfterSubmit
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("RedirectAfterSubmit"), false);
        }
        set
        {
            SetValue("RedirectAfterSubmit", value);
        }
    }

    /// <summary>
    /// Redirect URL to use
    /// </summary>
    public string RedirectUrl
    {
        get
        {
            return ValidationHelper.GetString(GetValue("RedirectUrl"), "");
        }
        set
        {
            SetValue("RedirectUrl", value);
        }
    }

    /// <summary>
    /// Redirect URL to use
    /// </summary>
    public string RedirectURLParam
    {
        get
        {
            return ValidationHelper.GetString(GetValue("RedirectURLParam"), "id");
        }
        set
        {
            SetValue("RedirectURLParam", value);
        }
    }
    /// <summary>
    /// Gets/Sets the selected ItemID of the custom table record
    /// </summary>
    public int SelectedItemID
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("SelectedItemID"), 0);
        }
        set
        {
            SetValue("SelectedItemID", value);
        }
    }

    #endregion

    #region "Methods"
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
        SetupControl();
    }

    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);
        litMessage.Visible = (DisplayMessageAfterSubmit && isSuccess);

        if (RedirectAfterSubmit && isSuccess && IsPostBack)
        {
            //URLHelper.Redirect(RedirectUrl);
            // Redirect to edit mode after new item submit
            //URLHelper.Redirect(URLHelper.AddParameterToUrl(RequestContext.CurrentURL, "id", customTableForm.ItemID.ToString() )); //form.ItemID.ToString()
            URLHelper.Redirect(URLHelper.AddParameterToUrl(RedirectUrl, RedirectURLParam, customTableForm.ItemID.ToString())); //form.ItemID.ToString()
            //ltlPlaceholder.Text = URLHelper.AddParameterToUrl(RedirectUrl, "id", customTableForm.ItemID.ToString());
        }

        if (isSuccess && IsPostBack)
        {
            customTableForm.Visible = DisplayFormAfterSubmit;
        }
    }

    /// <summary>
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        if (StopProcessing)
        {
            customTableForm.StopProcessing = true;
        }
        else
        {
            if (!string.IsNullOrEmpty(CustomTableName))
            {
                // Get form info
                dci = DataClassInfoProvider.GetDataClassInfo(CustomTableName);
                customTableForm.CustomTableId = dci.ClassID;
								customTableForm.ValidationErrorMessage = ValidationErrorMessage;
								customTableForm.MarkRequiredFields = MarkRequiredFields;
                customTableForm.UseColonBehindLabel = UseColonBehindLabel;
                //ltlPlaceholder.Text = SelectedItemID.ToString();

                
                // setting the selected item for editing
                if (SelectedItemID > 0)
                {
                    customTableForm.ItemID = SelectedItemID;
                    litMessage.Text = UpdateMessageText;
                }
                else
                {
                    litMessage.Text = InsertMessageText;
                }
            }

            customTableForm.OnBeforeSave += customTableForm_OnBeforeSave;
            customTableForm.OnAfterSave += customTableForm_OnAfterSave;
            customTableForm.ShowPrivateFields = true;
            customTableForm.AlternativeFormFullName = AlternativeFormFullName;
            customTableForm.SubmitButton.CssClass = SubmitButtonCssClass;
            customTableForm.SubmitButton.ResourceString = SubmitButtonText;
            customTableForm.SubmitButton.Text = SubmitButtonText;
            
        }
    }

    /// <summary>
    /// Allow user to reload data if needed.
    /// </summary>
    public void ReloadData()
    {
        SetupControl();
    }

    private void customTableForm_OnBeforeSave(object sender, EventArgs e)
    {
        if (CheckPermissions)
        {
            // If editing item
            if (SelectedItemID > 0)
            {
                // Check 'Modify' permission
                if (!MembershipContext.AuthenticatedUser.IsAuthorizedPerResource("cms.customtables", "Modify") &&
                    !MembershipContext.AuthenticatedUser.IsAuthorizedPerClassName(dci.ClassName, "Modify"))
                {
                    // Show error message
                    customTableForm.MessagesPlaceHolder.ClearLabels();
                    customTableForm.ShowError(String.Format(GetString("customtable.permissiondenied.modify"), dci.ClassName), null, null);
                    customTableForm.StopProcessing = true;
                }
            }
            else
            {
                // Check 'Create' permission
                if (!MembershipContext.AuthenticatedUser.IsAuthorizedPerResource("cms.customtables", "Create") &&
                    !MembershipContext.AuthenticatedUser.IsAuthorizedPerClassName(dci.ClassName, "Create"))
                {
                    // Show error message
                    customTableForm.MessagesPlaceHolder.ClearLabels();
                    customTableForm.ShowError(String.Format(GetString("customtable.permissiondenied.create"), dci.ClassName), null, null);
                    customTableForm.StopProcessing = true;
                }
            }
        }
    }
        
    /// <summary>
    /// After successful save, set true value
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void customTableForm_OnAfterSave(object sender, EventArgs e)
    {

        NumberFormatInfo provider = new NumberFormatInfo();
        provider.NumberDecimalSeparator = ".";
        provider.NumberDecimalDigits=2;
        isSuccess = true;
        SendKenticoEmailTemplate(
        EmailTemplateName, 
        19,//SiteContext.CurrentSiteID,  // Site ID
        new
        {
            LabelCustomerName = customTableForm.FieldLabels["CustomerName"]==null ? "" : customTableForm.FieldLabels["CustomerName"].Text,
            LabelContactName = customTableForm.FieldLabels["ContactName"] == null ? "" : customTableForm.FieldLabels["ContactName"].Text,
            LabelContactPhone = customTableForm.FieldLabels["ContactPhone"]==null ? "" : customTableForm.FieldLabels["ContactPhone"].Text,
            LabelAccountNumberPart1 = customTableForm.FieldLabels["AccountNumberPart1"]==null ? "" : customTableForm.FieldLabels["AccountNumberPart1"].Text,
            LabelContactEmail = customTableForm.FieldLabels["ContactEmail"]==null ? "" : customTableForm.FieldLabels["ContactEmail"].Text,
            LabelInvoiceNumber = customTableForm.FieldLabels["InvoiceNumber"]==null ? "" : customTableForm.FieldLabels["InvoiceNumber"].Text,
            LabelInvoiceDate = customTableForm.FieldLabels["InvoiceDate"]==null ? "" : customTableForm.FieldLabels["InvoiceDate"].Text,
            LabelCustomerPO = customTableForm.FieldLabels["CustomerPO"]==null ? "" : customTableForm.FieldLabels["CustomerPO"].Text,
            LabelDecimal1 = customTableForm.FieldLabels["Decimal1"] == null ? "" : customTableForm.FieldLabels["Decimal1"].Text,
            LabelDecimal2 = customTableForm.FieldLabels["Decimal2"] == null ? "" : customTableForm.FieldLabels["Decimal2"].Text,
            LabelDecimal3 = customTableForm.FieldLabels["Decimal3"] == null ? "" : customTableForm.FieldLabels["Decimal3"].Text,
            LabelDecimal4 = customTableForm.FieldLabels["Decimal4"] == null ? "" : customTableForm.FieldLabels["Decimal4"].Text,
            LabelDecimal5 = customTableForm.FieldLabels["Decimal5"] == null ? "" : customTableForm.FieldLabels["Decimal5"].Text,
            LabelDecimal6 = customTableForm.FieldLabels["Decimal6"] == null ? "" : customTableForm.FieldLabels["Decimal6"].Text,
            LabelInteger1 = customTableForm.FieldLabels["Integer1"]==null ? "" : customTableForm.FieldLabels["Integer1"].Text,
            LabelInteger2 = customTableForm.FieldLabels["Integer2"]==null ? "" : customTableForm.FieldLabels["Integer2"].Text,
            LabelInteger3 = customTableForm.FieldLabels["Integer3"]==null ? "" : customTableForm.FieldLabels["Integer3"].Text,
            LabelText1 = customTableForm.FieldLabels["Text1"]==null ? "" : customTableForm.FieldLabels["Text1"].Text,
            LabelText2 = customTableForm.FieldLabels["Text2"]==null ? "" : customTableForm.FieldLabels["Text2"].Text,
            LabelText3 = customTableForm.FieldLabels["Text3"]==null ? "" : customTableForm.FieldLabels["Text3"].Text,
            Total1 = (((customTableForm.GetDataValue("Decimal1") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal1")) - (customTableForm.GetDataValue("Decimal4") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal4"))) * (customTableForm.GetDataValue("Integer1") == null ? 0 : (int)customTableForm.GetDataValue("Integer1"))).ToString("N2", provider),
            Total2 = (((customTableForm.GetDataValue("Decimal2")==null ? 0 : (decimal)customTableForm.GetDataValue("Decimal2")) - (customTableForm.GetDataValue("Decimal5")==null ? 0 : (decimal)customTableForm.GetDataValue("Decimal5"))) * (customTableForm.GetDataValue("Integer2")==null ? 0 : (int)customTableForm.GetDataValue("Integer2"))).ToString("N2",provider),
            Total3 = (((customTableForm.GetDataValue("Decimal3") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal3")) - (customTableForm.GetDataValue("Decimal6") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal6"))) * (customTableForm.GetDataValue("Integer3") == null ? 0 : (int)customTableForm.GetDataValue("Integer3"))).ToString("N2",provider),
            TotalVAT1 = ((((customTableForm.GetDataValue("Decimal1") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal1")) - (customTableForm.GetDataValue("Decimal4") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal4"))) * (customTableForm.GetDataValue("Integer1") == null ? 0 : (int)customTableForm.GetDataValue("Integer1"))) * (1 + decimal.Parse(MacroResolver.Resolve(ResHelper.GetString("1IM.Dashboard.QueryIT.VATvalue")), provider))).ToString("N2",provider),
            TotalVAT2 = ((((customTableForm.GetDataValue("Decimal2") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal2")) - (customTableForm.GetDataValue("Decimal5") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal5"))) * (customTableForm.GetDataValue("Integer2") == null ? 0 : (int)customTableForm.GetDataValue("Integer2"))) * (1 + decimal.Parse(MacroResolver.Resolve(ResHelper.GetString("1IM.Dashboard.QueryIT.VATvalue")), provider))).ToString("N2",provider),
            TotalVAT3 = ((((customTableForm.GetDataValue("Decimal3") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal3")) - (customTableForm.GetDataValue("Decimal6") == null ? 0 : (decimal)customTableForm.GetDataValue("Decimal6"))) * (customTableForm.GetDataValue("Integer3") == null ? 0 : (int)customTableForm.GetDataValue("Integer3"))) * (1 + decimal.Parse(MacroResolver.Resolve(ResHelper.GetString("1IM.Dashboard.QueryIT.VATvalue")), provider))).ToString("N2",provider),
            QueryType = customTableForm.GetDataValue("QueryType"),
            CustomerName = customTableForm.GetDataValue("CustomerName"),
            ContactName = customTableForm.GetDataValue("ContactName"),
            ContactPhone = customTableForm.GetDataValue("ContactPhone"),
            AccountNumberPart1 = customTableForm.GetDataValue("AccountNumberPart1"),
            AccountNumberPart2 = customTableForm.GetDataValue("AccountNumberPart2"),
            ContactEmail = customTableForm.GetDataValue("ContactEmail"),
            InvoiceNumber = customTableForm.GetDataValue("InvoiceNumber"),
            InvoiceDate = customTableForm.GetDataValue("InvoiceDate"),
            CustomerPO = customTableForm.GetDataValue("CustomerPO"),
            FurtherComments = customTableForm.GetDataValue("FurtherComments"),
            Decimal1 = customTableForm.GetDataValue("Decimal1") == null ? "0.00" : decimal.Parse(customTableForm.GetDataValue("Decimal1").ToString(), provider).ToString("N2", provider),
            Decimal2 = customTableForm.GetDataValue("Decimal2") == null ? "0.00" : decimal.Parse(customTableForm.GetDataValue("Decimal2").ToString(), provider).ToString("N2", provider),
            Decimal3 = customTableForm.GetDataValue("Decimal3") == null ? "0.00" : decimal.Parse(customTableForm.GetDataValue("Decimal3").ToString(), provider).ToString("N2", provider),
            Decimal4 = customTableForm.GetDataValue("Decimal4") == null ? "0.00" : decimal.Parse(customTableForm.GetDataValue("Decimal4").ToString(), provider).ToString("N2", provider),
            Decimal5 = customTableForm.GetDataValue("Decimal5") == null ? "0.00" : decimal.Parse(customTableForm.GetDataValue("Decimal5").ToString(), provider).ToString("N2", provider),
            Decimal6 = customTableForm.GetDataValue("Decimal6") == null ? "0.00" : decimal.Parse(customTableForm.GetDataValue("Decimal6").ToString(), provider).ToString("N2", provider),
            Integer1 = customTableForm.GetDataValue("Integer1") == null ? "0" : customTableForm.GetDataValue("Integer1").ToString(),
            Integer2 = customTableForm.GetDataValue("Integer2") == null ? "0" : customTableForm.GetDataValue("Integer2").ToString(),
            Integer3 = customTableForm.GetDataValue("Integer3") == null ? "0" : customTableForm.GetDataValue("Integer3").ToString(),
            Text1 = customTableForm.GetDataValue("Text1"),
            Text2 = customTableForm.GetDataValue("Text2"),
            Text3 = customTableForm.GetDataValue("Text3"),
        }
       );
    }


    public bool SendKenticoEmailTemplate(string emailTemplateName, int siteID, dynamic model, EmailFormatEnum emailFormat = EmailFormatEnum.Html)
    {

        if (string.IsNullOrWhiteSpace(emailTemplateName))
        {
            return false;
        }

        var emailTemplate = CMS.EmailEngine.EmailTemplateProvider.GetEmailTemplate(emailTemplateName, siteID);
        var emailMacros = CMS.MacroEngine.MacroResolver.GetInstance();
        var properties = model.GetType().GetProperties();
        foreach (var property in properties)
        {
            string svalue = property.GetValue(model, null) as string;
            emailMacros.SetNamedSourceData(property.Name, property.GetValue(model, null));
        }

        QueryDataParameters oReceiveDoc = new QueryDataParameters();
        oReceiveDoc.Add("@ItemID", customTableForm.ItemID);

        var oQueryReceiveDoc = new DataQuery(EmailQueryName);
        oQueryReceiveDoc.Parameters = oReceiveDoc;

        DataSet oDataSetReceiveDoc = oQueryReceiveDoc.Result;

        string recipient = (oDataSetReceiveDoc.Tables.Count > 0 && oDataSetReceiveDoc.Tables[0].Rows.Count > 0) ? oDataSetReceiveDoc.Tables[0].Rows[0]["ContactEmail"].ToString() : null;
        
        if (recipient!=null && emailTemplate!=null)
        {
            var message = new CMS.EmailEngine.EmailMessage
            {
                EmailFormat = emailFormat,
                From = emailTemplate.TemplateFrom,
                Recipients = recipient,
                Subject = emailTemplate.TemplateSubject,
                BccRecipients = emailTemplate.TemplateBcc,
                CcRecipients = emailTemplate.TemplateCc,
            };

            foreach (DataRow oDataRowReceiveDoc in oDataSetReceiveDoc.Tables[0].Rows)
            {
                if (!oDataRowReceiveDoc["Data"].ToString().Equals(""))
                {
                    byte[] bytes;
                    bytes = (byte[])oDataRowReceiveDoc["Data"];
                    System.IO.MemoryStream attachmentStream = new System.IO.MemoryStream(bytes, false);

                    Attachment attachment = new Attachment(attachmentStream, oDataRowReceiveDoc["FileName"].ToString());
                    message.Attachments.Add(attachment);
                }
            }

            try
            {
                CMS.EmailEngine.EmailSender.SendEmail(CMS.SiteProvider.SiteContext.CurrentSiteName, message, emailTemplateName, emailMacros, false);
            }
            catch (System.Exception exception)
            {
                CMS.EventLog.EventLogProvider.LogEvent(CMS.EventLog.EventType.ERROR,
                    "EmailService.SendKenticoEmailTemplate",
                    "SendEmailFailed",
                    exception.Message);

                return false;
            }
        }

        return true;
    }

    #endregion
}
