<?php

require_once "../Infra/BD/conexao.php";
include "dadosPessoais.php";

//Iniciando as Sessions
session_start();

//Recuperando os dados do formulário que foi enviado
$nome = $_POST['Nome'];
$email = $_POST['Email'];
$rg = $_POST['RG'];
$dataNascimento = $_POST['DataNascimento'];
$estado = $_POST['Estado'];
$cidade = $_POST['Cidade'];
$rua = $_POST['Rua'];
$numero = $_POST['Numero'];
$cep = $_POST['CEP'];
$telefone1 = $_POST['Telefone1'];
$telefone2 = $_POST['Telefone2'];
$complemento = $_POST['Complemento'];

//Criando os objetos que serão usados
$dadosPessoais = new DadosPessoais();
$con = new Conexao();

//Atribuindo os valores as propriedades do objeto DadosPessoais
$dadosPessoais->SetNome($nome);
$dadosPessoais->SetEmail($email);
$dadosPessoais->SetRG($rg);
$dadosPessoais->SetDataNascimento($dataNascimento);
$dadosPessoais->SetEstado($estado);
$dadosPessoais->SetCidade($cidade);
$dadosPessoais->SetRua($rua);
$dadosPessoais->SetNumero($numero);
$dadosPessoais->SetCEP($cep);
$dadosPessoais->SetTelefone1($telefone1);
$dadosPessoais->SetTelefone2($telefone2);
$dadosPessoais->SetComplemento($complemento);

//Chamando o método que efetivamente realiza a alteração no BD
$res = $dadosPessoais->AlterarDadosUsuario($con);

if($res){
    echo "Dados alterados com sucesso !";
}else{
    echo "Não foi possível alterar os dados !";
}

//Fechando a conexão com o BD
$con->FecharConexao();

?>