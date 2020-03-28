<%@ Control Language="C#" AutoEventWireup="true" Inherits="PopUp" CodeFile="PopUp.ascx.cs" %>
<script src="~/1IM/blockui-2.70.0/jquery.blockUI.js" type="text/javascript"></script>
<div id="popUp" style="display: none">
  <p class="push-bottom">
    <asp:Literal ID="ltlText" runat="server" EnableViewState="false" />
  </p>
  <div class="btn btn-primary" id="popUpOK" runat="server">OK</div>
</div>
<script>
  var bShow = true;
</script>
<asp:PlaceHolder runat="server" ID="plcCheckShow" Visible="false">
  <script>
    if (localStorage.getItem("<% Response.Write(SaveKey); %>") == "1") {
      bShow = false;
    }
  </script>
</asp:PlaceHolder>
<script>
  $(document).ready(function () {
    if (bShow) {
      $.blockUI({
        message: $("#popUp"),
        css: {
          cursor: "default",
          padding: 10
        }
      });
    }
  });
</script>
<script>
  $(document).on("click", "#popUp div[id$='_popUpOK']", function (e) {
    $.unblockUI();
  });
</script>
<asp:PlaceHolder runat="server" ID="plcSaveSeen" Visible="false">
  <script>
    $(document).on("click", "#popUp div[id$='_popUpOK']", function (e) {
      if (typeof (Storage) !== "undefined") {
        localStorage.setItem("<% Response.Write(SaveKey); %>", "1");
      }
    });
  </script>
</asp:PlaceHolder>