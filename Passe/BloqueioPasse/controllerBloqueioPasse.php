<?php
require_once "../../Infra/BD/conexao.php";
include "BloqueioPasse.php";

session_start();

$con = new Conexao();
$bloquear = new Bloquear();

$data = json_decode(file_get_contents('php://input'), true);


$numSerie   = $data['numSerie'];
$numFabrica = $data['numFabrica'];
$bloqueado  = (int)$data['bloqueado'];
$cpf = $_SESSION['cpf'];

if($bloqueado==0){
    $bloqueado=1;
}else if($bloqueado==1){
    $bloqueado=0;
}


$bloquear->BloquearPasse($cpf, $numSerie, $numFabrica, $bloqueado, $con);

//$numSerie = 1500386;
//$numFabrica = 390880201;
//$bloqueado = 0;

?>