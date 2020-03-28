<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LinkClicktrack.ascx.cs"
    Inherits="CMSWebParts_Text_LinkClicktrack" %>
<%@ Register Src="~/CMSAdminControls/UI/UniControls/UniButton.ascx" TagName="UniButton"
    TagPrefix="cms" %>
<cms:UniButton ID="btnElem" runat="server" OnClick="btnElem_Click"/>
<asp:Literal ID="ltlDebug" runat="server"></asp:Literal>
