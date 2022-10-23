<?php
    require_once "../../Infra/BD/conexao.php";
    $con = new Conexao();

    $sql = "select * from percursos;";
    $res = mysqli_query($con->getConexao(), $sql);
    echo "<select name='select' id='txtPercuso'>";
    while ($rows = mysqli_fetch_assoc($res)){
        echo "<option value='".$rows['NumeroLinha']."'>Linha ".$rows['NumeroLinha']."</option>";
    }
    echo "</select>";
?>
<html>
  <head>
    <title>Instascan</title>
    <script type="text/javascript" src="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js" ></script>	
  </head>
  <body>
    <!-- Tag onde o vídeo capturado pela câmera aparece -->
    <video id="preview"></video>
    <!-- Script para o reconhecimento do QRCode pela câmera -->
    <script>
        //Recuperando o elemento onde o vídeo aparece e instanciando um objeto Scanner
        let scanner = new Instascan.Scanner(
            {
                video: document.getElementById('preview')
            }
        );
        scanner.addListener('scan', function(content) {
            var Id_Percurso = document.getElementById('txtPercuso').value;
            var data = content.split("/");
            var numSerie = data[0];
            var nomeEmpresa = data[1];

            var data = {'numSerie': numSerie, 'Empresa': nomeEmpresa, 'Id_Percurso': Id_Percurso};
            let httpRequest = new XMLHttpRequest();
            httpRequest.open("POST", "controllerLeitor.php");
            httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            httpRequest.send(JSON.stringify(data));
            httpRequest.onreadystatechange = async function(){
                if(this.readyState == 4){
                    if(this.status == 200){
                        var response = this.response;
                        console.log(response);
                    }
                }
            }
        });

        Instascan.Camera.getCameras().then(cameras => 
        {
            if(cameras.length > 0){
                scanner.start(cameras[0]);
            } else {
                console.error("Não existe câmera no dispositivo!");
            }
        });
    </script>

 </body>
</html>