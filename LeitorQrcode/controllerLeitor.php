<?php
require_once "../Infra/BD/conexao.php";
include "leitor.php";

session_start();

$con = new Conexao();
$leitor = new Leitor();

$cpf = $_SESSION['cpf'];
$qrcode = $_POST['text'];

$leitor->LerQrcode($cpf,$con,$qrcode);

?>