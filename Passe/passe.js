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
    qtdCartoes = await SetQuantidadeCartoes();
    if(qtdCartoes == 0 || qtdCartoes == "Erro de servidor"){                
        MostrarDivSemCartao();
    }else{
        document.getElementById("divSemCartao").setAttribute("hidden", "true");
        PrepararListaCartoes();
    }
}

//Função que atribui a quantidade de cartões que o usuário possui a alguma variável
async function SetQuantidadeCartoes(){
    const data = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "qtdCartoes");
    return data;
}

//Função que mostra a mensagem de que não há cartões cadastrados no sistema
function MostrarDivSemCartao(){
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
async function PrepararListaCartoes(){
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

//Esta função deserializa o json que vem de Cartões Manager, para que possa ser usado como Array
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
    if(json == "" || json == null){
        return;
    }
    
    //Atribuindo os valores de cada um dos campos a seus respectivos espaços no objeto cartoes
    cartoes.numeroSerie = json['numeroSerie'];
    cartoes.numeroFabrica = json['numeroFabrica'];
    cartoes.tipoCartao = json['tipoCartao'];
    cartoes.situacao = json['situacao'];
    cartoes.empresa = json['empresa'];
    cartoes.bloqueado = json['bloqueado'];
    cartoes.saldo = json['saldo'];
    cartoes.dataExpedicao = json['dataExpedicao'];

    return cartoes;
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
        td2.id = "tdSituacao"+cont;
        document.getElementById("tr" + cont).appendChild(td2);

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

        var td7 = document.createElement("td");
        td7.id = "tdBtnBloquear"+cont;
        document.getElementById("tr" + cont).appendChild(td7);
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
        document.getElementById("tdSituacao" + cont).innerHTML = cartoes.situacao[cont - aux];
        document.getElementById("tdTipoCartao" + cont).innerHTML = cartoes.tipoCartao[cont - aux];
        document.getElementById("tdEmpresa" + cont).innerHTML = cartoes.empresa[cont - aux];
        if(cartoes.tipoCartao[cont - aux] == "Idoso"){
            document.getElementById("tdSaldo" + cont).innerHTML = "Ilimitado";
        }else{
            document.getElementById("tdSaldo" + cont).innerHTML = "R$ " + parseFloat(cartoes.saldo[cont - aux]).toFixed(2);
        }
        document.getElementById("tdBtnVisualizar" + cont).innerHTML = "<button class='btn btn-primary btn-sm' aria-pressed='false' id='btnVisualizar" + cont + "' type='button'>Vizualizar</button>";
        if(cartoes.bloqueado[cont-aux] == 0){
            document.getElementById("tdBtnBloquear" + cont).innerHTML = "<button class='btn btn-danger btn-sm' id='btnBloquear" + cont + "' type='button'>Bloquear</button>";
        }else if(cartoes.bloqueado[cont-aux] == 1){
            document.getElementById("tdBtnBloquear" + cont).innerHTML = "<button class='btn btn-danger btn-sm' id='btnBloquear" + cont + "' type='button'>Desbloquear</button>";
        }
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

        //Setando as funções para os Buttons de Bloquear
        switch(cont) {
            case 1:
                document.getElementById("btnBloquear1").onclick = function() { BloquearPasse(1) };
                break;
            case 2:
                document.getElementById("btnBloquear2").onclick = function() { BloquearPasse(2) };
                break;
            case 3:
                document.getElementById("btnBloquear3").onclick = function() { BloquearPasse(3) };
                break;
            case 4:
                document.getElementById("btnBloquear4").onclick = function() { BloquearPasse(4) };
                break;
            case 5:
                document.getElementById("btnBloquear5").onclick = function() { BloquearPasse(5) };
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

//Função executada quando um botão da lista é clicado
function ClicaBtnLista(cont){
    if(ultimoButtonClicado != undefined && ultimoButtonClicado.id != ("btnVisualizar" + cont)){
        ultimoButtonClicado.setAttribute("aria-pressed", "false");
        ultimoButtonClicado.classList.remove("cartaoPresionado");
    }

    var btnVisualizar = document.getElementById("btnVisualizar" + cont);

    if(btnVisualizar.getAttribute("aria-pressed") == "false"){
        btnVisualizar.setAttribute("aria-pressed", "true");
        btnVisualizar.classList.add("cartaoPresionado");

        divNenhumCartaoSelecionado.setAttribute("hidden", "true");
        cartaoExposto.removeAttribute("hidden");

        //Recuperando as informações do Nome e do CPF do usuário para mostrar no cartão
        usuarioManager.buscarDadosUsuario("cpf", "../Infra/ContaManager/UsuarioManager/controllerUsuarioManager.php")
            .then(cpf => {
                document.getElementById("spanCpf").innerHTML = FormataCPF(cpf);
            });

        usuarioManager.buscarDadosUsuario("nome", "../Infra/ContaManager/UsuarioManager/controllerUsuarioManager.php")
            .then(nome => {
                document.getElementById("spanNome").innerHTML = nome;
            });
        //Recuperando o valor do índice onde estão todas as informações deste cartão
        var indice = ((paginaAtual - 1) * 5 + cont) - 1;
        
        //Recuperando e trocando o logo da empresa
        var empresa = cartoes.empresa[indice];
        if(empresa == "Maringá do Vale"){
            document.getElementById("imgLogoEmpresa").setAttribute("src", "../Infra/img/LogosEmpresas/LOGO_MARINGA_DO_VALE.png");
        }else if(empresa == "Viação Jacareí"){
            document.getElementById("imgLogoEmpresa").setAttribute("src", "../Infra/img/LogosEmpresas/LOGO_VIAÇÃO_JACAREÍ.png");
        }

        //Recuperando o Número de Série e o Número de Fábrica
        numSerieCartaoSelecionado = cartoes.numeroSerie[indice];
        document.getElementById("divSerieExposta").innerHTML = numSerieCartaoSelecionado;

        var numFabrica = cartoes.numeroFabrica[indice];
        document.getElementById("divFabricaExposta").innerHTML = numFabrica;

        //Recuperando a Data de Expedição do Cartão
        var dataExpedicao = cartoes.dataExpedicao[indice];
        dataExpedicao = dataExpedicao.slice(0, 10);
        var dia = dataExpedicao.slice(8, 10);
        var mes = dataExpedicao.slice(5, 7);
        var ano = dataExpedicao.slice(0, 4);
        document.getElementById("divDataExpedicao").innerHTML = dia + "/" + mes + "/" + ano;

        //Recuperando o tipo do Cartão e colorindo-o de acordo com este valor
        var tipoCartao = cartoes.tipoCartao[indice];
        if(tipoCartao == "Comum"){
            document.getElementById("spanTipoCartaoExposto").innerHTML = "Comum";
            cartaoExposto.classList.remove("cartaoIdoso");
            cartaoExposto.classList.remove("cartaoEstudantil");
            cartaoExposto.classList.add("cartaoComum");
        }else if(tipoCartao == "Estudantil"){
            document.getElementById("spanTipoCartaoExposto").innerHTML = "Estudantil";
            cartaoExposto.classList.remove("cartaoIdoso");
            cartaoExposto.classList.remove("cartaoComum");
            cartaoExposto.classList.add("cartaoEstudantil");
        }else if(tipoCartao == "Idoso"){
            document.getElementById("spanTipoCartaoExposto").innerHTML = "Idoso";
            cartaoExposto.classList.remove("cartaoEstudantil");
            cartaoExposto.classList.remove("cartaoComum");
            cartaoExposto.classList.add("cartaoIdoso");
        }

        //Recuperando o valor do saldo do cartão
        document.getElementById("spanSaldo").innerHTML = "R$ " + parseFloat(cartoes.saldo[indice]).toFixed(2);
    }else{
        cartaoExposto.setAttribute("hidden", "true");
        btnVisualizar.setAttribute("aria-pressed", "false");
        btnVisualizar.classList.remove("cartaoPresionado");
        divNenhumCartaoSelecionado.removeAttribute("hidden");

        //Apagando a referência do Cartão que estava selecionado
        numSerieCartaoSelecionado = "";
    }

    //Setando a nova referência para o último button clicado
    ultimoButtonClicado = btnVisualizar;
}

//Função responsável por bloquear o Cartão clicado
async function BloquearPasse(cont){
    //Descobrindo o indice das informações do cartão
    var indice = ((paginaAtual - 1) * 5 + cont) - 1;
    var bloqueado = cartoes.bloqueado[indice];

    //Imprimindo o PopUp para confirmação do pedido de bloqueio
    if(bloqueado == 0){
        await popUp.imprimirPopUpConfirmacao("../Pop-Ups/popUpConfirmacao.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Deseja mesmo bloquear este Cartão ?");
    }else if(bloqueado == 1){
        await popUp.imprimirPopUpConfirmacao("../Pop-Ups/popUpConfirmacao.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Deseja mesmo desbloquear este Cartão ?");
    }

    const btnConfirmar = document.getElementById("buttonConfirmar");
    btnConfirmar.addEventListener("confirmacao", function(){    
        var indice = ((paginaAtual - 1) * 5 + cont) - 1;

        //Recuperando as informações do Cartão
        var numSerie = cartoes.numeroSerie[indice];
        var numFabrica = cartoes.numeroFabrica[indice];
        var bloqueado = cartoes.bloqueado[indice];

        var data = {'numSerie': numSerie, 'numFabrica': numFabrica, 'bloqueado': bloqueado};

        //Realizando o Post com o Json
        let httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", "BloqueioPasse/controllerBloqueioPasse.php");
        httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        httpRequest.send(JSON.stringify(data));
        httpRequest.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200  && !this.responseText.includes("Fatal error")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);
                    //Atualizando os valores do Array Cartões
                    if(bloqueado == 0){
                        cartoes.bloqueado[indice] = 1;
                    }else if(bloqueado == 1){
                        cartoes.bloqueado[indice] = 0;
                    }

                    //Atualizando a lista em tempo real
                    if(paginaAtual < totalPaginas){
                        var i = 5;
                    }else{
                        var i = qtdCartoes - ((paginaAtual - 1) * 5);
                    }

                    PreencheLinhasTabela(paginaAtual, i);
                }else{
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);
                }
            }
        }
    });
}

//Esta função é executada toda vez que o button Próximo é clicado
btnProximo.addEventListener("click", function(){
    btnAnterior.removeAttribute("disabled");
    btnAnterior.classList.replace("btnDesabilitado", "btn-light");
    paginaAtual++;
    var linhas = 5;

    //Neste If eu verifico se esta é a última página que será mostrada ou não
    if(paginaAtual == totalPaginas){
        btnProximo.setAttribute("disabled", "true");
        btnProximo.classList.replace("btn-light", "btnDesabilitado");
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

//Este listener de evento verifica toda vez que o input hidden do HTML for modificado, o que significa
//que o usuário cadastrou novos cartões e a lista precisa ser atualizada
const inputAtualiza = document.getElementById("inputAtualizaLista");

//Este Observer fica observando o input até seu valor ser mudado
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.type == "attributes" && mutation.attributeName == "value"){
            //Caso o input Hidden esteja com o valor Desatualizada, a lista é atualizada em tempo real
            if(inputAtualiza.value == "Desatualizada"){
                //A página mostrada retorna para a primeira página
                btnProximo.classList.replace("btn-light", "btnDesabilitado");
                btnProximo.setAttribute("disabled", "true");
                btnAnterior.classList.replace("btn-light", "btnDesabilitado");
                btnAnterior.setAttribute("disabled", "true");
                paginaAtual = 1;
                inputPagina.value = paginaAtual;
                ResetaListaMostrada();
                RenderizarPagina();
                inputAtualiza.value == "Atualizada";
            }
        }
    });
   });
   
observer.observe(inputAtualiza, {attributes: true});

//Função para formatar CPF
function FormataCPF(cpf){
    return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6, 9) + "-" + cpf.slice(9, 11);
}