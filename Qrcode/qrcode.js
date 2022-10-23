import { Autenticador } from "../Infra/Autenticacao/autenticador.js";
import { Layout } from "../Layout/layout.js";
import { PopUp } from "../Pop-Ups/popUp.js";
import { CartoesManager } from "../Infra/ContaManager/CartoesManager/cartoesManager.js";
import { UsuarioManager } from "../Infra/ContaManager/UsuarioManager/usuarioManager.js";
import { Formatador } from "../Infra/Formatador/formatador.js";

var autenticador = new Autenticador();
var layout = new Layout();
var cartoesManager = new CartoesManager();
var usuarioManager = new UsuarioManager();
var formatador = new Formatador();
var popUp = new PopUp();

//Mátodo que garante a autenticação do nosso usuário
autenticador.garantirAutenticacao("../Infra/Autenticacao/controllerAutenticacao.php", "../Login/login.html");

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");


var numSerie = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "numeroSeries");
var cartaoEmpresa;

//O código abaixo verificará se o usuário possui algum cartão Cadastrado, caso não, será mostrada a Div Sem Cartão
var qtdCartoes = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "qtdCartoes");
//pega o form
const form = document.getElementById("divForm");
const divSemCartao = document.getElementById("divSemCartaoCadastrado");
//É mudado no evento click das paginas
var paginaAtual = 1;
var totalPaginas = 1;
var cartoesMostrando = 0;
var cartoes;
var numSerieCartaoSelecionado = "";
var indice;
var qtdCartoesBloqueados = 0;
var FileQRCode;

var cartoesBloqueados = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "bloqueados");

for(var cont = 0; cont < cartoesBloqueados.length; cont++){
    if(cartoesBloqueados[cont] == "1"){
        qtdCartoesBloqueados++;
    }
}

//Recuperando os btns para navegar na lista
const btnPDF = document.getElementById("btnPDF");
const btnImage = document.getElementById("btnImage");
const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");
const inputPagina = document.getElementById("inputPagina");
const tblCartoes = document.getElementById("tableCartoes");
const pNenhumCartaoSelecionado = document.getElementById("pNenhumCartaoSelecionado");

var ultimoButtonClicado;

if(qtdCartoes - qtdCartoesBloqueados > 0){
    form.removeAttribute("hidden");
    PrepararListaCartoes();
}else{
    divSemCartao.removeAttribute("hidden");
}

async function PrepararListaCartoes(){
    var json = await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "cartaoJson");
    
    cartoes = DeserializarJsonCartoes(json);
    //Alterando a mensagem mostrada embaixo da lista (altera o numerozin que mostra os passes e coloca aonde ta esse id)
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

        //tira o atributo disable e faz o tbn funciona
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
    //Mostrando cartoes de aux até i (1 até 3, por exemplo)
    document.getElementById("spanMensagem1").innerHTML = aux;
    document.getElementById("spanMensagem3").innerHTML = i;
}

function DeserializarJsonCartoes(data){
    //Este objeto será retornado com todas as informações de todos os cartões (Ira guardar os dados)
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

    //data é o json
    //Recuperando o JSON com todos os valores de todos os cartões
    var json = JSON.parse(data);
    
    //Adiciona no Objeto cartoes la em cima
    cartoes.numeroSerie = json['numeroSerie'];
    cartoes.numeroFabrica = json['numeroFabrica'];
    cartoes.tipoCartao = json['tipoCartao'];
    cartoes.situacao = json['situacao'];
    cartoes.empresa = json['empresa'];
    cartoes.bloqueado = json['bloqueado'];
    cartoes.saldo = json['saldo'];
    cartoes.dataExpedicao = json['dataExpedicao'];

    var cartoesFinais = {
        numeroSerie: [],
        numeroFabrica: [],
        tipoCartao: [],
        situacao: [],
        empresa: [],
        saldo: [],
        dataExpedicao: []
    };

    //Filtra os cartoes se for bloqueado
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
    //qtdCampos == cartoesMostrando
    for(var cont = 1; cont <= qtdCampos; cont++){
        //document.createElement() -> Cria o elemento "tr"
        //.id -> insere um id novo, no caso "tr1"
        var trNovo = document.createElement("tr");
        trNovo.id = "tr" + cont;

        //Adiciona o "trNovo" aonde o id é igual a "tableCartoes" 
        document.getElementById("tableCartoes").appendChild(trNovo);
        
        //Cria os da linha
        var td1 = document.createElement("td");
        td1.id = "tdNumSerie"+cont;
        //Cria o "td" (dado da linha) no mesmo tr (linha)
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
    //linhas == qtdCampos == cartoesMostrando
    var aux = 6;
    aux = aux - pagina * 5;
    //cartoes é uma variavel global
    for(var cont = 1; cont <= linhas; cont++){
        //Adiciona os dados na linha
        document.getElementById("tdNumSerie" + cont).innerHTML = cartoes.numeroSerie[cont - aux];
        document.getElementById("tdEmpresa" + cont).innerHTML = cartoes.empresa[cont - aux];
        document.getElementById("tdTipoCartao" + cont).innerHTML = cartoes.tipoCartao[cont - aux];

        if(cartoes.tipoCartao[cont - aux] == "Idoso"){
            document.getElementById("tdSaldo" + cont).innerHTML = "Ilimitado";
        }else{
            document.getElementById("tdSaldo" + cont).innerHTML = "R$ " + parseFloat(cartoes.saldo[cont - aux]).toFixed(2);
        }
        document.getElementById("tdBtnSelecionar" + cont).innerHTML = "<button class='btn btn-primary btn-sm' aria-pressed='false' id='btnSelecionar" + cont + "' type='button'>Selecionar</button>";
        //Coloca cada numSerie no botao
        indice = ((paginaAtual - 1) * 5 + cont) - 1;
        var numSerie = cartoes.numeroSerie[indice];

        //Botao do QrCode
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
            btn.classList.add("cartaoPresionadoOp1");
            ultimoButtonClicado = btn;
        }
    }
}

//Div do QRCode
const divQrCode = document.getElementById("qrcode");

//Este mutation vai observar quando ocorre uma mudança na Div do QRCode
var observer = new MutationObserver(function(mutations) {
    var mutation = mutations[0];
    if(mutation.target.nodeName == "IMG"){
        mutation.target.removeAttribute("style");
    }
});

function ClicaBtnLista(cont){
    //Variavel indefinida = (não tem valor atribuido)
    if(ultimoButtonClicado != undefined && ultimoButtonClicado.id != ("btnSelecionar" + cont)){
        ultimoButtonClicado.setAttribute("aria-pressed", "false");
        ultimoButtonClicado.classList.remove("cartaoPresionadoOp1");
    }

    var btnVisualizar = document.getElementById("btnSelecionar" + cont);
    //Voltando os Labels como eram antes

    //É verificado se o botão está presionado ou não, adicionando ou removendo o Número de Série no Input
    if(btnVisualizar.getAttribute("aria-pressed") == "false"){
        //o "aria-pressed" de false vai pra true
        btnVisualizar.setAttribute("aria-pressed", "true");
        //Adiciona no "class" o "cartaoPresionado"
        btnVisualizar.classList.add("cartaoPresionadoOp1");
        //Descobre indice do cartao selecionado (talvez fazer so cont - 1)
        indice = ((paginaAtual - 1) * 5 + cont) - 1;
        let httpRequest = new XMLHttpRequest();
        numSerie = cartoes.numeroSerie[indice];
        cartaoEmpresa = cartoes.empresa[indice];
        
        //Formatao o nome da Empresa de forma a possibilitar o envio para o servidor
        cartaoEmpresa = formatador.FormataCaracterEspecialParaTable(cartaoEmpresa);
        var message = numSerie+"/"+cartaoEmpresa;
        divQrCode.innerHTML = "";

        new QRCode("qrcode", {
            text: message,
            width: 306,
            height: 306,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        
        divQrCode.removeChild(divQrCode.children[0]);
        divQrCode.removeAttribute("title");

        const img = divQrCode.children[0];
        img.removeAttribute("style");
        observer.observe(img, { attributes: true});

        btnPDF.removeAttribute("hidden");
        btnImage.removeAttribute("hidden");
        pNenhumCartaoSelecionado.setAttribute("hidden", "true");
        
        btnPDF.addEventListener("dblclick", function(){
            FileQRCode = img.getAttribute("src");
            var doc = new jsPDF();
            doc.setFontSize(20)
            doc.text(35, 25, 'QRCode')
            doc.addImage(FileQRCode, 'PNG', 15, 40, 180, 160)
            doc.save("QRCode.pdf");
        });

        btnImage.addEventListener("dblclick", function(){
            FileQRCode = img.getAttribute("src");
            let fileName = "QRCode.jpg";
            saveAs(FileQRCode, fileName);
        });
    }else{
        //Tira a imagem
        
        var qrcodeImg = document.getElementById("qrcode")
        qrcodeImg.innerHTML = "";   
        var SemImg = document.createElement('img');
        SemImg.setAttribute("id", "SemCartao");
        qrcodeImg.appendChild(SemImg);
        btnVisualizar.setAttribute("aria-pressed", "false");
        btnVisualizar.classList.remove("cartaoPresionadoOp1");
        document.getElementById("SemCartao").setAttribute("src","../Infra/img/Assets/semCartao.png")

        pNenhumCartaoSelecionado.removeAttribute("hidden");
        btnPDF.setAttribute("hidden", "true");
        btnImage.setAttribute("hidden", "true");
    }

    //Setando a nova referência para o último button clicado
    ultimoButtonClicado = btnVisualizar;
}

btnProximo.addEventListener("click", function(){
    btnAnterior.removeAttribute("disabled");
    btnAnterior.classList.replace("btnDesabilitado", "btn-light");
    //Muda pagina
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

var map = L.map('map');
var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: "OSM"}).addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(-23.2432, -45.8884),
        L.latLng(-23.2179, -45.8915)
    ],
}).addTo(map);

/*navigator.geolocation.getCurrentPosition(function(position) {
    plot_map(position.coords.latitude, position.coords.longitude);
});*/
document.getElementById("teste").onclick = function() { 
const teste2 = document.getElementsByClassName('leaflet-routing-alt')[0];
const teste = document.getElementsByClassName('leaflet-routing-container');
while(teste.length > 0){
    teste[0].parentNode.removeChild(teste[0]);
}
    const teste3 = teste2.getElementsByTagName('h3')
    const teste4 = teste3[0].innerHTML
    const teste5 = teste4.split(',')
    console.log(teste5[1]+"/"+teste5[0]);
}