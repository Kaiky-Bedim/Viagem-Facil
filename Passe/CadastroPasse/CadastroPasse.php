<?php

//Classe utilizada pelo controller de Cadastro de Passes
class CadastroPasse{
    //Variáveis que correspondem a infromações dos passes
    private $numSerie;
    private $numFabrica;
    private $tipoCartao;
    private $empresa;
    private $cpfProprietario;
    private $conexao;

    //Atribuindo valores às variáveis
    public function SetInformacoesPasseJaExistente($numSerie, $numFabrica, $tipoCartao, $empresa){
        session_start();
        $this->numSerie = $numSerie;
        $this->numFabrica = $numFabrica;
        $this->tipoCartao = $tipoCartao;
        $this->empresa = $empresa;
        $this->cpfProprietario = $_SESSION['cpf'];
    }

    //Método que realiza o Cadastro do Cartão no BD em si
    public function CadastrarPasseJaExistente($con){
        $this->conexao = $con;
        date_default_timezone_set("America/Sao_Paulo");
        $dateTime = date('Y-m-d H:i:s', time());

        $sql = "insert into Cartao values ('".$this->numSerie."','".$this->numFabrica."', '".$this->tipoCartao."', 
                'Aprovado', '".$this->empresa."', false, '".$this->cpfProprietario."', 0, '".$dateTime."');";

        $resCadastroPasse = mysqli_query($this->conexao->getConexao(), $sql);

        $this->conexao->FecharConexao();

        if($resCadastroPasse != 1){
            return false;
        }
        return true;
    }

    //Atribuindo valores para as variáveis
    public function SetInformacoesNovoPasse($tipoCartao, $empresa){
        session_start();
        $this->tipoCartao = $tipoCartao;
        $this->empresa = $empresa;
        $this->cpfProprietario = $_SESSION['cpf'];
    }

    //Método que realiza o Cadastro do Cartão no BD em si
    public function CadastrarNovoPasse($con){
        $this->conexao = $con;
        date_default_timezone_set("America/Sao_Paulo");
        $dateTime = date('Y-m-d H:i:s', time());

        //Realizando a lógica de recuperar um Id único para o Usuário
        if($this->empresa == "Maringá do Vale"){
            $sql = "select NumeroSerie, NumeroFabrica from Identificadores where Id = 1";
        }else if($this->empresa == "Viação Jacareí"){
            $sql = "select NumeroSerie, NumeroFabrica from Identificadores where Id = 2";
        }

        //Recuperando os últimos Números de Série e de Fábrica usados no BD
        $resIdentificadores = mysqli_query($this->conexao->getConexao(), $sql);
        $rows = mysqli_fetch_all($resIdentificadores, MYSQLI_ASSOC);
        
        $BDNumSerie = intval($rows[0]['NumeroSerie']);
        $BDNumFabrica = intval($rows[0]['NumeroFabrica']);

        $resCadastroPasse = 0;

        //O Do-While é necessário caso algum valor dos núemros já exista de novo, o programa tente com outro valor
        do{
            $BDNumSerie += 1;
            $BDNumFabrica += 1;

            //Fazendo a Query em si e Cadastrando um novo Passe
            $sql = "insert into Cartao values ('".$BDNumSerie."', '".$BDNumFabrica."', '".$this->tipoCartao."', 
                    'Aprovado', '".$this->empresa."', false, '".$this->cpfProprietario."', 0, '".$dateTime."');";

            $resCadastroPasse = mysqli_query($this->conexao->getConexao(), $sql);
        }while($resCadastroPasse != 1);
        
        //Atualizando o BD sobre os últimos Números de Série e de Fábrica usados
        if($this->empresa == "Maringá do Vale"){
            $sqlAtualizar = "update Identificadores set NumeroSerie = '".$BDNumSerie."', NumeroFabrica = '".$BDNumFabrica."'  where Id = 1;";
        }else if($this->empresa == "Viação Jacareí"){
            $sqlAtualizar = "update Identificadores set NumeroSerie = '".$BDNumSerie."', NumeroFabrica = '".$BDNumFabrica."'  where Id = 2;";
        }

        mysqli_query($this->conexao->getConexao(), $sqlAtualizar);

        $this->conexao->FecharConexao();

        if($resCadastroPasse != 1){
            return false;
        }
        return true;
    }
}

?>