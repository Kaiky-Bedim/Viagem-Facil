<?php

require_once "../../Infra/BD/conexao.php";
require "../../EsqueceuSenha/esqueceuSenha.php";

//Iniciando a Session
session_start();

//Recuperando a Senha enviada
$senha = $_POST['senha'];
//Recuperando o CPF da Session do Usuário Logado
$cpf = $_SESSION['cpf'];

//Criando os objetos que serão utilizados no sistema
$con = new Conexao();
$alteraSenha = new EsqueceuSenha();

//Verificando se o Usuário digitou sua senha corretamente
if($alteraSenha->ComparaNovaSenhaComSenhaAntiga($cpf, $senha, $con)){
    echo "Senha correta";
    $_SESSION['permissaoParaAlterarSenhaConfiguracoes'] = "true";
}else{
    echo "A Senha informada está incorreta, digite novamente";
}

//Fechando a conexão com o BD
$con->FecharConexao();

?>