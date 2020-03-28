<%@ Control Language="C#" AutoEventWireup="true" CodeFile="VoucherLogin.ascx.cs" Inherits="oneIM_Webparts_VoucherLogin" %>
<asp:Panel ID="pnlVoucherLogin" runat="server" CssClass="">
<div id="searchForm">
 
<div class="form-group">
  <cms:LocalizedLabel ID="lbluserid" runat="server" CssClass="control-label"  Text="{$LogonForm.username$}" />
  <%--<cms:CMSTextBox ID="userid" runat="server" MaxLength="100"  size="36" style="width:30em;"/>--%>
  <input id="userid" name="userid" type="text" class="form-control"  maxlength="36" placeholder="" size="36" style="width:30em;" />
</div>
  
<div class="form-group">
  <cms:LocalizedLabel ID="lbluserpw" runat="server"  CssClass="control-label" Text="{$LogonForm.password$}"/>
  <%--<cms:CMSTextBox ID="userpw" runat="server" MaxLength="100" TextMode="Password" size="36" style="width:30em;"/>--%>
  <input id="userpw" name="userpw" type="password" class="form-control"  maxlength="36" placeholder="" size="36" style="width:30em;" />
</div>

<input type="button" name="btnSubmit" id="btnSubmit" value="submit" class="btn btn-primary" style="display:none"/>  
<cms:LocalizedButton ID="btnSubmit1" runat="server" CssClass="btn btn-primary" CommandName="Login" EnableViewState="false" Text="{$LogonForm.logonbutton$}" />

<p>
<cms:LocalizedLabel ID="FailureText" runat="server" EnableViewState="False" CssClass="ErrorLabel" />
</p>
 
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
        $('#btnSubmit').click(function (e) {
            if (($("#userid").val() != "") && ($("#userpw").val() != "")) {
                theForm.submit();
            }
        });
        $("[id$=btnSubmit1]").click(function (e) {    
            //if (($("[id$=_userid]").val() = "") && ($("[id$=_userpw]").val() = "")) {
            if (($("#userid").val() == "")  && ($("#userpw").val() == "")) {
                return false;
            } 
        });

    });
</script>

<asp:Literal ID="ltlPlaceholder" runat="Server" EnableViewState="false" />

