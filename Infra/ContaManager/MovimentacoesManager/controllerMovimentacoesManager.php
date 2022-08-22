<?php
require_once "../../BD/conexao.php";
include "movimentacoes.php";

//Recuperando os dados do cartão para poder indentificá-lo
$numeroSerie = $_GET['numeroSerie'];
$empresa = $_GET['empresa'];

//Criando o objeto Conexão
$con = new Conexao();

//Criando objeto Movimentacoes
$movimentacoes = new Movimentacoes();
$movimentacoes->SetAtributosMovimentacoes($con, $numeroSerie, $empresa);
?>