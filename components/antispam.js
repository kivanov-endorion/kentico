$('body').on('click', '.FormButton', function(e) {
    if ($('input[type="text"].fill-me-in').val().length > 0) {
        e.preventDefault();
    }
});