<?php

require_once "../Infra/BD/conexao.php";
include "login.php";

//Iniciando a Session
session_start();

$cpf = $_POST['cpf'];
$senha = $_POST['senha'];

$con = new Conexao();
$login = new Login();

//Chamando o método responsável por Logar um usuário, ele está na classe login.php
$res = $login->FazerLogin($cpf, $senha, $con);

//Fechando a conexão do BD
$con->FecharConexao();

//Se o retorno for true, o usuário foi autenticado e pode acessar o sistema, seu cpf será 
//salvo na session, caso contrário ele não logou e não terá dado algum salvo na session
if($res){
    $_SESSION['cpf'] = $cpf;
    echo true;
}else{
    echo false;
}

?>