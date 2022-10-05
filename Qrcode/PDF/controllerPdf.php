<?php
//Carrega o Composer
require_once './ApiPdf/vendor/autoload.php';

$valor = $_POST['txtPdf'];
//Referenciar o namespace Dompdf
use Dompdf\Dompdf;

//$data = json_decode(file_get_contents('php://input'), true);
//$numSerie = $data['numSerie'];


//Instanciar e usar a classe dompdf
$domPdf = new Dompdf();

$dados = "<h1>QrCode do cartão número série:'".$valor."'<h1>";

$domPdf->loadHtml($dados);
$domPdf->setPaper('A4', 'portrait');

$domPdf->render();
$domPdf->stream();

echo "ok";
?>