
<%@ Import Namespace="CMS.DocumentEngine" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="CMS.DataEngine" %>
<%@ Import Namespace="CMS.PortalEngine" %>
<%@ Import Namespace="CMS.Helpers" %>

<%


if((PortalContext.ViewMode.ToString()=="LiveSite")|| (PortalContext.ViewMode.ToString()=="EditLive")){


    // Get DB connection handle
    GeneralConnection conn = ConnectionHelper.GetConnection();

    string aktion=ValidationHelper.GetString(DocumentContext.CurrentDocument["ProgramID"],"");
    string CustomerNumber=ValidationHelper.GetString(CurrentUser["imBranchNbr"],"")+ValidationHelper.GetString(CurrentUser["imCustomerNbr"],"");
    string imBranchNbr=ValidationHelper.GetString(CurrentUser["imBranchNbr"],"");
    string imCustomerNbr=ValidationHelper.GetString(CurrentUser["imCustomerNbr"],"");

    string sql="SELECT TOP 1 * FROM marcom.dbo.tbl_arc_teilnehmer WHERE fgn_aktion ='"+aktion+"' AND branche='"+imBranchNbr+"' AND  KDNr='"+imCustomerNbr+"' AND GETDATE() BETWEEN ISNULL(vertrag_von, GETDATE()) AND ISNULL(vertrag_bis, GETDATE())";

    string userID="";

    if (conn != null)
    {
      DataSet data = ConnectionHelper.ExecuteQuery(sql, null, QueryTypeEnum.SQLQuery, false);
      foreach (DataRow dr in data.Tables[0].Rows)
      {
         userID=dr["id_teilnehmer"].ToString();           
      }
    }


  CMSWebPartZone zoneForm = PagePlaceholder.FindZone("zoneForm");
  CMSWebPartZone zoneIntro = PagePlaceholder.FindZone("zoneIntro");
  CMSWebPartZone zoneIntroRegistered = PagePlaceholder.FindZone("zoneIntroRegistered");
  CMSWebPartZone zoneSecondNavSelected = PagePlaceholder.FindZone("zoneSecondNavSelected");
  CMSWebPartZone zoneSecondNavNonSelected = PagePlaceholder.FindZone("zoneSecondNavNonSelected");
  CMSWebPartZone zoneSub = PagePlaceholder.FindZone("zoneSub");
  CMSWebPartZone zoneBannerCenter = PagePlaceholder.FindZone("zoneBannerCenter");
  CMSWebPartZone zoneQuiz = PagePlaceholder.FindZone("zoneQuiz");

  if(userID==""){ // no userID
    
    zoneForm.SetValue("visible", false);
    zoneSecondNavNonSelected.SetValue("visible", true);
    zoneSecondNavSelected.SetValue("visible", false);
    zoneIntro.SetValue("visible", true);
    zoneIntroRegistered.SetValue("visible", false);
    zoneBannerCenter.SetValue("visible", false);
    zoneQuiz.SetValue("visible", false);
    
  } else {
    
    zoneForm.SetValue("visible", true);
    zoneSecondNavNonSelected.SetValue("visible", false);
    zoneSecondNavSelected.SetValue("visible", true);
    zoneIntro.SetValue("visible", false);
    zoneIntroRegistered.SetValue("visible", true);
    zoneBannerCenter.SetValue("visible", true);
    zoneQuiz.SetValue("visible", true);
    

  } // end if userID



} // end if ViewMode LiveSite
%>


<cms:CMSWebPartZone ZoneID="zoneHeader" runat="server" visible="true"/>
<cms:CMSWebPartZone ZoneID="zoneTemp" runat="server" visible="true"/>
<cms:CMSWebPartZone ZoneID="zoneSecondNav" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneSecondNavSelected" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneSecondNavNonSelected" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneBreadcrumbs" runat="server"  />

<cms:CMSWebPartZone ZoneID="zoneAnmeldung" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneIntro" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneIntroRegistered" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneBannerCenter" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneSorry" runat="server"/>
<cms:CMSWebPartZone ZoneID="zoneKonto" runat="server"/>

<cms:CMSWebPartZone ZoneID="zoneSubPageText" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneProducts" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneServices" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneSubPage" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneFAQ" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneDownloads" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneNews" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneEventsHome" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneEvents" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneForm" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneQuiz" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneContact" runat="server" />

<cms:CMSWebPartZone ZoneID="zoneSub" runat="server"  />
<cms:CMSWebPartZone ZoneID="zoneInvisible" runat="server" />



zoneSecondNavSelected;zoneIntroRegistered;zoneBannerCenter;zoneKonto;zoneProducts;zoneSubPageText;zoneServices;zoneSubPage;zoneFAQ;zoneDownloads;zoneNews;zoneEventsHome;zoneForm



zoneSecondNavNonSelected;zoneIntro

zoneForm;zoneSecondNavSelected;zoneIntroRegistered;zoneBannerCenter;zoneQuiz