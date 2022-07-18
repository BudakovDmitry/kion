<?php
  require 'phpmailer/Exception.php';
  require 'phpmailer/PHPMailer.php';
  require 'phpmailer/SMTP.php';

  $title = 'Тема письма';

  $body = '<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';

  $mail = new PHPMailer\PHPMailer\PHPMailer();

  try {
    $mail->isSMTP();
    $mail->ChartSet = "UTF-8";
    $mail->SMTPAuth = true;

    $mail->Host = 'smtp.gmail.com';
    $mail->Username = 'budakov.photography@gmail.com';
    $mail->Password = 'hmtbeluqriewwuyt';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setForm('budakov.photography@gmail.com', 'Заявка с Вашего сайта');

    $mail->addAddress('budakovdima7@gmail.com');

    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send();

  } catch (Exception $e) {
    $status = "Сообщение небыло отправлено. Причина ошибки: {$mail->ErrorInfo}";
  }

?>