<?php
require_once "../Infra/BD/conexao.php";
include "leitor.php";

session_start();

$con = new Conexao();
$leitor = new Leitor();

$cpf = $_SESSION['cpf'];
$numSerie = $_GET['NumSerie'];
$empresaCartao = $_GET['Empresa'];
if($empresaCartao == "Maringa do Vale"){
    $empresaCartao = "Maringá do Vale";
}else{
    $empresaCartao = "Viação Jacareí";
}

$leitor->setCpf($cpf);
$leitor->setConexao($con);
$leitor->setNumSerie($numSerie);
$leitor->setEmpresaCartao($empresaCartao);

$resp = $leitor->DescontarPasse();

if($resp == false){
    echo "Saldo Insuficiente!!!";
    $con->FecharConexao();
    
}else{
    echo "Passe Aprovado!!!";

    $idPercurso = $leitor->GerarPercurso();
    #Falta a Movimentação
    $leitor->GerarMovimentacao($idPercurso, $resp);
    //Fechando a conexão do BD
    $con->FecharConexao();

}

?>