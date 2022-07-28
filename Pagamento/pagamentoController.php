<?php

require_once "../Infra/BD/conexao.php";
include "pagamento.php";

session_start();

$con = new Conexao();
$pagamento = new Pagamento();

$cpf = $_SESSION['cpf'];
$numSerie = $_POST['txtPasse'];
$saldo = $_POST['txtSaldo'];

$pagamento->setCpf($cpf);
$pagamento->setNumSerie($numSerie);
$pagamento->setSaldo($saldo);
$pagamento->setCon($con);

$pagamento->AlterarSaldo();

header('Location: ViewPagamento.php');


?>