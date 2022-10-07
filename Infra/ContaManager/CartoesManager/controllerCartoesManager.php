<?php

require_once "../../BD/conexao.php";
include "cartoes.php";

//Iniciando sessão
session_start();

$action = $_GET['action'];
if(isset($_GET['index'])){
    $index = $_GET['index'];
}

$con = new Conexao();

//Criando objeto cartao
$cartao = new Cartoes();
$cartao->SetAtributosCartoes($con);

if($action == "qtdCartoes"){
    echo $cartao->GetQtdCartoes();
}

//Criei vários métodos, que seriam as ações que se pode tomar neste controller e os dados que se pode recuperar do usuário
//Métodos para recuperar os valores de um único cartão
if($action == "numeroSerie"){
    if(isset($index)){
        echo $cartao->GetNumeroSerie($index);
    }else{
        echo "Informe o índice do cartão na requisição";
    }
}

if($action == "numeroFabrica"){
    if(isset($index)){
        echo $cartao->GetNumeroFabrica($index);
    }else{
        echo "Informe o índice do cartão na requisição";
    }
}

if($action == "tipoCartao"){
    if(isset($index)){
        echo $cartao->GetTipoCartao($index);
    }else{
        echo "Informe o índice do cartão na requisição";
    }
}

if($action == "situacao"){
    if(isset($index)){
        echo $cartao->GetSituacao($index);
    }else{
        echo "Informe o índice do cartão na requisição";
    }
}

if($action == "empresa"){
    if(isset($index)){
        echo $cartao->GetEmpresa($index);
    }else{
        echo "Informe o índice do cartão na requisição";
    }
}

if($action == "bloqueado"){
    if(isset($index)){
        echo $cartao->GetBloqueado($index);
    }else{
        echo "Informe o índice do cartão na requisição";
    }
}

if($action == "cpfProprietario"){
    echo $cartao->GetCPFProprietario();
}

if($action == "saldo"){
    if(isset($index)){
        echo $cartao->GetSaldo($index);
    }else{
        echo "Informe o índice do cartão na requisição";
    }
}

if($action == "dataExpedicao"){
    if(isset($index)){
        echo $cartao->GetDataExpedicao($index);
    }else{
        echo "Informe o índice do cartão na requisição";
    }
}

//Métodos para recuperar os valores de todos os cartões
if($action == "numeroSeries"){
    echo $cartao->GetNumeroSeries();
}

if($action == "numeroFabricas"){
    echo $cartao->GetNumeroFabricas();
}

if($action == "tipoCartoes"){
    echo $cartao->GetTipoCartoes();
}

if($action == "situacoes"){
    echo $cartao->GetSituacoes();
}

if($action == "empresas"){
    echo $cartao->GetEmpresas();
}

if($action == "bloqueados"){
    echo $cartao->GetBloqueados();
}

if($action == "saldos"){
    echo $cartao->GetSaldos();
}

if($action == "dataExpedicoes"){
    echo $cartao->GetDataExpedicoes();
}

//Método para recuperar um JSON com todos os valores de todos os cartões
if($action == "cartaoJson"){
    $json = json_encode($cartao);
    //Estes replaces servem para substituir caracteres Unicode que são trazidos no json_encode e que ele não converte para UTF8
    $jsonFormatado = $formatador->Formatar($json);
    echo $jsonFormatado;
}

$con->FecharConexao();
?>