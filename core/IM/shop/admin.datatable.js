var locale="{%LocalizationContext.CurrentCulture.CultureCode#%}";
var localeoptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour:'2-digit', minute:'2-digit', hour12 : false };
var oLocale = {minimumFractionDigits: 2, maximumFractionDigits: 2};
var sLocale = "{% LocalizationContext.CurrentCulture.CodeName #%}";
var sSymbolPlacement="s"; if (sLocale=="en-US" || sLocale=="nl-NL") {sSymbolPlacement="p";}
var suCS=getCurrencySymbol(sLocale, "{% CurrentUser.imCurrencyCd #%}");
var sCS=encodeURIComponent(suCS); if (sLocale=="en-US" || sLocale=="nl-NL") {suCS=suCS+"\u202f";} else {suCS="\u202f"+suCS;}
var sDecimal = (0.01).toLocaleString(sLocale, oLocale).substr(1, 1);//decimal delimiter
var sDecimalSep = (1000).toLocaleString(sLocale, oLocale).substr(1,1); //thousands separator
var oRegex = new RegExp("[^0-9" + sDecimalSep + sDecimal + "]", "g");//regex for valid decimal input
var currentUserSK_VALID=0{% CurrentUser.imSK_Valid #%};
var dtlang="{$ oneIM_adminapps_ShopSystem_DataTable_Language $}";
var CustomAttributeOptionSelect="{$ oneIM_adminapps_ShopSystem_View_Details_CustomAttribute_OptionSelect $}";


function getCurrencySymbol (locale, currency) {
  return (0).toLocaleString(
    locale,
    {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  ).replace(/\d/g, '').trim().replace(/\./g, '').replace(/\,/g, '');
}

// #region SlideIn
$(document).on("click", "#slidein-ribbon a[href='#']", function (e) {
  e.preventDefault();
  $("#slidein-item .slidein-item").hide();
  if ($("#slidein-ribbon a.selected").length == 0) {
    $("#slidein-ribbon").toggleClass("open");
    $("#slidein-menu").toggleClass("open");
    $("#slidein-modal").toggle();
    $(this).toggleClass("selected");
    $("#slidein-item .slidein-item[data-item='" + $(this).data("item") + "']").show();
  }
  else if ($(this).hasClass("selected")) {
    $("#slidein-ribbon").toggleClass("open");
    $("#slidein-menu").toggleClass("open");
    $("#slidein-modal").toggle();
    $("#slidein-ribbon a.selected").toggleClass("selected");
  } else {
    $("#slidein-ribbon a.selected").toggleClass("selected");
    $(this).toggleClass("selected");
    $("#slidein-item .slidein-item").hide();
    $("#slidein-item .slidein-item[data-item='" + $(this).data("item") + "']").show();
  }
});

$(document).on("click", "#slidein-ribbon a[href!='#']", function (e) {
  e.preventDefault();
  if ($("#slidein-ribbon").hasClass("open")) {
	  $("#slidein-item .slidein-item").hide();
	  if ($("#slidein-ribbon a.selected").length == 0) {
	    $("#slidein-ribbon").toggleClass("open");
	    $("#slidein-menu").toggleClass("open");
	    $("#slidein-modal").toggle();
	    $(this).toggleClass("selected");
	    $("#slidein-item .slidein-item[data-item='" + $(this).data("item") + "']").show();
	  }
	  else if ($(this).hasClass("selected")) {
	    $("#slidein-ribbon").toggleClass("open");
	    $("#slidein-menu").toggleClass("open");
	    $("#slidein-modal").toggle();
	    $("#slidein-ribbon a.selected").toggleClass("selected");
	  } else {
	    $("#slidein-ribbon a.selected").toggleClass("selected");
	    $(this).toggleClass("selected");
	    $("#slidein-item .slidein-item").hide();
	    $("#slidein-item .slidein-item[data-item='" + $(this).data("item") + "']").show();
	  }
	}
	else {
	  $("*").addClass("wait");
	  $("#cto").fadeOut(300);
	  $(".loader").fadeIn(300).delay(300);
	  location = $(this).attr("href");
	}
});

$(document).on("click", "#slidein-close, #slidein-modal", function (e) {
  e.preventDefault();
  $("#slidein-ribbon a.selected").trigger("click");
});

$(document).ready(function (e) {
  $("#slidein-navigation").html($("#tree-navigation").html());
});
// #endregion


/*Shows the different views from the menu*/
function MenuShowContent(item) {
	
	if (item!=="") {
	  $(".custommenulink").toggleClass('is-open');   
	  $(".custom-slide-menu").toggleClass('slide-menu-open');   
  } 

	if (item=="overview" || item=="") {
		$("#module_selection").show();
		$("#module_actionmenu_statistics").hide();
		$("#module_actionmenu_invoicing").hide();
		$("#module_actionmenu_overview").show();
		$("#view_overview").show();
		$("#view_create").hide();
		$("#view_edit").hide();
		$("#view_statistics").hide();
		$("#view_invoicing").hide();
		$("#view_help").hide();
		if (item=="overview") {
			$('#DT_Result').DataTable().ajax.reload();
		}
	}
	else if (item=="create") {
		$("#module_selection").hide();
		$("#module_actionmenu_statistics").hide();
		$("#module_actionmenu_invoicing").hide();
		$("#module_actionmenu_overview").hide();
		$("#view_overview").hide();
		$("#view_create").show();
		$("#view_edit").hide();
		$("#view_statistics").hide();
		$("#view_invoicing").hide();
		$("#view_help").hide();
		CreateShopEmptyForm();
	}
	else if (item=="invoicing") {
		$("#module_selection").hide();
		$("#module_actionmenu_statistics").hide();
		$("#module_actionmenu_invoicing").show();
		$("#module_actionmenu_overview").hide();
		$("#view_overview").hide();
		$("#view_create").hide();
		$("#view_edit").hide();
		$("#view_statistics").hide();
		$("#view_invoicing").show();
		$("#view_help").hide();
	}
	else if (item=="statistics") {
		$("#module_selection").hide();
		$("#module_actionmenu_statistics").show();
		$("#module_actionmenu_invoicing").hide();
		$("#module_actionmenu_overview").hide();
		$("#view_overview").hide();
		$("#view_create").hide();
		$("#view_edit").hide();
		$("#view_statistics").show();
		$("#view_invoicing").hide();
		$("#view_help").hide();
	}
	else if (item=="help") {
		$("#module_selection").hide();
		$("#module_actionmenu_statistics").show();
		$("#module_actionmenu_invoicing").hide();
		$("#module_actionmenu_overview").hide();
		$("#view_overview").hide();
		$("#view_create").hide();
		$("#view_edit").hide();
		$("#view_statistics").hide();
		$("#view_invoicing").hide();
		$("#view_help").show();
	}
	
	$("#slidein-ribbon a.selected").trigger("click");
} 

/*action menu edit shop*/
function ActionEditShop() {
	if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
		$("#module_selection").hide();
		$("#module_actionmenu_statistics").hide();
		$("#module_actionmenu_invoicing").hide();
		$("#module_actionmenu_overview").hide();
		$("#view_overview").hide();
		$("#view_edit").show();
		$("#view_statistics").hide();
		$("#view_invoicing").hide();
		
		$("#edit_customer").text($("#DT_Result").DataTable().row('.selected').data().Customer+" "+$("#DT_Result").DataTable().row('.selected').data().Customer_Name);
		$("#edit_alias").text($("#DT_Result").DataTable().row('.selected').data().Alias);
		$("#edit_business_type").val($("#DT_Result").DataTable().row('.selected').data().BusinessType);
		if ($("#DT_Result").DataTable().row('.selected').data().WantsNewsletter=="1") {
			$("#edit_wants_newsletter_opt1").parent().removeClass("active").addClass("active");
			$("#edit_wants_newsletter_opt2").parent().removeClass("active");
			$('input:radio[name="edit_wants_newsletter"]:nth(0)').attr('checked',true);
			$('input:radio[name="edit_wants_newsletter"]:nth(1)').attr('checked',false);
			$('input:radio[name="edit_wants_newsletter"]:nth(0)').prop('checked',true);
			$('input:radio[name="edit_wants_newsletter"]:nth(1)').prop('checked',false);
		}
		else {
			$("#edit_wants_newsletter_opt1").parent().removeClass("active");
			$("#edit_wants_newsletter_opt2").parent().removeClass("active").addClass("active");
			$('input:radio[name="edit_wants_newsletter"]:nth(0)').attr('checked',false);
			$('input:radio[name="edit_wants_newsletter"]:nth(1)').attr('checked',true);
			$('input:radio[name="edit_wants_newsletter"]:nth(0)').prop('checked',false);
			$('input:radio[name="edit_wants_newsletter"]:nth(1)').prop('checked',true);
		}

		$("#edit_billstartdate").data("datetimepicker").date(new Date($("#DT_Result").DataTable().row('.selected').data().BillStartDate));
		$("#edit_billenddate").data("datetimepicker").date(new Date($("#DT_Result").DataTable().row('.selected').data().BillEndDate));
		$("#edit_billstartdatereminderdate").data("datetimepicker").date(new Date($("#DT_Result").DataTable().row('.selected').data().BillStartDateReminderDate));
		$("#edit_billstartdatereminderemail").val($("#DT_Result").DataTable().row('.selected').data().BillStartDateReminderEmail);
		$("#edit_billenddatereminderdate").data("datetimepicker").date(new Date($("#DT_Result").DataTable().row('.selected').data().BillEndDateReminderDate));
		$("#edit_billenddatereminderemail").val($("#DT_Result").DataTable().row('.selected').data().BillEndDateReminderEmail);
		
		$("#edit_teststartdate").data("datetimepicker").date(new Date($("#DT_Result").DataTable().row('.selected').data().TestStartDate));
		$("#edit_testenddate").data("datetimepicker").date(new Date($("#DT_Result").DataTable().row('.selected').data().TestEndDate));
		$("#edit_teststartdatereminderdate").data("datetimepicker").date(new Date($("#DT_Result").DataTable().row('.selected').data().TestStartDateReminderDate));
		$("#edit_teststartdatereminderemail").val($("#DT_Result").DataTable().row('.selected').data().TestStartDateReminderEmail);
		$("#edit_testenddatereminderdate").data("datetimepicker").date(new Date($("#DT_Result").DataTable().row('.selected').data().TestEndDateReminderDate));
		$("#edit_testenddatereminderemail").val($("#DT_Result").DataTable().row('.selected').data().TestEndDateReminderEmail);

		if (!AutoNumeric.test($("#edit_recurringfee")[0])) {
			new AutoNumeric($("#edit_recurringfee")[0], { currencySymbolPlacement: sSymbolPlacement, currencySymbol : suCS, decimalCharacter : sDecimal, digitGroupSeparator : sDecimalSep,	minimumValue: 0});
  		AutoNumeric.set($("#edit_recurringfee")[0], $("#DT_Result").DataTable().row('.selected').data().RecurringFee);
  	}
  	else {
  		$("#edit_recurringfee").val($("#DT_Result").DataTable().row('.selected').data().RecurringFee)
  	}
  	
		if (!AutoNumeric.test($("#edit_setupfee")[0])) {
			new AutoNumeric($("#edit_setupfee")[0], { currencySymbolPlacement: sSymbolPlacement, currencySymbol : suCS, decimalCharacter : sDecimal, digitGroupSeparator : sDecimalSep,	minimumValue: 0});
  		AutoNumeric.set($("#edit_setupfee")[0], $("#DT_Result").DataTable().row('.selected').data().SetupFee);
  	}
  	else {
  		$("#edit_recurringfee").val($("#DT_Result").DataTable().row('.selected').data().RecurringFee)
  	}

		$("#edit_recurringfeeinterval").val($("#DT_Result").DataTable().row('.selected').data().RecurringFeeInterval);
	}
}

/*view edit shop triggered on save*/
function EditShop() {
	$("#edit_business_type").removeClass("is-invalid");
	$("#edit_billstartdate").removeClass("is-invalid");
	$("#edit_billenddate").removeClass("is-invalid");
	$("#edit_teststartdate").removeClass("is-invalid");
	$("#edit_testenddate").removeClass("is-invalid");
	$("#edit_billstartdatereminderdate").removeClass("is-invalid");
	$("#edit_billenddatereminderdate").removeClass("is-invalid");
	$("#edit_teststartdatereminderdate").removeClass("is-invalid");
	$("#edit_testenddatereminderdate").removeClass("is-invalid");
	$("#edit_recurringfee").removeClass("is-invalid");
	$("#edit_recurringfeeinterval").removeClass("is-invalid");
	$("#edit_setupfee").removeClass("is-invalid");
	$("#edit_billstartdatereminderemail").removeClass("is-invalid");
	$("#edit_billenddatereminderemail").removeClass("is-invalid");
	$("#edit_teststartdatereminderemail").removeClass("is-invalid");
	$("#edit_testenddatereminderemail").removeClass("is-invalid");
	
	var is_valid=1;
	
	if ($("#edit_billstartdate").data('datetimepicker').date()==null && $("#edit_billenddate").data('datetimepicker').date()!==null) {
		$("#edit_billstartdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#edit_teststartdate").data('datetimepicker').date()==null && $("#edit_testenddate").data('datetimepicker').date()!==null) {
		$("#create_teststartdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#edit_billstartdate").data('datetimepicker').date()==null && $("#edit_teststartdate").data('datetimepicker').date()==null && is_valid==1) {
		$("#edit_billstartdate").addClass("is-invalid");
		$("#edit_teststartdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#edit_billstartdate").data('datetimepicker').date()!==null && $("#edit_billenddate").data('datetimepicker').date()!==null && $("#edit_billstartdate").data('datetimepicker').date() > $("#edit_billenddate").data('datetimepicker').date()) {
		$("#edit_billstartdate").addClass("is-invalid");
		$("#edit_billenddate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#edit_teststartdate").data('datetimepicker').date()!==null && $("#edit_testenddate").data('datetimepicker').date()!==null && $("#edit_teststartdate").data('datetimepicker').date() > $("#edit_testenddate").data('datetimepicker').date()) {
		$("#edit_teststartdate").addClass("is-invalid");
		$("#edit_testenddate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#edit_billstartdate").data('datetimepicker').date()!==null && $("#edit_billstartdatereminderdate").data('datetimepicker').date()!==null && $("#edit_billstartdate").data('datetimepicker').date() < $("#edit_billstartdatereminderdate").data('datetimepicker').date()) {
		$("#edit_billstartdate").addClass("is-invalid");
		$("#edit_billstartdatereminderdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#edit_teststartdate").data('datetimepicker').date()!==null && $("#edit_teststartdatereminderdate").data('datetimepicker').date()!==null && $("#edit_teststartdate").data('datetimepicker').date() < $("#edit_teststartdatereminderdate").data('datetimepicker').date()) {
		$("#edit_teststartdate").addClass("is-invalid");
		$("#edit_teststartdatereminderdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#edit_billenddate").data('datetimepicker').date()!==null && $("#edit_billenddatereminderdate").data('datetimepicker').date()!==null && $("#edit_billenddate").data('datetimepicker').date() < $("#edit_billenddatereminderdate").data('datetimepicker').date()) {
		$("#edit_billenddate").addClass("is-invalid");
		$("#edit_billenddatereminderdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#edit_testenddate").data('datetimepicker').date()!==null && $("#edit_testenddatereminderdate").data('datetimepicker').date()!==null && $("#edit_testenddate").data('datetimepicker').date() < $("#edit_testenddatereminderdate").data('datetimepicker').date()) {
		$("#edit_testenddate").addClass("is-invalid");
		$("#edit_testenddatereminderdate").addClass("is-invalid");
		is_valid=0;
	}
	
	if ($("#edit_business_type").val()==="") {
		$("#edit_business_type").addClass("is-invalid");is_valid=0;
	}
	if ($("#edit_recurringfee").val()==="") {
		$("#edit_recurringfee").addClass("is-invalid");is_valid=0;
	}
	if ($("#edit_recurringfeeinterval").val()==="") {
		$("#edit_recurringfeeinterval").addClass("is-invalid");is_valid=0;
	}
	if ($("#edit_setupfee").val()==="") {
		$("#edit_setupfee").addClass("is-invalid");is_valid=0;
	}
	
	if ($("#edit_billstartdatereminderemail").val()!=="" && !isValidEmail($("#edit_billstartdatereminderemail").val())) {
		$("#edit_billstartdatereminderemail").addClass("is-invalid");is_valid=0;
	}
	if ($("#edit_billenddatereminderemail").val()!=="" && !isValidEmail($("#edit_billenddatereminderemail").val())) {
		$("#edit_billenddatereminderemail").addClass("is-invalid");is_valid=0;
	}
	if ($("#create_teststartdatereminderemail").val()!=="" && !isValidEmail($("#edit_teststartdatereminderemail").val())) {
		$("#edit_teststartdatereminderemail").addClass("is-invalid");is_valid=0;
	}
	if ($("#edit_testenddatereminderemail").val()!=="" && !isValidEmail($("#edit_testenddatereminderemail").val())) {
		$("#edit_testenddatereminderemail").addClass("is-invalid");is_valid=0;
	}
	
	if(is_valid==0) {
		return;
	}	

	ShowSpinner($("#edit_save_btn"));
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/content-items/ajax/adminapps/shopsystem/edit_save?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
    data: { 
			id: $("#DT_Result").DataTable().row('.selected').id(),
			SK_VALID: $("#countrySelection").val(),
			edit_business_type: $("#edit_business_type").val(),
			edit_wants_newsletter: $("input[name='edit_wants_newsletter']:checked").val(),
			edit_billstartdate: $("#edit_billstartdate").data('datetimepicker').date()!==null ? $("#edit_billstartdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			edit_billenddate: $("#edit_billenddate").data('datetimepicker').date()!=null ? $("#edit_billenddate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			edit_billstartdatereminderdate: $("#edit_billstartdatereminderdate").data('datetimepicker').date()!=null ? $("#edit_billstartdatereminderdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			edit_billenddatereminderdate: $("#edit_billenddatereminderdate").data('datetimepicker').date()!=null ? $("#edit_billenddatereminderdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			edit_billstartdatereminderemail: $("#edit_billstartdatereminderemail").val(),
			edit_billenddatereminderemail: $("#edit_billenddatereminderemail").val(),
			edit_teststartdate: $("#edit_teststartdate").data('datetimepicker').date()!=null ? $("#edit_teststartdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			edit_testenddate: $("#edit_testenddate").data('datetimepicker').date()!=null ? $("#edit_testenddate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			edit_teststartdatereminderdate: $("#edit_teststartdatereminderdate").data('datetimepicker').date()!=null ? $("#edit_teststartdatereminderdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			edit_testenddatereminderdate: $("#edit_testenddatereminderdate").data('datetimepicker').date()!=null ? $("#edit_testenddatereminderdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			edit_teststartdatereminderemail: $("#edit_teststartdatereminderemail").val(),
			edit_testenddatereminderemail: $("#edit_testenddatereminderemail").val(),
			edit_recurringfee: AutoNumeric.getNumber($("#edit_recurringfee")[0]),
			edit_recurringfeeinterval: $("#edit_recurringfeeinterval").val(),
			edit_setupfee:  AutoNumeric.getNumber($("#edit_setupfee")[0])
    },
    success: function ( json ) {
    	window.scrollTo(0, 0);
			if (json.status==="success") {
				$('#edit_save_toast').toast({ delay: 3000, autohide:true });
				$('#edit_save_toast').toast("show");
				HideSpinner($("#edit_save_btn"));
				MenuShowContent("overview");
			}
			
    	return json.data;
    }
  });
}

/*test email format by regex*/
function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$("#create_alias").on("keypress paste",function (e) {
	$("#create_alias").removeClass("is-invalid");
  var regex = new RegExp("^[a-zA-Z0-9_-]+$");
  var charCode = e.which || e.charCode || e.keyCode;
  
  if(charCode!=13){ // to allow [ENTER]
  
    var str = String.fromCharCode(charCode);
    if (regex.test(str)) {
      return true;
    }
    else {
      e.preventDefault();
      $("#create_alias").addClass("is-invalid");
      return false;
    }
  }
});

$("#change_alias_input").on("keypress paste",function (e) {
	$("#change_alias_input").removeClass("is-invalid");
  var regex = new RegExp("^[a-zA-Z0-9_-]+$");
  var charCode = e.which || e.charCode || e.keyCode;
  
  if(charCode!=13){ // to allow [ENTER]
  
    var str = String.fromCharCode(charCode);
    if (regex.test(str)) {
      return true;
    }
    else {
      e.preventDefault();
      $("#change_alias_input").addClass("is-invalid");
      return false;
    }
  }
});

function isCustomerNbrValid(str) {
  var regex = new RegExp("^[a-zA-Z]{2}[0-9]{8}$");

  if (regex.test(str)) {
    return true;
  }
  else {
    return false;
  }
}

function isValidNumber(e) {
  if (e.which != 8 && e.which != 0 && e.which != 47  && e.which != 44 && (e.which < 46 || e.which > 57)) {
    return false;
  }
  return true;
}

is_date = function(date) {
    var formats = ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm'];
    return moment("" + date, formats, true).isValid();
}

function CreateShopEmptyForm() {
	$("#create_customer").val("");
	$("#create_alias").val("");
	$("#create_business_type").val("1");
	$("#create_wants_newsletter_opt2").prop("checked", true);
	$("#create_wants_newsletter_opt2").attr("checked", true);
	$("#create_wants_newsletter_opt2").parent().removeClass("active").addClass("active");
	$("#create_wants_newsletter_opt1").parent().removeClass("active");
	$("#create_billstartdate").data('datetimepicker').date(null);
	$("#create_billenddate").data('datetimepicker').date(null);
	$("#create_teststartdate").data('datetimepicker').date(null);
	$("#create_testenddate").data('datetimepicker').date(null);
	$("#create_billstartdatereminderdate").data('datetimepicker').date(null);
	$("#create_billenddatereminderdate").data('datetimepicker').date(null);
	$("#create_teststartdatereminderdate").data('datetimepicker').date(null);
	$("#create_testenddatereminderdate").data('datetimepicker').date(null);
	AutoNumeric.set($("#create_recurring_fee")[0], 0);
	$("#create_recurring_fee_interval").val("1");
	AutoNumeric.set($("#create_setup_fee")[0], 0);
	$("#create_billstartdatereminderemail").val("");
	$("#create_billenddatereminderemail").val("");
	$("#create_teststartdatereminderemail").val("");
	$("#create_testenddatereminderemail").val("");
}

function CreateShop() {
	$("#create_customer").removeClass("is-invalid");
	$("#create_alias").removeClass("is-invalid");
	$("#create_business_type").removeClass("is-invalid");
	$("#create_billstartdate").removeClass("is-invalid");
	$("#create_billenddate").removeClass("is-invalid");
	$("#create_teststartdate").removeClass("is-invalid");
	$("#create_testenddate").removeClass("is-invalid");
	$("#create_billstartdatereminderdate").removeClass("is-invalid");
	$("#create_billenddatereminderdate").removeClass("is-invalid");
	$("#create_teststartdatereminderdate").removeClass("is-invalid");
	$("#create_testenddatereminderdate").removeClass("is-invalid");
	$("#create_recurring_fee").removeClass("is-invalid");
	$("#create_recurring_fee_interval").removeClass("is-invalid");
	$("#create_setup_fee").removeClass("is-invalid");
	$("#create_billstartdatereminderemail").removeClass("is-invalid");
	$("#create_billenddatereminderemail").removeClass("is-invalid");
	$("#create_teststartdatereminderemail").removeClass("is-invalid");
	$("#create_testenddatereminderemail").removeClass("is-invalid");
	
	var is_valid=1;
	
	if ($("#create_billstartdate").data('datetimepicker').date()==null && $("#create_billenddate").data('datetimepicker').date()!==null) {
		$("#create_billstartdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#create_teststartdate").data('datetimepicker').date()==null && $("#create_testenddate").data('datetimepicker').date()!==null) {
		$("#create_teststartdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#create_billstartdate").data('datetimepicker').date()==null && $("#create_teststartdate").data('datetimepicker').date()==null && is_valid==1) {
		$("#create_billstartdate").addClass("is-invalid");
		$("#create_teststartdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#create_billstartdate").data('datetimepicker').date()!==null && $("#create_billenddate").data('datetimepicker').date()!==null && $("#create_billstartdate").data('datetimepicker').date() > $("#create_billenddate").data('datetimepicker').date()) {
		$("#create_billstartdate").addClass("is-invalid");
		$("#create_billenddate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#create_teststartdate").data('datetimepicker').date()!==null && $("#create_testenddate").data('datetimepicker').date()!==null && $("#create_teststartdate").data('datetimepicker').date() > $("#create_testenddate").data('datetimepicker').date()) {
		$("#create_teststartdate").addClass("is-invalid");
		$("#create_testenddate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#create_billstartdate").data('datetimepicker').date()!==null && $("#create_billstartdatereminderdate").data('datetimepicker').date()!==null && $("#create_billstartdate").data('datetimepicker').date() < $("#create_billstartdatereminderdate").data('datetimepicker').date()) {
		$("#create_billstartdate").addClass("is-invalid");
		$("#create_billstartdatereminderdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#create_teststartdate").data('datetimepicker').date()!==null && $("#create_teststartdatereminderdate").data('datetimepicker').date()!==null && $("#create_teststartdate").data('datetimepicker').date() < $("#create_teststartdatereminderdate").data('datetimepicker').date()) {
		$("#create_teststartdate").addClass("is-invalid");
		$("#create_teststartdatereminderdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#create_billenddate").data('datetimepicker').date()!==null && $("#create_billenddatereminderdate").data('datetimepicker').date()!==null && $("#create_billenddate").data('datetimepicker').date() < $("#create_billenddatereminderdate").data('datetimepicker').date()) {
		$("#create_billenddate").addClass("is-invalid");
		$("#create_billenddatereminderdate").addClass("is-invalid");
		is_valid=0;
	}
	if ($("#create_testenddate").data('datetimepicker').date()!==null && $("#create_testenddatereminderdate").data('datetimepicker').date()!==null && $("#create_testenddate").data('datetimepicker').date() < $("#create_testenddatereminderdate").data('datetimepicker').date()) {
		$("#create_testenddate").addClass("is-invalid");
		$("#create_testenddatereminderdate").addClass("is-invalid");
		is_valid=0;
	}
	
	if ($("#create_customer").val()==="") {
		$("#create_customer").addClass("is-invalid");is_valid=0;
	}
	if ($("#create_alias").val()==="") {
		$("#create_alias").addClass("is-invalid");is_valid=0;
	}
	if ($("#create_business_type").val()==="") {
		$("#create_business_type").addClass("is-invalid");is_valid=0;
	}
	if ($("#create_recurring_fee").val()==="") {
		$("#create_recurring_fee").addClass("is-invalid");is_valid=0;
	}
	if ($("#create_recurring_fee_interval").val()==="") {
		$("#create_recurring_fee_interval").addClass("is-invalid");is_valid=0;
	}
	if ($("#create_setup_fee").val()==="") {
		$("#create_setup_fee").addClass("is-invalid");is_valid=0;
	}
	
	if ($("#create_billstartdatereminderemail").val()!=="" && !isValidEmail($("#create_billstartdatereminderemail").val())) {
		$("#create_billstartdatereminderemail").addClass("is-invalid");is_valid=0;
	}
	if ($("#create_billenddatereminderemail").val()!=="" && !isValidEmail($("#create_billenddatereminderemail").val())) {
		$("#create_billenddatereminderemail").addClass("is-invalid");is_valid=0;
	}
	if ($("#create_teststartdatereminderemail").val()!=="" && !isValidEmail($("#create_teststartdatereminderemail").val())) {
		$("#create_teststartdatereminderemail").addClass("is-invalid");is_valid=0;
	}
	if ($("#create_testenddatereminderemail").val()!=="" && !isValidEmail($("#create_testenddatereminderemail").val())) {
		$("#create_testenddatereminderemail").addClass("is-invalid");is_valid=0;
	}
	
  if (!isCustomerNbrValid($("#create_customer").val())) {
		$("#create_customer").addClass("is-invalid");is_valid=0;
	}
	
	if(is_valid==0) {
		return;
	}

	ShowSpinner($("#create_save_btn"));
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/content-items/ajax/adminapps/shopsystem/create_save?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
    data: { 
			SK_VALID: $("#countrySelection").val(),
			create_customer: $("#create_customer").val(),
			create_alias: $("#create_alias").val(),
			create_business_type: $("#create_business_type").val(),
			create_wants_newsletter: $("input[name='create_wants_newsletter']:checked").val(),
			create_billstartdate: $("#create_billstartdate").data('datetimepicker').date()!==null ? $("#create_billstartdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			create_billenddate: $("#create_billenddate").data('datetimepicker').date()!=null ? $("#create_billenddate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			create_billstartdatereminderdate: $("#create_billstartdatereminderdate").data('datetimepicker').date()!=null ? $("#create_billstartdatereminderdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			create_billenddatereminderdate: $("#create_billenddatereminderdate").data('datetimepicker').date()!=null ? $("#create_billenddatereminderdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			create_billstartdatereminderemail: $("#create_billstartdatereminderemail").val(),
			create_billenddatereminderemail: $("#create_billenddatereminderemail").val(),
			create_teststartdate: $("#create_teststartdate").data('datetimepicker').date()!=null ? $("#create_teststartdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			create_testenddate: $("#create_testenddate").data('datetimepicker').date()!=null ? $("#create_testenddate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			create_teststartdatereminderdate: $("#create_teststartdatereminderdate").data('datetimepicker').date()!=null ? $("#create_teststartdatereminderdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			create_testenddatereminderdate: $("#create_testenddatereminderdate").data('datetimepicker').date()!=null ? $("#create_testenddatereminderdate").data('datetimepicker').date().format('YYYY-MM-DD') : null,
			create_teststartdatereminderemail: $("#create_teststartdatereminderemail").val(),
			create_testenddatereminderemail: $("#create_testenddatereminderemail").val(),
			create_recurringfee: AutoNumeric.getNumber($("#create_recurring_fee")[0]),
			create_recurringfeeinterval: $("#create_recurring_fee_interval").val(),
			create_setupfee: AutoNumeric.getNumber($("#create_setup_fee")[0])
    },
    success: function ( json ) {
    	window.scrollTo(0, 0);
			if (json.status==="success") {
				$('#create_save_toast').toast({ delay: 3000, autohide:true });
				$('#create_save_toast').toast("show");
				HideSpinner($("#create_save_btn"));
				MenuShowContent("overview");
			}
			else if (json.status==="error") {
				$('#create_save_error_toast').toast({ delay: 3000, autohide:true });
				$('#create_save_error_toast').toast("show");
				HideSpinner($("#create_save_btn"));
			}
    	return json.data;
    }
  });
}

function base64ToArrayBuffer(base64) {
	var binaryString = window.atob(base64);
	var binaryLen = binaryString.length;
	var bytes = new Uint8Array(binaryLen);
	for (var i = 0; i < binaryLen; i++) {
	  var ascii = binaryString.charCodeAt(i);
	  bytes[i] = ascii;
	}
	return bytes;
}

function ActionSendEmail() {
	if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
		var shtml="";
    $.ajax({
      type: "POST",
      dataType: "html",
      url: "/content-items/ajax/adminapps/shopsystem/list_email?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
      data: {
      	id: $("#DT_Result").DataTable().row('.selected').id(),
      	SK_VALID: $("#countrySelection").val()
      },
      success: function ( json ) {
      	shtml=json;
	      $.ajax({
	        type: "POST",
	        dataType: "json",
	        url: "/content-items/ajax/adminapps/shopsystem/list_details?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
	        data: { 
						id: $("#DT_Result").DataTable().row('.selected').id(),
						SK_VALID: $("#countrySelection").val()
	        },
	        success: function ( json ) {
	        	var arr1 = ["RECURRING_FEE", "SETUP_FEE"];
	 					var arr2 = ["RECURRING_FEE_INTERVAL"];
	 			 		var strSubject=$("#DT_Result").DataTable().row('.selected').data().EmailSubject;
	        	$.each( json.data.SystemDetails, function( key, value ) {
	        		if (is_date(value.value)) {
	        			value.value=new Date(value.value).toLocaleDateString(locale, localeoptions);
	        		}
	        		else if (arr1.includes(value.column)) {
	        			value.value=AutoNumeric.format(value.value, { currencySymbolPlacement: sSymbolPlacement, currencySymbol : suCS, decimalCharacter : sDecimal, digitGroupSeparator : sDecimalSep,	});
	        		}
	        		else if (arr2.includes(value.column)) {
	        			switch (value.value) {
	        					case "1":
	        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_RECURRING_FEE_INTERVAL_Opt1 $}";
	        						 break;
	         					case "2":
	        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_RECURRING_FEE_INTERVAL_Opt2 $}";
	        						 break;
	        					case "3":
	        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_RECURRING_FEE_INTERVAL_Opt3 $}";
	        						 break;
	        					case "4":
	        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_RECURRING_FEE_INTERVAL_Opt4 $}";
	        						 break;
	        					default:
	        				};
	        		}

							shtml=shtml.replace(new RegExp("{"+value.column+"}", "ig"), value.value);
							strSubject=strSubject.replace(new RegExp("{"+value.column+"}", "ig"), value.value);
	        	});
	        	if (typeof json.data.CustomDetails!=="undefined") {
	        		shtml+='<div class="row d-flex flex-nowrap"><div class="col-sm"><b><hr style="border:1px solid #FF0000"></b></div></div>';
		        	$.each( json.data.CustomDetails, function( key, value ) {
		        		if (is_date(value.value)) {
		        			value.value=new Date(value.value).toLocaleDateString(locale, localeoptions);
		        		}
								shtml=shtml.replace(new RegExp("{"+value.column+"}", "ig"), value.value);
								strSubject=strSubject.replace(new RegExp("{"+value.column+"}", "ig"), value.value);
		        	});
	        	}
	        	
	        	var blob = new Blob(["To: "+$("#DT_Result").DataTable().row('.selected').data().ContactEmail+"\nSubject: "+strSubject+" (NOP"+$("#DT_Result").DataTable().row('.selected').id()+" "+$("#DT_Result").DataTable().row('.selected').data().Customer+")\nX-Unsent: 1\nContent-Type: text/html;charset=utf-8\n\n<html><head></head><body>"+shtml+"</body></html>"], {type: "message/rfc822;charset=utf-8"});
						saveAs(blob, "ResellerEmail.eml");
        	}
        });

      	return;
      }
    });
  }
}

function Invoicing_Export() {
		var outputformat="";
		if ($("#invoicing_export_format option:selected").val()=="xls") {
			outputformat="xls";
		}
		else if ($("#invoicing_export_format option:selected").val()=="csv") {
			outputformat="csv";
		}
		else if ($("#invoicing_export_format option:selected").val()=="txt") {
			outputformat="txt";
		}
		window.location="/content-items/ajax/adminapps/shopsystem/export_invoicing_"+outputformat+"?lang={% LocalizationContext.CurrentCulture.CultureCode #%}&SK_VALID="+$("#countrySelection").val();
		/*	
    $.ajax({
      type: "POST",
      dataType: "html",
      url: "/content-items/ajax/adminapps/shopsystem/export_invoicing?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
      data: {
      	SK_VALID: $("#countrySelection").val()	
      },
      success: function ( blob ) {
				saveAs(blob, "Invoicing.xlsx");
      	return;
      }
    });*/
}

$(function () {
	/*all options for maxlength plugin*/
	$('input[maxlength], textarea').maxlength({
	  alwaysShow: true, //if true the threshold will be ignored and the remaining length indication will be always showing up while typing or on focus on the input. Default: false.
	 // threshold: 10, //Ignored if alwaysShow is true. This is a number indicating how many chars are left to start displaying the indications. Default: 10
	  warningClass: "form-text text-muted mt-1", //it's the class of the element with the indicator. By default is the bootstrap "badge badge-success" but can be changed to anything you'd like.
	  limitReachedClass: "form-text text-muted mt-1", //it's the class the element gets when the limit is reached. Default is "badge badge-danger". Replace with text-danger if you want it to be red.
	  //separator: ' of ', //represents the separator between the number of typed chars and total number of available chars. Default is "/".
	  //preText: 'You have ', //is a string of text that can be outputted in front of the indicator. preText is empty by default.
	  //postText: ' chars remaining.', //is a string outputted after the indicator. postText is empty by default.
	  showMaxLength: true, //showMaxLength: if false, will display just the number of typed characters, e.g. will not display the max length. Default: true.
	  showCharsTyped: true, //if false, will display just the remaining length, e.g. will display remaining lenght instead of number of typed characters. Default: true.
	  placement: 'bottom-right-inside', //is a string, object, or function, to define where to output the counter. Possible string values are: bottom ( default option ), left, top, right, bottom-right, top-right, top-left, bottom-left and centered-right. Are also available : **bottom-right-inside** (like in Google's material design, **top-right-inside**, **top-left-inside** and **bottom-left-inside**. stom placements can be passed as an object, with keys top, right, bottom, left, and position. These are passed to $.fn.css. A custom function may also be passed. This method is invoked with the {$element} Current Input, the {$element} MaxLength Indicator, and the Current Input's Position {bottom height left right top width}.
	  //appendToParent: true, // appends the maxlength indicator badge to the parent of the input rather than to the body.
	  //message: an alternative way to provide the message text, i.e. 'You have typed %charsTyped% chars, %charsRemaining% of %charsTotal% remaining'. %charsTyped%, %charsRemaining% and %charsTotal% will be replaced by the actual values. This overrides the options separator, preText, postText and showMaxLength. Alternatively you may supply a function that the current text and max length and returns the string to be displayed. For example, function(currentText, maxLength) { return '' + Math.ceil(currentText.length / 160) + ' SMS Message(s)';}
	  //utf8: if true the input will count using utf8 bytesize/encoding. For example: the '£' character is counted as two characters.
	  //showOnReady: shows the badge as soon as it is added to the page, similar to alwaysShow
	  twoCharLinebreak: true,//count linebreak as 2 characters to match IE/Chrome textarea validation
	  //customMaxAttribute: String -- allows a custom attribute to display indicator without triggering native maxlength behaviour. Ignored if value greater than a native maxlength attribute. 'overmax' class gets added when exceeded to allow user to implement form validation.
	  //allowOverMax: Will allow the input to be over the customMaxLength. Useful in soft max situations.
	});
});
 
//flag for user rights
 
  var toolbar = 
  "<div class='btn-toolbar' role='toolbar'>" + 
  "<div class='btn-group' role='group'>" + 
  "</div>";  
//write datatable errors to console
$.fn.dataTable.ext.errMode = function ( settings, helpPage, message ) { 
  console.log(message);
};
$.fn.dataTable.Api.register( 'processing()', function ( show ) {
    return this.iterator( 'table', function ( ctx ) {
        ctx.oApi._fnProcessingDisplay( ctx, show );
    } );
} );
 
$(document).on("preInit.dt", function (e, settings) {
  var $sb = $(".dataTables_filter input[type='search'][aria-controls='DT_Serials']");
  $sb.off();
  $sb.on("keypress", function (evtObj) {
    if (evtObj.keyCode == 13) {
      $('#DT_Serials').DataTable().search($sb.val()).draw();
      evtObj.preventDefault();
    }
  });
});  
              
$(document).ready(function(e) 
{    
		$("#countrySelection").val(currentUserSK_VALID);
	
		new AutoNumeric($("#create_recurring_fee")[0], { currencySymbolPlacement: sSymbolPlacement, currencySymbol : suCS, decimalCharacter : sDecimal, digitGroupSeparator : sDecimalSep,	minimumValue: 0});
  	AutoNumeric.set($("#create_recurring_fee")[0], 0);

		new AutoNumeric($("#create_setup_fee")[0], { currencySymbolPlacement: sSymbolPlacement, currencySymbol : suCS, decimalCharacter : sDecimal, digitGroupSeparator : sDecimalSep,	minimumValue: 0});
		AutoNumeric.set($("#create_setup_fee")[0], 0);
	 
		$("#countrySelection").on("change", function() {
			$("#activeCountry").text($("#countrySelection option:selected").text());
			$("#slidein-ribbon a.selected").trigger("click");
			if($("#shop_search_input") && tbl_result) {
				$("#DT_Result").DataTable().ajax.reload();
			}
		});
		
		$("#countrySelection").trigger("change");

		MenuShowContent("");
	
    $("#CookieConsentLayer").find($('input[type=submit]')).each(function(key, val){
        $(val).attr("formnovalidate","true");
    });
    
    $('div.date input').datetimepicker({
      icons: {today: 'far fa-calendar-check'},
      allowInputToggle: true,
      format: 'L',
			locale: locale,
      debug: false,
      viewMode: 'days',
      ignoreReadonly: true,
      widgetPositioning: {
          horizontal: 'left',
          vertical: 'bottom'
      }
    });
    
    /*set current date on date time pickers*/

    //$("div.date").data("datetimepicker").date(new Date());
       
    function MoveToPage(searchtxt) {
	    //tbl_serials.column(8).search( searchtxt ? '^'+searchtxt+'$' : '', true, false ).draw();
	  } 
 
    var tbl_result=$("#DT_Result").DataTable(
    {
      // dom: '<"theader-wrapper"lf<btn_resetsearch><"toolbar">r>tip',
      //dom: '<"theader-wrapper"r>tp',
				"dom": "<'row'<'col-md-3'><'col-md-5'<'toolbar dataTables_length'>><'col-md-4'B>>" +
        "<'row'<'col-md-6'><'col-md-6'>>" +
        "<'row'<'col-md-12't>><'row'<'col-md-12'p>>",
      aLengthMenu: [10, 25, 75, 100, 150, 250],
      pageLength: 10,
      paging: true,  
      //sWidth: "100%",
      ajax: {
        type: "POST",
        url: "/content-items/ajax/adminapps/shopsystem/list_overview",
        data:  function(d) { 
					d.filter=$('input[name="filteroptions"]:checked').val();
					d.SK_VALID=$("#countrySelection").val();
					d.searchterm=$("#shop_search_input").val();
					return d;
        },
        dataSrc: function ( json ) {
	 				$("#filter1badge").text(json.CNT_BILLING_PHASE);
	 				$("#filter2badge").text(json.CNT_TEST_PHASE);
	 				$("#filter3badge").text(json.CNT_ENABLED);
	 				$("#filter4badge").text(json.CNT_DISABLED);
	 				$("#filter5badge").text(json.CNT_DELETED);
	 				
				  if (json.data[0].ShopId === "" ) {
				    return [];
				  }

        	return json.data;
        }
      },
      //scrollCollapse : true,
      responsive: true,   
      autoWidth: true,
      //scrollX: true,
      serverSide: false,
   
       
      // processing: true,
      columns: [
        {
          data: "DT_RowId",
          title: "id",
          name: "DT_RowId",
          orderable: false,
          visible: false,
        },
        {
          class: "",
          data: "ShopId",
          name: "ShopId",
          render: function (data, type, full, meta) {
          	if (is_date(full.Create_Date)) {
          		full.Create_Date=new Date(full.Create_Date).toLocaleDateString(locale, localeoptions);
          	}
          	if (is_date(full.Last_Pricefile_Update)) {
          		full.Last_Pricefile_Update=new Date(full.Last_Pricefile_Update).toLocaleDateString(locale, localeoptions);
          	}
          	if (is_date(full.Last_Availability_Update)) {
          		full.Last_Availability_Update=new Date(full.Last_Availability_Update).toLocaleDateString(locale, localeoptions);
          	}
          	
          	var shtml='<div class="row text-nowrap">'+
					            '<div class="col-sm">'+
					            '  <div class="row">'+
					            '    <div class="col-sm" abc="{$$}"><a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_IS_ENABLED $}"><i class="fas fa-circle '+full.Is_Enabled_css+'"></i></a> <a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_ID $}"><b>'+full.ShopId+'</b></a> <a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_VERSION $}">V '+full.Version+'</a></div>'+
					            '    <div class="col-sm"><a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_CREATE_DATE $}">'+full.Create_Date+'</a></div>'+
					            '    <div class="col-sm"><a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_CUSTOMER_STATUS $}"><i class="fas fa-circle '+full.Customer_Status_css+'"></i></a> <a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_BRCUSTOMERNBR $}">'+full.Customer+'</a></div>'+
					            '  </div>'+
					            '  <div class="row">'+
					            '    <div class="col-sm"><a href="https://www.imsuperstore.eu/'+full.Alias+'/login?returnUrl=%2F'+full.Alias+'%2Fadmin" target="_new" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_AdminLogin $}"><i class="material-icons" style="margin-left:-6px">lock</i></a> <a target="_new" href="https://www.imsuperstore.eu/'+full.Alias+'" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_Alias $}">'+full.Alias+'</a></div>'+
					            '    <div class="col-sm"><a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_BATCHUPDATE_STATUS $}"><i class="fas fa-circle '+full.BatchUpdate_Status_css+'"></i></a> <a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_LAST_PRICEFILE_UPDATE $}">'+full.Last_Pricefile_Update+'</a> <a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_CALCULATION_STATUS $}"><i class="fas fa-circle '+full.Calculation_Status_css+'"></i></a> <a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_LAST_AVAILABILITY_UPDATE $}">'+full.Last_Availability_Update+'</a></div>'+
					            '    <div class="col-sm"><a href="javascript:void(0);" class="text-decoration-none" data-toggle="tooltip" title="{$ oneIM_adminapps_ShopSystem_Details_CUSTOMER_NAME $}">'+full.Customer_Name+'</a></div>'+
					            '  </div>'+ 
					            '</div>'+
					          	'</div>' 
          	
          	return shtml;
          },
          orderable: false,
          visible: true,
          title: "content"
        },
      ],
      language: {
        url: "/CMSScripts/Custom/jQuery/dataTables.lang/"+dtlang+".js",
      },
      initComplete: function(settings, json) {
        //$("div.toolbar").html(shtml);
      },     
      error: function (xhr, error, thrown) {
        //error( xhr, error, thrown );
        //$("#preloadInfo").html("<h1>{$ 1IM.Dashboard.TrackTrace.Error $}!</h1><h2>" + $("#errors div[data='" + xhr.responseText + "']").html() + "!</h2><h3>{$ 1IM.Dashboard.TrackTrace.TryAgain $}</h3>");
        //$(".blockUI").css("cursor", "not-allowed");        
      },   
      drawCallback: function( settings ) {
				$('[data-toggle="tooltip"]').tooltip(); 
      },
      fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) 
      {
        return nRow;
      },
    });   
      
		$('#DT_Result tbody').on( 'click', 'tr', function () {
			if ( $(this).hasClass('selected') ) {
			    $(this).removeClass('selected');
			}
			else {
			    tbl_result.$('tr.selected').removeClass('selected');
			    $(this).addClass('selected');
			}
		});
	  
	  $('#shop_search_input').on('keyup keypress', function(e) {
		  var keyCode = e.keyCode || e.which;
		  if (keyCode === 13) { 
		    e.preventDefault();
		    $("#DT_Result").DataTable().ajax.reload();
		    return false;
		  }
		});
		
		$('input[name="filteroptions"]').on('change', function() {
			$("#DT_Result").DataTable().ajax.reload();
		});
});
 
function ShowModal(modalname) {
	if (modalname==="Action_details") {
		if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "/content-items/ajax/adminapps/shopsystem/list_details?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
        data: { 
					id: $("#DT_Result").DataTable().row('.selected').id(),
					SK_VALID: $("#countrySelection").val()
        },
        success: function ( json ) {
        	var shtml="";
        	var arr1 = ["RECURRING_FEE", "SETUP_FEE", "CUSTOMER_YTD"];
 					var arr2 = ["CUSTOMER_STATUS", "IS_ENABLED", "BATCHUPDATE_STATUS", "CALCULATION_STATUS"];
 					var arr3 = ["RECURRING_FEE_INTERVAL"];
 					var arr4 = ["IS_BILLING_PHASE", "IS_TEST_PHASE", "IS_ENABLED", "IS_DELETED", "IS_SETUP", "IS_FTP_SETUP", "IS_PRICEFILE_SETUP", "IS_ALIAS_CHANGED", "WANTS_NEWLETTER"];
 					var arr5 = ["BUSINESS_TYPE"];
 
        	$.each( json.data.SystemDetails.sort(dynamicSort("key")), function( key, value ) {
        		if (is_date(value.value)) {
        			value.value=new Date(value.value).toLocaleDateString(locale, localeoptions);
        		}
        		else if (arr1.includes(value.column)) {
        			value.value=AutoNumeric.format(value.value, { currencySymbolPlacement: sSymbolPlacement, currencySymbol : suCS, decimalCharacter : sDecimal, digitGroupSeparator : sDecimalSep,	});
        		}
        		else if (arr2.includes(value.column)) {
        			if (value.value=="1") { value.value='<i class="fas fa-circle text-success"></i>'; } else if (value.value=="2") { value.value='<i class="fas fa-circle text-warning"></i>'; } else if (value.value=="0" && (value.column=="BATCHUPDATE_STATUS" || value.column=="CALCULATION_STATUS")){ value.value='<i class="fas fa-circle text-danger"></i>'; } else if (value.value!="0" && (value.column=="BATCHUPDATE_STATUS" || value.column=="CALCULATION_STATUS")){ value.value='<i class="fas fa-circle text-secondary"></i>'; } else { value.value='<i class="fas fa-circle text-danger"></i>'; }
        		}
        		else if (arr3.includes(value.column)) {
        			switch (value.value) {
        					case "1":
        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_RECURRING_FEE_INTERVAL_Opt1 $}";
        						 break;
         					case "2":
        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_RECURRING_FEE_INTERVAL_Opt2 $}";
        						 break;
        					case "3":
        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_RECURRING_FEE_INTERVAL_Opt3 $}";
        						 break;
        					case "4":
        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_RECURRING_FEE_INTERVAL_Opt4 $}";
        						 break;
        					default:
        				};
        		}
       		else if (arr5.includes(value.column)) {
        			switch (value.value) {
        					case "1":
        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_BUSINESS_TYPE_Opt1 $}";
        						 break;
         					case "2":
        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_BUSINESS_TYPE_Opt2 $}";
        						 break;
        					case "3":
        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_BUSINESS_TYPE_Opt3 $}";
        						 break;
        					case "4":
        						 value.value="{$ oneIM_adminapps_ShopSystem_Details_BUSINESS_TYPE_Opt4 $}";
        						 break;
        					default:
        				};
        		}
        		else if (arr4.includes(value.column)) {
        			if (value.value=="1") { value.value="{$oneIM_adminapps_ShopSystem_Details_YES$}"; } else { value.value="{$oneIM_adminapps_ShopSystem_Details_NO$}"; }
        		}
						shtml+='<div class="row d-flex flex-nowrap"><div class="col-sm"><b>'+value.key+'</b></div><div class="col-sm">'+value.value+'</div><div class="pr-2"><i class="material-icons" style="visibility:hidden">delete</i></div></div>';
        	});
        	if (typeof json.data.CustomDetails!=="undefined") {
        		shtml+='<div class="row d-flex flex-nowrap"><div class="col-sm"><b><hr style="border:1px solid #FF0000"></b></div></div>';
	        	$.each( json.data.CustomDetails.sort(dynamicSort("key")), function( key, value ) {
	        		if (is_date(value.value)) {
	        			value.value=new Date(value.value).toLocaleDateString(locale, localeoptions);
	        		}
	        		value.key=value.key.replace("oneIM_adminapps_ShopSystem_Details_","");
							shtml+='<div class="row d-flex flex-nowrap"><div class="col-sm"><b>'+value.key+'</b></div><div class="col-sm">'+value.value+'</div><div class="pr-2"><a id="details_btn_delete_'+value.id+'" href="javascript:DeleteDetails('+value.id+', '+$("#DT_Result").DataTable().row('.selected').id()+');"><i class="customattributes-delete material-icons">delete</i></a></div></div>';
	        	});
        	}
        	
        	$("#Action_details .modal-body-scroll").html(shtml);
					$("#"+modalname).modal('show');

        	return json.data;
        }
      });
      
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "/content-items/ajax/adminapps/shopsystem/list_details_custom_attributes?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
        data: {
        	SK_VALID: $("#countrySelection").val()	
        },
        success: function ( json ) {
        	var shtml="";
        	$("#customattribute_presel").empty().append($('<option></option>').val("").html(CustomAttributeOptionSelect));
        	$.each( json.data.sort(dynamicSort("customattribute")), function( key, value ) {
				    $("#customattribute_presel").append(
				        $('<option></option>').val(value.id).html(value.customattribute)
				    );
        	});

        	return json.data;
        }
      });
    }
	}
	else if (modalname==="Action_delete") {
		if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
			$("#delete_shopid").html("<b>NOP"+$("#DT_Result").DataTable().row('.selected').id()+"</b>");
			$("#"+modalname).modal('show');
		}
	}
	else if (modalname==="Action_history") {
		if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "/content-items/ajax/adminapps/shopsystem/list_history?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
        data: { 
					id: $("#DT_Result").DataTable().row('.selected').id(),
					SK_VALID: $("#countrySelection").val()
        },
        success: function ( json ) {
        	var shtml="";
        	 
        	$.each( json.data, function( key, value ) {
        		value.createdate=new Date(value.createdate).toLocaleDateString(locale, localeoptions);
						shtml+='<div class="speech-bubble">'+value.messagetext.replace("\r\n","<br>")+'</div><br><b>'+value.createdate+' '+value.createuser+'</b><br><br>';
        	});

        	$("#Action_history .modal-body-scroll").html(shtml);
					$("#"+modalname).modal('show');
					
        	return json.data;
        }
      });
    }
	}
	else if (modalname==="Action_alias") {
		if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
			$("#change_alias_shopid").html("<b>NOP"+$("#DT_Result").DataTable().row('.selected').id()+" "+$("#DT_Result").DataTable().row('.selected').data().Alias+"</b>");
			$("#"+modalname).modal('show');
		}
	}
	else if (modalname==="Action_customer") {
		if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
			$("#change_customer_lbl").html("<b>NOP"+$("#DT_Result").DataTable().row('.selected').id()+" "+$("#DT_Result").DataTable().row('.selected').data().Customer+" "+$("#DT_Result").DataTable().row('.selected').data().Customer_Name+"</b>");
			$("#"+modalname).modal('show');
		}
	}
	else if (modalname==="Action_onoff") {
		if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
			$("#switch_onoff_lbl").html("<b>NOP"+$("#DT_Result").DataTable().row('.selected').id()+"</b>");

			if ($("#DT_Result").DataTable().row('.selected').data().Is_Enabled=="1") {
				$("#switch_onoff_opt1").parent().removeClass("active").addClass("active");
				$("#switch_onoff_opt2").parent().removeClass("active");
				$('input:radio[name="switch_onoff"]:nth(0)').attr('checked',true);
				$('input:radio[name="switch_onoff"]:nth(1)').attr('checked',false);
				$('input:radio[name="switch_onoff"]:nth(0)').prop('checked',true);
				$('input:radio[name="switch_onoff"]:nth(1)').prop('checked',false);
			}
			else {
				$("#switch_onoff_opt1").parent().removeClass("active");
				$("#switch_onoff_opt2").parent().removeClass("active").addClass("active");
				$('input:radio[name="switch_onoff"]:nth(0)').attr('checked',false);
				$('input:radio[name="switch_onoff"]:nth(1)').attr('checked',true);
				$('input:radio[name="switch_onoff"]:nth(0)').prop('checked',false);
				$('input:radio[name="switch_onoff"]:nth(1)').prop('checked',true);
			}
			$("#"+modalname).modal('show');
		}
	}
	else if (modalname==="Action_log") {
		if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "/content-items/ajax/adminapps/shopsystem/list_log?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
        data: { 
					id: $("#DT_Result").DataTable().row('.selected').id(),
					SK_VALID: $("#countrySelection").val()
        },
        success: function ( json ) {
        	var shtml="";
        	 
        	$.each( json.data, function( key, value ) {
        		value.createdate=new Date(value.createdate).toLocaleDateString(locale, localeoptions);
						shtml+='<div class="row d-flex flex-nowrap">';
							shtml+='<div class="col-sm text-nowrap"><b>Server:</b> '+value.servername+'</div><div class="col-sm text-nowrap"><b>Create user:</b> '+value.createuser+'</div><div class="col-sm text-nowrap"><b>Createdate:</b> '+value.createdate+'</div>';
						shtml+='</div>';
						shtml+='<div class="row d-flex flex-nowrap">';
							shtml+='<div class="col-sm text-nowrap"><b>Command:</b> '+value.cmd.replace("\r\n","<br>")+'</div><div class="col-sm text-nowrap"><b>Log level:</b> '+value.loglevel+'</div><div class="col-sm text-nowrap"><b>Is archived:</b> '+value.is_archived+'</div>';
						shtml+='</div>';
						shtml+='<div class="row d-flex flex-nowrap">';
							shtml+='<div class="col-sm">'+value.logentry.replace("\r\n","<br>")+'</div>';
						shtml+='</div>';
						shtml+='<div class="row d-flex flex-nowrap"><hr style="border:1px solid #FF0000; width:100%"></div>';
        	});

        	$("#Action_log .modal-body-scroll").html(shtml);
					$("#"+modalname).modal('show');

        	return json.data;
        }
      });
			$("#"+modalname).modal('show');
		}
	}
	
	function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
	}
}

function DeleteShop() {
	if ($("#DT_Result").DataTable().row('.selected').id()!=null) {
		ShowSpinner($("#delete_btn_delete"));
	  $.ajax({
	    type: "POST",
	    dataType: "json",
	    url: "/content-items/ajax/adminapps/shopsystem/delete_shop?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
	    data: { 
				id: $("#DT_Result").DataTable().row('.selected').id(),
				SK_VALID: $("#countrySelection").val()
	    },
	    success: function ( json ) {
				if (json.status==="success") {
					$('#delete_toast').toast({ delay: 3000, autohide:true });
					$('#delete_toast').toast("show");
					HideSpinner($("#delete_btn_delete"));
					$("#delete_btn_delete").prop("disabled", true);
					$("#DT_Result").DataTable().ajax.reload();
				}
				
	    	return json.data;
	    }
	  });
	}
}

function DeleteDetails(id, shopid) {
	ShowSpinner($("#details_btn_delete_"+id));
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/content-items/ajax/adminapps/shopsystem/delete_details?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
    data: { 
			id: id,
			shopid: shopid,
			SK_VALID: $("#countrySelection").val()
    },
    success: function ( json ) {
			if (json.status==="success") {
				$('#details_deleted').toast({ delay: 3000, autohide:true });
				$('#details_deleted').toast("show");
				ShowModal("Action_details");
			}
			
    	return json.data;
    }
  });
}

$( document ).on( "click", "#details_delete_yes_no_delete", function() {
  $('#details_delete_yes_no').modal('hide');
  DeleteDetailsAttribute(true);
});

function DeleteDetailsAttribute(modal_yes) {
	$("#customattribute_presel").removeClass("is-invalid");
	if ($("#customattribute_presel option:selected").val()==="") {
		$("#customattribute_presel").addClass("is-invalid");
		return;
	}

	$("#details_delete_yes_no").modal('show');
	
	if (!modal_yes) return;
	
	ShowSpinner($("#details_btn_delete_attribute"));
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/content-items/ajax/adminapps/shopsystem/delete_details_attribute?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
    data: { 
			id: $("#customattribute_presel option:selected").val(),
			SK_VALID: $("#countrySelection").val()
    },
    success: function ( json ) {
			if (json.status==="success") {
				$('#details_deleted').toast({ delay: 3000, autohide:true });
				$('#details_deleted').toast("show");
				HideSpinner($("#details_btn_delete_attribute"));
				ShowModal("Action_details");
			}
			
    	return json.data;
    }
  });
}

function CreateDetails() {	
	if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
		$("#customattribute").removeClass("is-invalid");
		$("#customvalue").removeClass("is-invalid");
		var ret=false;
		if ($("#customattribute").val()=="" && $("#customattribute_presel option:selected").val()=="") {
			$("#customattribute").addClass("is-invalid");
			ret=true;
		}
		if ($("#customvalue").val()=="") {
			$("#customvalue").addClass("is-invalid");
			ret=true;
		}
		if (ret) {return;}
		ShowSpinner($("#details_btn_create"));
	  $.ajax({
	    type: "POST",
	    dataType: "json",
	    url: "/content-items/ajax/adminapps/shopsystem/create_details?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
	    data: {
				customattribute: $("#customattribute").val(),
				customattributeid: $("#customattribute_presel option:selected").val(),
				customvalue: $("#customvalue").val(),
				shopid: $("#DT_Result").DataTable().row('.selected').id(),
				SK_VALID: $("#countrySelection").val()
	    },
	    success: function ( json ) {
				if (json.status==="success") {
					$('#details_create').toast({ delay: 3000, autohide:true });
					$('#details_create').toast("show");
					$("#customattribute").val("");
					$("#customvalue").val("");
					HideSpinner($("#details_btn_create"));
					ShowModal("Action_details");
				}
				
	    	return json.data;
	    }
	  });
	}
}

function CreateHistory() {	
	if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
		$("#comment").removeClass("is-invalid");
		var ret=false;
		if ($("#comment").val()=="") {
			$("#comment").addClass("is-invalid");
			ret=true;
		}

		if (ret) {return;}
		ShowSpinner($("#history_btn_create"));
	  $.ajax({
	    type: "POST",
	    dataType: "json",
	    url: "/content-items/ajax/adminapps/shopsystem/create_history?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
	    data: { 
				comment: $("#comment").val(),
				shopid: $("#DT_Result").DataTable().row('.selected').id(),
				SK_VALID: $("#countrySelection").val()
	    },
	    success: function ( json ) {
				if (json.status==="success") {
					$('#history_toast').toast({ delay: 3000, autohide:true });
					$('#history_toast').toast("show");
					$("#comment").val("");
					HideSpinner($("#history_btn_create"));
					ShowModal("Action_history");
				}
				
	    	return json.data;
	    }
	  });
	}
}

function ChangeAlias() {	
	if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
		$("#change_alias_input").removeClass("is-invalid");
		var ret=false;
		if ($("#change_alias_input").val()=="") {
			$("#change_alias_input").addClass("is-invalid");
			ret=true;
		}

		if (ret) {return;}
		ShowSpinner($("#change_alias_btn"));
	  $.ajax({
	    type: "POST",
	    dataType: "json",
	    url: "/content-items/ajax/adminapps/shopsystem/change_alias?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
	    data: { 
				newalias: $("#change_alias_input").val(),
				shopid: $("#DT_Result").DataTable().row('.selected').id(),
				SK_VALID: $("#countrySelection").val()
	    },
	    success: function ( json ) {
				if (json.status==="success") {
					$('#change_alias_toast').toast({ delay: 3000, autohide:true });
					$('#change_alias_toast').toast("show");
					$("#change_alias_input").val("");
					HideSpinner($("#change_alias_btn"));
					$("#change_alias_btn").prop("disabled", true);
					$("#DT_Result").DataTable().ajax.reload();
				}
				
	    	return json.data;
	    }
	  });
	}
}

function ChangeCustomer() {	
	if ($("#DT_Result").DataTable().row('.selected').id() && $("#DT_Result").DataTable().row('.selected').data().Is_Deleted=="0") {
		$("#change_customer_input").removeClass("is-invalid");
		var ret=false;
		if ($("#change_customer_input").val()=="") {
			$("#change_customer_input").addClass("is-invalid");
			ret=true;
		}
		if (!isCustomerNbrValid($("#change_customer_input").val())) {
			$("#change_customer_input").addClass("is-invalid");
			ret=true;
		}

		if (ret) {return;}
		ShowSpinner($("#change_customer_btn"));
	  $.ajax({
	    type: "POST",
	    dataType: "json",
	    url: "/content-items/ajax/adminapps/shopsystem/change_customer?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
	    data: { 
				newcustomer: $("#change_customer_input").val(),
				shopid: $("#DT_Result").DataTable().row('.selected').id(),
				SK_VALID: $("#countrySelection").val()
	    },
	    success: function ( json ) {
				if (json.status==="success") {
					$('#change_customer_toast').toast({ delay: 3000, autohide:true });
					$('#change_customer_toast').toast("show");
					$("#change_customer_input").val("");
					HideSpinner($("#change_customer_btn"));
					$("#change_customer_btn").prop("disabled", true);
					$("#DT_Result").DataTable().ajax.reload();
				}
				else if (json.status==="error") {
					$('#change_customer_error_toast').toast({ delay: 3000, autohide:true });
					$('#change_customer_error_toast').toast("show");
					HideSpinner($("#change_customer_btn"));
				}
				
	    	return json.data;
	    }
	  });
	}
}

function SwitchOnOff() {	
	if ($("#DT_Result").DataTable().row('.selected').id()!=null) {
		ShowSpinner($("#switch_onoff_btn"));
	  $.ajax({
	    type: "POST",
	    dataType: "json",
	    url: "/content-items/ajax/adminapps/shopsystem/switch_onoff?lang={% LocalizationContext.CurrentCulture.CultureCode #%}",
	    data: { 
				newstatus: $("input:radio[name='switch_onoff']:checked").val(),
				shopid: $("#DT_Result").DataTable().row('.selected').id(),
				SK_VALID: $("#countrySelection").val()
	    },
	    success: function ( json ) {
				if (json.status==="success") {
					$('#switch_onoff_toast').toast({ delay: 3000, autohide:true });
					$('#switch_onoff_toast').toast("show");
					HideSpinner($("#switch_onoff_btn"));
					$("#DT_Result").DataTable().ajax.reload();
				}
				
	    	return json.data;
	    }
	  });
	 }
}

function ShowSpinner(obj) {
	$(obj).prop("disabled", true);
	$(obj).prepend('<span class="spinner spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
	
}

function HideSpinner(obj) {
	$(obj).prop("disabled", false);
	$(obj).find(".spinner").remove();
}