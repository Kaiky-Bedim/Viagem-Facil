<?php

require_once "../Infra/BD/conexao.php";
include "qrCode.php";

session_start();

$con = new Conexao();
$qrcode = new Qrcode();
$cpf = $_SESSION['cpf'];

$numSerie = $_POST['txtOpcaoPasse'];

$res = $qrcode->ImagemQrcode($cpf, $numSerie, $con);

//QRCODE
use chillerlan\QRCode\{QRCode, QROptions};
use chillerlan\QRCode\Data\QRMatrix;
use chillerlan\QRCode\Common\EccLevel;
include '../Infra/qrCode/vendor/autoload.php';


$options = new QROptions([
    'version'    => 5,
    'outputType' => QRCode::OUTPUT_MARKUP_SVG,
    'eccLevel'   => QRCode::ECC_L,
]);

// invoke a fresh QRCode instance
$qrcode = new QRCode($options);
$diretorio = ('imgQRcode/qrCode'.$numSerie.'.svg');
$diretorio = str_replace(" ", "", $diretorio);

// ...with additional cache file
$qrcode->render($res, $diretorio);



?>