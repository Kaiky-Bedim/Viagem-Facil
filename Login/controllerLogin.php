<?php

require_once "../Infra/BD/conexao.php";
include "login.php";

session_start();

$cpf = $_POST['cpf'];
$senha = $_POST['senha'];

$con = new Conexao();
$login = new Login();

$res = $login->FazerLogin($cpf, $senha, $con);
if($res == true){
    $_SESSION['login'] = $login;
    $_SESSION['senha'] = $senha;
    header('location:../Principal/principal.html');
}else{
    unset ($_SESSION['login']);
    unset ($_SESSION['senha']);
    header('location:login.html');
}

?>