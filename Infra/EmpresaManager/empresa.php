<?php

class Empresa implements JsonSerializable{
    private $nome;
    private $descontoComum;
    private $descontoEstudantil;
    private $descontoIdoso;
    private $pathImagem;

    function GetNome(){
        return $this->nome;
    }

    function GetDescontoComum(){
        return $this->descontoComum;
    }

    function GetDescontoEstudantil(){
        return $this->descontoEstudantil;
    }

    function GetDescontoIdoso(){
        return $this->descontoIdoso;
    }

    function GetPathImagem(){
        return $this->pathImagem;
    }

    function GetDadosEmpresa($con, $nome){
        $sql = "select * from Empresas where Nome = '".$nome."';";
        $res = mysqli_query($con->getConexao(), $sql);
        $row = mysqli_fetch_assoc($res);

        //Verificando se o BD retornou algum resultado
        if($row != null){
            $this->nome = $row['Nome'];
            $this->descontoComum = $row['DescontoComum'];
            $this->descontoEstudantil = $row['DescontoEstudantil'];
            $this->descontoIdoso = $row['DescontoIdoso'];
            $this->pathImagem = $row['CaminhoLogoSistema'];
        }
    }

    function GetDadosEmpresas($con){
        $sql = "select * from Empresas";
        $res = mysqli_query($con->getConexao(), $sql);
        $rows = mysqli_fetch_all($res, MYSQLI_ASSOC);

        if($rows == null){
            return;
        }
        $index = 0;

        //Verificando se o BD retornou algum resultado
        foreach($rows as $row){
            $this->nome[$index] = $row['Nome'];
            $this->descontoComum[$index] = $row['DescontoComum'];
            $this->descontoEstudantil[$index] = $row['DescontoEstudantil'];
            $this->descontoIdoso[$index] = $row['DescontoIdoso'];
            $this->pathImagem[$index] = $row['CaminhoLogoSistema'];
            $index++;
        }
    }

    //Este método vem da Interface que essa classe implementa, ele permite que convertamos objetos Usuario em JSON
    function jsonSerialize() {
        return [
            'nome' => $this->GetNome(),
            'descontoComum' => $this->GetDescontoComum(),
            'descontoEstudantil' => $this->GetDescontoEstudantil(),
            'descontoIdoso' => $this->GetDescontoIdoso(),
            'pathImagem' => $this->GetPathImagem(),
        ];
    }
}

?>