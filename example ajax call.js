$.ajax({
   url: "./assets/php/result.php",
   type: "POST",
   data: {
      name: $("#name").val(),
      token: token,
      email: $("#email").val(),
      subject: $("#subject").val(),
      message: $("#message").val(),
   },
   success: function (data) {
      if (data.indexOf("done") != -1) {
         $("#contact").trigger("reset");
         $("#thanks").fadeOut(100);
         $("#success").fadeIn(1000);
      } else {
         console.log(data);
         $("#success").fadeOut(100);
         $("#thanks").fadeOut(100);
         $("#error").fadeIn(1000);
      }
   },
   error: function (xhr, textStatus, error) {
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
   },
});