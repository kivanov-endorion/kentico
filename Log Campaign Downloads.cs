
<%@ Import Namespace="CMS.DocumentEngine" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="CMS.DataEngine" %>
<%@ Import Namespace="CMS.PortalEngine" %>
<%@ Import Namespace="CMS.PortalEngine.Web.UI" %>
<%@ Import Namespace="CMS.Helpers" %>
<%@ Import Namespace="CMS.Membership" %>

<%

if((PortalContext.ViewMode.ToString()=="LiveSite")|| (PortalContext.ViewMode.ToString()=="EditLive")){

    if (!user.IsPublic()) // only proceed if user is authenticated
    {

        // Get DB connection handle
        GeneralConnection conn = ConnectionHelper.GetConnection();
    
        string Name=ValidationHelper.GetString(CurrentUser["FirstName"],"")+" "+ValidationHelper.GetString(CurrentUser["LastName"],"");
        string Email=ValidationHelper.GetString(CurrentUser["Email"],"");
        string CompanyCd=ValidationHelper.GetString(CurrentUser["imCompanyCd"],"");
        string CustomerNumber=ValidationHelper.GetString(CurrentUser["imBranchNbr"],"")+ValidationHelper.GetString(CurrentUser["imCustomerNbr"],"");
        string Company=ValidationHelper.GetString(CurrentUser["imCustName"],"");
        string SK_Cust=0+ValidationHelper.GetString(CurrentUser["imSK_Cust"],"");
        string CampaignKit=0+ValidationHelper.GetString(CampaignKit.Text,"");

        int SK_Valid=ValidationHelper.GetInteger(CurrentUser["imSK_Valid"],0);
        int SiteID=ValidationHelper.GetInteger(CurrentSite["ID"],0);


        // log visit
        QueryDataParameters logParams = new QueryDataParameters();
        logParams.Add("@Name",Name);
        logParams.Add("@Email",Email);
        logParams.Add("@CompanyCd",CompanyCd);
        logParams.Add("@CustomerNumber",CustomerNumber);
        logParams.Add("@Company",Company);
        logParams.Add("@SK_Valid",SK_Valid);
        logParams.Add("@SK_Cust",SK_Cust);
        logParams.Add("@SiteID",SiteID);
        logParams.Add("@CampaignKit",CampaignKit);

        

                
        var logQuery = new DataQuery("oneIM.Campaign.LogDownloads");
        logQuery.Parameters = logParams;
        DataSet d_insertLog = logQuery.Result;

    } // IsPublic Check end

} // ViewMode Check End

%>
