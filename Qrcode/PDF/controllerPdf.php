<?php
//Carrega o Composer
//require_once './Api_Image/vendor/autoload.php';

//Caminho imagem .svg
$caminho = '../imgQRCode/qrCode1500386.svg';

$im = new Imagick();

//Contem imagem svg
$svg = file_get_contents($caminho);

$im->readImageBlob($svg);

/*jpeg*/
$im->setImageFormat("jpeg");
$im->adaptiveResizeImage(720, 445); /*Optional, if you need to resize*/

$im->writeImage('qrCode1500386.jpeg');/*(or .jpg)*/
echo $im;
$im->clear();



/*$image->readImageBlob(file_get_contents('../imgQRCode/qrCode1500386.svg'));
$image->setImageFormat("png24");
$image->resizeImage(1024, 768, imagick::FILTER_LANCZOS, 1); 
$image->writeImage('qrCode1500386.png');

echo $image;*/

?>