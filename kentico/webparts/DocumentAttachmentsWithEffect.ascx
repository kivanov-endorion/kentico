<%@ Control Language="C#" AutoEventWireup="true"
    Inherits="DocumentAttachmentsWithEffect" CodeFile="DocumentAttachmentsWithEffect.ascx.cs" %>

<cms:AttachmentsDataSource ID="ucDataSource" runat="server" />
<cms:BasicRepeaterWithEffect ID="ucRepeater" runat="server" />
<cms:UniPager ID="ucPager" runat="server" />

