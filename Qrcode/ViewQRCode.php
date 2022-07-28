<?php
    require_once "../Infra/BD/conexao.php";
    include "qrCode.php";

    session_start();
    $cpf = $_SESSION['cpf'];
    $con = new Conexao();
    $qrcode = new Qrcode();

    $sql = "select NumeroSerie from Cartao where CPFProprietario = '".$cpf."';";
    $resp = mysqli_query($con->getConexao(), $sql);
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Qr-code</title>

        <link rel="stylesheet" type="text/css" href="styleQrcode.css"/>
        <link rel="stylesheet" type="text/css" href="../Infra/bootstrap/css/bootstrap.min.css"/>
    </head>
    <body>
        <!-- Div da NavBar -->
        <div id="divNavBar"></div>
        <!-- Div dos Pop-Ups -->
        <div id="divPopUp"></div>

        <div id="wrapper">
            <div class="modal-dialog margin-meio" role="document">
                <div class="modal-content rounded-5 shadow">
                    <div class="modal-header p-5 pb-4 border-bottom-0 cor-form">
                        <h2 class="fw-bold mb-0">Passes</h2>
                    </div>
        
                    <div class="modal-body p-5 pt-0 cor-form">
                        <form class="cor-form" method="POST" action="controllerQrcode.php">
                            <div class="row">
                                <div class="col-12">

                                    <div class="form-floating mb-3">

                                        <select class="form-control rounded-4" name="txtOpcaoPasse" aria-label="Default select example" id="OpcaoPasse" 
                                        onchange="selectPasse()" placeholder="Passes Salvos">
                                            <option selected>...</option>
                                            <?php while($rows = mysqli_fetch_array($resp)){
                                            ?>
                                            <option value="<?php echo $rows['NumeroSerie']; ?>" ><?php echo $rows['NumeroSerie']; ?></option>

                                            <?php
                                            }
                                            ?>
                                        </select>
                                        <label for="OpcaoPasse">Passes Salvos</label>

                                    </div>

                                </div>
                            </div>

                            <button class="btn btn-primary btn-lg" style="float: right" type="submit">Gerar</button>        

                        </form>
                    </div>
                </div>
            </div>

            
            <div class="modal modal-signin position-static d-block margin-meio" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content rounded-5 shadow cor-form">
                        <?php
                        echo "<img src='imgQRCode/qrCode.svg' width='500'>";
                        ?>
                        <!--<img src="./imgQRCode/qrCode.svg" class="img-fluid tamanho-imagem">-->
                    </div>
                    <br><br>
                </div>
            </div>
            
            <!-- Div para o Footer -->
            <div id="divFoot"></div>
            
        </div>
    </body>
</html>
<!-- Scripts de JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script type="module" src="qrcode.js"></script>