<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TOPVendorLogin.ascx.cs" Inherits="oneIM_Webparts_TOPVendorLogin" %>
<asp:Panel ID="pnlVoucherLogin" runat="server" CssClass="">
<div id="searchForm">
 

  
<div class="form-group">
  <cms:LocalizedLabel ID="lbluserpw" runat="server" CssClass="control-label d-none" Text="{$LogonForm.password$}"/>
  <%--<cms:CMSTextBox ID="userpw" runat="server" MaxLength="100" size="36" style="width:30em;" placeholder="" ClientIDMode="Static" />--%>
  <input id="userpw" name="userpw" class="form-control"  maxlength="36" placeholder="" size="36" />
</div>

<input type="button" name="btnSubmit" id="btnSubmit" value="submit" class="btn btn-primary btn-block" style="display:none"/>  
<cms:LocalizedButton ID="btnSubmit1" runat="server" CssClass="btn btn-primary btn-block" CommandName="Login" EnableViewState="false" Text="{$LogonForm.logonbutton$}" />

<p>
<cms:LocalizedLabel ID="FailureText" runat="server" EnableViewState="False" CssClass="ErrorLabel" />
</p>
</div>
 
</asp:Panel>

<style>
  .red{
     color:red;
  }
  .green{
     color:green;
  }

    span.control-label {
        font-weight:bold;
    }
  
  
</style>
<script  type="text/javascript">
    $(document).ready(function () {            
        $('#userpw').attr("placeholder", "Passwort");
        $('#btnSubmit').click(function (e) {
            if ($("#userpw").val() != "") {
                theForm.submit();
            }
        });
        $("[id$=btnSubmit1]").click(function (e) {    
            //if (($("[id$=_userid]").val() = "") && ($("[id$=_userpw]").val() = "")) {
            if  ($("#userpw").val() == ""){
                return false;
            } 
        });

    });
</script>

<asp:Literal ID="ltlPlaceholder" runat="Server" EnableViewState="false" />

