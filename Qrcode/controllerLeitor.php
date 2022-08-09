<?php
require_once "../Infra/BD/conexao.php";
include "leitor.php";

session_start();

$con = new Conexao();
$leitor = new Leitor();

$cpf = $_SESSION['cpf'];
$numSerie = $_GET['NumSerie'];

$leitor->setCpf($cpf);
$leitor->setConexao($con);
$leitor->setNumSerie($numSerie);

$resp = $leitor->DescontarPasse();

if($resp == true){
    echo "Passe Aprovado!!!";

    $idPercurso = $leitor->GerarPercurso();
    #Falta o Histórico
}else{
    echo "Saldo Insuficiente!!!";
}



?>