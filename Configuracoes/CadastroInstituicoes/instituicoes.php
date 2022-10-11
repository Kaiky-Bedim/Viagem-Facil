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

    //Função responsável por cadastrar uma Instituição para o Usuário
    function CadastraInstituicoesParaUsuario($con, $cidadeInstituicao, $instituicao, $cpf){
        //Criando o SQL e executando a Query
        $sql = "select Id from InstituicoesEnsino where Cidade = '".$cidadeInstituicao."' and Nome = '".$instituicao."'";
        $res = mysqli_query($con->getConexao(), $sql);

        //Verificandp se a opereção foi um sucesso
        if($res->num_rows > 0){
            $idInstituicao = $res->fetch_array()[0];

            //Montando a Query para atualizar o Id da Instituição de Ensino escolhida
            $sql = "update DadosCadastrais set InstituicaoEnsinoID = ".$idInstituicao." where cpf = '".$cpf."'";
            $res = mysqli_query($con->getConexao(), $sql);

            if($res > 0){
                return true;
            }else{
                return false;
            }
        }else{
            return 0;
        }
    }

    //Função responsável por remover uma Instituição de Ensino do Usuário
    function RemoveInstituicaoEnsinoDoUsuario($con, $cpf){
        //Montando a Query para remover o Id da Instituição de Ensino escolhida
        $sql = "update DadosCadastrais set InstituicaoEnsinoID = null where cpf = '".$cpf."'";
        $res = mysqli_query($con->getConexao(), $sql);

        if($res > 0){
            return true;
        }else{
            return false;
        }
    }
}

?>