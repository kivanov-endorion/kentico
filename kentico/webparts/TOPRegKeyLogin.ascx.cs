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
using CMS.DataEngine;
using CMS.Helpers;
using CMS.Membership;
using CMS.MembershipProvider;
using CMS.DocumentEngine;

public partial class oneIM_Webparts_TOPRegKeyLogin : CMSAbstractWebPart
{
    #region "Properties"

    /// <summary>
    /// Gets or sets the EventCode
    /// </summary>
    public string EventCode
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("EventCode"), "");
        }
        set
        {
            this.SetValue("EventCode", value);
        }
    }


    /// <summary>
    /// Gets or sets the DefaultTargetURL
    /// </summary>
    public string DefaultTargetURL
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("DefaultTargetURL"), "");
        }
        set
        {
            this.SetValue("DefaultTargetURL", value);
        }
    }

    /// <summary>
    /// Gets or sets the SubmitButtonCaption
    /// </summary>
    public string SubmitButtonCaption
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("SubmitButtonCaption"), "");
        }
        set
        {
            this.SetValue("SubmitButtonCaption", value);
        }
    }

    /// <summary>
    /// Gets or sets the PlaceholderText
    /// </summary>
    public string PlaceholderText
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("PlaceholderText"), "");
        }
        set
        {
            this.SetValue("PlaceholderText", value);
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

            if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
            {
                // Get DB connection handle
               // GeneralConnection conn = ConnectionHelper.GetConnection();


                var http_method = Request.HttpMethod;
                var c = HttpContext.Current;
                if (Page.IsPostBack)
                {
                    // HTTP Post
                    //System.Web.HttpContext.Current.Response.Write("Postback"+Request["Key"]);
                }
                else
                {
                    // HTTP Get
                }

                //ltlPlaceholder.Text = Session["DETOPRegKeyCheck"].ToString();
                

                bool IsChecked= false;

                string szDETOPRegKeyCheck = ValidationHelper.GetString(SessionHelper.GetValue("DETOPRegKeyCheck"), string.Empty);

                if (szDETOPRegKeyCheck == "True")
                {
                    IsChecked = true;
                }


                pnlVoucherLogin.Visible = !IsChecked;

                //ltlPlaceholder.Text = string.Empty;
               // lblUserName.Text = GetString("logonform.username");
                
                lbluserpw.Text = "{$LogonForm.password$}";
                btnSubmit1.Text = SubmitButtonCaption;
                //userpw.WatermarkText = PlaceholderText;

               

     
               
                if (http_method == "POST")
                {
                                   
                    //string userid = Request["userid"];
                    string szUserpw = Request["userpw"];

                    //string userid = QueryHelper.GetString("userid", string.Empty);
                    //string szUserpw = QueryHelper.GetString("userpw", string.Empty);
                    

                    // check if User is PAX of program

                    //string sql0 = "SELECT * FROM oneIM_accessvouchers av WHERE  VoucherName ='" + userid + "'  AND VoucherCode='" + userpw + "'";


                    string sql0 = "SELECT * FROM MARCOM.dbo.TOPEVENT_EINLADUNG WHERE REGKEY = '" + szUserpw + "' AND VERANSTALTUNG = '" + EventCode + "'"; 


                    //System.Web.HttpContext.Current.Response.Write(sql0);

                    string ItemID = "";
                    string RegKey = "";


                    DataSet data_reg = ConnectionHelper.ExecuteQuery(sql0, null, QueryTypeEnum.SQLQuery, false);
                    foreach (DataRow dr in data_reg.Tables[0].Rows)
                    {
                        ItemID = dr["bmkRegID"].ToString();
                        RegKey = dr["REGKEY"].ToString();
                    }


                    if (ItemID != "")
                    {
                        SessionHelper.SetValue("DETOPRegKeyCheck", true);
                        SessionHelper.SetValue("DETOPRegKey", RegKey);
                        //Response.Redirect(Request.RawUrl);
                        Response.Redirect(DefaultTargetURL);
                    }
                    else
                    {
                        SessionHelper.SetValue("DETOPRegKeyCheck", false);
                        SessionHelper.SetValue("DETOPRegKey", string.Empty);
                        FailureText.Text = GetString("logonform.LoginFailedText");
                    }


                }
                else
                {
                    if (Session["DETOPRegKeyCheck"] == "")
                    {
                        SessionHelper.SetValue("DETOPRegKeyCheck", false);
                        SessionHelper.SetValue("DETOPRegKey", string.Empty);
                    }
                    if (Request["logoff"] == "off")
                    {
                        SessionHelper.SetValue("DETOPRegKeyCheck", false);
                        SessionHelper.SetValue("DETOPRegKey", string.Empty);
                        string url = Request.RawUrl;

                        url = url.Substring(0, url.IndexOf("?"));

                        Response.Redirect(url);
                    }
                               

                } // end if POST    

            } // end if ViewMode
            


        } // end if Stop rPocessing
    } // end precedure



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



