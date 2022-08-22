<?php

require_once "../../BD/conexao.php";
include "movimentacoes.php";

//Recuperando os dados do cartão para poder indentificá-lo
$action = $_GET['action'];
$numeroSerie = $_GET['numeroSerie'];
$empresa = $_GET['empresa'];

//Criando o objeto Conexão
$con = new Conexao();

//Criando objeto Movimentacoes
$movimentacoes = new Movimentacoes();
$movimentacoes->SetAtributosMovimentacoes($con, $numeroSerie, $empresa);

//Métodos para recuperar dados específicos das Movimentações de um Cartão
if($action == "valores"){
    echo $movimentacoes->GetValores();
}

if($action == "dataMovimentacoes"){
    echo $movimentacoes->GetDataMovimentacoes();
}

if($action == "tipoMovimentacoes"){
    echo $movimentacoes->GetTipoMovimentacoes();
}

if($action == "idPercursos"){
    echo $movimentacoes->GetIdPercursos();
}

//Métodos para recuperar informações básicas do cartão cujas Movimentações estão atribuidas aqui
if($action == "numeroSerie"){
    echo $movimentacoes->GetNumeroSerie();
}

if($action == "empresaCartao"){
    echo $movimentacoes->GetEmpresaCartao();
}

//Método para recuperar um JSON com todos os valores de todos os cartões
if($action == "movimentacaoJson"){
    $json = json_encode($movimentacoes);
    //Estes replaces servem para substituir caracteres Unicode que são trazidos no json_encode e que ele não converte para UTF8
    $jsonFormatado = str_replace("\\\u00e1", "á", $json);
    $jsonFormatado = str_replace("\\\u00e7", "ç", $jsonFormatado);
    $jsonFormatado = str_replace("\\\u00e3", "ã", $jsonFormatado);
    $jsonFormatado = str_replace("\\\u00ed", "í", $jsonFormatado);
    echo $jsonFormatado;
}

//Fechando a Conexão do BD
$con->FecharConexao();

?>