import { Layout } from "../Layout/layout.js";
import { Autenticador } from "../Infra/Autenticacao/autenticador.js";
import { CartoesManager } from "../Infra/ContaManager/CartoesManager/cartoesManager.js";
import { PopUp } from "../Pop-Ups/popUp.js";

var autenticador = new Autenticador();
//Mátodo que garante a autenticação do nosso usuário
autenticador.garantirAutenticacao("../Infra/Autenticacao/controllerAutenticacao.php", "../Login/login.html");

var layout = new Layout();
var cartoesManager = new CartoesManager();
var popUp = new PopUp();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//O código abaixo verificará se o usuário possui algum cartão Cadastrado, caso não, será mostrada a Div Sem Cartão
const qtdCartoes = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "qtdCartoes");
const form = document.getElementById("divForm");
const divSemCartao = document.getElementById("divSemCartaoCadastrado");
var paginaAtual = 1;
var totalPaginas = 1;
var cartoesMostrando = 0;
var cartoes;
var numSerieCartaoSelecionado = "";

//Recuperando os btns para navegar na lista
const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");
const inputPagina = document.getElementById("inputPagina");
const tblCartoes = document.getElementById("tableCartoes");

//Esta variável basicamente guarda a referência para o último button que foi clicado
var ultimoButtonClicado;

if(qtdCartoes > 0){
    form.removeAttribute("hidden");
    PrepararListaCartoes();
}else{
    divSemCartao.removeAttribute("hidden");
}

//Função mãe para mostrar os passes que o usuário possuí na lista de passes
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

    return cartoes;
}

//Função responsável por Criar os Campos da tabela de cartões
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

//Esta função varre linha por linha da tabela de cartões e atribuí os valores necessários
function PreencheLinhasTabela(pagina, linhas){
    var aux = 6;
    aux = aux - pagina * 5;
    for(var cont = 1; cont <= linhas; cont++){
        document.getElementById("tdNumSerie" + cont).innerHTML = cartoes.numeroSerie[cont - aux];
        document.getElementById("tdEmpresa" + cont).innerHTML = cartoes.empresa[cont - aux];
        document.getElementById("tdTipoCartao" + cont).innerHTML = cartoes.tipoCartao[cont - aux];
        document.getElementById("tdSaldo" + cont).innerHTML = cartoes.saldo[cont - aux];
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

//Esta constante se referencia ao input que fica com o valor do Número de Série
const inputNumSerie = document.getElementById("txtPasse");
const inputSaldoAdicionado = document.getElementById("txtSaldoAdicionado");
const inputNovoSaldo = document.getElementById("txtNovoSaldo");
var indice;

//Função executada quando um cartão da lista é selecionado
function ClicaBtnLista(cont){
    if(ultimoButtonClicado != undefined && ultimoButtonClicado.id != ("btnSelecionar" + cont)){
        ultimoButtonClicado.setAttribute("aria-pressed", "false");
        ultimoButtonClicado.classList.remove("cartaoPresionado");
    }

    var btnVisualizar = document.getElementById("btnSelecionar" + cont);
    //Voltando os Labels como eram antes
    document.getElementById("labelSaldoAdicionado").innerHTML = "Saldo a ser Adicionado";
    document.getElementById("spanFormaPagamento").innerHTML = "Forma de Pagamento";

    //É verificado se o botão está presionado ou não, adicionando ou removendo o Número de Série no Input
    if(btnVisualizar.getAttribute("aria-pressed") == "false"){
        btnVisualizar.setAttribute("aria-pressed", "true");
        btnVisualizar.classList.add("cartaoPresionado");

        //Este é o espaço para eu fazer a lógica de selecionar um cartão
        //Adicionando o Número de Série do Cartão selecionado no Form
        indice = ((paginaAtual - 1) * 5 + cont) - 1;
        inputNumSerie.value = cartoes.numeroSerie[indice];
        inputNovoSaldo.value = cartoes.saldo[indice];
        inputSaldoAdicionado.addEventListener("input", function(){
            AtualizaNovoSaldo();
        });

        //Removendo qualquer valor que já existir no campo Saldo a ser Adicionado
        inputSaldoAdicionado.value = "";
        inputSaldoAdicionado.removeAttribute("readonly");

        //Tornando o campo Selecionar Cartão obrigatório
        formaPagamento.setAttribute("required", "true");
        //Este é o espaço para eu fazer a lógica de selecionar um Cartão

        //Recuperando o Número de Série do Cartão
        numSerieCartaoSelecionado = cartoes.numeroSerie[indice];
    }else{
        btnVisualizar.setAttribute("aria-pressed", "false");
        btnVisualizar.classList.remove("cartaoPresionado");
        inputNumSerie.value = "";

        //Caso o botão seja selecionado novamente, tudo sobre ele é retirado do form
        inputSaldoAdicionado.value = "";
        inputSaldoAdicionado.setAttribute("readonly", "true");
        inputNovoSaldo.value = "";
        formaPagamento.removeAttribute("required");

        //Apagando a referência do Cartão que estava selecionado
        numSerieCartaoSelecionado = "";
    }

    //Setando a nova referência para o último button clicado
    ultimoButtonClicado = btnVisualizar;
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

//Os códigos abaixo são para a validação do Formulário de Envio do Pagamento
const formElement = document.getElementById("formPagamento");
const btnPagar = document.getElementById("btnPagar");
const passeSelecionado = document.getElementById("txtPasse");
const formaPagamento = document.getElementById("selectFormaPagamento");
const saldoAdicionado = document.getElementById("txtSaldoAdicionado");
var primeiraTentativa = true;

function ValidaPasseSelecionado(){
    passeSelecionado.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!passeSelecionado.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelPasseSelecionado").innerHTML = "Passe Selecionado*";
            if(passeSelecionado.value == ""){
                passeSelecionado.setCustomValidity("O campo Passe Selecionado é obrigatório");
            }
            return;
        }
        document.getElementById("labelPasseSelecionado").innerHTML = "Passe Selecionado";
    }
}

function ValidaSaldoAdicionado(){
    saldoAdicionado.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!saldoAdicionado.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelSaldoAdicionado").innerHTML = "Saldo a ser Adicionado*";
            if(saldoAdicionado.value == ""){
                saldoAdicionado.setCustomValidity("O campo Saldo a ser Adicionado é obrigatório");
            }
            return;
        }
        document.getElementById("labelSaldoAdicionado").innerHTML = "Saldo a ser Adicionado";
    }
}

function ValidaFormaPagamento(){
    formaPagamento.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!formaPagamento.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("spanFormaPagamento").innerHTML = "Forma de Pagamento*";
            if(formaPagamento.value == ""){
                formaPagamento.setCustomValidity("O campo Forma de Pagamento é obrigatório");
            }
            return;
        }
        document.getElementById("spanFormaPagamento").innerHTML = "Forma de Pagamento";
    }
}

btnPagar.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    primeiraTentativa = false;
    ValidaPasseSelecionado();
    ValidaSaldoAdicionado();
    ValidaFormaPagamento();
}

passeSelecionado.oninput = function(){
    ValidaPasseSelecionado();
}

saldoAdicionado.oninput = function(){
    ValidaSaldoAdicionado();
}

formaPagamento.oninput = function(){
    ValidaFormaPagamento();
}

var novoMaxLength = false;

//Esta função é responsável por interceptar o envio do Form e garantir seu sucesso
formElement.addEventListener("submit", function(event){
    event.preventDefault();
    //Caso nenhum passe tenha sido selecionado, é mostrado um Pop-Up pedindo para que o usuário escolha
    if(passeSelecionado.value == ""){
        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Escolha um cartão para comprar créditos !!!");
        return;
    }

    let httpRequest = new XMLHttpRequest();

    let data = `
        {
          "numeroSerie": "${cartoes.numeroSerie[indice]}",
          "empresa": "${cartoes.empresa[indice]}",
          "saldoAtual": "${cartoes.saldo[indice]}",
          "saldoComprado": "${inputSaldoAdicionado.value}"
        }`;

    httpRequest.open("POST", "controllerPagamento.php");
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(data);
    httpRequest.onreadystatechange = async function(){
        if(this.readyState == 4){
            if(this.status == 200){
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);
                if(this.responseText.includes("Sucesso")){
                    //Caso tudo tenha dado certo, ele atualiza a lista em tempo real
                    var json = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "cartaoJson");
                    cartoes = DeserializarJsonCartoes(json);
                    PreencheLinhasTabela(paginaAtual, qtdCartoes - ((paginaAtual - 1) * 5));
                }else if(this.responseText.includes("Sem conexão") || this.responseText.includes("Fatal erro")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");    
                }
            }else{
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
            }
        }
    }
});

//Este Listener vai garantir que o usuário digite valores corretos no Input do Saldo a ser Adicionado
saldoAdicionado.addEventListener("keydown" , function(event){
    if(event.key == "."){
        if(saldoAdicionado.value.includes(".")){
            event.preventDefault();
            return;
        }

        saldoAdicionado.setAttribute("maxlength", saldoAdicionado.value.length + 1);
        return;
    }

    if(event.key == "Backspace" && saldoAdicionado.value.indexOf(".") != saldoAdicionado.value.length){
        saldoAdicionado.value = saldoAdicionado.value.slice(0, saldoAdicionado.value.length - 1);
        event.preventDefault();
        return;
    }

    if(!saldoAdicionado.value.includes(".")){
        saldoAdicionado.setAttribute("maxlength", "4");
        novoMaxLength = false;
    }else if(!novoMaxLength){
        saldoAdicionado.setAttribute("maxlength", saldoAdicionado.value.indexOf(".") + 3);
        novoMaxLength = true;
    }else{
        if(parseInt(event.key) >= 0 && parseInt(event.key) <=9 && saldoAdicionado.value.length != saldoAdicionado.getAttribute("maxlength")){
            saldoAdicionado.value += event.key;
            event.preventDefault();
        }
    }

    AtualizaNovoSaldo();
});

//Este Listener basicamente vai impedir que o usuário coloco um ponto onde bem entende
saldoAdicionado.addEventListener("keyup" , function(event){
    if(saldoAdicionado.value.indexOf(".") < saldoAdicionado.value.length - 3){
        saldoAdicionado.value = saldoAdicionado.value.replace(".", "");
        return;
    }

    AtualizaNovoSaldo();
});

//Esta função atualiza o campo Novo Saldo
function AtualizaNovoSaldo(){
    if(inputSaldoAdicionado.value == ""){
        inputNovoSaldo.value = cartoes.saldo[indice];
        return;
    }
    //Os saldos são recuperados do Form e do Cartão no Banco
    var saldoAtual = parseFloat(cartoes.saldo[indice]).toFixed(2);
    var saldoAdicionado = parseFloat(inputSaldoAdicionado.value).toFixed(2);
    var novoSaldo = parseFloat(saldoAtual) + parseFloat(saldoAdicionado);
    
    inputNovoSaldo.value = novoSaldo;
}

inputSaldoAdicionado.addEventListener("keyup", function(){
    AtualizaNovoSaldo();
});

inputSaldoAdicionado.addEventListener("keydown", function(){
    AtualizaNovoSaldo();
});
