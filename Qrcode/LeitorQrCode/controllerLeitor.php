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
$idPercurso = $data['Id_Percurso'];
//Convertendo os caracteres de Tabela para Caracteres Especiais novamente
$empresaCartao = $formatador->FormatarTabelaParaCaracteresEspeciais($empresaCartao);

//Setando os dados no objeto
$leitor->setConexao($con);
$leitor->setCpf($cpf);
$leitor->setNumSerie($numSerie);
$leitor->setEmpresaCartao($empresaCartao);

//Verificando se o cartão existe mesmo no sistema
if(!$leitor->GaranteCartaoExiste()){
    echo "Cartão não encontrado no sistema";
    return;
}

//Recuperando o status de bloqueado do Cartão
$bloqueado = $leitor->GaranteCartaoNaoBloqueado();

//Verificando se o cartão está bloqueado ou não no sistema
if($bloqueado == 1){
    echo "O Cartão está bloqueado e não pode ser utilizado";
    return;
}

$resp = $leitor->DescontarPasse();

if($resp == false){
    echo "Saldo Insuficiente!!!";
}else{
    echo "Passe Aprovado!!!";

    $id_Percurso = $leitor->PegarPercurso($idPercurso);
    #Falta a Movimentação
    $leitor->GerarMovimentacao($id_Percurso, $resp);

}

//Fechando a conexão do BD
$con->FecharConexao();

?>