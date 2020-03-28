using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

using CMS.Base;
using CMS.PortalControls;
using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.Membership;
using CMS.DataEngine;
using CMS.SiteProvider;
using CMS.FormEngine;
using CMS.Helpers;
using CMS.IO;
//using CMS.IO;

public partial class Fileuploadcustomtable : CMSAbstractWebPart
{
    #region "Constants"

    private const string FORBIDDEN_EXTENSIONS = ";aspx;ashx;asp;cshtml;vbhtml;";

    #endregion
    
    #region "Properties"

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public int ItemID
    {
        get
        {
            return ValidationHelper.GetInteger(this.GetValue("ItemID"), 0);
        }
        set
        {
            this.SetValue("ItemID", value);
        }
    }

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public string JavascriptAfter
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("JavascriptAfter"), "");
        }
        set
        {
            this.SetValue("JavascriptAfter", value);
        }
    }

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public bool GenerateScriptTags
    {
        get
        {
            return ValidationHelper.GetBoolean(this.GetValue("GenerateScriptTags"), false);
        }
        set
        {
            this.SetValue("GenerateScriptTags", value);
        }
    }

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public string SaveBtnCSSClass
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("SaveBtnCSSClass"), "");
        }
        set
        {
            this.SetValue("SaveBtnCSSClass", value);
        }
    }


    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public string SaveBtnCaption
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("SaveBtnCaption"), "save");
        }
        set
        {
            this.SetValue("SaveBtnCaption", value);
        }
    }

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public string Allowed_Extensions
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("Allowed_Extensions"), "");
        }
        set
        {
            this.SetValue("Allowed_Extensions", value);
        }
    }

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public string Extensions
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("Extensions"), "");
        }
        set
        {
            this.SetValue("Extensions", value);
        }
    }

    ///// <summary>
    ///// Gets or sets the shared secret key
    ///// </summary>
    //public string AllowedExtensions
    //{
    //    get
    //    {
    //        return ValidationHelper.GetString(this.GetValue("AllowedExtensions"), "");
    //    }
    //    set
    //    {
    //        this.SetValue("AllowedExtensions", value);
    //    }
    //}

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public int ReferenceID
    {
        get
        {
            return ValidationHelper.GetInteger(this.GetValue("ReferenceID"), 0);
           
        }
        set
        {
            this.SetValue("ReferenceID", value);
        }
    }

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public string GroupID
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("GroupID"), "");

        }
        set
        {
            this.SetValue("GroupID", value);
        }
    }

    #endregion


    #region "Methods"

    /// <summary>
    /// Returns true if user control is valid.
    /// </summary>
    public bool IsValid()
    {
        // Test if file has allowed file-type
        if ((uploader.PostedFile != null) && (!String.IsNullOrEmpty(uploader.PostedFile.FileName.Trim())))
        {
            //string customExtension = ValidationHelper.GetString(GetValue("extensions"), String.Empty);
            string customExtension = Extensions;
           // ltlPlaceholder.Text = customExtension + " | " + AllowedExtensions+" | "+Allowed_Extensions;
            string extensions = null;
          

            if (CMSString.Compare(customExtension, "custom", true) == 0)
            {
                //extensions = ValidationHelper.GetString(GetValue("allowed_extensions"), String.Empty);
                extensions = Allowed_Extensions;
            }

            string ext = CMS.IO.Path.GetExtension(uploader.PostedFile.FileName);
            //if (!IsFileTypeAllowed(ext, extensions))
            if (!UploadHelper.IsExtensionAllowed(ext, extensions))
            {

                // Add global allowed file extensions from Settings
                if (extensions == null)
                {
                    extensions += ";" + SettingsKeyInfoProvider.GetStringValue(SiteContext.CurrentSiteName + ".CMSUploadExtensions");

                }

                extensions = (extensions.TrimStart(';')).TrimEnd(';').ToLowerCSafe();

                // Remove forbidden extensions
                var allowedExtensions = new List<string>(extensions.Split(';'));
                foreach (string extension in FORBIDDEN_EXTENSIONS.Split(';'))
                {
                    if (allowedExtensions.Contains(extension))
                    {
                        allowedExtensions.Remove(extension);
                    }
                }

                ltlErrorLabel.Text += string.Format(ResHelper.GetString("BasicForm.ErrorWrongFileType"), ext.TrimStart('.'), string.Join(", ", allowedExtensions));
                return false;
            }

        }

        return true;

    }  

    protected void uploader_OnUploadFile(object sender, EventArgs e)
    {


        if (IsValid())
        {


            // Prepare the parameters
            // string folderName = "Custom" + String.Join(" ", SqlHelper.GetSafeQueryString(updateUser.UserName).Split(' '));
            string fileName = uploader.PostedFile.FileName;

            // string filePath = "~/" + SiteContext.CurrentSiteName + "/media/" + library.LibraryFolder + "/" + folderName;            
            //string filePath = "~/" + SiteContext.CurrentSiteName + "/media/" + folderName;

            //string fullPath = filePath + "/" + fileName;

            //check directory exist, if not create it

            //save file
            // uploader.PostedFile.SaveAs(Server.MapPath(fullPath));

            System.IO.Stream fs = uploader.PostedFile.InputStream;
            BinaryReader br = new BinaryReader(fs);
            Byte[] bytes = br.ReadBytes((Int32)fs.Length);

            UserInfo UpdateUser = UserInfoProvider.GetUserInfo(MembershipContext.AuthenticatedUser.UserID);

            int UserID = UpdateUser.UserID;

            CMS.IO.FileInfo file = CMS.IO.FileInfo.New(uploader.PostedFile.FileName);

            //insert the file into database
            GeneralConnection conn = ConnectionHelper.GetConnection();
            string strQuery = "insert into oneIM_CCPDocuments( CCPHeaderID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen,FileName, Data, FileExtension, FileMimeType, FileSize, ItemGUID, GroupID)" +
               " values (@RefID, @UserID, GetDate(), @UserID, GetDate(), @Name, @Data, @FileExtension, @FileMimeType, @FileSize, NEWID(), @GroupID )";

            // DataSet data_reg = conn.ExecuteQuery(strQuery, null, QueryTypeEnum.SQLQuery, false);

            //ltlPlaceholder.Text = strQuery;

            //uploader.CurrentFileName = fileName;


            QueryDataParameters parameters = new QueryDataParameters();
            parameters.Add("@Name", fileName);
            parameters.Add("@Data", bytes);
            parameters.Add("@UserID", UserID);
            parameters.Add("@RefID", ReferenceID);
            parameters.Add("@GroupID", GroupID);

            parameters.Add("@FileExtension", file.Extension);
            parameters.Add("@FileMimeType", uploader.PostedFile.ContentType);
            parameters.Add("@FileSize",uploader.PostedFile.ContentLength);

            // query.Parameters = parameters;

            DataSet data_reg = conn.ExecuteQuery(strQuery, parameters, QueryTypeEnum.SQLQuery, false);



            if (JavascriptAfter != "")
            {


                if (GenerateScriptTags)
                {
                    JavascriptAfter = ScriptHelper.GetScript(JavascriptAfter);
                }

                ltlInlineScript.Text = JavascriptAfter;


            }


        }
     
       
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
            
            hdnPostback.Text = SaveBtnCaption;
            hdnPostback.CssClass = hdnPostback.CssClass + " " + SaveBtnCSSClass;
            uploader.Style.Add("float", "left");
            //uploader.CssClass += " "+ SaveBtnCSSClass;
            
            


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



