<?php

require_once "../Infra/BD/conexao.php";
include "cadastro.php";

//Iniciando a Session
session_start();

//Recuperando os Dados informados pela requisição
$nome = $_POST['Nome'];
$email = $_POST['Email'];
$cpf = $_POST['CPF'];
$rg = $_POST['RG'];
$dataNascimento = $_POST['DataNascimento'];
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

//Criando os Objetos necessários
$con = new Conexao();
$cadastro = new Cadastro($nome, $email, $cpf, $rg, $dataNascimento, $senha, $confirmSenha, $estado,
                            $cidade, $rua, $numero, $cep, $complemento, $telefone1, $telefone2);

$cadastro->SetConexao($con);

if(!$cadastro->ValidarCPF()){
    echo "O CPF informado é inválido !";
    return;
}

if($cadastro->VerificaSeJaExisteEsseCPFNoSistema()){
    echo "O CPF informado já foi cadastrado no sistema !";
    return;
}

$res = $cadastro->Cadastrar($con);

if($res == true){
    $_SESSION['cpf'] = $cpf;
    echo true;
}else{
    echo false;
}

//Fechando a conexão com o BD
$con->FecharConexao();

?>