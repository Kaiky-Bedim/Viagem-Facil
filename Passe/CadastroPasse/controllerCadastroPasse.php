<?php

require_once "../../Infra/BD/conexao.php";
include "cadastroPasse.php";

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

//Setando e Cadastrando o Cartão no BD
if($tipoCadastro == "Passe já existente"){
    $cadastroPasse->SetInformacoesPasseJaExistente($numSerie, $numFabrica, $tipoCartao, $empresa);
    $res = $cadastroPasse->CadastrarPasseJaExistente($con);

    //Fechando a conexão do BD
    $con->FecharConexao();

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

?>