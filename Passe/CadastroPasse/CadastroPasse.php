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

    //Função que irá verificar se o Passe já existe no BD
    public function VerificaSePasseJaCadastrado($con, $numeroSerie, $empresa){
        $this->conexao = $con;
        $sql = "select * from Cartao where NumeroSerie = '".$numeroSerie."' and Empresa = '".$empresa."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        //Verifica se foi encontrado algum cartão com essas características
        if($res->num_rows > 0){
            return true;
        }
        return false;

    }

    //Verifica se o Usuário é realmente um Idoso e pode cadastrar passes para Idosos
    public function VerificaSeUsuarioIdoso($usuario){
        date_default_timezone_set("America/Sao_Paulo");
        $dateNow = new DateTime('now');

        $dateNascimento = new DateTime($usuario->GetDataNascimento());

        //Subtraindo a data atual da data de nascimento do Usuário
        $idadeAnos = $dateNascimento->diff($dateNow)->y;

        //Verificando se o Usuário é ou não um Idoso
        if($idadeAnos >= 60){
            return true;
        }else{
            return false;
        }
    }

    //Verifica se o Usuário possui uma Instituição de Ensino cadastrada e assim pode ter Cartões Estudantis
    public function VerificaSeUsuarioEstudante($usuario){
        //Recuperando as informações de Estudo do Usuário
        $instituicaoEnsinoCidade = $usuario->GetInstituicaoEnsinoCidade();
        $instituicaoEnsino = $usuario->GetInstituicaoEnsino();

        //Verificando se o Usuário é ou não um Estudante
        if($instituicaoEnsinoCidade != null && $instituicaoEnsino != null){
            return true;
        }else{
            return false;
        }
    }

    //Atribuindo valores às variáveis
    public function SetInformacoesPasseJaExistente($numSerie, $numFabrica, $tipoCartao, $empresa){
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

        if($resCadastroPasse != 1){
            return false;
        }
        return true;
    }

    //Atribuindo valores para as variáveis
    public function SetInformacoesNovoPasse($tipoCartao, $empresa){
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

        if($resCadastroPasse != 1){
            return false;
        }
        return true;
    }
}

?>