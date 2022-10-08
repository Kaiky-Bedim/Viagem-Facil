<?php

require_once "../../Infra/BD/conexao.php";
include "../../Infra/ContaManager/UsuarioManager/usuario.php";
include "cadastroPasse.php";

//Iniciando a Session
session_start();

//Recuperando os valores passados pelo formulário
if(isset($_POST['txtNumSerial'])){
    $numSerie = $_POST['txtNumSerial'];
}

if(isset($_POST['txtNumFabrica'])){
    $numFabrica = $_POST['txtNumFabrica'];
}
$empresa = $_POST['txtEmpresa'];
$tipoCartao = $_POST['txtTipoCartao'];
$tipoCadastro = $_POST['txtTipoCadastro'];

$con = new Conexao();
$cadastroPasse = new CadastroPasse();
$usuario = new Usuario();

$usuario->SetAtributosUsuario($con);

//Verificando se o Usuário tem permissão para criar Cartões Estudantis ou de Idosos
if($tipoCartao == "Idoso"){
    if(!$cadastroPasse->VerificaSeUsuarioIdoso($usuario)){
        echo "Você não possui a Idade necessária para cadastrar um Cartão do tipo Idoso";

        //Fechando a conexão do BD
        $con->FecharConexao();
        return;
    }
}

if($tipoCartao == "Estudantil"){
    if(!$cadastroPasse->VerificaSeUsuarioEstudante($usuario)){
        echo "Você não possui uma Instituição de Ensino cadastrada para ter um Cartão do tipo Estudantil";

        //Fechando a conexão do BD
        $con->FecharConexao();
        return;
    }
}

//Verificando se já não existe um cartão com as características informadas pelo usuário
if(isset($numSerie)){
    $res = $cadastroPasse->VerificaSePasseJaCadastrado($con, $numSerie, $empresa);

    if($res){
        echo "Um Passe com essas informações já foi cadastrado no sistema !";
        
        //Fechando a conexão do BD
        $con->FecharConexao();
        return;
    }
}

//Setando e Cadastrando o Cartão no BD
if($tipoCadastro == "Passe já existente"){
    $cadastroPasse->SetInformacoesPasseJaExistente($numSerie, $numFabrica, $tipoCartao, $empresa);
    $res = $cadastroPasse->CadastrarPasseJaExistente($con);

    if($res == true){
        echo "Seu pedido para o cadastro do Cartão foi enviado com Sucesso";
    }else{
        echo "O Cartão informado não é válido, ou já existe cadastrado no sistema";
    }
}else if($tipoCadastro == "Novo Passe"){
    $cadastroPasse->SetInformacoesNovoPasse($tipoCartao, $empresa);
    
    $res = $cadastroPasse->CadastrarNovoPasse($con);  

    if($res == true){
        echo "Seu pedido para o cadastro do Cartão foi enviado com Sucesso";
    }else{
        echo "Ocorreu algum erro no processo";
    }
}

//Fechando a conexão do BD
$con->FecharConexao();

?>