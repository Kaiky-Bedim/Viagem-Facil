import { Layout } from "../Layout/layout.js";
import { Autenticador } from "../Infra/Autenticacao/autenticador.js";

var autenticador = new Autenticador();
var numeroSerie = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
var numeroFabrica = Math.floor(Math.random() * (999999999 - 100000000)) + 100000000;
//Mátodo que garante a autenticação do nosso usuário
autenticador.garantirAutenticacao("../Infra/Autenticacao/controllerAutenticacao.php", "../Login/login.html");

//Código para realizar os preenchimentos do cartão com animação
function PreencheCartaoAnimacao(){
        document.getElementById("card-holder-name").innerHTML = numeroSerie;
        document.getElementById("card-number-box").innerHTML = numeroFabrica;
        document.querySelector(".month-input").oninput = () =>{
            document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
    }
}

var layout = new Layout();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//Chamando o código para preencher o cartão com animação
PreencheCartaoAnimacao();


const form = document.getElementById("form");

//Colocando um listener para alterar o comportamento do Form
form.addEventListener("submit", function(event){
    event.preventDefault();

    let data = new FormData(form);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "controllerCadastroPasse.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                VerificaLogin(this.response);
            }else{
                alert("Não foi possível terminar a requisição");
                ResetaSenha();
            }
        }
    }
});