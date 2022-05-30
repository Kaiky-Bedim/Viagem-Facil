<?php

require_once "../Infra/BD/conexao.php";
include "login.php";

$cpf = $_POST['cpf'];
$senha = $_POST['senha'];

$con = new Conexao();
$login = new Login();

$res = $login->FazerLogin($cpf, $senha, $con);
if($res == false){
    echo "console.log('olá');";
}else{
    echo "console.log('olá');";
}

?>