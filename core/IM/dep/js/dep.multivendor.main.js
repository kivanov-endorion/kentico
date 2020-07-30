
	// console.log("AppleDEP JS_Main");
	/*********************************************
	06.06.2020 -ge created 
	*********************************************/
	const cVendMasterName= {
		Apple: 'Apple',
		Samsung: 'Samsung',
		Google: 'Google',
		Microsoft: 'Microsoft'
	}

	var sql_device_id = "";
	var customer_id = "";
	var vendmastertext = "";
	var vendmastervalue = "";
	var selectedText = "";
	var selectedValue = "";
	// var CUSTOMER_ID = ";
	var RESELLER_DEPID = "";
	var ENROLLMENT_ID = "";
	var ENDCUSTOMER_DEPID = "";
	var ENDCUSTOMER_NAME = "";
	var ENDCUSTOMER_PO = "";
	var ENDCUSTOMER_EMAIL = "";
	var Comment = "";
	var dt_orderdate_iso = null;
	var dt_shipdate_iso = null;
	var activetab = null;
	var prevtab = null;


	var saved_object;
	var tbl_basket;
	var tbl_basket_select_name = "select_all_dt_basket_apple";
	var tbl_basket_ui_names = [];
	tbl_basket_ui_names.push({DT_Name: 'DT_Basket_Apple', DT_Select: 'select_all_dt_basket_apple'});
	tbl_basket_ui_names.push({DT_Name: 'DT_Basket_Knox', DT_Select: 'select_all_dt_basket_knox'});

	// selection lists
	var rows_basket = [];
	// Array holding selected row IDs
	var rows_selected = [];
	var rows_basket_selected = [];
	var error = {
		valid: true,
		text: "{$DE - Inside.AppleDEP.MainTab.Tab2.message.valid_data$}"
	};

	//external filter function for serials table
	var filter = {
		all: 0,
		enrolled: 1,
		wait4delivery: 2, // truck
		nodep: -1, // is null in SQL statement
		error: -999,
		wait4ov: -93,
		wait4re: -96,
		wait4or: -99,
		apple: "apple",
		pending: "pending"
	};

	var state_fltr = filter.all;

	function addSelectItem(t, ev) {
		ev.stopPropagation();

		var bs = $(t).closest('.bootstrap-select');
		var txt = $(t.parentElement)[0].childNodes['0'].value.replace(/[|]/g, "");

		if ($.trim(txt) == '') return;
		$(t.parentElement)[0].childNodes['0'].value = "";
		var p = bs.find('select');
		p.append($("<option>", {
		"selected": true,
			"text": txt
		})).selectpicker('refresh');

		p.dropdown("toggle");
	}

	function addSelectInpKeyPress(t, ev) {
			ev.stopPropagation();

		// do not allow pipe character
		if (ev.which == 124) ev.preventDefault();

		// enter character adds the option
		if (ev.which == 13) {
			ev.preventDefault();
			//addSelectItem($(t).next(),ev);
		}
	}

	$(document).ready(function(e) {
		getMasterVendorList();
		if (tbl_basket === undefined)  { // do we need to set the default working table = Apple DEP
			tbl_basket = tbl_basket_apple;
			tbl_basket_select_name = "select_all_dt_basket_apple";
		};
		var table = $('#DT_Serials').DataTable();

		var content = "<input type='text' class='bss-input' onKeyDown='event.stopPropagation();' onKeyPress='addSelectInpKeyPress(this,event);' onClick='event.stopPropagation()' placeholder='{$DE-Inside.AppleDEP.MainTab.Tab2.selectpicker.additem$}'> <span class='glyphicon glyphicon-plus addnewicon' onClick='addSelectItem(this,event,1);'></span>";
		var divider = $('<option />')
			.addClass('divider')
			.data('divider', true);
		var divider2 = $('<option />')
			.addClass('divider')
			.data('divider', true);
		var addoption = $('<option />', {
				class: 'addItem'
		}).data('content', content);
		var addoption2 = $('<option />', {
				class: 'addItem'
		}).data('content', content);
		//.append(divider).prepend(addoption)
		$('#ENDCUSTOMER_DEPID').selectpicker({
				liveSearch: true,
			maxOptions: 1,
			dropupAuto: false,
		});

		$('#ENDCUSTOMER_NAME').selectpicker({
				liveSearch: true,
			maxOptions: 1,
			dropupAuto: false,
		});

		$('#ENDCUSTOMER_DEPID_KNOX').selectpicker({
				liveSearch: true,
			maxOptions: 1,
			dropupAuto: false,
		});

		$('#ENDCUSTOMER_NAME_KNOX').selectpicker({
				liveSearch: true,
			maxOptions: 1,
			dropupAuto: false,
		});
		$('.bs-searchbox').append('<input type="button" class="btn btn-sm btn-primary" onclick="addSelectItem(this,event,1);" value="{$DE-Inside.AppleDEP.MainTab.Tab2.selectpicker.additem$}" />');

		$('#ENDCUSTOMER_DEPID_KNOX').selectpicker('refresh');
		$('#ENDCUSTOMER_NAME_KNOX').selectpicker('refresh');
		$('#ENDCUSTOMER_DEPID').selectpicker('refresh');
		$('#ENDCUSTOMER_NAME').selectpicker('refresh');

		$('#ENDCUSTOMER_SHIPDATE').datetimepicker({
				format: 'L',
			showTodayButton: true,
			//debug: true,
			widgetPositioning: {
				horizontal: 'left',
				vertical: 'bottom'
			},
			icons: {
				time: "far fa-clock",
			date: "fas fa-calendar-alt",
			up: "fas fa-arrow-up",
			down: "fas fa-arrow-down",
			today: "fas fa-calendar-day"
			}
		});
		$('#ENDCUSTOMER_ORDERDATE').datetimepicker({
				format: 'L',
			showTodayButton: true,
			//debug: true,
			widgetPositioning: {
				horizontal: 'left',
				vertical: 'bottom'
			},
			icons: {
				time: "far fa-clock",
			date: "fas fa-calendar-alt",
			up: "fas fa-arrow-up",
			down: "fas fa-arrow-down",
			today: "fas fa-calendar-day"
			}
		});

		$("#ENDCUSTOMER_SHIPDATE").data("DateTimePicker").date(new Date());
		$("#ENDCUSTOMER_ORDERDATE").data("DateTimePicker").date(new Date());

		//event: load apple dep showorder if clicked on third dialog tab opened from line in history sub table
		$(document).on('click', '.showorder', function(e) {
			var EBS_Service_Url_DEV = "172.31.224.159:8069";
			// var EBS_Service_Url_DEV = "localhost:7552";
			var EBS_Service_Url_LIVE = "10.31.224.204:8069";
			var companycd = $(document).find('div#modal').attr('companycd');
			var customerDepId = $(document).find('div#modal').attr('customerDepId');
			var orderNbr = $(document).find('div#modal').attr('orderNbr');
			if (companycd == "") companycd = "DE";
			var _host = EBS_Service_Url_LIVE;
			if (window.location.hostname.toUpperCase().indexOf(".DEV") > 0) {
				_host = EBS_Service_Url_DEV;
			}
			
			var request = "http://" + _host + "/?action=AppleDEPShowOrderV3&company=" + companycd + "&resellerid=" + customerDepId + "&ordernbr=" + orderNbr + "&system=Live";
			if (vendmastertext.indexOf(cVendMasterName.Samsung.toLowerCase()) != -1) {
				var EBS_Service_Url_DEV = "172.31.224.159:7069";
				request = "http://" + _host + "/?action=KnoxList&company=" + companycd + "&resellerid=" + customerDepId + "&ordernbr=" + orderNbr + "&system=Live";
			}
			$('.loading').show();

			$.ajax({
				type: 'GET',
				dataType: 'jsonp',
				jsonpCallback: 'ShowOrder',
				jsonp: false,
				crossDomain: true,
				url: request,
				error: function(jqXHR, textStatus, errorThrown) {
					if (jqXHR.status == 200) {
				$('#showorderjson').val(jqXHR.toString());
					}
					$('.loading').hide();
				},
				success: function(Jsonp) {
				$('#showorderjson').val(JSON.stringify(Jsonp));
					$('.loading').hide();
				}
			});
		});

		// $.fn.select2.defaults.set("theme", "bootstrap");


		/*event: tab clicked by user 
		$('.nav-item ').on('click', function(e,id) {
		  var tabid = $(this).closest('span');
			$('.nav-item ').removeClass("btn-tab-active");
			$(this).addClass('btn-tab-active');
		});
		*/
		$('#btnicons').click(function(e) {
			BootsTragDialog.show({
				message: $('#divicons1')[0].outerHTML + "<br>" + $('#divicons2')[0].outerHTML,
				type: BootstrapDialog.TYPE_INFO,
				nl2br: false
			});
		});

		//event: external filter button clicked
		$('#FilterBtn a').on('click', function() {
			var sel = $(this).data('title');
			var tog = $(this).data('toggle');
			$('#' + tog).prop('value', sel);

			$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
			$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');

			if (sel == "opt_err") state_fltr = filter.error;
			else if (sel == "opt_ne") state_fltr = filter.nodep;
			else if (sel == "opt_all") state_fltr = filter.all;
			else if (sel == "opt_pending") state_fltr = filter.pending;
			else state_fltr = filter.all
			// console.log(sel + " / " + state_fltr);
			/* fire search with new filter */
			searchDevices();
			table.search("").draw();
			table.processing(true);
			//setTimeout( function () {
				//  table.processing( false );
				//}, 4000 );
				//table.ajax.reload();
			})

		$('#DEP_vendor').change(function(e) {
			vendmastertext = $("#DEP_vendor").children("option").filter(":selected").text().toLowerCase();
			vendmastervalue = $("#DEP_vendor").children("option").filter(":selected").attr('value');
			// select new basket and reset all relevant values
			if (vendmastertext.indexOf(cVendMasterName.Apple.toLowerCase()) != -1) {
				tbl_basket = tbl_basket_apple;
				tbl_basket_select_name = "select_all_dt_basket_apple";
			}
			else if (vendmastertext.indexOf(cVendMasterName.Samsung.toLowerCase()) != -1) {
				tbl_basket = tbl_basket_knox;
				tbl_basket_select_name = "select_all_dt_basket_knox";
			}
			/* setting currently changed option value to option variable */
			var option = $(this).find('option:selected').val();
			/* setting input box value to selected option value */
			$('#DEP_vendor').val(option);
			// search serials
			event.preventDefault();
			if (searchDevices()) {
					table.search("").draw();
			};
			// alert(option);
		});


		$('#DEP').selectpicker({
			width: null
		});

		$('#IN_RESELLER_DEPID').css("text-transform", "uppercase");
		$('#ENROLLMENT_ID').css("text-transform", "uppercase");

		//basket form field events
		$('#DEP').change(function(e) {
			/* setting currently changed option value to option variable */
			var option = $(this).find('option:selected').val();
			/* setting input box value to selected option value */
			$('#showoption').val(option);
		});

		// dropdown change event Apple
		$('#ENDCUSTOMER_DEPID').on('change', function(e) {
			var endcustomer = $(this).find('option:selected').text().split(","); // $( "#ENDCUSTOMER_DEPID" ).val().split(",");
			var val = endcustomer[0];
			var val2 = endcustomer[1];
			if (val === undefined && endcustomer[0] !== undefined) {
				val = endcustomer[0].trim()
			} else if (val === undefined) {
				val = "";
			}
			if (val2 === undefined && endcustomer[1] !== undefined) {
				val2 = endcustomer[1].trim()
			} else if (val2 === undefined) {
				val2 = "";
			}
			$('#ENDCUSTOMER_DEPID').selectpicker('val', val.trim());
			if (val2 != "") {
				$('#ENDCUSTOMER_NAME').selectpicker('val', val2.trim());
			}
		});

		$('#ENDCUSTOMER_NAME').on('change', function(e) {
			var endcustomer = $(this).find('option:selected').text().split(",");
			var val = endcustomer[0];
			var val2 = endcustomer[1];
			if (val === undefined && endcustomer[0] !== undefined) {
				val = endcustomer[0].trim()
			} else if (val === undefined) {
				val = "";
			}
			if (val2 === undefined && endcustomer[1] !== undefined) {
				val2 = endcustomer[1].trim()
			} else if (val2 === undefined) {
				val2 = "";
			}
			$('#ENDCUSTOMER_NAME').selectpicker('val', val.trim());
			if (val2 != "") {
				$('#ENDCUSTOMER_DEPID').selectpicker('val', val2.trim());
			}
		});
		// dropdown change event Samsung Knox
		$('#ENDCUSTOMER_DEPID_KNOX').on('change', function(e) {
			var endcustomer = $(this).find('option:selected').text().split(","); 
			var val = endcustomer[0];
			var val2 = endcustomer[1];
			if (val === undefined && endcustomer[0] !== undefined) {
				val = endcustomer[0].trim()
			} else if (val === undefined) {
				val = "";
			}
			if (val2 === undefined && endcustomer[1] !== undefined) {
				val2 = endcustomer[1].trim()
			} else if (val2 === undefined) {
				val2 = "";
			}
			$('#ENDCUSTOMER_DEPID_KNOX').selectpicker('val', val.trim());
			if (val2 != "") {
				$('#ENDCUSTOMER_NAME_KNOX').selectpicker('val', val2.trim());
			}
		});

		$('#ENDCUSTOMER_NAME_KNOX').on('change', function(e) {
			var endcustomer = $(this).find('option:selected').text().split(","); 
			var val = endcustomer[0];
			var val2 = endcustomer[1];
			if (val === undefined && endcustomer[0] !== undefined) {
				val = endcustomer[0].trim()
			} else if (val === undefined) {
				val = "";
			}
			if (val2 === undefined && endcustomer[1] !== undefined) {
				val2 = endcustomer[1].trim()
			} else if (val2 === undefined) {
				val2 = "";
			}
			$('#ENDCUSTOMER_NAME_KNOX').selectpicker('val', val.trim());
			if (val2 != "") {
				$('#ENDCUSTOMER_DEPID_KNOX').selectpicker('val', val2.trim());
			}
		});
		//end basket form field events

		//event: search for customer id - Array holding selected row IDs
		$(document).on("keypress", "#CUSTOMER_ID", function(event) {
			if (event.which == 13 && ($("#CUSTOMER_ID").val()!=="" || $("#DEVICE_ID").val().replace(/(\r\n|\n|\r)/gm,"").trim()!=="")) {
				event.preventDefault();
				searchDevices();
				table.search("").draw();
				//table.ajax.reload();
			}
		});

		//event: search for serial number
		$(document).on("keypress", "#DEVICE_ID", function(event) {
			if (typeof $("#CUSTOMER_ID").val() === "undefined") {
				customer_id = '{% CurrentUser.imCompanyCd #%}{% CurrentUser.imBranchNbr #%}{% CurrentUser.imCustomerNbr #%}';
			}
			if (event.which == 13 && (customer_id !== "" || $("#DEVICE_ID").val().replace(/(\r\n|\n|\r)/gm,"").trim()!=="")) {
				// if (event.which == 13 && ($("#CUSTOMER_ID").val()!=="" || $("#DEVICE_ID").val().replace(/(\r\n|\n|\r)/gm,"").trim()!=="")) {
				event.preventDefault();
				searchDevices();
				table.search("").draw();
				//table.ajax.reload();
			}
		});

		/***********************************************
						 START
			Table Serials Handle click on checkbox
		//event: click checkbox on serials table
		***********************************************/
		$('#DT_Serials tbody').on('click', 'input[type="checkbox"]', function(e) {
			e.stopPropagation();
			var $row = $(this).closest('tr');
			// Get row data
			var data = table.row($row).data();
			var found = isRowinBasket(data.Id, tbl_basket);

			//var idx_basket=checkArray(data, rows_basket);
			//var index=checkArray(data, rows_selected);
			//var idx_basket = $.inArray(data, rows_basket);
			//var index = $.inArray(data, rows_selected);

			if (this.checked && found == -1) { // add if id not in   
				tbl_basket.row.add(data).draw();
				tbl_basket.search("").draw();
				// rows_basket.push(data);
				// toastr["success"](data.SerialNbr + " added", "Information");
			} else {
				tbl_basket.search("").draw();
				// get the correct basket row
				// no delete at basket TAB will be done with Remove Button
				// tbl_basket.row(idx_basket).remove().draw();
				// console.log('deleteing row ' + idx_basket + ' from selection list');
			}

			//if (this.checked && index === -1) {
			//	rows_selected.push(data);
				// Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
			//} else if (!this.checked && index !== -1) {
			//	rows_selected.splice(index, 1);
			//}

			//tbl_basket.fnAddData( data );
			// If checkbox is checked and row ID is not in list of selected row IDs

			if (this.checked) {
				$row.addClass('selected');
			} else {
				$row.removeClass('selected');
			}

			// e.stopPropagation();
		});

		//event: handle click on "Select all" control at serials table
		$(document).on("click", "#select_all_dt_serials", function(e) {
			// Prevent click event from propagating to parent
			e.stopPropagation();
			if (this.checked) {
				$('#DT_Serials tbody input[type="checkbox"]:not(:checked)').trigger('click');
			} else {
				$('#DT_Serials tbody input[type="checkbox"]:checked').trigger('click');
			}
		});

		// Handle table draw event
		table.on('draw', function() {
				// Update state of "Select all" control
				updateDataTableSelectAllCtrl(table, "select_all_dt_serials");
		});
		/***********************************************
						END
		Table serials Handle click on checkbox
		***********************************************/


		/***********************************************
				 START Table Basket
		Table Basket click on checkbox
		***********************************************/
		//event: click checkbox on basket table
		$.each(tbl_basket_ui_names, function(idx, propVal)
		{
			// console.log(idx, propVal.DT_Name, propVal.DT_Select);
			// $('#DT_Basket tbody').on('click', 'input[type="checkbox"]', function(e) {
			$('#' + propVal.DT_Name + ' tbody').on('click', 'input[type="checkbox"]', function (e)
			{
				var $row = $(this).closest('tr');
				// Get row data
				var data = tbl_basket.row($row).data();
				/* 
				$($row).toggleClass('selected');
				var rowid = tbl_basket.row($row).index();
				var selected = $($row).hasClass('selected');
				persistSelection(rowid, selected);
				*/
				// Get row ID
				// var rowId = data.Id;
				// Determine whether row ID is in the list of selected row IDs
				// var idx_basket = $.inArray(data, rows_basket_selected);
				RESELLER_DEPID = $('#IN_RESELLER_DEPID').val().toUpperCase();
				ENDCUSTOMER_DEPID = $('#ENDCUSTOMER_DEPID').val();
				ENDCUSTOMER_NAME = $('#ENDCUSTOMER_NAME').val();
				ENDCUSTOMER_PO = $('#ENDCUSTOMER_PO').val();
				ENDCUSTOMER_EMAIL = $('#EndCustEmail').val();
				Comment = $('#Comment').val();
				if (RESELLER_DEPID != data.CustomerDepId && data.CustomerDepId.length > 0) {
					$('#IN_RESELLER_DEPID').val(data.CustomerDepId.toUpperCase());
				}
				/* set input fields with the last selection */
				if (data.EnrollmentId && data.EnrollmentId.length > 0) {
					$('#ENROLLMENT_ID').val(data.EnrollmentId.toUpperCase());
				}
				else {
					$('#ENROLLMENT_ID').val(data.OrderNbr.toUpperCase());
				}
				$('#ENDCUSTOMER_DEPID').val(data.EndCustDepId.toUpperCase());

				var length = $('#ENDCUSTOMER_DEPID option').filter(function () {
					return $(this).text() === data.EndCustDepId;
				}).length;
				if (length == 0) {
					var p = $('#ENDCUSTOMER_DEPID');
					var o = $('option', p).eq(-2);
					o.before($("<option>", {
						"selected": true,
						"text": data.EndCustDepId
					}));
					p.selectpicker('refresh');
				}

				var length = $('#ENDCUSTOMER_NAME option').filter(function () {
					return $(this).text() === data.EndCustName;
				}).length;
				if (length == 0) {
					var p = $('#ENDCUSTOMER_NAME');
					var o = $('option', p).eq(-2);
					o.before($("<option>", {
						"selected": true,
						"text": data.EndCustName
					}));
					p.selectpicker('refresh');
				}

				$('#ENDCUSTOMER_PO').val(data.EndCustPo);
				$('#ENDCUSTOMER_NAME').val(data.EndCustName);
				$('#Comment').val(data.Comment);
				// If checkbox is checked and row ID is not in list of selected row IDs
				//if (this.checked && idx_basket === -1) {
				//	// need to developed
				//	rows_basket_selected.push(data);
				//	// Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
				//} else if (!this.checked && idx_basket !== -1) {
				//	rows_basket_selected.splice(idx_basket, 1);
				//}

				if (this.checked) {
					$row.addClass('selected');
				} else {
					$row.removeClass('selected');
				}
				// Update state of "Select all" control
				updateDataTableSelectAllCtrl(tbl_basket, propVal.DT_Name);
				// Prevent click event from propagating to parent
				e.stopPropagation();
			});
		});

		/*
		$.each(tbl_basket_ui_names, function(idx, propVal)
		tbl_basket_ui_names.forEach(function(idx, propVal)
		{
				console.log(idx, propVal.DT_Name, propVal.DT_Select);
			$(document).on("click", propVal.DT_Select, function(e) {
				//  $('thead input[name="select_all_dt_basket"]', tbl_basket.table().container()).on('click', function(e){
				if (this.checked) {
				$('#' + propVal.DT_Name + ' tbody input[type="checkbox"]:not(:checked)').trigger('click');
				} else {
				$('#' + propVal.DT_Name + ' tbody input[type="checkbox"]:checked').trigger('click');
				}
				// Prevent click event from propagating to parent
				e.stopPropagation();
			});
		});
		*/
		
		// store last tab selection
		$('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
			activetab = e.target.closest('a'); // newly activated tab
			prevtab = e.relatedTarget.closest('a'); // previous active tab
		})
		// Handle click on "Select all" control
		$(document).on("click", "#select_all_dt_basket_apple", function(e) {
			//  $('thead input[name="select_all_dt_basket"]', tbl_basket.table().container()).on('click', function(e){
			if (this.checked) {
				$('#DT_Basket_Apple tbody input[type="checkbox"]:not(:checked)').trigger('click');
			} else {
				$('#DT_Basket_Apple tbody input[type="checkbox"]:checked').trigger('click');
			}
			// Prevent click event from propagating to parent
			e.stopPropagation();
		});

		$(document).on("click", "#select_all_dt_basket_knox", function(e) {
			//  $('thead input[name="select_all_dt_basket"]', tbl_basket.table().container()).on('click', function(e){
			if (this.checked) {
				$('#DT_Basket_Knox tbody input[type="checkbox"]:not(:checked)').trigger('click');
			} else {
				$('#DT_Basket_Knox tbody input[type="checkbox"]:checked').trigger('click');
			}
			// Prevent click event from propagating to parent
			e.stopPropagation();
		});
		// Handle click on table cells with checkboxes
		$('#DEP').change(function() {
			/* setting currently changed option value to option variable */
			var option = $(this).find('option:selected').val();
			/* setting input box value to selected option value */
			$('#showoption').val(option);
		});
		// Handle table draw event

		tbl_basket.on('draw', function() {
				// Update state of "Select all" control
				updateDataTableSelectAllCtrl(tbl_basket, tbl_basket_select_name);
		});
		/***********************************************
				 END TABLE Basket
		Table Serials Handle click on checkbox
		***********************************************/

		//event: button remove from basket
		$('.cmdRemove').click(function (e) {
			// var setting = $(this).data('data-info');
			var cbasketId = this.id;
											
			var tbl_work = tbl_basket;  // save for basket operation

			if (cbasketId == "dep_btn_knox_remove") {
				tbl_basket = tbl_basket_knox;
				tbl_basket_select_name = "select_all_dt_basket_knox";
				// $('#DT_Basket_Knox tbody input[type="checkbox"]:not(:checked)').trigger('click');
			}
			if (cbasketId == "dep_btn_apple_remove") {
				tbl_basket = tbl_basket_apple;
				tbl_basket_select_name = "select_all_dt_basket_apple";
				//$('#DT_Basket_Apple tbody input[type="checkbox"]:not(:checked)').trigger('click');
			}
			// Iterate over all selected checkboxes
			var ids = $.map(tbl_basket.rows('.selected').data(), function (item)
			{
				var idx = tbl_basket.columns(0).data().eq(0).indexOf(item.Id);
				tbl_basket.row(idx).remove().draw();
				return item.Id;
			});
			tbl_basket.search("").draw();
			tbl_basket = tbl_work;  // restore after basket operation

			e.preventDefault();
		});

		//event (unused): button delete item
		$('.cmdDeleteItem').click(function(e) {
			e.preventDefault();
			var setting = $(this).data('info');
			// set_transaction_params(VendMasterName);		
			BootstrapDialog.confirm({
				title: 'Delete selected Lines.',
				message: 'Do you really want to delete this ' + rows_selected.length + ' item(s) ?',
				type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
				// draggable: true, // <-- Default value is false
				btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
				btnCancelClass: 'btn-info', // <-- If you didn't specify it, dialog type will be used,
				btnOKLabel: 'Accept', // <-- Default value is 'OK',
				btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
				callback: function(result) {
					// result will be true if button was click, while it will be false if users close the dialog directly.
					if (result) {
						// var form = this;
						// var selectedText = $("#DEP").children("option").filter(":selected").text();
						// var selectedValue = $("#DEP").children("option").filter(":selected").attr('value');
						var requestCallback = new MyRequestsCompleted(
						{
							numRequest: rows_selected.length
						});

						// Iterate over all selected checkboxes
						$.each(rows_selected, function(index, data) {
							var rowId = data.Id;
							var serial_nbr = data.SerialNbr;
							var request = "~/Apple/ajax/delete_Apple_DEP_line.aspx?service=" + selectedValue + "&ItemID=" + rowId;
							$.ajax(
							{
								url: request,
								success: function(data) {
									var ok = (data < 0 & data > -100) ? "true" : "false";
									toastr[ok === "true" ? "success" : "error"]("{$DE - Inside.AppleDEP.MainTab.Tab2.message.orderid$}: " + ENROLLMENT_ID, selectedText);
								}
							});
							/*
							remarked als beispiel
							var result = $.get( request, function( data ) {
							toastr[data === "1" ? "success" : "error"]("Serial Nbr.:" + serial_nbr + " processed.");
							}); // end get  */
						}); // end each row
					} // end of if result
				} // end callback
			}); // end if confirm / undefined
		}); // end cmdDelete


		//event: button save - handle form submission event 
		$('.cmdSave').click(function (e) {
			var btn = $(this).closest('a');
			// save actual selected vendor basket
			var tbl_actual_basket = tbl_basket;
			var VendMasterName = "";
            var sSectionToCheck = "checkinput";
			// select new basket and reset all relevant values
			if (btn[0].id.indexOf(cVendMasterName.Apple.toLowerCase()) != -1)
			{
				tbl_basket = tbl_basket_apple;
				VendMasterName = cVendMasterName.Apple.toLowerCase();
                sSectionToCheck = "checkinput";
			}
			else if (btn[0].id.indexOf(cVendMasterName.Samsung.toLowerCase()) != -1) 
			{
				tbl_basket = tbl_basket_knox;
				VendMasterName = cVendMasterName.Samsung.toLowerCase();
                sSectionToCheck = "checkinput_knox";
			}

			if (tbl_basket.data().count() == 0)
			{
				error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.addLine$}";
				error.valid = false;
			} 
			else 
			{

				var rows = $(tbl_basket.$('input[type="checkbox"]').map(function ()
				{
					return $(this).prop("checked") ? $(this).closest('tr') : null;
				}));

				var _inputValid = (checkinputs(sSectionToCheck + '_left') && checkinputs(sSectionToCheck + '_right'));
				if (_inputValid == true) {
					// var form = this;
					set_transaction_params(VendMasterName);
				} 
				else 
				{
						error.valid = false;
						error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.wrongdates$}";
				} 
			}
			if (error.valid == true) 
			{
				/* are you sure ? */
				var msg = "<table style='width:100%'>" +
					"<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.resellerid$}:</td><td>" + RESELLER_DEPID + "</td></tr>" +
					"<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.orderid$}:</td><td>" + ENROLLMENT_ID + "</td></tr>" +
					"<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustdepid$}:</td><td>" + ENDCUSTOMER_DEPID + "</td></tr>" +
					"<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustname$}:</td><td>" + ENDCUSTOMER_NAME + "</td></tr>"
				//"<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustpo$}:</td><td>" + ENDCUSTOMER_PO + "</td></tr>" +
				/*
				"<tr><td>OrderDate:</td><td>" + dt_orderdate_iso + "</td></tr>" +
				"<tr><td>ShipDate:</td><td>" + dt_shipdate_iso + "</td></tr>" +
				*/
				"<tr><td>Comment:</td><td>" + Comment + "</td></tr>" +
					"</table>";


				/*------------------------------------------------*/
				BootstrapDialog.confirm(
				{

					title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm$}',
					message: msg,
					type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
					// draggable: true, // <-- Default value is false
					btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
					btnCancelClass: 'btn-info', // <-- If you didn't specify it, dialog type will be used,
					btnOKLabel: 'Accept', // <-- Default value is 'OK',
					btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
					callback: function (result) 
					{
						// result will be true if button was click, while it will be false if users close the dialog directly.
						var formData = "";

						if (result)
						{
							var itemids = "";
							var d = this.data();
							// Iterate over all selected checkboxes
							tbl_basket.rows().every(function (rowIdx, tableLoop, rowLoop) 
							{
								d = this.data();
								var rowId = d.Id;
								itemids = itemids + rowId + "~";
							}); // end each
							var rowId = d.Id;
							var serial_nbr = d.SerialNbr;
							if (typeof ENDCUSTOMER_EMAIL === "undefined") { ENDCUSTOMER_EMAIL = "" }
							var formData =
								"VendMasterName=" + VendMasterName + 
								"&ItemIDs=" + itemids +
								"&service=" + selectedValue +
								// "&serialNbr=" + serial_nbr +
								"&CustomerDepId=" + RESELLER_DEPID +
								"&EnrollmentID=" + ENROLLMENT_ID +
								"&EndCustDepId=" + ENDCUSTOMER_DEPID +
								"&EndCustName=" + ENDCUSTOMER_NAME +
								"&EndCustEmail=" + ENDCUSTOMER_EMAIL +
								"&OrderDate=" + dt_orderdate_iso +
								"&ShipDate=" + dt_shipdate_iso +
								"&Comment=" + Comment;

							var request = "/content-items/ajax/dashboard/dep/createdep_multivendor";
							$.ajax({
								url: request,
								type: "POST",
								data: formData,
								success: function (data) {
									var ok = (data < 0 & data > -100) ? "true" : "false";
									if (data == -900) {
										/*  -900 =  enrollment again 1 or more  line(s)  enrolled with ordertype = OR and status =1
										Show error dialog.
										*/
										BootstrapDialog.show({
											title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.enrolled$}',
											message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.enrolled$}',
											type: BootstrapDialog.TYPE_WARNING,
											buttons: [{
												label: 'OK',
												cssClass: 'btn-warning',
												action: function (dialogItself) {
													dialogItself.close();
												}
											}]
										});
									} else if (data == -910) {
										/*  -900 =  enrollment again 1 or more  line(s)  enrolled with ordertype = OR and status =1
										Show error dialog.
										*/
										BootstrapDialog.show({
											title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.pending$}',
											message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.pending$}',
											type: BootstrapDialog.TYPE_WARNING,
											buttons: [{
												label: 'OK',
												cssClass: 'btn-warning',
												action: function (dialogItself) {
													dialogItself.close();
												}
											}]
										});
									} else if (data == -920) {
										/*  -920 =  enrollment id already used
										Show error dialog.
										*/
										BootstrapDialog.show({
											title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.usedenrollmentid$}',
											message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.usedenrollmentid$}',
											type: BootstrapDialog.TYPE_WARNING,
											buttons: [{
												label: 'OK',
												cssClass: 'btn-warning',
												action: function (dialogItself) {
													dialogItself.close();
												}
											}]
										});
									} else {
										// toastr[ok === "true" ? "success" : "error"]( "{$CSS.AppleDEP.serial-enrollment.tab.basket.orderid$}: " + ENROLLMENT_ID, selectedText);
										if (ok == "true") {
											BootstrapDialog.show({
												title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title$}',
												message: msg + '<br>' + '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.successful$}',
												type: BootstrapDialog.TYPE_SUCCESS,
												buttons: [{
													label: 'OK',
													cssClass: 'btn-primary',
													action: function (dialogItself) {
														dialogItself.close();
													}
												}]

											});
											// basket clear
											tbl_basket.clear().draw();
											rows_basket = [];
											// go to main tab
											$("div.carousel").carousel(0);
											$('#ENDCUSTOMER_DEPID').val(""); $('#ENDCUSTOMER_DEPID').selectpicker('refresh');
											$('#ENDCUSTOMER_NAME').val(""); $('#ENDCUSTOMER_NAME').selectpicker('refresh');
											$('#IN_RESELLER_DEPID').val("");
											$("#DEP").selectpicker('val', "OR");
											//$('#ENDCUSTOMER_ORDERDATE').data().DateTimePicker.date(null);
											//$('#ENDCUSTOMER_SHIPDATE').data().DateTimePicker.date(null);
											$("#ENDCUSTOMER_SHIPDATE").data("DateTimePicker").date(new Date());
											$("#ENDCUSTOMER_ORDERDATE").data("DateTimePicker").date(new Date());
											$('#Comment').val("");
											$('#ENROLLMENT_ID').val("");
											// back to history		
											$(document).find('span#tab-history').closest('a').tab('show');
											//table.ajax.reload();
											table.draw(); // refresh main tab
										} else {
											BootstrapDialog.show({
												title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title$}',
												message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.failed$}',
												type: BootstrapDialog.TYPE_WARNING,
												buttons: [{
													label: 'OK',
													cssClass: 'btn-warning',
													action: function (dialogItself) {
														dialogItself.close();
													}
												}]
											});
										}
									}
								}
							});
						} // end if result
					} // end of callback
				}); // end 1st Dlg

				// restore actual selected vendor basket
				tbl_basket = tbl_actual_basket;

			} /* end if _inputValid */
			else {
				toastr.options.timeOut = 5000;
				toastr["warning"](error.text, "Information");
				error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.valid$}";
				toastr.options.timeOut = 1000;
			}
			/*
			if (rows_selected.length == inscnt) {
			toastr["success"]( inscnt + " item(s) processed", selectedText);
			}
			else {
			toastr["error"]( inscnt + " item(s) processed out of " +rows_selected.length, selectedText);
			}
			*/
			e.preventDefault();
		});
	});
	function searchDevices() {
		var doSearch = -1;
		customer_id = $('#CUSTOMER_ID').val();
		if (typeof $("#CUSTOMER_ID").val() === "undefined") {
				customer_id = '{% CurrentUser.imCompanyCd #%}{% CurrentUser.imBranchNbr #%}{% CurrentUser.imCustomerNbr #%}';
		//d.customer_id = customer_id;
		}
		sql_device_id = getDeviceID();
		if (customer_id === "" && sql_device_id === "") {
				doSearch = 0; // do not redraw the table without cnr or deviceid
		}
		$('#ENDCUSTOMER_DEPID').val("");$('#ENDCUSTOMER_DEPID').selectpicker('refresh');
		$('#ENDCUSTOMER_NAME').val("");$('#ENDCUSTOMER_NAME').selectpicker('refresh');
		$('#ENDCUSTOMER_PO').val("");
		$('#Comment').val("");
		return doSearch;
	}

	function getDeviceID() {
		var device_id = $("#DEVICE_ID").val();
		if (device_id.replace(/(\r\n|\n|\r)/gm,"").trim()=="") {device_id = "";}
		sqldeviceid = "";
		if (device_id != "") {
				device_id = device_id.split(" ");
			if (device_id == $("#DEVICE_ID").val()) {
				// space dosent work, try newline  
				device_id = $("#DEVICE_ID").val();
				device_id = device_id.split("\n");
			}
			sqldeviceid = "(";
			device_id.forEach(function(entry) {
				if (entry != "") {
				sqldeviceid = sqldeviceid + "'" + entry + "',";
				}
			});
			sqldeviceid = sqldeviceid.substr(0, sqldeviceid.length - 1) + ")";
		}
		return sqldeviceid;
	}

	function checkinputs(section) {
				error.valid = true;
		var div = document.getElementById(section);

		$(div).find('input:text[id], input:password[id], textarea[id], input:checkbox[id], select')
			.each(function() {
				var regexparam = $(this).attr('pattern');
				var regex = null;
				if (regexparam != "") regex = new RegExp(regexparam);
				var required = $(this).attr('required') == "required";
				var name = $(this).attr('id');

				var inp_val = $(this).val();
				var inputType = $('#' + name).attr('type');
				if ((required == true) && (inp_val == "")) {
				error.valid = false;
					if (inputType == 'option') {
				//$(this).effect("highlight", {}, 5000); 
				$('button[data-id="' + name + '"]').removeClass("btn-primary");
						$('button[data-id="' + name + '"]').addClass("btn-danger");
						//$(this).closest('button').closest('button').addClass("form-group btn-danger has-feedback");
						error.text = "{$DE - Inside.AppleDEP.MainTab.Tab2.message.select_endcustomer$}";
					} else {
				$(this).closest('div').addClass("form-group has-error has-feedback");
						//$(this).effect("highlight", {}, 2000);
					}
				} else {
					if (inputType == 'option' && $('button[data-id="' + name + '"]').hasClass("btn-danger")) {
				$('button[data-id="' + name + '"]').removeClass("btn-danger");
						$('button[data-id="' + name + '"]').addClass("btn-primary");
					} else if (inputType == 'checkbox' && $(this).closest('div').hasClass("label-danger")) {
				$(this).closest('div').removeClass("form-group label-danger has-feedback");
					} else if ($(this).closest('div').hasClass("has-error")) {
				$(this).closest('div').removeClass("form-group has-error has-feedback");
					}

					if (regex != null) {
						if (!regex.test(inp_val)) {
				//$(this).effect("bounce", "slow");
				$(this).closest('div').addClass("form-group has-error has-feedback");
							//$(this).effect("highlight", {}, 5000);
							//$(this).addClass('error_input');
							error.valid = false;
						} else {
							// checkbox ?
							if (inputType == 'checkbox') {
								if (!$(this).is(":checked")) {
				$(this).closest('div').addClass("form-group label-danger has-feedback");
									//$(this).effect("highlight", {}, 5000);
									error.valid = false;
									error.text = "{$DE - Inside.AppleDEP.MainTab.Tab2.message.confirm$}";
								}
							}
							$(this).removeClass('error_input');
						}
					}
				}
			});
		return error.valid;
	}
	//
	// Updates "Select all" control in a data table
	//
	function updateDataTableSelectAllCtrl(table, headername) {
		var $table = table.table().node();
		var $chkbox_all = $('tbody input[type="checkbox"]', $table);
		var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
		var chkbox_select_all = $('thead input[name="' + headername + '"]', $table).get(0);

		if (chkbox_select_all) {
			// If none of the checkboxes are checked
			if ($chkbox_checked.length === 0) {
				chkbox_select_all.checked = false;
				if ('indeterminate' in chkbox_select_all) {
				chkbox_select_all.indeterminate = false;
				}

				// If all of the checkboxes are checked
			} else if ($chkbox_checked.length === $chkbox_all.length) {
				chkbox_select_all.checked = true;
				if ('indeterminate' in chkbox_select_all) {
				chkbox_select_all.indeterminate = false;
				}

				// If some of the checkboxes are checked
			} else {
				chkbox_select_all.checked = true;
				if ('indeterminate' in chkbox_select_all) {
				chkbox_select_all.indeterminate = true;
				}
			}
		}
	}

	var MyRequestsCompleted = (function() {
		var numRequestToComplete,
			requestsCompleted,
			callBacks,
			singleCallBack;

		return function(options) {
			if (!options) options = {};

			numRequestToComplete = options.numRequest || 0;
			requestsCompleted = options.requestsCompleted || 0;
			callBacks = [];
			var fireCallbacks = function() {
				for (var i = 0; i < callBacks.length; i++) callBacks[i]();
				// Reload Page
				location.reload();
				//alert("we're all complete");
			};
			if (options.singleCallback) callBacks.push(options.singleCallback);



			this.addCallbackToQueue = function(isComplete, callback) {
				if (isComplete) requestsCompleted++;
				if (callback) callBacks.push(callback);
				if (requestsCompleted == numRequestToComplete) fireCallbacks();
			};
			this.requestComplete = function(isComplete) {
				if (isComplete) requestsCompleted++;
				if (requestsCompleted == numRequestToComplete) fireCallbacks();
			};
			this.setCallback = function(callback) {
				callBacks.push(callBack);
			};
		};
	})();

	function selectPersistedRows(table) {
		if (!(sessionStorage.rowKeyStore))
			return;

		var rowKeys = JSON.parse(sessionStorage.rowKeyStore);
		for (var key in rowKeys) {
				$(table.row(key).node()).addClass('selected');
		}
	}

	function checkArray(a1, a2) {
		var t=-1;
		a2.forEach(function(item) {
			if (a1.Id==item.Id) {t = 0;} else {t = -1;}
		});
		return t;
	}
	function isRowinBasket(id,tbl_check) 
	{
		return tbl_check.columns(0).data().eq(0).indexOf(id);
	}
	function persistSelection(index, isSelected) {
		var ss = sessionStorage;
		if (!(ss.rowKeyStore)) {
				ss.rowKeyStore = "{}";
		}
		var rowKeys = JSON.parse(ss.rowKeyStore);
		if (isSelected === false && rowKeys.hasOwnProperty(index)) {
				console.log('removing row ' + index + ' from selection list');
			delete rowKeys[index];
		} else if (isSelected) {
				rowKeys[index] = true;
			console.log('adding row ' + index + ' from selection list');
		}
		ss.rowKeyStore = JSON.stringify(rowKeys);
	}
	function getMasterVendorList() {
		$.getJSON("/content-items/ajax/dashboard/dep/get_mastervendor_list", function (data) {
			oMasterVendor = data["data"];
			$.each(oMasterVendor, function (iI, oItem) {
				if (oItem.Text.toLowerCase() == cVendMasterName.Apple.toLowerCase()) {
					$("#DEP_vendor").append($('<option>', { value: oItem.Value, text: oItem.Text }).attr('selected', 'selected'));
					// set all startup defaults
					vendmastertext = $("#DEP_vendor").children("option").filter(":selected").text().toLowerCase();
					vendmastervalue = $("#DEP_vendor").children("option").filter(":selected").attr('value');
					// $('#DEP_vendor').prop('selectedIndex',iI);
				}
				else {
					$("#DEP_vendor").append($('<option>', { value: oItem.Value, text: oItem.Text }));
				}
			});
			$("#DEP_vendor").selectpicker("refresh");
		});
	}
	function set_transaction_params(VendMasterName)
	{	
		//        Default Apple ENrollment
		var dt_orderdate = $('#ENDCUSTOMER_ORDERDATE').val();
		var dt_shipdate = $('#ENDCUSTOMER_SHIPDATE').val();
		selectedText = $("#DEP").children("option").filter(":selected").text();
		selectedValue = $("#DEP").children("option").filter(":selected").attr('value');
		RESELLER_DEPID = $('#IN_RESELLER_DEPID').val().toUpperCase();
		ENROLLMENT_ID = $('#ENROLLMENT_ID').val().toUpperCase();
		ENDCUSTOMER_DEPID = $('#ENDCUSTOMER_DEPID').val();
		ENDCUSTOMER_NAME = $('#ENDCUSTOMER_NAME').val();
		ENDCUSTOMER_PO = $('#ENDCUSTOMER_PO').val();
		ENDCUSTOMER_EMAIL = $('#EndCustEmail').val();
		Comment = $('#Comment').val();
		dt_orderdate = new Date($('#ENDCUSTOMER_ORDERDATE').val() + ' ' + "10:00:00"); // actualtime);
		dt_shipdate = new Date($('#ENDCUSTOMER_SHIPDATE').val() + ' ' + "10:00:00"); // actualtime);
		if (VendMasterName.indexOf(cVendMasterName.Apple.toLowerCase()) != -1)
		{
			if ((dt_orderdate != "") && (dt_shipdate != ""))
			{
				dt_orderdate_iso = dt_orderdate.toISOString().slice(0, 10) + 'T' + "00:00:00Z";
				dt_shipdate_iso = dt_shipdate.toISOString().slice(0, 10) + 'T' + "00:00:00Z";
				if (dt_orderdate > dt_shipdate)
				{
					error.valid = false;
					error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.wrongdates$}";
				}
			}	
		}
		else if (VendMasterName.indexOf(cVendMasterName.Samsung.toLowerCase()) != -1) 
		{
			VendMasterName = cVendMasterName.Samsung.toLowerCase();
			selectedText = $("#DEP_KNOX").children("option").filter(":selected").text();
			selectedValue = $("#DEP_KNOX").children("option").filter(":selected").attr('value');
			RESELLER_DEPID = $('#IN_RESELLER_DEPID_KNOX').val().toUpperCase();
			ENROLLMENT_ID = $('#ENROLLMENT_ID_KNOX').val().toUpperCase();
			ENDCUSTOMER_DEPID = $('#ENDCUSTOMER_DEPID_KNOX').val();
			ENDCUSTOMER_NAME = $('#ENDCUSTOMER_NAME_KNOX').val();
			ENDCUSTOMER_PO = $('#ENDCUSTOMER_PO_KNOX').val();
			ENDCUSTOMER_EMAIL = $('#EndCustEmail_KNOX').val();
            Comment = $('#Comment_Knox').val();
        
            dt_orderdate_iso = new Date(Date.now()).toISOString().slice(0, 10) + 'T' + "00:00:00Z";
            dt_shipdate_iso = new Date(Date.now()).toISOString().slice(0, 10) + 'T' + "00:00:00Z";          
		}
	}

