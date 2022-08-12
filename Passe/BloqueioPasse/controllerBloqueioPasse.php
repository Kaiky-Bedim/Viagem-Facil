<?php
require_once "../../Infra/BD/conexao.php";
include "bloqueioPasse.php";

//Iniciando a Session
session_start();

//Criando os objetos de Conexão e o objeto Bloquear que será usado para Bloquear o Passe
$con = new Conexao();
$bloquear = new Bloquear();

//Recebendo o Json do JS para bloquear o cartão
$data = json_decode(file_get_contents('php://input'), true);

//Dividindo os dados recebidos do Json
$numSerie   = $data['numSerie'];
$numFabrica = $data['numFabrica'];
$bloqueado  = (int)$data['bloqueado'];
$cpf = $_SESSION['cpf'];

//Verificando a situação atual do cartão para poder alterá-la
if($bloqueado == 0){
    $bloqueado = 1;
}else if($bloqueado == 1){
    $bloqueado = 0;
}

//Chamando o método responsável por bloquear o Cartão
$response = $bloquear->BloquearPasse($cpf, $numSerie, $numFabrica, $bloqueado, $con);

echo $response;

?>