<%@ Control Language="C#" AutoEventWireup="true" Inherits="Fileuploadcustomtable" CodeFile="Fileuploadcustomtable.ascx.cs" %>
<cms:Uploader ID="uploader" runat="server" OnOnUploadFile="uploader_OnUploadFile" text="Hochladen" caption="Hochladen"/>
<asp:Button ID="hdnPostback" CssClass="HiddenButton" runat="server" EnableViewState="false" text="Hochladen"/>
<asp:Literal ID="ltlPlaceholder" runat="Server" EnableViewState="false" />
<asp:Literal ID="ltlInlineScript" runat="server" EnableViewState="false" />
<asp:Literal ID="ltlErrorLabel" runat="server" EnableViewState="false" />
