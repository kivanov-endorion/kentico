CMSAbstractWebPart webpart = PagePlaceholder.FindWebPart("On_lineFormPlus");
webpart.SetValue("visible",false); 

ltlPlaceholder.Text=webpart.GetValue("ControlID").ToString();
ltlPlaceholder.Visible=true;

// Gets the value of the Web part container property of 'WebPart1'
string wp1Container = ValidationHelper.GetString(webpart.GetValue("Container"), "");

// Sets the Web part container property of the current web part
this.SetValue("Container", wp1Container);



DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(CustomTable);
if (customTable != null)
{
    // hole custom table name
    string customTableClassName = customTable.ClassName;

    // Prepare the parameters 
    string where = ItemID=" + QueryHelper.GetInteger(ItemKeyName, 0); 

    int topN = 1;
    string columns = "ItemID,Service";

    // Get the data set according to the parameters 
    ObjectQuery <CustomTableItem> dataSet = CustomTableItemProvider.GetItems(customTableClassName, where, null, topN, columns);
    int itemID = 0;

    // Get the data set according to the parameters 
    ObjectQuery<CustomTableItem> dataSet3 = CustomTableItemProvider.GetItems(subformTable, where, null, topN, "ItemID");
    int ItemID = 0;
        
    if (!DataHelper.DataSourceIsEmpty(dataSet3))
    {
        // Get the custom table item ID
        ItemID = ValidationHelper.GetInteger(dataSet3.Tables[0].Rows[0][0], 0);
    }


// Add parameter to url
URLHelper.Redirect(URLHelper.AddParameterToUrl(RequestContext.CurrentURL, ItemKeyName, form.ItemID.ToString()));