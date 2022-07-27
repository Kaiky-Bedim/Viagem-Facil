<?php

require_once "../Infra/BD/conexao.php";
include "passe.php";

session_start();

$con = new Conexao();
$passe = new Passe();

$cpf = $_SESSION['cpf'];
$numSerie = $_POST['txtPasse'];

?>