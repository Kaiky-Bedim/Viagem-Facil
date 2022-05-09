<?php

require_once "../BD/conexao.php";
include "cadastro.php";

$nome = $_POST['Nome'];
$email = $_POST['Email'];
$cpf = $_POST['CPF'];
$rg = $_POST['RG'];
$senha = $_POST['Senha'];
$confirmSenha = $_POST['ConfirmarSenha'];
$estado = $_POST['Estado'];
$cidade = $_POST['Cidade'];
$rua = $_POST['Rua'];
$numero = $_POST['Numero'];
$cep = $_POST['CEP'];
$complemento = $_POST['Complemento'];
$telefone1 = $_POST['Telefone1'];
$telefone2 = $_POST['Telefone2'];

$con = new Conexao();
$cadastro = new Cadastro($nome, $email, $cpf, $rg, $senha, $confirmSenha, $estado,
                            $cidade, $rua, $numero, $cep, $complemento, $telefone1, $telefone2);
$res = $cadastro->Cadastrar($con);

if($res == true){
    echo "Cadastro realizado com sucesso";
}else{
    echo "Não foi possível realizar o cadastro";
}

?>