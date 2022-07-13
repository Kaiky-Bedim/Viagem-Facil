<?php
include "autenticador.php";

$autenticador = new Autenticador();

$condicao = $autenticador->GaranteAutenticacao();

if($condicao){
    echo true;
}else{
    echo false;
}
    
?>