<?php

require_once "../Infra/BD/conexao.php";
include "../Infra/ContaManager/UsuarioManager/usuario.php";
include "../Infra/EmailSender/emailSender.php";
include "esqueceuSenha.php";

//Iniciando a Session
session_start();

//Verificando se foi enviado o Código de Verificação para comparação
if(isset($_GET['codigoVerificacao'])){
    if($_SESSION['codigoVerificacao'] == $_GET['codigoVerificacao']){
        echo true;

        //Removendo das Sessions o valor do Código de Verificação, e liberando o Usuário a alterar sua Senha
        unset($_SESSION['codigoVerificacao']);
        $_SESSION['permissaoAlterarSenha'] = "true";

        return;
    }else{
        echo false;
        return;
    }
}

//Recuperando os valores do formulário enviados via POST
$cpf = $_POST['txtCpf'];
$email = $_POST['txtEmail'];

//Criando os objetos Conexão e Usuário para poder 
$con = new Conexao();
$usuario = new Usuario();
$emailSender = new EmailSender();
$esqueceuSenha = new EsqueceuSenha();

//Setando o CPF do Usuário que queremos verificar
$usuario->SetCPF($cpf);

//Recuperando os dados desse usuário
$usuario->SetAtributosUsuario($con);

//Recuperar o E-mail do Usuário do objeto Usuário
$emailBD = $usuario->GetEmail();

//Verificando se o CPF cadastrado existe no sistema
if($emailBD == ""){
    echo "CPF não encontrado no sistema";
    return;
}

//Verificando se o E-mail informado no Form é o mesmo E-mail cadastrado no sistema
if($email == $emailBD){
    //Deleto o valor da Session para deslogar o Usuário atual
    unset($_SESSION['cpf']);

    //Setando informações importantes do E-mail para que ele seja enviado
    $emailSender->SetDestinatario($email);
    $emailSender->SetRemetente("viagemfacil.univap@gmail.com");
    $emailSender->SetAssunto("Recuperação de Senha");
    //$emailSender->SetSenha("Onibus_123");

    //Gerando o Código de Verificação do Usuário e montando o corpo do E-mail
    $codigoVerificao = $esqueceuSenha->GerarCodigoVerificacao();
    $corpoEmail = $esqueceuSenha->MontaCorpoEmail($codigoVerificao, $email);
    $emailSender->SetMensagem($corpoEmail);
    
    //Enviando o E-mail montado até aqui
    $res = $emailSender->EnviarEmail();
    echo $res;

    //Se a operação foi um sucesso, guardamos o Códido de Verificação nas Sessions para ser comparado 
    //depois com o valor que o usuário digitar
    if(str_contains($res, "sucesso")){
        $_SESSION['codigoVerificacao'] = $codigoVerificao;
    }else{
        unset($_SESSION['codigoVerificacao']);
    }

}else{
    echo "E-mail informado não coincide com o E-mail cadastrado para este CPF";
}

?>