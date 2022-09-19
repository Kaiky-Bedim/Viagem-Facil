import { Layout } from "../Layout/layout.js";
import { Autenticador } from "../Infra/Autenticacao/autenticador.js";
import { CartoesManager } from "../Infra/ContaManager/CartoesManager/cartoesManager.js";
import { MovimentacoesManager } from "../Infra/ContaManager/MovimentacoesManager/movimentacoesManager.js";

var autenticador = new Autenticador();
//Mátodo que garante a autenticação do nosso usuário
autenticador.garantirAutenticacao("../Infra/Autenticacao/controllerAutenticacao.php", "../Login/login.html");

var layout = new Layout();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//Criando os objetos Manager que são utilizados para exibir alguns dados do usuário na tela
var cartoesManager = new CartoesManager();
var movimentacoesManager = new MovimentacoesManager();

//Recuperando os elementos para exibir dados do usuário
var spanSaldoTotal = document.getElementById("spanSaldoTotal");
var spanUltimaMovimentacao = document.getElementById("spanUltimaMovimentacao");
var spanPassesAtivos = document.getElementById("spanPassesAtivos");
var spanPassesBloqueados = document.getElementById("spanPassesBloqueados");

//Recuperando e exibindo o Saldo Total do Usuário
var saldos = JSON.parse(await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "saldos"));
var cont = 0;
var saldoTotal = 0.0;
if(saldos != null){
    while(saldos[cont] != undefined){
        saldoTotal += parseFloat(saldos[cont]);
        cont++;
    }
    spanSaldoTotal.innerHTML = "R$ " + parseFloat(saldoTotal).toFixed(2);

    //Recuperando e exibindo a Última Movimentação do Usuário
    var movimentacoes = JSON.parse(await movimentacoesManager.buscarDadosCartoes("../Infra/ContaManager/MovimentacoesManager/controllerMovimentacoesManager.php", "dataMovimentacoes"));
    var ultimaMovimentacao = FormataData(movimentacoes[0]);
    spanUltimaMovimentacao.innerHTML = ultimaMovimentacao.slice(0, 10
        );

    //Recuperando a quantidade de Passes Ativos e Bloqueados e exibindo este número na tela
    var situacoes = JSON.parse(await cartoesManager.buscarDadosCartoes("../Infra/ContaManager/CartoesManager/controllerCartoesManager.php", "bloqueados"));
    cont = 0;
    var qtdAtivos = 0;
    var qtdBloqueados = 0;

    while(situacoes[cont] != undefined){
        if(situacoes[cont] == "0"){
            qtdAtivos++;
        }else{
            qtdBloqueados++;
        }
    cont++;
    }

spanPassesAtivos.innerHTML = qtdAtivos;
spanPassesBloqueados.innerHTML = qtdBloqueados;
}else{
    spanSaldoTotal.innerHTML = "R$ 0.00";
    spanUltimaMovimentacao.innerHTML = "XX/XX/XXXX";
    spanPassesAtivos.innerHTML = "0";
    spanPassesBloqueados.innerHTML = "0";
}

//Esta função é responsável por formatar a Data mostrada na tela
function FormataData(data){
    var aux = new Date(data);
    if(aux.getMonth() < 9){
        var dataFormatada = aux.getDate() + "/" + "0" + (aux.getMonth() + 1) + "/" + aux.getFullYear() + " - " + aux.getHours() + ":" + aux.getMinutes() + ":" + aux.getSeconds();
    }else{
        var dataFormatada = aux.getDate() + "/" + (aux.getMonth() + 1) + "/" + aux.getFullYear() + " - " + aux.getHours() + ":" + aux.getMinutes() + ":" + aux.getSeconds();
    }
    return dataFormatada;
}