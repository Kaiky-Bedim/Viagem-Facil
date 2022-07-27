<?php
    require_once "../Infra/BD/conexao.php";
    
    session_start();
    $cpf = $_SESSION['cpf'];
    $con = new Conexao();
    
    $sql = "select * from cartao where CPFProprietario = '".$cpf."';";
    $resp = mysqli_query($con->getConexao(), $sql);
?>


<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Principal Passe</title>

        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,400;0,600;1,200;1,400;1,600&display=swap"
        rel="stylesheet"
        />
        <link rel="stylesheet" type="text/css" href="stylePasse.css"/>
        <link rel="stylesheet" type="text/css" href="../Infra/bootstrap/css/bootstrap.min.css"/>
    </head>

    <body>
        <!-- Div NavBar -->
        <div id="divNavBar"></div>
        <!-- Div dos Pop-Ups -->
        <div id="divPopUp"></div>

        <!-- Bloco sobre a janela de Cadastro de Passes -->
        <div id="cadastroCartaoModal" class="cadastroCartaoModal" hidden>
            <div id="wrapper">

                <!-- Botão de X para sair da Janela -->
                <button type="button" class="buttonX" id="buttonX"></button>

                <div class="bloco janela">

                    <!-- Bloco do Cartão na janela de Cadastro -->
                    <div class="cartaoAlinhamento">
                        <div class="card-bloco">
                            <div class="front fonte cartaoComum" id="divCartaoInteiro">
                                <div class="image">
                                    <img src="../Infra/img/LogosEmpresas/LOGO_MARINGA_DO_VALE.png" id="imgLogoEmpresa">
                                        <span class="cpf" id="spanCpfCartao"> </span>
                                </div>
                            
                                <div class="flexbox">
                                    <div class="box">
                                        <div class="numFixo">
                                            <span class="tmnNum">Número de Série:</span>                            
                                            <div id="divSerieCartao" class="tmnNum espNum">XXXXXXX</div>
                                        </div>
                                    </div>
                                    <div class="box">
                                        <span id="spanNomeCartao" class="nome"> </span>
                                    </div>
                                </div>
                                
                                <div class="flexbox">
                                    <div class="box numFixo">
                                        <span class="tmnNum">Número de Fábrica:</span>
                                        <div id="divFabricaCartao" class="tmnNum espNum">XXXXXXXXX</div>  
                                    </div>
                                </div>
                            </div>
                            <span id="spanTipoCartaoCartao" class="tipo fixaTipoCadastro">Comum</span>
                        </div>
                    </div>
                    <!-- Aqui termina o cartão da janela -->

                    <div class="alinhamento">
                        <button id="btnNovoPasse" role="button" class="aPasses activeBtn" aria-pressed="true">Novo Passe</button>
                        <button id="btnPasseExistente" role="button" class="aPasses desactiveBtn" aria-pressed="false">Passe já Existente</button>
                    </div>

                    <!-- Começo do Form para cadastrar novos Passes -->
                    <form method="POST" id="formCadastroPasse" action="CadastroPasse/controllerCadastroPasse.php">
                        <div class = "flexbox">

                            <div class="inputBox" id="divSerie" hidden>
                                <span id="spanSerie">Número de Série</span>
                                <input id="inputSerie" type="text" name="txtNumSerial" maxlength="7" minlength="7"  class="card-holder-input" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                            </div>

                            <div class="inputBox" id="divFabrica" hidden>
                                <span id="spanFabrica">Número de Fábrica</span>
                                <input id="inputFabrica" type="text" name="txtNumFabrica" maxlength="9" minlength="9" class="card-number-input" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                            </div>

                            <div class="inputBox">
                                <span id="spanEmpresa">Empresa</span>
                                <select name="txtEmpresa" id="selectEmpresa" class="month-input" required>
                                    <option value="" selected disabled></option>
                                    <option value="Maringá do Vale">Maringá do Vale</option>
                                    <option value="Viação Jacareí">Viação Jacareí</option>
                                </select>
                            </div>

                            <div class="inputBox">
                                <span id="spanTipoCartao">Tipo Cartão</span>
                                <select name="txtTipoCartao" id="selectTipoCartao" class="month-input" required>
                                    <option value="Comum" selected>Comum</option>
                                    <option value="Estudantil">Estudantil</option>
                                    <option value="Idoso">Idoso</option>
                                </select>
                            </div>

                            <!-- Este input basicamente será enviado junto na requisição e indicará o se é um novo Cartão
                            sendo cadastrado ou um já existente -->
                            <input name="txtTipoCadastro" value="Novo Passe" id="inputTipoCadastro" hidden>

                        </div>
                        <input type="submit" value="Cadastrar Passe" id="AdicionarPasse" class="submit-btn">
                    </form>
                    <!-- Fim do Form -->
                    <br></br>
                </div>
            </div>
        </div>
        <!-- Script que contém a lógica de Cadastro Passes -->
        <script src="CadastroPasse/cadastroPasse.js" type="module"></script>

        <!-- Bloco sobre a lista de Passes e o Histórico -->
        <div id="wrapper">
            <div class="bloco">

                <!-- Botão para abrir a janela de Cadastro de Passes -->
                <button type="button" class="btn btn-primary" id="btnCadastrarNovoPasse">Cadastrar Novo Passe</button>
                <br>

                <!-- Bloco do Cartão que aparece em cima da Lista -->
				<div class="card-bloco">
					<div class="front fonte cartaoComum">
						<div class="image">
							<img src="../Infra/img/LogosEmpresas/LOGO_MARINGA_DO_VALE.png" id="imgLogoEmpresa">
                                <span class="cpf" id="spanCpf">379.368.268-78</span>
						</div>
					
						<div class="flexbox">
							<div class="box">
								<span class="tmnNum">Número de Série:</span>                            
								<div id="divSerie" class="tmnNum espNum">1234567</div>
							</div>
                            <div class="box">
                                <span id="spanNome" class="nome">Kaiky Augusto Bedim</span>
                            </div>
						</div>
						
						<div class="flexbox">
							<div class="box">
								<span class="tmnNum">Número de Fábrica:</span>
								<div id="divFabrica" class="tmnNum espNum">123456789</div>  
							</div>
						</div>

                        <div class="flexbox">
                            <div class="box">
								<span id="spanTipoCartao" class="tipo">Comum</span>
							</div>
                            <div class="box saldo">
                                <span>Saldo: R$</span>
                                <span id="spanSaldo">1000</span>
							</div>
                        </div>
					</div>
				</div>

				<!-- Começo do Form que compõe a Lista -->
				<form id="form">
                    <table class="table table-striped table-light">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Num. Série</th>
                                <th scope="col">Num. Fábrica</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Status</th>
                                <th scope="col">Saldo</th>
                                <th scope="col">Opção 1</th>
                                <th scope="col">Opção 2</th>
                                <th scope="col">Opção 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php 
                                $x = 1;
                                while($dado = mysqli_fetch_assoc($resp)){
                                    $NumSerie = $dado['NumeroSerie'];

                                    echo "<tr>";
                                    echo "<th scope='row'>".$x."</th>";
                                    echo "<td>" .$dado['NumeroSerie']. "</td> \n";
                                    echo "<td>" .$dado['NumeroFabrica']. "</td> \n";
                                    echo "<td>" .$dado['TipoCartao']. "</td> \n";
                                    if($dado['Bloqueado'] == true){
                                        echo "<td>Bloq.</td> \n";
                                    }else{
                                        echo "<td>Desbloq.</td> \n";
                                    }
                                    echo "<td>" .$dado['Saldo']. "</td> \n";
                                    
                                    //Não ta dando certo (não chama a função)
                                    echo "<td><button class='btn btn-primary btn-sm' type='button'>Vizualizar</button></td> \n";
                                    
                                    echo "<td><button class='btn btn-dark btn-sm' type='button'>Bloq/Des</button></td> \n";
                                    
                                    echo "<td><button id='$NumSerie' onclick='ApagarPasse($NumSerie)' class='btn btn-danger btn-sm' value='$NumSerie' type='button'>Deletar</button></td> \n";

                                    echo "</tr> \n";

                                    $x = $x + 1;
                                }
                            ?>
                            
                            
                        </tbody>
                    </table>
				</form>
				<!-- Fim do Form que compõe a Lista -->
				<br>
			</div>

            <!--Codigo da Tabela de Histórico -->
            <div class="container margin-meio historico">
                <h1>Histórico</h1>
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Data da Movimentação</th>
                            <th scope="col">Tipo da Movimentação</th>
                            <th scope="col">Número de Série do Cartão</th>
                            <th scope="col">Id Percurso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>5,05</td>
                            <td>05/01/2022</td>
                            <td>Efetiva</td>
                            <td>123456778</td>
                            <td>5114</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>5,05</td>
                            <td>05/01/2022</td>
                            <td>Efetiva</td>
                            <td>123456778</td>
                            <td>5114</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>5,05</td>
                            <td>05/01/2022</td>
                            <td>Efetiva</td>
                            <td>123456778</td>
                            <td>5114</td>
                        </tr>
                    </tbody>
                </table>
                <br><br><br>
            </div>
            <br>

            <!-- Div para o Footer -->
            <div id="divFoot"></div>
        </div>
    </body>
</html>
<!-- Scripts de JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script type="module" src="passe.js"></script>