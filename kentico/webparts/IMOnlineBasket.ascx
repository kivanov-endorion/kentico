<%@ Control Language="C#" AutoEventWireup="true" Inherits="IMOnlineBasket" CodeFile="IMOnlineBasket.ascx.cs" %>

<asp:PlaceHolder runat="server" ID="plcIMOnlineBasket" Visible="true">
    <% if (IsInstanceGreaterOneFound)
       { %>
    <asp:CheckBox id="Chkbox" class="form-check-input" type="checkbox" value="1" runat="server"></asp:CheckBox>&nbsp;&nbsp;
    <% } %>

    <% if (ShowQty)
       { %>
        <asp:TextBox id="TxtQty" class="form-text-input form-inline" style="width:50px;min-width:50px;" type="text" runat="server"></asp:TextBox>&nbsp;&nbsp;
    <% } %>   
    <asp:Button class="btn btn-primary" id="Btn_Add2IMOnlineBasket" runat="server" OnClick="Btn_Add2IMOnlineBasket_Click"></asp:Button>

</asp:PlaceHolder>