<?php
    require_once "../Infra/BD/conexao.php";
    

    session_start();
    $cpf = $_SESSION['cpf'];
    $con = new Conexao();
    
    $sql = "select NumeroSerie from Cartao where CPFProprietario = '".$cpf."' and Bloqueado = 0;";
    $resp = mysqli_query($con->getConexao(), $sql);
?>


<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pagamento</title>

        <link rel="stylesheet" type="text/css" href="stylePagamento.css"/>
        <link rel="stylesheet" type="text/css" href="../Infra/bootstrap/css/bootstrap.min.css"/>
    </head>
    <body>
        <!-- Div da NavBar -->
        <div id="divNavBar"></div>
        <!-- Colocar Pup-Pop de sucesso -->
        <!-- Div dos Pop-Ups -->
        <div id="divPopUp"></div>

        <div id="wrapper">
            <div class="modal-dialog margin-meio" role="document">
                <div class="modal-content rounded-5 shadow">
                    <div class="modal-header p-5 pb-4 border-bottom-0 cor-form">
                        <h2 class="fw-bold mb-0">Pagamento</h2>
                    </div>
        
                    <div class="modal-body p-5 pt-0 cor-form">
                        <form class="cor-form" method="POST" action="pagamentoController.php">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-floating mb-3">
                                        <select class="form-control rounded-4" id="txtPasse" name="txtPasse" placeholder="Passes Salvos">
                                            <option selected>...</option>
                                            <?php while($rows = mysqli_fetch_array($resp)){
                                            ?>
                                            <option value=" <?php echo $rows['NumeroSerie']; ?> " ><?php echo $rows['NumeroSerie']; ?></option>

                                            <?php
                                            }
                                            ?>
                                        </select>
                                        <label for="txtPasse">Passes Salvos</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-floating mb-3">
                                        <select class="form-control rounded-4" id="txtNomeCartao" placeholder="Nome do Cartão">
                                            <option selected>...</option>
                                            <option>MasterCard</option>
                                            <option>Visa</option>
                                            <option>Nubank</option>
                                        </select>
                                        <label for="txtNomeCartao">Nome do Cartão</label>
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control rounded-4" name="txtSaldo" id="txtSaldo" placeholder="Saldo">
                                        <label for="txtSaldo">Saldo</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-floating mb-3">
                                        <input type="date" class="form-control rounded-4" id="txtDataExp" placeholder="Data de Expiração">
                                        <label for="txtDataExp">Data de Expiração</label>
                                    </div>
                                </div>       
                                <div class="col-6">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control rounded-4" id="txtCodigoSeg" maxlength="3" placeholder="Cód. CVV">
                                        <label for="txtCodigoSeg">Cód. CVV</label>
                                    </div>
                                </div>             
                            </div>
                
                            <!-- Fazer voltar e efetuar pagamento -->
                        
                            <button class="btn btn-primary btn-lg" style="float: right" type="submit">Pagar</button>        

                        </form>
                    </div>
                </div>
            </div>

        
            <!-- Div para o Footer -->
            <div id="divFoot"></div>
        </div>
    </body>
</html>

<!-- Scripts de JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script type="module" src="pagamento.js"></script>