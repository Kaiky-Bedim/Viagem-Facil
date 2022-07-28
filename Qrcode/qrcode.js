import { Layout } from "../Layout/layout.js";
import { Autenticador } from "../Infra/Autenticacao/autenticador.js";
import {CartoesManager} from "../Infra/ContaManager/CartoesManager/cartoesManager.js";


var cartaoManager = new CartoesManager();
var autenticador = new Autenticador();
//Mátodo que garante a autenticação do nosso usuário
autenticador.garantirAutenticacao("../Infra/Autenticacao/controllerAutenticacao.php", "../Login/login.html");

var layout = new Layout();

cartaoManager.buscarDadosCartoes("../Infra/ContaManager/controllerCartoesManagaer.php",)

function selectPasse(){
    alert("Pinto");
}


//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");


const select = document.getElementById("OpcaoPasse");
const form = document.getElementById("form");

//Colocando um listener para alterar o comportamento do Form
select.addEventListener("change", function(event){
    event.preventDefault();

    let data = new FormData(form);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "controllerQrcode.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                var numSerie = select.value;
                document.getElementById("imgqrcode").setAttribute("src","./imgQRCode/qrCode"+numSerie+".svg")
            }
        }
    }
});