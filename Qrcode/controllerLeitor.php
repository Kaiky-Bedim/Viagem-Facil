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

if($resp == false){
    echo "Saldo Insuficiente!!!";
    
}else{
    echo "Passe Aprovado!!!";

    $idPercurso = $leitor->GerarPercurso();
    #Falta a Movimentação
    $leitor->GerarMovimentacao($idPercurso, $resp);

}

?>