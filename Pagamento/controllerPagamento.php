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
$pagamento->setSaldo($saldoAtual + $saldoComprado);
$pagamento->setCon($con);

//Executando o método responsável por alterar realmente o saldo do Cartão do usuário
$res = $pagamento->AlterarSaldo();

//É retornada uma mensagem de sucesso ou fracasso para o Usuário de acordo com o que procedeu da requisição
if($res == 1){
    echo "Sua compra de créditos foi realizada com Sucesso !";
}else{
    echo "Ocorreu um erro inesperado e não foi possível realizar sua compra de créditos";
}

?>