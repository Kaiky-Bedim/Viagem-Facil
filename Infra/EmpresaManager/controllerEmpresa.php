<?php
require_once "../BD/conexao.php";
include "../Formatador/formatador.php";
include "empresa.php";

//Criando objetos importantes
$con = new Conexao();
$formatador = new Formatador();
$empresa = new Empresa();

if(isset($_GET['nome'])){
    $nome = $_GET['nome'];
    $empresa->GetDadosEmpresa($con, $nome);
}else{
    $empresa->GetDadosEmpresas($con);
}

$action = $_GET['action'];

if($action == "Nome"){
    if(is_array($empresa->GetNome())){
        echo $formatador->FormatarTabelaParaCaracteresEspeciais(json_encode($empresa->GetNome()));
    }else{
        echo $empresa->GetNome();
    }
}

if($action == "DescontoComum"){
    if(is_array($empresa->GetDescontoComum())){
        echo $formatador->FormatarTabelaParaCaracteresEspeciais(json_encode($empresa->GetDescontoComum()));
    }else{
        echo $empresa->GetDescontoComum();
    }
}

if($action == "DescontoEstudantil"){
    if(is_array($empresa->GetDescontoEstudantil())){
        echo $formatador->FormatarTabelaParaCaracteresEspeciais(json_encode($empresa->GetDescontoEstudantil()));
    }else{
        echo $empresa->GetDescontoEstudantil();
    }
}

if($action == "DescontoIdoso"){
    if(is_array($empresa->GetDescontoIdoso())){
        echo $formatador->FormatarTabelaParaCaracteresEspeciais(json_encode($empresa->GetDescontoIdoso()));
    }else{
        echo $empresa->GetDescontoIdoso();
    }
}

if($action == "PathImagem"){
    if(is_array($empresa->GetPathImagem())){
        echo $formatador->FormatarTabelaParaCaracteresEspeciais(json_encode($empresa->GetPathImagem()));
    }else{
        echo $empresa->GetPathImagem();
    }
}

if($action == "jsonEmpresas"){
    $json = json_encode($empresa);
    //Estes replaces servem para substituir caracteres Unicode que são trazidos no json_encode e que ele não converte para UTF8
    $jsonFormatado = $formatador->FormatarTabelaParaCaracteresEspeciais($json);

    echo $jsonFormatado;
}

$con->FecharConexao();

?>