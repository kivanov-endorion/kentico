using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.IO.Packaging;
using System.Xml;
using CMS.CustomTables;
using CMS.DataEngine;
using CMS.Helpers;
using CMS.PortalControls;

/// <summary>
/// Please make sure to include WindowsBase library to the application web.config file:
/// <add assembly="WindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"/>
/// </summary>
public partial class CustomTableDataImport : CMSAbstractWebPart
{
    const string CUSTOM_TABLE_SYSTEM_FIELDS = "ItemID;ItemGUID;ItemCreatedBy;ItemCreatedWhen;ItemModifiedBy;ItemModifiedWhen;ItemOrder";
    const string EVENT_LOG_SOURCE = "CT_DATA_IMPORT";

    #region Public Properties

    public string CustomTableSelect
    {
        get
        {
            return ValidationHelper.GetString(GetValue("CustomTableSelect"), "");
        }
        set
        {
            SetValue("CustomTableSelect", value);
        }

    }

    public string FileStoragePath
    {
        get
        {
            string path = ValidationHelper.GetString(GetValue("FileStoragePath"), "/" + CMS.SiteProvider.SiteContext.CurrentSiteName + "/media/");
            return string.IsNullOrEmpty(path) ? "/" + CMS.SiteProvider.SiteContext.CurrentSiteName + "/media/" : path;
        }
        set
        {
            SetValue("FileStoragePath", value);
        }

    }

    #endregion

    #region Page Events and Methods

    protected void btnImport_Click(object sender, EventArgs e)
    {
        lblMessage.Text = ExecuteImport();
    }

    #endregion

    #region Private Methods: business logic

    /// <summary>
    /// Calls all operation needed to import data from file to a custom table
    /// </summary>
    private string ExecuteImport()
    {
        string message = string.Empty;
        if (!ValidateInput(out message))
        {
            return message;
        }

        try
        {
            string path = UploadExcelFile();

            if (string.IsNullOrEmpty(path))
            {
                return "Error: Unable to read file. ";
            }
            DataTable data = ReadExceldata(path, txtDatasheetName.Text.Trim());

            if (data == null)
            {
                return "Error: No data to import. ";
            }
            if (CustomTableSelect == null || CustomTableSelect == "customtable.SampleTable") {
                ImportData(tableSelect.Value.ToString(), data, chkOverride.Checked);
            }
            else
            {
                ImportData(CustomTableSelect, data, chkOverride.Checked);
            }

            return "Import completed successfully.";
        }
        catch (Exception ex)
        {
            CMS.EventLog.EventLogProvider.LogException(EVENT_LOG_SOURCE, "ExecuteImport", ex);
            return "Error: " + ex.Message;
        }

    }

    /// <summary>
    /// Validated input data
    /// </summary>
    /// <param name="error">Error description</param>
    /// <returns>Input is valid statement</returns>
    private bool ValidateInput(out string error)
    {
        error = "";
        if (!fileUpload.HasFile)
        {
            error = "Please select a file.";
            return false;
        }
        if (!fileUpload.FileName.Contains(".xls"))
        {
            error = "Please select Excel file.";
            return false;
        }
        if (string.IsNullOrEmpty(txtDatasheetName.Text.Trim()))
        {
            error = "Please specify Sheet name.";
            return false;
        }
        return true;
    }

    /// <summary>
    /// Uploads Excel file
    /// </summary>
    /// <returns>File full path</returns>
    private string UploadExcelFile()
    {
        if (fileUpload.HasFile && (Path.GetExtension(fileUpload.FileName) == ".xls" || Path.GetExtension(fileUpload.FileName) == ".xlsx"))
        {
            try
            {
                string pathAndName = string.Empty;
                if (FileStoragePath.EndsWith("/"))
                {
                    pathAndName = Server.MapPath(FileStoragePath + fileUpload.FileName);
                }
                else
                {
                    pathAndName = Server.MapPath(string.Format("{0}/{1}", FileStoragePath, fileUpload.FileName));
                }
                fileUpload.SaveAs(pathAndName);
                CMS.EventLog.EventLogProvider.LogInformation(EVENT_LOG_SOURCE, "Upload", "File uploaded");
                return pathAndName;
            }
            catch (Exception ex)
            {
                CMS.EventLog.EventLogProvider.LogException(EVENT_LOG_SOURCE, "Upload", ex);
                throw new ApplicationException("Failed to upload file.", ex);
            }
        }
        else
        {
            lblMessage.Text = "Please select Excel file. ";
            CMS.EventLog.EventLogProvider.LogException(EVENT_LOG_SOURCE, "Upload", new Exception("Invalid file."));
            throw new ApplicationException("Invalid file.");
        }
    }

    /// <summary>
    /// Import new data to a Custom Table
    /// </summary>
    /// <param name="customTableClassName">Code name of Custom Table to import data to</param>
    /// <param name="dataToImport">Data to be imported</param>
    /// <param name="cleanUpBeforeImport">Specifies whether existing data should be discarted (true - removes all existing records)</param>
    private void ImportData(string customTableClassName, DataTable dataToImport, bool cleanUpBeforeImport = false)
    {
        CMS.EventLog.EventLogProvider.LogInformation(EVENT_LOG_SOURCE, "ImportData", "Starting data import to " + customTableClassName);

        if (cleanUpBeforeImport)
        {
            ClearTable(customTableClassName);
        }

        DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(customTableClassName);

        if (customTable != null)
        {
            List<KeyValuePair<string, Type>> columns = new List<KeyValuePair<string, Type>>();

            foreach (DataColumn c in customTable.GetDataSet().Tables[0].Columns)
            {
                if (!CUSTOM_TABLE_SYSTEM_FIELDS.Contains(c.ColumnName))
                {
                    columns.Add(new KeyValuePair<string, Type>(c.ColumnName, c.DataType));
                }
            }


            foreach (DataRow row in dataToImport.Rows)
            {
                try
                {
                    CustomTableItem newCustomTableItem = CustomTableItem.New(customTableClassName);

                    foreach (KeyValuePair<string, Type> col in columns)
                    {
                        if (dataToImport.Columns.Contains(col.Key))
                        {
                            if (col.Value != typeof(DateTime))
                            {
                                newCustomTableItem.SetValue(col.Key, row[col.Key]);
                            }
                            else
                            {
                                newCustomTableItem.SetValue(col.Key, ParseDate(row[col.Key]));
                            }
                        }
                    }

                    newCustomTableItem.Insert();
                }
                catch (Exception ex)
                {
                    CMS.EventLog.EventLogProvider.LogException(EVENT_LOG_SOURCE, "ImportDataRow", ex, CMS.SiteProvider.SiteContext.CurrentSiteID, "Failed to import new row to " + customTableClassName);
                    throw new ApplicationException("Unable to create new row.", ex);
                }
            }

        }
        else
        {
            throw new ApplicationException(customTableClassName + " custom table does not exist.");
        }

        CMS.EventLog.EventLogProvider.LogInformation(EVENT_LOG_SOURCE, "ImportData", "Data import completed for " + customTableClassName);
    }

    /// <summary>
    /// Removes all records of Custom Table
    /// </summary>
    /// <param name="customTableClassName">Code name of Custom Table to clear</param>
    private void ClearTable(string customTableClassName)
    {
        CMS.EventLog.EventLogProvider.LogInformation(EVENT_LOG_SOURCE, "ClearTable", "Removing data from " + customTableClassName);
        CMS.CustomTables.CustomTableItemProvider.DeleteItems(customTableClassName);
    }

    /// <summary>
    /// Test method.
    /// Gets DataTable from xls
    /// </summary>
    private DataTable GetDataSetFromXls()
    {
        string str;

        string mXlsURL = "/IntranetPortal/media/HR/Spectra-employees-3-4-14.xlsx";
        string SheetName = "FinalList";

        str = Server.MapPath(mXlsURL).ToString();

        return ReadExceldata(str, SheetName);

    }

    /// <summary>
    /// Reads specified datasheet of Excel file
    /// </summary>
    /// <param name="fileName">Excel file name with path</param>
    /// <param name="sheetName">Datasheet name to read</param>
    /// <returns>Data from the sheet converted to a DataTable</returns>
    private DataTable ReadExceldata(string fileName, string sheetName)
    {
        CMS.EventLog.EventLogProvider.LogInformation(EVENT_LOG_SOURCE, "ReadData", "Reading data");
        //  Return the value of the specified cell.
        const string documentRelationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument";
        const string worksheetSchema = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
        const string sharedStringsRelationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
        const string sharedStringSchema = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

        string cellValue = null;
        DataTable dt = new DataTable(sheetName);

        //  Retrieve the stream containing the requested
        //  worksheet's info:
        try
        {
            using (Package xlPackage = Package.Open(fileName, FileMode.Open, FileAccess.Read))
            {
                PackagePart documentPart = null;
                Uri documentUri = null;

                //  Get the main document part (workbook.xml).
                foreach (System.IO.Packaging.PackageRelationship relationship in xlPackage.GetRelationshipsByType(documentRelationshipType))
                {
                    //  There should only be one document part in the package. 
                    documentUri = PackUriHelper.ResolvePartUri(new Uri("/", UriKind.Relative), relationship.TargetUri);
                    documentPart = xlPackage.GetPart(documentUri);
                    //  There should only be one instance, but get out no matter what.
                    break;
                }

                if (documentPart != null)
                {
                    // Load the contents of the workbook.
                    XmlDocument doc = new XmlDocument();
                    doc.Load(documentPart.GetStream());

                    //  Create a namespace manager, so you can search.
                    //  Add a prefix (d) for the default namespace.
                    NameTable nt = new NameTable();
                    XmlNamespaceManager nsManager = new XmlNamespaceManager(nt);
                    nsManager.AddNamespace("d", worksheetSchema);
                    nsManager.AddNamespace("s", sharedStringSchema);

                    string searchString = string.Format("//d:sheet[@name='{0}']", sheetName);
                    XmlNode sheetNode = doc.SelectSingleNode(searchString, nsManager);
                    if (sheetNode != null)
                    {
                        //  Get the relId attribute:
                        XmlAttribute relationAttribute = sheetNode.Attributes["r:id"];
                        if (relationAttribute != null)
                        {
                            string relId = relationAttribute.Value;

                            //  First, get the relation between the document and the sheet.
                            PackageRelationship sheetRelation = documentPart.GetRelationship(relId);
                            Uri sheetUri = PackUriHelper.ResolvePartUri(documentUri, sheetRelation.TargetUri);
                            PackagePart sheetPart = xlPackage.GetPart(sheetUri);

                            //  Load the contents of the workbook.
                            XmlDocument sheetDoc = new XmlDocument(nt);
                            sheetDoc.Load(sheetPart.GetStream());

                            XmlDocument sharedStringDoc = new XmlDocument(nt);
                            foreach (System.IO.Packaging.PackageRelationship stringRelationship in documentPart.GetRelationshipsByType(sharedStringsRelationshipType))
                            {
                                //  There should only be one shared string reference, so you'll exit this loop immediately.
                                Uri sharedStringsUri = PackUriHelper.ResolvePartUri(documentUri, stringRelationship.TargetUri);
                                PackagePart stringPart = xlPackage.GetPart(sharedStringsUri);
                                if (stringPart != null)
                                {
                                    //  Load the contents of the shared strings.

                                    sharedStringDoc.Load(stringPart.GetStream());

                                    //  Add the string schema to the namespace manager:
                                    nsManager.AddNamespace("s", sharedStringSchema);

                                    int requestedString = Convert.ToInt32(cellValue);
                                    string strSearch = string.Format("//s:sst/s:si[{0}]", requestedString + 1);
                                    XmlNodeList n = sharedStringDoc.SelectNodes("//s:sst/s:si", nsManager);
                                }
                            }
                            XmlNodeList sharedNodes = sharedStringDoc.SelectNodes("//s:sst/s:si", nsManager);

                            XmlNodeList nodeList = sheetDoc.SelectNodes(string.Format("//d:sheetData/d:row"), nsManager);
                            List<string> attributes = new List<string>();
                            foreach (XmlNode cellNodes in nodeList)
                            {
                                if (cellNodes.Attributes["r"].Value == "1")
                                {
                                    foreach (XmlNode col in cellNodes)
                                    {
                                        dt.Columns.Add(sharedNodes[Convert.ToInt32(col.InnerText)].InnerText.Trim());
                                        attributes.Add(col.Attributes["r"].Value.Substring(0, 1));
                                    }
                                }
                                else
                                {
                                    List<string> values = new List<string>(9);
                                    for (int c = 0; c < attributes.Count; c++)
                                    {
                                        System.Collections.IEnumerator enumerator = cellNodes.ChildNodes.GetEnumerator();
                                        while (enumerator.MoveNext())
                                        {
                                            XmlNode curNode = (XmlNode)enumerator.Current;
                                            if (curNode.Attributes["r"].Value.Contains(attributes[c]))
                                            {
                                                values.Add((curNode.Attributes["t"] != null && curNode.Attributes["t"].Value.Contains("s")) ? sharedNodes[Convert.ToInt32(curNode.InnerText)].InnerText : curNode.InnerText);
                                                break;
                                            }
                                        }
                                        if (values.Count == c) values.Add(string.Empty);
                                    }
                                    dt.Rows.Add(values.ToArray());
                                    values.Clear();
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (FileNotFoundException ex)
        {
            lblMessage.Text = ex.Message;
            CMS.EventLog.EventLogProvider.LogException(EVENT_LOG_SOURCE, "ReadData", ex);
            throw ex;
        }
        catch (Exception ex)
        {
            lblMessage.Text = ex.Message;
            CMS.EventLog.EventLogProvider.LogException(EVENT_LOG_SOURCE, "ReadData", ex);
            throw new ApplicationException("Error reading file", ex);
        }

        return dt;
    }

    /// <summary>
    /// Converts ticks to DateTime value
    /// </summary>
    /// <param name="ticks">Ticks</param>
    /// <returns>DateTime value</returns>
    private DateTime ParseDate(object date)
    {

        if (date is DateTime)
        {
            return (DateTime)date;
        }

        DateTime dt = new DateTime();
        if (DateTime.TryParse(date.ToString(), out dt))
        {
            return dt;
        }

        double d;
        if (double.TryParse(date.ToString(), out d))
        {
            DateTime conv = DateTime.FromOADate(d);
            return conv;
        }
        return new DateTime();
    }

    #endregion
}



