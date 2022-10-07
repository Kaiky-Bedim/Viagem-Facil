<?php

//Classe que representa as Instituicoes de Ensino que o Usuário pode cadastrar !
class Instituicoes{

    //Esta função recupera todas as Cidades com Instituições cadastradas
    function RecuperarCidades($con){
        //Montando a Query para recuperar todas as cidades
        $sql = "select Cidade from InstituicoesEnsino order by Cidade";
        $res = mysqli_query($con->getConexao(), $sql);

        //Verificando se a operação foi bem sucedida ou não
        if($res->num_rows > 0){
            $cidades = $res->fetch_all();
            return $cidades;
        }

        return 0;
    }

    function RecuperarInstituicoes($con, $cidade){
        $sql = "select Nome from InstituicoesEnsino where Cidade = '".$cidade."' order by Nome";
        $res = mysqli_query($con->getConexao(), $sql);

        //Verificando se a operação foi bem sucedida ou não
        if($res->num_rows > 0){
            $cidades = $res->fetch_all();
            return $cidades;
        }

        return 0;
    } 
}

?>