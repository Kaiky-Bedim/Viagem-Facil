<?php
require_once "../Infra/BD/conexao.php";
include "pdf.php";

session_start();

$con = new Conexao();
$pdf = new Pdf();
$cpf = $_SESSION['cpf'];

$res = $pdf->Teste();

echo $res;
echo "penis";

?>