using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Cryptography;
using System.Text;

using CMS.PortalEngine;
using CMS.PortalControls;
using CMS.Helpers;
using CMS.Membership;
using CMS.MembershipProvider;




public partial class CMSWebParts_MyWebParts_ValidateUser : CMSAbstractWebPart
{
    #region "Properties"

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public string SharedSecret
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("SharedSecret"), "");
        }
        set
        {
            this.SetValue("SharedSecret", value);
        }
    }


    /// <summary>
    /// Gets or sets the return url
    /// </summary>
    public string ReturnURL
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("ReturnURL"), "");
        }
        set
        {
            this.SetValue("ReturnURL", value);
        }
    }




    #endregion


    #region "Methods"

    /// <summary>
    /// Content loaded event handler.
    /// </summary>
    public string CalculateMD5Hash(string input)
    {
        // step 1, calculate MD5 hash from input
        MD5 md5 = MD5.Create();
        byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
        byte[] hash = md5.ComputeHash(inputBytes);
 
        // step 2, convert byte array to hex string
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < hash.Length; i++)
        {
            sb.Append(hash[i].ToString("x2"));
        }
        return sb.ToString();
    }


    /// <summary>
    /// Encode string Base64
    /// </summary>
    public static string Base64Encode(string plainText)
    {
        var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
        return System.Convert.ToBase64String(plainTextBytes);
    }


    /// <summary>
    /// Dencode string Base64
    /// </summary>
    public static string Base64Decode(string base64EncodedData)
    {
        var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
        return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
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

            if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
            {
                CurrentUserInfo user = MembershipContext.AuthenticatedUser;

                if (!user.IsPublic()) // only proceed if user is authenticated
                {


                    string userdata = string.Concat(user.GetValue("imCompanyCd", "").ToString(), "|", user.GetValue("imBranchNbr", "").ToString(), "|", user.GetValue("imCustomerNbr", "").ToString(), "|", user.UserID);
                    string userdata1 = string.Concat(user.GetValue("imCompanyCd", "").ToString(), user.GetValue("imBranchNbr", "").ToString(), user.GetValue("imCustomerNbr", "").ToString());

                    string hash = CalculateMD5Hash(SharedSecret + userdata1);

                    Response.Redirect(ReturnURL + "?hash=" + hash + "&data=" + Base64Encode(userdata), true);



                }
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



