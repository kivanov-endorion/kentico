<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Impersonate.ascx.cs" Inherits="Impersonate" %>
<%@ Register Src="~/CMSAdminControls/UI/UniSelector/UniSelector.ascx" TagName="UniSelectorControl" TagPrefix="cms" %>

<script>
    $(document).ready(function () {
        $('.dropdown-toggle').dropdown();
    })
</script>
<style>.impersonated {color: red;}</style>
<asp:PlaceHolder runat="server" ID="pnlUsers" Visible="false">

<div class="hide">
    <cms:UniSelectorControl ID="ucUsers" ShortID="us" ObjectType="CMS.User" runat="server" ReturnColumnName="UserName" SelectionMode="SingleButton" IsLiveSite="true" DisplayNameFormat="##USERDISPLAYFORMAT##" />
</div>
  

<div id="htmlDIVDropdown" runat="server">
  <a class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <asp:Label ID="lblLabel" runat="server" CssClass="CurrentUserLabel" EnableViewState="false" /> 
  </a>
  <ul id="htmlULDropdown"  runat="server" class="dropdown-menu dropdown-menu-right shadow" aria-labelledby="dropdownMenu1">
    <li class="dropdown-header text-light">
       <asp:Label ID="lblLabel2" runat="server" CssClass="" EnableViewState="false" />
    </li>
    <asp:Label ID="lblLabel3" runat="server" CssClass="" EnableViewState="false" />
    <li  class="px-4 small">
        <cms:LocalizedLinkButton ID="btnImpersonate" runat="server" Visible="false" CssClass="btn btn-form btn-block" ResourceString="users.impersonate" />
    </li>
    <li  class="px-4 small">
        <cms:LocalizedLinkButton ID="btnImpersonate_Cancel" runat="server" OnClick="btnImpersonate_Cancel_Click"  ResourceString="users.impersonate_cancel" Visible="false" />
    </li>
    
    <asp:Label ID="lblSignOutSeparator" runat="server" CssClass="" EnableViewState="false"  Visible="false" Text="<li role='separator' class='divider'></li>"/>
    
    <li class="px-4 small">
        <cms:LocalizedLinkButton ID="btnSignOut" runat="server" OnClick="btnSignOut_Click" CssClass="signoutButton" EnableViewState="false" ResourceString="users.signout" />
    </li>
    
    <li>
        <asp:Label ID="LabelMsg" runat="server" CssClass="" EnableViewState="false" Visible="false" />
    </li>
  </ul>
</div>
</asp:PlaceHolder>




        
       

