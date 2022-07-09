<?php

require_once "../Infra/BD/conexao.php";
include "qrcode.php";

session_start();

$con = new Conexao();
$qrcode = new Qrcode();
$cpf = $_SESSION['cpf'];

$res = $qrcode->ImagemQrcode($cpf, $con);
echo $res;

?>