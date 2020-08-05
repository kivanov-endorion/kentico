    /* Disabled for now */
    
    $(".date").datetimepicker({
        icons: {
            time: "fas fa-clock",
            date: "fas fa-calendar-alt",
            up: "fas fa-arrow-up",
            down: "fas fa-arrow-down"
        },
        format: "DD/MM/YYYY",
        locale: 'en-SG'

    });

    // File upload
    var input1    = $( '.doc1 .uploader-input-file' ),
        label1	 = $( '.doc1 .custom-file-label' ),
        fileName1 = '';

    input1.on( 'change', function() {	
		fileName1 = input1.val().split( '\\' ).pop();
		label1.html(' <ins>' + fileName1 + '</ins>');
    });

	// File upload
    var input2   = $( '.doc2 .uploader-input-file' ),
        label2	 = $( '.doc2 .custom-file-label' ),
        fileName2 = '';

    input2.on( 'change', function() {
		fileName2 = input2.val().split( '\\' ).pop();
		label2.html(' <ins>' + fileName2 + '</ins>');
    });
  
  // File upload
    var input3   = $( '.doc3 .uploader-input-file' ),
        label3	 = $( '.doc3 .custom-file-label' ),
        fileName3 = '';

    input3.on( 'change', function() {
		fileName3 = input3.val().split( '\\' ).pop();
		label3.html(' <ins>' + fileName3 + '</ins>');
    });