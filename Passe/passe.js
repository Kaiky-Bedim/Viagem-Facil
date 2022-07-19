import { Autenticador } from "../Infra/Autenticacao/autenticador.js";
import { Layout } from "../Layout/layout.js";
import { PopUp } from "../Pop-Ups/popUp.js";

var autenticador = new Autenticador();
//Mátodo que garante a autenticação do nosso usuário
autenticador.garantirAutenticacao("../Infra/Autenticacao/controllerAutenticacao.php", "../Login/login.html");

var layout = new Layout();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//Função para ir a tela de CadastroPasse (DANDO PROBLEMA AAAAAAAAAAA)

//const buttonCadastroPasse = document.getElementById("CadastrarPasse");
//buttonCadastroPasse.addEventListener("click", function(){
  //  window.location.href = "./CadastroPasse/cadastroPasse.html";
//});

//Não funciona
//function Evt_onLoad(){
   // var divOpcao = document.getElementById("OpcoesPasse");

    //divOpcao.innerHTML="<button type='button' class='btn btn-secondary'>N</button>";
//}

var autenticador = new Autenticador();
var numeroSerie = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
var numeroFabrica = Math.floor(Math.random() * (999999999 - 100000000)) + 100000000;


//Código para realizar os preenchimentos do cartão com animação
function PreencheCartaoAnimacao(){
    document.getElementById("card-holder-name").innerHTML = numeroSerie;
    document.getElementById("card-number-box").innerHTML = numeroFabrica;
    document.querySelector(".month-input").oninput = () =>{
        document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
    }
}

PreencheCartaoAnimacao();


const form = document.getElementById("form");


