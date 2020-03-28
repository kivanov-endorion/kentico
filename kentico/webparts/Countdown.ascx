<%@ Control Language="C#" AutoEventWireup="true" Inherits="Countdown" CodeFile="Countdown.ascx.cs" %>
<asp:Literal ID="ltlDateTime" runat="Server" EnableViewState="false" />


<div id="clockdiv">
<div class="col-md-2 col-xs-1"><span class="days">&nbsp;</span><br />
<span class="time-words"><cms:LocalizedLabel runat="server" ResourceString="1IM.Countdown.days" /></span></div>

<div class="col-md-2 col-xs-1"><span class="hours">&nbsp;</span><br />
<span class="time-words"><cms:LocalizedLabel runat="server" ResourceString="1IM.Countdown.hours" /></span></div>

<div class="col-md-2 col-xs-1"><span class="minutes">&nbsp;</span><br />
<span class="time-words"><cms:LocalizedLabel runat="server" ResourceString="1IM.Countdown.minutes" /></span></div>

<div class="col-md-2 col-xs-1"><span class="seconds">&nbsp;</span><br />
<span class="time-words"><cms:LocalizedLabel runat="server" ResourceString="1IM.Countdown.seconds" /></span></div>
</div>