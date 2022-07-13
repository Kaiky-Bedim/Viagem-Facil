<?php
include "autenticador.php";

$autenticador = new Autenticador();
try{
    $autenticador->Logout();
    echo "Sucesso";
}catch(Exception $e){
    echo "Ocorreu um erro inesperado";
}


?>