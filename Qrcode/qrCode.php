<?php

require_once "../Infra/BD/conexao.php";
//precisa do cpf, num de serie, num de fábrica e bloqueado

//consulta o banco de dados
$sql = "select NumeroSerie, NumeroFabrica, Bloqueado from cartao where CPFProprietario = '12345678901' and NumeroSerie = '123';";
$resultado_cartao = mysqli_query($this->conexao->getConexao(), $sql);

if(($resultado_cartao != 0) and ($resultado_cartao->num_rows != 0)){
    while($row_cartao = mysqli_fetch_assoc($resultado_cartao)){
        echo $row_cartao . "<br>";        
    }
}else{
    echo"Sem nenhum dado";
}




?>