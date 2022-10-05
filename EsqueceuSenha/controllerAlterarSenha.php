<?php

require_once "../Infra/BD/conexao.php";
include "esqueceuSenha.php";

//Iniciando a Session
session_start();

//Verificando se o usuário passou pelos processos de Código de Verificação e possui autorização para continuar
if(!isset($_SESSION['permissaoAlterarSenha']) && !isset($_SESSION['permissaoParaAlterarSenhaConfiguracoes'])){
    echo "Você não possui autorização para alterar a Senha";
    return;
}

//Rebendo a Nova Senha do Usuário
$novaSenha = $_POST["senha"];

//Verificando por onde virá o CPF do usuário que terá a Senha Alterada
if(isset($_SESSION['cpf'])){
    $cpf = $_SESSION['cpf'];
}else{
    $cpf = $_POST["cpf"];
}

//Criando os objetos que serão utilizados no sistema
$con = new Conexao();
$esqueceuSenha = new EsqueceuSenha();

$res = $esqueceuSenha->ComparaNovaSenhaComSenhaAntiga($cpf, $novaSenha, $con);

//Verificando se a Nova Senha é igual a Senha Antiga do Usuário
if(!$res){
    $res = $esqueceuSenha->CadastraNovaSenha($cpf, $novaSenha, $con);

    if($res){
        echo "Senha alterada com sucesso";
        //Removendo a permissão do Usuário de alterar a Senha
        if(isset($_SESSION['permissaoAlterarSenha'])){
            unset($_SESSION['permissaoAlterarSenha']);
        }

        if(isset($_SESSION['permissaoParaAlterarSenhaConfiguracoes'])){
            unset($_SESSION['permissaoParaAlterarSenhaConfiguracoes']);
        }
    }else{
        echo "Não foi possível alterar a sua Senha !";
    }
}else{
    echo "Senha nova não pode ser igual a antiga";
}

//Fechando a conexão com o BD
$con->FecharConexao();

?>