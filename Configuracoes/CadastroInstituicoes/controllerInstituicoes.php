<?php

require_once "../../Infra/BD/conexao.php";
require "../../Infra/Formatador/formatador.php";
require "instituicoes.php";

//Criando os objetos que serão utilizados no sistema
$con = new Conexao();
$formatador = new Formatador();
$instituicoes = new Instituicoes();

//Variável que armazenará o que será feito no controller por intermédio do objeto Instituicoes
$action = $_GET['action'];

//Verificando se alguma cidade foi passada para recuperar as Instituições dela
if(isset($_GET['cidade'])){
    $cidade = $_GET['cidade'];
}

//Verifica se a ação a ser realziada é recuperar todas as diferentes Cidades das Instituicoes
if($action == "Cidades"){
    //Recuperando as Cidades pelo objeto Instituicoes
    $res = $instituicoes->RecuperarCidades($con);
    $json = json_encode($res);

    //Devolvendo as cidades
    echo $formatador->Formatar($json);
    return;
}

//Verifica se a ação a ser realziada é recuperar todas as diferentes Instituicoes de Ensino nas Escolas
if($action == "Instituicoes"){
    if($cidade != null){
        $res = $instituicoes->RecuperarInstituicoes($con, $cidade);
        $json = json_encode($res);

        //Devolvendo as Instituições de Ensino da Cidade
        echo $formatador->Formatar($json);
        return;
    }else{
        echo "Informe uma cidade para recuperar as Instituicoes";
        return;
    }
}

//Fechando a Conexão com o BD
$con->FecharConexao();

?>