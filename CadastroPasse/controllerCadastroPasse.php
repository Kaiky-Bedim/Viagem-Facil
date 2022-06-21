<?php

require_once "../Infra/BD/conexao.php";
include "CadastroPasse.php";
include "../Login/login.php"
//Perguntar kaiky se precisa do include login

$login = new Login();
$cpf = $login->getCPF();
$numSerie = $_POST['txtNumSerial'];


?>