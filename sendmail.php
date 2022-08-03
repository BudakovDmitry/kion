<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Expection;
  use PHPMailer\PHPMailer\SMTP;

  require 'phpmailer/Exception.php';
  require 'phpmailer/PHPMailer.php';
  require 'phpmailer/SMTP.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->IsHTML(true);


  $mail->isSMTP();
  $mail->Host = 'uashared05.twinservers.net';
  $mail->SMTPAuth = true;
  $mail->Username = 'mailer@kion-akzonobel.com';
  $mail->Password = 'Qwerty112233';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;

  $mail->setFrom('mailer@kion-akzonobel.com', 'KION');

  $mail->addAddress('budakov.it@gmail.com');

  $mail->Subject = 'Нове звернення на сайті';

  $body = '<h1>Нове звернення на сайті</h1>';

  if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Ім\'я:</strong> '.$_POST['name'].'</p>';
  }

  if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Номер телефону:</strong> '.$_POST['phone'].'</p>';
  }

  $mail->Body = $body;

  if (!$mail->send()){
    $message = 'Помилка';
  } else {
    $message = 'Данні відправлені!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);

?>