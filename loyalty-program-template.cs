<cms:CMSWebPartZone ZoneID="zoneHeader" runat="server" visible="true"/>
<cms:CMSWebPartZone ZoneID="zoneTemp" runat="server" visible="true"/>

<%@ Import Namespace="CMS.DocumentEngine" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="CMS.DataEngine" %>
<%@ Import Namespace="CMS.PortalEngine" %>
<%@ Import Namespace="CMS.Helpers" %>

<%

//if(CMS.PortalEngine.PortalContext.ViewMode.ToString()=="LiveSite"){

if((PortalContext.ViewMode.ToString()=="LiveSite")|| (PortalContext.ViewMode.ToString()=="EditLive")){


    // Get DB connection handle
    GeneralConnection conn = ConnectionHelper.GetConnection();
    /*
    string aktion=DocumentContext.CurrentDocument["ProgramID"].ToString();
    string CustomerNumber=CurrentUser["imBranchNbr"].ToString()+CurrentUser["imCustomerNbr"].ToString();
    string imBranchNbr=CurrentUser["imBranchNbr"].ToString();
    string imCustomerNbr=CurrentUser["imCustomerNbr"].ToString();

    */
    string aktion=ValidationHelper.GetString(DocumentContext.CurrentDocument["ProgramID"],"");
    string CustomerNumber=ValidationHelper.GetString(CurrentUser["imBranchNbr"],"")+ValidationHelper.GetString(CurrentUser["imCustomerNbr"],"");
    string imBranchNbr=ValidationHelper.GetString(CurrentUser["imBranchNbr"],"");
    string imCustomerNbr=ValidationHelper.GetString(CurrentUser["imCustomerNbr"],"");


    //CustomerNumber=CurrentUser["imBranchNbr"].ToString()+CurrentUser["imCustomerNbr"].ToString();

    //if(CustomerNumber==""){
     // imBranchNbr="85";
      //imCustomerNbr="052522";
    //}


 

    var http_method=Request.HttpMethod;
    var c = HttpContext.Current;
    

    if(http_method=="POST"){

       // check if User is PAX of program
      
      string sql0="SELECT R.ItemID RegID FROM oneIM_LoyaltyprogramRegistration R WHERE  fgn_aktion ='"+aktion+"'  AND R.CustomerNumber='"+imBranchNbr+imCustomerNbr+"'";
      //System.Web.HttpContext.Current.Response.Write(sql0);

      string RegID="";
      DataSet data_reg = ConnectionHelper.ExecuteQuery(sql0, null, QueryTypeEnum.SQLQuery, false);
      foreach (DataRow dr in data_reg.Tables[0].Rows)
      {
         RegID=dr["RegID"].ToString();           
      }
      // System.Web.HttpContext.Current.Response.Write("RegID: "+RegID);

      if(RegID!=""){

       QueryDataParameters parameters = new QueryDataParameters();
       parameters.Add("@fgn_aktion", aktion);
       parameters.Add("@CustomerNumber",CustomerNumber);
          
       var query = new DataQuery("oneIM.Loyaltyprogram.InsertPAX2Program");
       query.Parameters = parameters;
       DataSet data_insert = query.Result;
       System.Web.HttpContext.Current.Response.Write(query.GetFullQueryText());
       if(data_insert!=null){
         //System.Web.HttpContext.Current.Response.Write("SQL: ");
         // System.Web.HttpContext.Current.Response.Write(query.GetFullQueryText());
          
          Response.Redirect(Request.RawUrl);

       } // end if data_insert != null


      
      }// end if RegID

    } // end if POST





   // System.Web.HttpContext.Current.Response.Write(CMS.PortalEngine.PortalContext.ViewMode);
   //   System.Web.HttpContext.Current.Response.Write(CurrentDocument["ProgramID"]);


    // check if User is PAX of program

    // AND CCd='"+CurrentUser["imCompanyCd"]+"'
   string sql="SELECT TOP 1 * FROM marcom.dbo.tbl_arc_teilnehmer WHERE  fgn_aktion ='"+aktion+"'   AND branche='"+imBranchNbr+"' AND  KDNr='"+imCustomerNbr+"'";
   //System.Web.HttpContext.Current.Response.Write(sql);
    /*
    QueryDataParameters parameters1 = new QueryDataParameters();
    parameters1.Add("@fgn_aktion", aktion);
    parameters1.Add("@branche",imBranchNbr);
    parameters1.Add("@KDNr",imCustomerNbr);  
    var qryGetPAX = new DataQuery("DE.Transformations.GetPAX");
    
    qryGetPAX.Parameters = parameters1;
    DataSet data_GetPax = qryGetPAX.Result;


    System.Web.HttpContext.Current.Response.Write(qryGetPAX.GetFullQueryText());
    */

    



    string userID="";
    
    // check selection method
    string sql2="SELECT TOP 1 tln_kz FROM marcom.dbo.tbl_arc_aktionen WHERE  id_aktionen ='"+aktion+"'";
    string selection_method="";



    if (conn != null)
    {
      DataSet data = ConnectionHelper.ExecuteQuery(sql, null, QueryTypeEnum.SQLQuery, false);
      foreach (DataRow dr in data.Tables[0].Rows)
      {
         userID=dr["id_teilnehmer"].ToString();           
      }


      DataSet data_aktionen = ConnectionHelper.ExecuteQuery(sql2, null, QueryTypeEnum.SQLQuery, false);
      foreach (DataRow dr in data_aktionen.Tables[0].Rows)
      {
         selection_method=dr["tln_kz"].ToString();           
      }


    }


  //if(CurrentUser.CheckPrivilegeLevel(UserPrivilegeLevelEnum.GlobalAdmin))
  CMSWebPartZone zoneRegform = PagePlaceholder.FindZone("zoneAnmeldung");
  CMSWebPartZone zoneAccount = PagePlaceholder.FindZone("zoneKonto");
  CMSWebPartZone zoneSorry = PagePlaceholder.FindZone("zoneSorry");
  CMSWebPartZone zoneSecondNavSelected = PagePlaceholder.FindZone("zoneSecondNavSelected");
  CMSWebPartZone zoneSecondNavNonSelected = PagePlaceholder.FindZone("zoneSecondNavNonSelected");

  if(userID==""){ // no userID
    
    // check which selection method will be applied
    if(selection_method=="S"){ // only customers which are 'qualified'
        
        // check selection method
        string sql3="SELECT TOP 1 * FROM marcom.dbo.tbl_arc_basis WHERE status='qualified' AND fgn_aktion ='"+aktion+"' AND CUST_NBR='"+imBranchNbr+imCustomerNbr+"'";
        string basis_id="";
        DataSet data_aktionen = ConnectionHelper.ExecuteQuery(sql3, null, QueryTypeEnum.SQLQuery, false);
        foreach (DataRow dr in data_aktionen.Tables[0].Rows)
        {
           basis_id=dr["id"].ToString();           
        }

        if(basis_id!=""){

          //System.Web.HttpContext.Current.Response.Write("RegID: "+sql3);
          zoneRegform.SetValue("visible", true);
          zoneSorry.SetValue("visible", false);
          zoneSecondNavNonSelected.SetValue("visible", false);
          zoneSecondNavSelected.SetValue("visible", true);



        }else{
          zoneRegform.SetValue("visible", false);
          zoneSorry.SetValue("visible", true);
          zoneSecondNavNonSelected.SetValue("visible", true);
          zoneSecondNavSelected.SetValue("visible", false);
        } // end if basisi_id

        


    }else{ // all customers
        // check selection method
        string sql3="SELECT TOP 1 * FROM marcom.dbo.tbl_arc_basis WHERE status='exclused' AND fgn_aktion ='"+aktion+"' AND CUST_NBR='"+imBranchNbr+imCustomerNbr+"'";
        string basis_id="";
        DataSet data_aktionen = ConnectionHelper.ExecuteQuery(sql3, null, QueryTypeEnum.SQLQuery, false);
        foreach (DataRow dr in data_aktionen.Tables[0].Rows)
        {
           basis_id=dr["id"].ToString();           
        }

        if(basis_id!=""){
          zoneRegform.SetValue("visible", false);
          zoneSorry.SetValue("visible", true);
          zoneSecondNavNonSelected.SetValue("visible", true);
          zoneSecondNavSelected.SetValue("visible", false);

        }else{
          zoneRegform.SetValue("visible", true);
          zoneSorry.SetValue("visible", false);
          zoneSecondNavNonSelected.SetValue("visible", false);
          zoneSecondNavSelected.SetValue("visible", true);
        } // end if basisi_id



    }

      
    // Prüfen ob anmeldeberechtigt
   
    zoneAccount.SetValue("visible", false);
    
  }else{
    
    // Anmeldung und Sorry ausblenden
    zoneRegform.SetValue("visible", false);
    zoneSorry.SetValue("visible", false);
    zoneSecondNavNonSelected.SetValue("visible", false);
    zoneSecondNavSelected.SetValue("visible", true);

    // Konto einblenden
    zoneAccount.SetValue("visible", true);
    

  } // end if userID



} // end if ViewMode LiveSite
%>
<cms:CMSWebPartZone ZoneID="zoneBreadcrumbs" runat="server"  />
<cms:CMSWebPartZone ZoneID="zoneSecondNavSelected" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneSecondNavNonSelected" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneAnmeldung" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneIntro" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneSorry" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneKonto" runat="server"/>

<cms:CMSWebPartZone ZoneID="zoneProducts" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneSubpageText" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneSubPage" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneServices" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneNews" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneEvents" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneFAQ" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneContact" runat="server" />

<cms:CMSWebPartZone ZoneID="zoneSub" runat="server"  />

<div>  
  <cms:CMSWebPartZone ZoneID="zoneInvisible" runat="server" />
</div>
