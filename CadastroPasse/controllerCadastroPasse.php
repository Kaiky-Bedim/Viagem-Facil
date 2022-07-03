<?php

require_once "../Infra/BD/conexao.php";
include "CadastroPasse.php";

session_start();
$numSerie = $_POST['txtNumSerial'];
$numFabrica = $_POST['txtNumFabrica'];
$tipoCartao = $_POST['txtTipoCartao'];
$bloqueado = 0;
$cpfPropretario = $_SESSION['cpf'];
$saldo = 0.0;

$con = new Conexao();
$cadastroPasse = new Passe($numSerie, $numFabrica, $tipoCartao, $bloqueado, $cpfPropretario, $saldo);
$res = $cadastroPasse->CadastrarPasse($con);

if($res == true){
    echo "Cadastro realizado com sucesso";
}else{
    echo "Não foi possível realizar o cadastro";
}

?>