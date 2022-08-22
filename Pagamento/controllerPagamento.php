<?php

require_once "../Infra/BD/conexao.php";
include "pagamento.php";

session_start();

$con = new Conexao();
$pagamento = new Pagamento();

//Recuperando o Array Json que foi enviado pelo Cliente
$data = json_decode(file_get_contents('php://input'), true);

//Recuperando os Dados que foram passados no JSON
$numSerie = $data['numeroSerie'];
$empresa = $data['empresa'];
$saldoAtual = $data['saldoAtual'];
$saldoComprado = $data['saldoComprado'];

//Setando os valores recuperados da requisição nos objetos criados acima
$pagamento->setNumSerie($numSerie);
$pagamento->setEmpresa($empresa);
$pagamento->setValor($saldoComprado);
$pagamento->setNovoSaldo($saldoAtual + $saldoComprado);
$pagamento->setCon($con);

//Esta chamada de função é responsável por cadastrar a Movimentação do Cartão no BD, se ocorrer tudo bem
//a compra é realizada propriamente
$res = $pagamento->CadastraMovimentacao();

if($res != 1){
    echo "Não foi possível cadastrar a sua compra devido a um erro inesperado";
    return;
}

//Executando o método responsável por alterar realmente o saldo do Cartão do usuário
$res = $pagamento->AlterarSaldo();

//É retornada uma mensagem de sucesso ou fracasso para o Usuário de acordo com o que procedeu da requisição
if($res == 1){
    echo "Sua compra de créditos foi realizada com Sucesso !";
}else{
    echo "Ocorreu um erro inesperado e não foi possível realizar sua compra de créditos";
}

?>