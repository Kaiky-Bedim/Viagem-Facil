<?php

require_once "../Infra/BD/conexao.php";
include "qrCode.php";

session_start();

$con = new Conexao();
$qrcode = new Qrcode();
$cpf = $_SESSION['cpf'];

$numSerie = $_POST['txtOpcaoPasse'];

$res = $qrcode->ImagemQrcode($cpf, $numSerie, $con);
echo $res;

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