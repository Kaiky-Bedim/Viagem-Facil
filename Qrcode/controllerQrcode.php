<?php

require_once "../Infra/BD/conexao.php";
include "qrCode.php";
//include "leitor.php";

session_start();

$con = new Conexao();
$qrcode = new Qrcode();
//$leitor = new Leitor();
$cpf = $_SESSION['cpf'];

$data = json_decode(file_get_contents('php://input'), true);
$numSerie = $data['numeroSerie'];
$empresa = $data['empresa'];
$empresa = str_replace(" ", "", $empresa);
//$leitor->setEmpresaCartao($empresa);
$res = $qrcode->ImagemQrcode($cpf, $numSerie, $con, $empresa);
$con->FecharConexao();

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