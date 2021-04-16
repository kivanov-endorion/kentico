<!doctype html>
<html lang="en">
  <head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
      

    
    <?php
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];
        $from = 'Website Enquiry'; 
        $to = 'name@domain.com'; 
        $subject = 'Website Enquiry';
        $human = $_POST['human'];
                
        $body = "From: $name\n E-Mail: $email\n Message:\n $message";
                    
        if ($_POST['submit'] && $human == '4') {				 
            if (mail ($to, $subject, $body, $from)) { 
                echo '<p>Съобщението Ви беше изпратено!</p>';
            } else { 
                echo '<p>Грешка - моля опитайте отново!</p>'; 
            } 
        } else if ($_POST['submit'] && $human != '4') {
            echo '<p>Отговорихте неправилно!</p>';
        }
    ?>
    <form method="post" action="contact.php">
        <label>Име</label>
        <input name="name" placeholder="Пишете тук">
        <label>Имейл</label>
        <input name="email" type="email" placeholder="Пишете тук">
        <label>Съобщение</label>
        <textarea name="message" placeholder="Пишете тук"></textarea>
        <label>*Колко е 2+2? (анти-спам)</label>
        <input name="human" placeholder="Пишете тук">
        <br>
        <input id="submit" name="submit" type="submit" value="Submit">
    </form>

          
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
</html>