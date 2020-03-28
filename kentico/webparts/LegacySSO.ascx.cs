using System;
using System.IO;
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
using CMS.DataEngine;



public partial class aspx_webparts_LegacySSO : CMSAbstractWebPart
{
    #region "Properties"

    /// <summary>
    /// Gets or sets the legacySeesionName
    /// </summary>
    public string legacySeesionName
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("legacySeesionName"), "");
        }
        set
        {
            this.SetValue("legacySeesionName", value);
        }
    }


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
    /// Gets or sets the shared secret key
    /// </summary>
    public string Aktion
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("Aktion"), "");
        }
        set
        {
            this.SetValue("Aktion", value);
        }
    }

    /// <summary>
    /// Gets or sets the shared secret key
    /// </summary>
    public string Program
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("Program"), "");
        }
        set
        {
            this.SetValue("Program", value);
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


    /// <summary>
    /// Gets or sets the return url
    /// </summary>
    public string IframeWidth
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("IframeWidth"), "");
        }
        set
        {
            this.SetValue("IframeWidth", value);
        }
    }

    /// <summary>
    /// Gets or sets the return url
    /// </summary>
    public string IframeHeight
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("IframeHeight"), "");
        }
        set
        {
            this.SetValue("IframeHeight", value);
        }
    }

    /// <summary>
    /// Gets or sets the return url
    /// </summary>
    public string IframeClass
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("IframeClass"), "");
        }
        set
        {
            this.SetValue("IframeClass", value);
        }
    }

    /// <summary>
    /// Gets or sets the return url
    /// </summary>
    public string IframeStyle
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("IframeStyle"), "");
        }
        set
        {
            this.SetValue("IframeStyle", value);
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

                    // Holen Account ID aus Programm 2010

                    string CCD=user.GetValue("imCompanyCd", "");
                    string BRN = user.GetValue("imBranchNbr", "");
                    string KDNr = user.GetValue("imCustomerNbr", "");
                    string UserID = "000";
                    

                    string sSourceData;
                    byte[] tmpSource;
                    byte[] tmpHash;

                    string session_id = ValidationHelper.GetString(CMS.Helpers.CookieHelper.GetValue("IMEU"), "");


                    sSourceData = session_id + SharedSecret;
                    //Anhand der Quelldaten ein Array vom Typ Byte erstellen
                    tmpSource = ASCIIEncoding.ASCII.GetBytes(sSourceData);

                    //Anhand der Quelldaten den Hash-Wert berechnen
                    tmpHash = new MD5CryptoServiceProvider().ComputeHash(tmpSource);

                   

                    System.Text.ASCIIEncoding enc = new System.Text.ASCIIEncoding();
                    string test = enc.GetString(tmpHash);

                    int i;
                    StringBuilder sOutput = new StringBuilder(tmpHash.Length);
                    for (i = 0; i <= tmpHash.Length - 1; i++)
                    {
                        sOutput.Append(tmpHash[i].ToString("X2"));
                    }

                    string sessHash = sOutput.ToString();


                    string sql;
                    sql = "DELETE FROM marcom.dbo.KenticoSSO WHERE brn='" + BRN + "' AND cust='" + KDNr + "' AND userid='" + UserID + "' AND ccd='" + CCD + "'";
                    ConnectionHelper.ExecuteQuery(sql, null, QueryTypeEnum.SQLQuery, false);

                    sql = "DELETE FROM marcom.dbo.KenticoSSO WHERE sessionhash='" + sessHash + "'";
                    ConnectionHelper.ExecuteQuery(sql, null, QueryTypeEnum.SQLQuery, false);

                    sql = "INSERT INTO marcom.dbo.KenticoSSO(sessionhash, brn, cust, userid, ccd) VALUES ('" + sessHash + "','" + BRN + "','" + KDNr + "','" + UserID + "','" + CCD + "')";
                    DataSet data_reg = ConnectionHelper.ExecuteQuery(sql, null, QueryTypeEnum.SQLQuery, false);

                    
                    if (data_reg != null)
                    {
                       
                        ReturnURL = ReturnURL + session_id;  

                        // Create IFRAME 
                        string IFRAME="<iframe src='" + ReturnURL + "' width=100 height=20 frameborder='0' style='display:none'></iframe>";
                             
                        ltlPlaceholder.Text = IFRAME;
                    


                    }



                    /*
                    string SQL = string.Concat("SELECT id_teilnehmer FROM MARCOM.dbo.tbl_arc_teilnehmer WHERE CCD='", CCD,"' AND branche='",BRN,"' AND KDNr='",KDNr,"' AND fgn_aktion='",Aktion,"'");

                    DataSet ds = ConnectionHelper.ExecuteQuery(SQL, null, QueryTypeEnum.SQLQuery);

                    if (!DataHelper.DataSourceIsEmpty(ds))
                    {
                        TNID = ValidationHelper.GetString(ds.Tables[0].Rows[0][0], "");
                    }
                    else
                    {
                        TNID = "";
                    }
                    */
                                      
                    
                    


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



