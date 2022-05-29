<?php

require_once "../Infra/BD/conexao.php";
include "login.php";

$cpf = $_POST['cpf'];
$senha = $_POST['senha'];

$con = new Conexao();
$login = new Login();

$res = $login->FazerLogin($cpf, $senha, $con);
if($res == false){
    echo "Não foi possível logar";
}else{
    echo "Logado com sucesso";
}

?>