<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Expection;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->IsHTML(true);

  $mail->setFrom('budakov.photography@gmail.com', 'Photograph');

  $mail->addAddress('budakovdima7@gmail.com');

  $mail->Subject = 'Новое обращение на сайте';

  $body = 'Новое обращение';

  if(trim(!empty($_POST['name']))){
    $body = '<p><strong>Ім\'я:</strong> '.$_POST['name'].'</p>';
  }

  if(trim(!empty($_POST['phone']))){
    $body = '<p><strong>Номер телефону:</strong> '.$_POST['phone'].'</p>';
  }

  $mail->Body = $body;

  if($mail->send()){
    $message = 'Данні відправлені!';
  } else {
    $message = 'Помилка';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);

?>