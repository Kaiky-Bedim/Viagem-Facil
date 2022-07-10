<?php

require_once "../Infra/BD/conexao.php";
include "qrcode.php";

session_start();

$con = new Conexao();
$qrcode = new Qrcode();
$cpf = $_SESSION['cpf'];

$res = $qrcode->ImagemQrcode($cpf, $con);

//QRCODE
use chillerlan\QRCode\{QRCode, QROptions};
use chillerlan\QRCode\Data\QRMatrix;
use chillerlan\QRCode\Common\EccLevel;
include './vendor/autoload.php';


$options = new QROptions([
    'version'    => 5,
    'outputType' => QRCode::OUTPUT_MARKUP_SVG,
    'eccLevel'   => QRCode::ECC_L,
]);

// invoke a fresh QRCode instance
$qrcode = new QRCode($options);

// ...with additional cache file
$qrcode->render($res, 'imgQRCode/qrCode.svg');

echo "<img src='imgQRCode/qrCode.svg' width='500'>";


?>