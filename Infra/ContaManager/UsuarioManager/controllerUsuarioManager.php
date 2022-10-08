<?php
require_once "../../BD/conexao.php";
include "../../Formatador/formatador.php";
include "usuario.php";

//Iniciando sessão
session_start();

$action = $_GET['action'];

$con = new Conexao();

//Criando objeto usuario
$usuario = new Usuario();
$formatador = new Formatador();
$usuario->SetAtributosUsuario($con);

//Criei vários métodos, que seriam as ações que se pode tomar neste controller e os dados que se pode recuperar do usuário
if($action == "cpf"){
    echo $usuario->GetCPF();
}

if($action == "rg"){
    echo $usuario->GetRG();
}

if($action == "nome"){
    echo $usuario->GetNome();
}

if($action == "dataNascimento"){
    echo $usuario->GetDataNascimento();
}

if($action == "telefone1"){
    echo $usuario->GetTelefone1();
}

if($action == "telefone2"){
    echo $usuario->GetTelefone2();
}

if($action == "email"){
    echo $usuario->GetEmail();
}

if($action == "estado"){
    echo $usuario->GetEstado();
}

if($action == "cidade"){
    echo $usuario->GetCidade();
}

if($action == "rua"){
    echo $usuario->GetRua();
}

if($action == "complemento"){
    echo $usuario->GetComplemento();
}

if($action == "numero"){
    echo $usuario->GetNumero();
}

if($action == "cep"){
    echo $usuario->GetCEP();
}

if($action == "instituicaoEnsinoCidade"){
    echo $usuario->GetInstituicaoEnsinoCidade();
}

if($action == "instituicaoEnsino"){
    echo $usuario->GetInstituicaoEnsino();
}

if($action == "usuarioJson"){
    $json = json_encode($usuario);
    //Estes replaces servem para substituir caracteres Unicode que são trazidos no json_encode e que ele não converte para UTF8
    $jsonFormatado = $formatador->Formatar($json);

    echo $jsonFormatado;
}

$con->FecharConexao();

?>