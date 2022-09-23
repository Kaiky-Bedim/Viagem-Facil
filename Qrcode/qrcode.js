import { Autenticador } from "../Infra/Autenticacao/autenticador.js";
import { Layout } from "../Layout/layout.js";
import { PopUp } from "../Pop-Ups/popUp.js";
import { CartoesManager } from "../Infra/ContaManager/CartoesManager/cartoesManager.js";
import { UsuarioManager } from "../Infra/ContaManager/UsuarioManager/usuarioManager.js";

var autenticador = new Autenticador();
var layout = new Layout();
var cartoesManager = new CartoesManager();
var usuarioManager = new UsuarioManager();
var popUp = new PopUp();

//Mátodo que garante a autenticação do nosso usuário
autenticador.garantirAutenticacao("../Infra/Autenticacao/controllerAutenticacao.php", "../Login/login.html");

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");



var qtdCartoes;

//Função executada quando a página é carregada
window.onload = function(){
    RenderizarPagina();
}

async function RenderizarPagina(){
    qtdCartoes = await SetQuantidadeCartoesQrcode();
    if(qtdCartoes == 0 || qtdCartoes == "Erro de servidor"){                
        MostrarDivSemCartaoQrcode();
    }else{
        document.getElementById("divSemCartao").setAttribute("hidden", "true");
        PrepararListaCartoesQrcode();
    }
}

//Função que atribui a quantidade de cartões que o usuário possui a alguma variável
async function SetQuantidadeCartoesQrcode(){
    const data = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "qtdCartoes");
    return data;
}

//Função que mostra a mensagem de que não há cartões cadastrados no sistema
function MostrarDivSemCartaoQrcode(){
    document.getElementById("divSemCartao").removeAttribute("hidden");
}


//Recuperando os btns para navegar na lista
const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");
const inputPagina = document.getElementById("inputPagina");
const tblCartoes = document.getElementById("tableCartoes");
const divNenhumCartaoSelecionado = document.getElementById("divSemCartaoSelecionado");
var paginaAtual = 1;
var totalPaginas = 1;
var cartoesMostrando = 0;
var cartoes;
var numSerieCartaoSelecionado = "";


//Função mãe para mostrar os passes que o usuário possuí na lista de passes
async function PrepararListaCartoesQrcode(){
    if(numSerieCartaoSelecionado == ""){
        divNenhumCartaoSelecionado.removeAttribute("hidden");
    }

    var json = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "cartaoJson");
    
    cartoes = DeserializarJsonCartoes(json);
    
    //Alterando a mensagem mostrada embaixo da lista
    document.getElementById("spanMensagem2").innerHTML = qtdCartoes

    if(qtdCartoes > 5){
        cartoesMostrando = 5;

        //Descobrindo quantas página de cartões existirão
        var value = qtdCartoes / 5;
        if(qtdCartoes % 5 != 0){
            totalPaginas = Math.ceil(value);
        }else{
            totalPaginas = value;
        }

        btnProximo.classList.replace("btnDesabilitado", "btn-light");
        btnProximo.removeAttribute("disabled");

        CriarCamposTabelaCartoesQrcode(cartoesMostrando);
    }else{
        cartoesMostrando = qtdCartoes;
        CriarCamposTabelaCartoesQrcode(cartoesMostrando);
    }

    //Alterando a mensagem mostrada embaixo da lista
    var aux = (paginaAtual - 1) * 5 + 1;
    if(paginaAtual == totalPaginas){
        var i = qtdCartoes;
    }else{
        var i = aux + 4;
    }
    document.getElementById("spanMensagem1").innerHTML = aux;
    document.getElementById("spanMensagem3").innerHTML = i;
}

//Esta função deserializa o json que vem de Cartões Manager, para que possa ser usado como Array
function DeserializarJsonCartoes(data){
    //Este objeto será retornado com todas as informações de todos os cartões
    var cartoes = {
        numeroSerie: [],
        tipoCartao: [],
        empresa: [],
        saldo: []
    };

    //Recuperando o JSON com todos os valores de todos os cartões
    var json = JSON.parse(data);
    
    //Atribuindo os valores de cada um dos campos a seus respectivos espaços no objeto cartoes
    var numerosSerie = json['numeroSerie'].replace(/"/g, "");
    var tiposCartao = json['tipoCartao'].replace(/"/g, "");
    var empresas = json['empresa'].replace(/"/g, "");
    var saldos = json['saldo'].replace(/"/g, "");

    numerosSerie = numerosSerie.slice(1, numerosSerie.length - 1);
    tiposCartao = tiposCartao.slice(1, tiposCartao.length - 1);
    empresas = empresas.slice(1, empresas.length - 1);
    saldos = saldos.slice(1, saldos.length - 1);

    var arrayNumerosSerie = numerosSerie.split(",");
    var arrayTiposCartao = tiposCartao.split(",");
    var arrayEmpresas = empresas.split(",");
    var arraySaldos = saldos.split(",");

    cartoes.numeroSerie = arrayNumerosSerie;
    cartoes.tipoCartao = arrayTiposCartao;
    cartoes.empresa = arrayEmpresas;
    cartoes.saldo = arraySaldos;

    return cartoes;
}




function CriarCamposTabelaCartoesQrcode(qtdCampos){
    for(var cont = 1; cont <= qtdCampos; cont++){
        var trNovo = document.createElement("tr");
        trNovo.id = "tr" + cont;

        document.getElementById("tableCartoes").appendChild(trNovo);
        
        var td1 = document.createElement("td");
        td1.id = "tdNumSerie"+cont;
        document.getElementById("tr" + cont).appendChild(td1);

        var td3 = document.createElement("td");
        td3.id = "tdTipoCartao"+cont;
        document.getElementById("tr" + cont).appendChild(td3);

        var td4 = document.createElement("td");
        td4.id = "tdEmpresa"+cont;
        document.getElementById("tr" + cont).appendChild(td4);

        var td5 = document.createElement("td");
        td5.id = "tdSaldo"+cont;
        document.getElementById("tr" + cont).appendChild(td5);

        var td6 = document.createElement("td");
        td6.id = "tdBtnVisualizar"+cont;
        document.getElementById("tr" + cont).appendChild(td6);
    }

    PreencheLinhasTabela(1, qtdCampos);
}


const cartaoExposto = document.getElementById("divCartaoExposto");
//Esta variável basicamente guarda a referência para o último button que foi clicado
var ultimoButtonClicado;

//Esta função varre linha por linha da tabela de cartões e atribuí os valores necessários
function PreencheLinhasTabela(pagina, linhas){
    var aux = 6;
    aux = aux - pagina * 5;
    for(var cont = 1; cont <= linhas; cont++){
        document.getElementById("tdNumSerie" + cont).innerHTML = cartoes.numeroSerie[cont - aux];
        document.getElementById("tdTipoCartao" + cont).innerHTML = cartoes.tipoCartao[cont - aux];
        document.getElementById("tdEmpresa" + cont).innerHTML = cartoes.empresa[cont - aux];
        document.getElementById("tdSaldo" + cont).innerHTML = "R$ " + parseFloat(cartoes.saldo[cont - aux]).toFixed(2);
        document.getElementById("tdBtnVisualizar" + cont).innerHTML = "<button class='btn btn-primary btn-sm' aria-pressed='false' id='btnVisualizar" + cont + "' type='button'>Vizualizar</button>";
        
        switch(cont) {
            case 1:
                document.getElementById("btnVisualizar1").onclick = function() { ClicaBtnLista(1) };
                break;
            case 2:
                document.getElementById("btnVisualizar2").onclick = function() { ClicaBtnLista(2) };
                break;
            case 3:
                document.getElementById("btnVisualizar3").onclick = function() { ClicaBtnLista(3) };
                break;
            case 4:
                document.getElementById("btnVisualizar4").onclick = function() { ClicaBtnLista(4) };
                break;
            case 5:
                document.getElementById("btnVisualizar5").onclick = function() { ClicaBtnLista(5) };
                break;
            default:
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu um erro inesperado na paginação");
        }

        if(numSerieCartaoSelecionado == cartoes.numeroSerie[cont - aux]){
            var btn = document.getElementById("btnVisualizar" + cont);
            btn.setAttribute("aria-pressed", "true");
            btn.classList.add("cartaoPresionado");
            ultimoButtonClicado = btn;
        }
    }
}














var numSerie = await cartaoManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "numeroSeries");
console.log(numSerie);


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
                if (!(numSerie == "...")){
                    document.getElementById("imgqrcode").setAttribute("src","./imgQRCode/qrCode"+numSerie+".svg")
                }else{
                    document.getElementById("imgqrcode").setAttribute("src","./imgQRCode/fundobranco.png")
                }
            }
        }
    }
});