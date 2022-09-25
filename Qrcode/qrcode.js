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


var numSerie = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "numeroSeries");

//O código abaixo verificará se o usuário possui algum cartão Cadastrado, caso não, será mostrada a Div Sem Cartão
var qtdCartoes = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "qtdCartoes");
const form = document.getElementById("divForm");
const divSemCartao = document.getElementById("divSemCartaoCadastrado");
var paginaAtual = 1;
var totalPaginas = 1;
var cartoesMostrando = 0;
var cartoes;
var numSerieCartaoSelecionado = "";
var indice;


//Recuperando os btns para navegar na lista
const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");
const inputPagina = document.getElementById("inputPagina");
const tblCartoes = document.getElementById("tableCartoes");

var ultimoButtonClicado;

if(qtdCartoes > 0){
    form.removeAttribute("hidden");
    PrepararListaCartoes();
}else{
    divSemCartao.removeAttribute("hidden");
}

async function PrepararListaCartoes(){
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

        CriarCamposTabelaCartoes(cartoesMostrando);
    }else{
        cartoesMostrando = qtdCartoes;
        CriarCamposTabelaCartoes(cartoesMostrando);
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

function DeserializarJsonCartoes(data){
    //Este objeto será retornado com todas as informações de todos os cartões
    var cartoes = {
        numeroSerie: [],
        numeroFabrica: [],
        tipoCartao: [],
        situacao: [],
        empresa: [],
        bloqueado: [],
        saldo: [],
        dataExpedicao: []
    };

    //Recuperando o JSON com todos os valores de todos os cartões
    var json = JSON.parse(data);
    
    //Atribuindo os valores de cada um dos campos a seus respectivos espaços no objeto cartoes
    var numerosSerie = json['numeroSerie'].replace(/"/g, "");
    var numerosFabrica = json['numeroFabrica'].replace(/"/g, "");
    var tiposCartao = json['tipoCartao'].replace(/"/g, "");
    var situacoes = json['situacao'].replace(/"/g, "");
    var empresas = json['empresa'].replace(/"/g, "");
    var bloqueados = json['bloqueado'].replace(/"/g, "");
    var saldos = json['saldo'].replace(/"/g, "");
    var datasExpedicao = json['dataExpedicao'].replace(/"/g, "");

    numerosSerie = numerosSerie.slice(1, numerosSerie.length - 1);
    numerosFabrica = numerosFabrica.slice(1, numerosFabrica.length - 1);
    tiposCartao = tiposCartao.slice(1, tiposCartao.length - 1);
    situacoes = situacoes.slice(1, situacoes.length - 1);
    empresas = empresas.slice(1, empresas.length - 1);
    bloqueados = bloqueados.slice(1, bloqueados.length - 1);
    saldos = saldos.slice(1, saldos.length - 1);
    datasExpedicao = datasExpedicao.slice(1, datasExpedicao.length - 1);

    var arrayNumerosSerie = numerosSerie.split(",");
    var arrayNumerosFabrica = numerosFabrica.split(",");
    var arrayTiposCartao = tiposCartao.split(",");
    var arraySituacoes = situacoes.split(",");
    var arrayEmpresas = empresas.split(",");
    var arrayBloqueados = bloqueados.split(",");
    var arraySaldos = saldos.split(",");
    var arrayDatasExpedicao = datasExpedicao.split(",");

    cartoes.numeroSerie = arrayNumerosSerie;
    cartoes.numeroFabrica = arrayNumerosFabrica;
    cartoes.tipoCartao = arrayTiposCartao;
    cartoes.situacao = arraySituacoes;
    cartoes.empresa = arrayEmpresas;
    cartoes.bloqueado = arrayBloqueados;
    cartoes.saldo = arraySaldos;
    cartoes.dataExpedicao = arrayDatasExpedicao;

    var cartoesFinais = {
        numeroSerie: [],
        numeroFabrica: [],
        tipoCartao: [],
        situacao: [],
        empresa: [],
        saldo: [],
        dataExpedicao: []
    };

    for(var i = 0; i < cartoes.numeroSerie.length; i++){
        if(cartoes.bloqueado[i] == 0){
            cartoesFinais.numeroSerie.push(cartoes.numeroSerie[i]);
            cartoesFinais.numeroFabrica.push(cartoes.numeroFabrica[i]);
            cartoesFinais.tipoCartao.push(cartoes.tipoCartao[i]);
            cartoesFinais.situacao.push(cartoes.situacao[i]);
            cartoesFinais.empresa.push(cartoes.empresa[i]);
            cartoesFinais.saldo.push(cartoes.saldo[i]);
            cartoesFinais.dataExpedicao.push(cartoes.dataExpedicao[i]);
        }else{
            qtdCartoes--;
        }
    }
    return cartoesFinais;
}

function CriarCamposTabelaCartoes(qtdCampos){
    for(var cont = 1; cont <= qtdCampos; cont++){
        var trNovo = document.createElement("tr");
        trNovo.id = "tr" + cont;

        document.getElementById("tableCartoes").appendChild(trNovo);
        
        var td1 = document.createElement("td");
        td1.id = "tdNumSerie"+cont;
        document.getElementById("tr" + cont).appendChild(td1);

        var td2 = document.createElement("td");
        td2.id = "tdEmpresa"+cont;
        document.getElementById("tr" + cont).appendChild(td2);

        var td3 = document.createElement("td");
        td3.id = "tdTipoCartao"+cont;
        document.getElementById("tr" + cont).appendChild(td3);

        var td4 = document.createElement("td");
        td4.id = "tdSaldo"+cont;
        document.getElementById("tr" + cont).appendChild(td4);

        var td5 = document.createElement("td");
        td5.id = "tdBtnSelecionar"+cont;
        document.getElementById("tr" + cont).appendChild(td5);
    }

    PreencheLinhasTabela(1, qtdCampos);
}

function PreencheLinhasTabela(pagina, linhas){
    var aux = 6;
    aux = aux - pagina * 5;
    for(var cont = 1; cont <= linhas; cont++){
        document.getElementById("tdNumSerie" + cont).innerHTML = cartoes.numeroSerie[cont - aux];
        document.getElementById("tdEmpresa" + cont).innerHTML = cartoes.empresa[cont - aux];
        document.getElementById("tdTipoCartao" + cont).innerHTML = cartoes.tipoCartao[cont - aux];
        document.getElementById("tdSaldo" + cont).innerHTML = "R$ " + parseFloat(cartoes.saldo[cont - aux]).toFixed(2);
        document.getElementById("tdBtnSelecionar" + cont).innerHTML = "<button class='btn btn-primary btn-sm' aria-pressed='false' id='btnSelecionar" + cont + "' type='button'>Selecionar</button>";
        
        switch(cont) {
            case 1:
                document.getElementById("btnSelecionar1").onclick = function() { ClicaBtnLista(1) };
                break;
            case 2:
                document.getElementById("btnSelecionar2").onclick = function() { ClicaBtnLista(2) };
                break;
            case 3:
                document.getElementById("btnSelecionar3").onclick = function() { ClicaBtnLista(3) };
                break;
            case 4:
                document.getElementById("btnSelecionar4").onclick = function() { ClicaBtnLista(4) };
                break;
            case 5:
                document.getElementById("btnSelecionar5").onclick = function() { ClicaBtnLista(5) };
                break;
            default:
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu um erro inesperado na paginação");
        }

        if(numSerieCartaoSelecionado == cartoes.numeroSerie[cont - aux]){
            var btn = document.getElementById("btnSelecionar" + cont);
            btn.setAttribute("aria-pressed", "true");
            btn.classList.add("cartaoPresionado");
            ultimoButtonClicado = btn;
        }
    }
}

function ClicaBtnLista(cont){
    if(ultimoButtonClicado != undefined && ultimoButtonClicado.id != ("btnSelecionar" + cont)){
        ultimoButtonClicado.setAttribute("aria-pressed", "false");
        ultimoButtonClicado.classList.remove("cartaoPresionado");
    }

    var btnVisualizar = document.getElementById("btnSelecionar" + cont);
    //Voltando os Labels como eram antes

    //É verificado se o botão está presionado ou não, adicionando ou removendo o Número de Série no Input
    if(btnVisualizar.getAttribute("aria-pressed") == "false"){
        btnVisualizar.setAttribute("aria-pressed", "true");
        btnVisualizar.classList.add("cartaoPresionado");
        indice = ((paginaAtual - 1) * 5 + cont) - 1;

        let httpRequest = new XMLHttpRequest();
        numSerie = cartoes.numeroSerie[indice]
        let data = `
            {
            "numeroSerie": "${numSerie}"
            }`;

        httpRequest.open("POST", "controllerQrCode.php");
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(data);
        httpRequest.onreadystatechange = async function()
        {
            if(this.readyState == 4)
            {
                if(this.status == 200)
                {
                    document.getElementById("imgqrcode").setAttribute("src","./imgQRCode/qrCode"+numSerie+".svg")
                }
            }
        }
        
    }else{
        btnVisualizar.setAttribute("aria-pressed", "false");
        btnVisualizar.classList.remove("cartaoPresionado");
    }

    //Setando a nova referência para o último button clicado
    ultimoButtonClicado = btnVisualizar;
}

btnProximo.addEventListener("click", function(){
    btnAnterior.removeAttribute("disabled");
    btnAnterior.classList.replace("btnDesabilitado", "btn-light");
    paginaAtual++;
    var linhas = 5;
    
    //Neste If eu verifico se esta é a última página que será mostrada ou não
    if(paginaAtual == totalPaginas){
        btnProximo.setAttribute("disabled", "true");
        btnProximo.classList.replace("btn-light", "btnDesabilitado");
        console.log(paginaAtual);
        linhas = qtdCartoes - ((paginaAtual - 1) * 5);
        ResetaListaMostrada();
        CriarCamposTabelaCartoes(linhas);
        PreencheLinhasTabela(paginaAtual, linhas);  
    }else{
        PreencheLinhasTabela(paginaAtual, linhas);  
    }
    inputPagina.value = paginaAtual;

    //Alterando a mensagem mostrada embaixo da lista
    var aux = (paginaAtual - 1) * 5 + 1;
    if(paginaAtual == totalPaginas){
        var i = qtdCartoes;
    }else{
        var i = aux + 4;
    }
    document.getElementById("spanMensagem1").innerHTML = aux;
    document.getElementById("spanMensagem3").innerHTML = i;
})

//Esta função é executada toda vez que o button Anterior é clicado
btnAnterior.addEventListener("click", function(){
    btnProximo.removeAttribute("disabled");
    btnProximo.classList.replace("btnDesabilitado", "btn-light");
    paginaAtual--;

    //Neste If eu verifico se esta é a última página que será mostrada ou não
    if(paginaAtual == 1){
        btnAnterior.setAttribute("disabled", "true");
        btnAnterior.classList.replace("btn-light", "btnDesabilitado");
    }

    ResetaListaMostrada();
    CriarCamposTabelaCartoes(5);
    PreencheLinhasTabela(paginaAtual, 5);  

    inputPagina.value = paginaAtual;
    //Alterando a mensagem mostrada embaixo da lista
    var aux = (paginaAtual - 1) * 5 + 1;
    if(paginaAtual == totalPaginas){
        var i = qtdCartoes;
    }else{
        var i = aux + 4;
    }
    document.getElementById("spanMensagem1").innerHTML = aux;
    document.getElementById("spanMensagem3").innerHTML = i;
})

function ResetaListaMostrada(){
    tblCartoes.innerHTML = "";
}
