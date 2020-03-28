using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;

using System.Security.Cryptography;
using System.Text;

using CMS.PortalEngine;
using CMS.PortalControls;
using CMS.Helpers;
using CMS.Membership;
using CMS.MembershipProvider;
using CMS.DataEngine;




public partial class aspx_webparts_CadoozPoints : CMSAbstractWebPart
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
    /// Gets or sets the Aktion ID
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

                    // Holen Account ID aus Programm 2010

                    string CCD=user.GetValue("imCompanyCd", "DE");
                    string BRN = user.GetValue("imBranchNbr", "44");
                    string KDNr = user.GetValue("imCustomerNbr", "459998");
                    string UserID = "000";
                    string TNID;

                    string responseFromServer = "";






                    string SQL = string.Concat("SELECT id_teilnehmer FROM MARCOM.dbo.tbl_arc_teilnehmer WHERE CCD='", CCD,"' AND branche='",BRN,"' AND KDNr='",KDNr,"' AND fgn_aktion='",Aktion,"'");

                    DataSet ds = ConnectionHelper.ExecuteQuery(SQL, null, QueryTypeEnum.SQLQuery);

                    if (!DataHelper.DataSourceIsEmpty(ds))
                    {
                        TNID = ValidationHelper.GetString(ds.Tables[0].Rows[0][0], "");

                        // NCK code
                        string nck = string.Concat(BRN, KDNr, UserID, TNID);

                        // Timestamp
                        string ts = DateTime.Now.ToString("Hms");

                        // Hash
                        string hash = CalculateMD5Hash(string.Concat(SharedSecret, nck));

                        //Call zusammenbauen
                        string call = string.Concat(ReturnURL, "?id=", hash, "&login=", nck);


                        //ltlPlaceholder.Text = "Hallo "+call + " | "+ SQL;


                        // Web request vorbereiten
                        WebRequest request = WebRequest.Create(call);

                        // Response abholen
                        WebResponse response = request.GetResponse();

                        // Open the stream using a StreamReader for easy access.
                        Stream dataStream = response.GetResponseStream();
                        StreamReader reader = new StreamReader(dataStream);

                        // Read the content.
                        responseFromServer = reader.ReadToEnd();
                        
                        // Display the content.

                       

                        // Clean up the streams and the response.
                        reader.Close();
                        response.Close();
                    
                    }
                    else
                    {
                        TNID = "";
                        responseFromServer = "";
                    }



                    ltlPlaceholder.Text = responseFromServer;
                   



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



