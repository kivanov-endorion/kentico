<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CustomTableDataImport.ascx.cs" Inherits="CustomTableDataImport" %>

<%@ Register TagPrefix="cms" TagName="CustomTableSelector" Src="~/CMSFormControls/Classes/CustomTableSelector.ascx" %>

<script language="javascript" type="text/javascript">
    var dots = 0;
    var dotmax = 10;


    function ShowWait() {
        var output;
        output = 'Processing';
        dots++;
        if (dots >= dotmax) dots = 1;
        for (var x = 0; x < dots; x++)
        { output += '.'; }
        mydiv.innerText = output;
    }
    function ShowProcessing() {
        mydiv = document.getElementById('processingWrapper');
        document.getElementById('dumbBoxWrap').style.display = "block";
        ShowWait();
        window.setInterval('ShowWait()', 1000);
    }
</script>
<div id="dumbBoxWrap" class="dumbBoxWrap">
    <div class="dumbBoxOverlay">
        &nbsp;
    </div>
    <div class="vertical-offset">
        <div class="dumbBox">
            <div id="processingWrapper">
            </div>
        </div>
    </div>
</div>
<div class="excelImportTool">
    <span class="message">
        <asp:Label ID="lblMessage" CssClass="message" runat="server"></asp:Label>
    </span>
    <p>
        Select an Excel file to import data from:<br />
        <asp:FileUpload ID="fileUpload" runat="server" />
    </p>
    <p>
        Enter sheet name:<br />
        <asp:TextBox ID="txtDatasheetName" runat="server"></asp:TextBox>
    </p>
    <p>
        Select table to import data to:<br />
        <cms:CustomTableSelector ID="tableSelect" runat="server" />
    </p>
    <p>
        <asp:CheckBox ID="chkOverride" runat="server" Text="Override table data" />
    </p>
    <p>
        <asp:Button ID="btnImport" runat="server" Text="Import" OnClick="btnImport_Click"
            OnClientClick="ShowProcessing();" />
    </p>
</div>

