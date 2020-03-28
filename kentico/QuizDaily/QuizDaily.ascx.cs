using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Cryptography;
using System.Text;

using CMS.Controls;
using CMS.ExtendedControls;
using CMS.DataEngine;
using CMS.Helpers;
using CMS.PortalControls;
using CMS.PortalEngine;
using CMS.Base;
using CMS.Membership;
using CMS.MembershipProvider;
using CMS.DocumentEngine;

public partial class QuizDaily : CMSAbstractWebPart
{
    #region "Properties"

    /// <summary>
    /// For public or authenticated users.
    /// </summary>
    public bool IsPublic
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("IsPublic"), false);
        }
        set
        {
            SetValue("IsPublic", value);
        }
    }

    /// <summary>
    /// Whether the campaign includes points.
    /// </summary>
    public bool HasPoints
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("HasPoints"), false);
        }
        set
        {
            SetValue("HasPoints", value);
        }
    }

    /// <summary>
    /// Gets or sets the Aktion ID
    /// </summary>
    public int Aktion
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("Aktion"), 0);
        }
        set
        {
            SetValue("Aktion", value);
        }
    }

    /// <summary>
    /// Selects how to targets users
    /// </summary>
    public string UserOption
    {
        get
        {
            return ValidationHelper.GetString(this.GetValue("UserOption"), "");
        }
        set
        {
            this.SetValue("UserOption", value);
        }
    }

    /// <summary>
    /// Gets or sets the name of the transforamtion which is used for displaying the results.
    /// </summary>
    public string TransformationName
    {
        get
        {
            return DataHelper.GetNotEmpty(GetValue("TransformationName"), "");
        }
        set
        {
            SetValue("TransformationName", value);
        }
    }


     /// <summary>
    /// Gets or sets the name of the transforamtion which is used when there are no questions set.
    /// </summary>
    public string TransformatioNameNoQuestion
    {
        get
        {
            return DataHelper.GetNotEmpty(GetValue("TransformatioNameNoQuestion"), "");
        }
        set
        {
            SetValue("TransformatioNameNoQuestion", value);
        }
    }    

    #endregion



    #region "Methods"

    /// <summary>
    /// Get Field from POST
    /// </summary>
    public string getPost(string fieldName, string defaultVal)
    {

        string rtrnVal = string.Empty;
        string myDefault = ValidationHelper.GetString(defaultVal, "");
        if (Request.Form[fieldName] != null)
        {
            try
            {
                rtrnVal = ValidationHelper.GetString(Request.Form[fieldName].ToString(), defaultVal);
            }
            catch (System.IO.IOException e)
            {
                rtrnVal = myDefault;
            }
        }
        else
        {
            rtrnVal = myDefault;
        }

        return rtrnVal;

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

          if ((PortalContext.ViewMode == ViewModeEnum.LiveSite) || (PortalContext.ViewMode == ViewModeEnum.Preview))
          {
               CurrentUserInfo user = MembershipContext.AuthenticatedUser;

               if (!user.IsPublic()) // only proceed if user is authenticated
               {

                   // Add query repeater to the filter collection
                   CMSControlsHelper.SetFilter(ValidationHelper.GetString(GetValue("WebPartControlID"), ID), repItems);
                    string localeCode = "de_DE";

                    //	User data

                    string CCD = user.GetValue("imCompanyCd", "DE");
                    string BRN = user.GetValue("imBranchNbr", "44");
                    string KDNr = user.GetValue("imCustomerNbr", "459998");

                    int imSK_Valid = Int32.Parse(user.GetValue("imSK_Valid", "0"));
                    int imSK_Cust = Int32.Parse(user.GetValue("imSK_Cust", "0"));

                    //	Aktionskonto und Globals Bonuskonto abfragen (Legacy)

                    //  string ACC = string.Concat(Aktion, CCD, BRN, KDNr);

                    string responseFromServer = "";

                    string WhereCondition = " fgn_aktion=0" + Aktion + " AND id not in(SELECT fgn_frage from marcom.dbo.tbl_arc_tagesfrage_antwort where sk_cust=" + imSK_Cust + ")";
                    
                    string query2run = "oneIM.Loyaltyprogram.QuizDailyGetQuestion1";
                    QueryDataParameters parameters1 = new QueryDataParameters();
                    parameters1.Add("@campaignID", Aktion);

                    var query = new DataQuery(query2run);
                    //query.Where(" fgn_aktion=0" + Aktion + " AND id not in(SELECT fgn_frage from marcom.dbo.tbl_arc_tagesfrage_antwort where sk_cust=" + imSK_Cust + ")");
                    query.Where(WhereCondition);

                    //ltlPlaceholder.Text = query.GetFullQueryText();

                    //query.Parameters = parameters1;

                    DataSet data_curQuestion = query.Result;

                    string QToday = string.Empty;
                    string QID = string.Empty;
                    string szQuestion = string.Empty;
                    int wQuestionLeft = 0;
                    
                    string qvalue = string.Empty;
                    string answer1 = string.Empty;
                    string answer2 = string.Empty;
                    string answer3 = string.Empty;
                    string answer4 = string.Empty;
                    string correct = string.Empty;                   

                    foreach (DataRow dr in data_curQuestion.Tables[0].Rows)
                    {
                        QToday = dr["QToday"].ToString();
                        QID = dr["id"].ToString();
                        szQuestion =  dr["frage"].ToString();
                        answer1 = dr["antw_A"].ToString();
                        answer2 = dr["antw_B"].ToString();
                        answer3 = dr["antw_C"].ToString();
                        answer4 = dr["antw_D"].ToString();
                        correct = dr["richtig"].ToString();
                        qvalue = dr["punktwert"].ToString();
                        wQuestionLeft = Int32.Parse(dr["Total"].ToString());
                    }


                    

                    repItems.QueryName = query2run;
                    repItems.WhereCondition = WhereCondition;


                    // Check if User has a record for QID in
                    // tbl_arc_tagesfrage_antwort

                    string query4answers = "oneIM.Loyaltyprogram.QuizDailyGetAnswers";
                    var query2 = new DataQuery(query4answers);

                    // UserOption 1 = UserID (33732)
                    // UserOption 2 = imSK_Cust (117645)
                    // UserOption 3 = Other

                    if (UserOption=="1")
                    {
                        query2.Where("Q.id=0"+QID+" AND A.UserID="+user.UserID);
                    }
                    else
                    {
                        if (UserOption=="2")
                        {
                            query2.Where("Q.id=0"+QID+" AND A.SK_CUST="+imSK_Cust);
                        }
                        else
                        {
                            query2.Where("Q.id=0"+QID);
                        }
                    }

                    DataSet data_curAnswer = query2.Result;

                    string TN = string.Empty;
                    string msg = string.Empty;

                    foreach (DataRow dr in data_curAnswer.Tables[0].Rows)
                    {
                        TN = dr["fgn_teilnehmer"].ToString();
                    }
                    
                    if (TN != "")
                    {
                        string localizedResult = ResHelper.GetString("1IM.Lottery.YouHaveAlreadyAnswered");
                        ltlPlaceholder.Text = localizedResult;
                    }                    
                    else {
                       
                        if (QToday != "")
                        {

                            // Show form or nest question date [Repeater]

                            if (QToday == "-1")  
                            {
                                repItems.TransformationName = TransformationName;
                            }
                            else
                            {
                                repItems.TransformationName = TransformatioNameNoQuestion;
                            }

                        //  repItems.QueryName = query2run;

                        }
                        else
                        {
                            // show Not Questions available for this program
                            string localizedResult = ResHelper.GetString("1IM.Lottery.NoQuestionsAvailable");
                            ltlPlaceholder.Text = localizedResult;

                        }
                    } // End IF TN teilnehmer


                    var http_method = Request.HttpMethod;
                    var c = HttpContext.Current;


                    if (http_method == "POST")
                    {
                        string answer = getPost("quiz", "");
                        string questId = getPost("questId", "");
                        string score = "0";

                        if (questId != "")
                        {

                            var qryCurrentQuest = new DataQuery("oneIM.Loyaltyprogram.QuizDailyGetQuestion");
                            QueryDataParameters qryCurrentQuestParam = new QueryDataParameters();
                            qryCurrentQuestParam.Add("@id", questId);
                            qryCurrentQuest.Parameters = qryCurrentQuestParam;

                            DataSet data_cqryCurrentQuest = qryCurrentQuest.Result;

                            foreach (DataRow dr_questId in data_cqryCurrentQuest.Tables[0].Rows)
                            {

                                correct = dr_questId["richtig"].ToString();
                                qvalue = dr_questId["punktwert"].ToString();

                                if (answer == correct)
                                {
                                    // string localizedResult = ResHelper.GetString("1IM.Lottery.NoQuestionsAvailable")+answer;
                                    // ltlPlaceholder.Text = localizedResult;

                                    repItems.TransformationName = TransformatioNameNoQuestion;
                                    score = "1";

                                    string sql0 = "oneIM.Loyaltyprogram.QuizDailyPutAnswers";
                                    QueryDataParameters parameters2 = new QueryDataParameters();
                                    parameters2.Add("@answerID", Int32.Parse(questId));
                                    parameters2.Add("@score", Int32.Parse(score));
                                    parameters2.Add("@participant", TN);
                                    parameters2.Add("@userid", user.UserID);
                                    parameters2.Add("@sk_valid", imSK_Valid);
                                    parameters2.Add("@sk_cust", imSK_Cust);
                                    parameters2.Add("@points", qvalue);
                                    parameters2.Add("@answer", answer);

                                    var data_insert = new DataQuery(sql0);
                                    data_insert.Parameters = parameters2;

                                    DataSet data_curAnswer2 = data_insert.Result;
                                    foreach (DataRow dr in data_curAnswer2.Tables[0].Rows)
                                    {
                                        //ltlPlaceholder.Text = dr["result"].ToString();
                                        if (dr["result"].ToString() != "0")
                                        {

                                            if (HasPoints == true)
                                            {

                                                // Adds points to global konto

                                                string entrytype = "Gutschrift";
                                                string entrytext = "Quiz Daily";

                                                string sql1 = "oneIM.Loyaltyprogram.QuizDailyUpdateKonto";
                                                QueryDataParameters parameters3 = new QueryDataParameters();
                                                parameters3.Add("@ccd", CCD);
                                                parameters3.Add("@branch", BRN);
                                                parameters3.Add("@kdnr", KDNr);
                                                parameters3.Add("@tn", TN);
                                                parameters3.Add("@entrytype", entrytype);
                                                parameters3.Add("@entrytext", entrytext);
                                                parameters3.Add("@points", qvalue);
                                                parameters3.Add("@ergebnis", score);
                                                parameters3.Add("@campaignID", Aktion);

                                                var data_insert_konto = new DataQuery(sql1);
                                                data_insert_konto.Parameters = parameters3;
                                                DataSet data_insertKto = data_insert_konto.Result;

                                            }

                                            ltlPlaceholder.Text = ResHelper.GetString("1IM.Lottery.ThankYou");

                                        }
                                        else
                                        {
                                            //ltlPlaceholder.Text = "Reload";
                                            Response.Redirect(Request.RawUrl);
                                        }
                                        repItems.Visible = false;
                                    }

                                   
                                }
                                else
                                {
                                    score = "0";

                                    string sql0 = "oneIM.Loyaltyprogram.QuizDailyPutAnswers";
                                    QueryDataParameters parameters2 = new QueryDataParameters();
                                    parameters2.Add("@answerID", questId);
                                    parameters2.Add("@score", score);
                                    parameters2.Add("@participant", TN);
                                    parameters2.Add("@userid", user.UserID);
                                    parameters2.Add("@sk_valid", imSK_Valid);
                                    parameters2.Add("@sk_cust", imSK_Cust);
                                    parameters2.Add("@points", "0");
                                    parameters2.Add("@answer", answer);

                                    var data_insert = new DataQuery(sql0);
                                    data_insert.Parameters = parameters2;

                                    DataSet data_curAnswer2 = data_insert.Result;
                                    foreach (DataRow dr in data_curAnswer2.Tables[0].Rows)
                                    {
                                        ltlPlaceholder.Text = dr["result"].ToString();
                                        repItems.Visible = false;
                                    }

                                    string localizedResult = ResHelper.GetString("1IM.Lottery.ThankYou");
                                    ltlPlaceholder.Text = localizedResult;



                                }

                            }
                        } // end if questId.

                        if (wQuestionLeft >1)
                        {
                          Response.Redirect(Request.RawUrl);
                        }   

                    } // End IF POST

                  
               } // End IF !IsPublic

            } // end end if ViewMode

        } // end if Stop Processing

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