<?php
//Dando pal na hora de pegar a conexao
require_once "../../Infra/BD/conexao.php";
include "../../Infra/Formatador/formatador.php";
include "leitor.php";

session_start();

//Criando os Objetos que serão utilizados
$con = new Conexao();
$formatador = new Formatador();
$leitor = new Leitor();

//Recuperando o CPF do Usuário logado
$cpf = $_SESSION['cpf'];
$data = json_decode(file_get_contents('php://input'), true);
$numSerie = $data['numSerie'];
$empresaCartao = $data['Empresa'];

//Convertendo os caracteres de Tabela para Caracteres Especiais novamente
$empresaCartao = $formatador->FormatarTabelaParaCaracteresEspeciais($empresaCartao);

$leitor->setCpf($cpf);
$leitor->setConexao($con);
$leitor->setNumSerie($numSerie);
$leitor->setEmpresaCartao($empresaCartao);

$resp = $leitor->DescontarPasse();

if($resp == false){
    echo "Saldo Insuficiente!!!";
    
}else{
    echo "Passe Aprovado!!!";

    $idPercurso = $leitor->GerarPercurso();
    #Falta a Movimentação
    $leitor->GerarMovimentacao($idPercurso, $resp);
    
}

//Fechando a conexão do BD
$con->FecharConexao();

?>