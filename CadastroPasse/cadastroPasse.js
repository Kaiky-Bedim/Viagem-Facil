import { Layout } from "../Layout/layout.js";

//Código para realizar os preenchimentos do cartão com animação
function PreencheCartaoAnimacao(){
    document.querySelector(".card-number-input").oninput = () =>{
        document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
    }
    
    document.querySelector(".card-holder-input").oninput = () =>{
        document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
    }
    
    document.querySelector(".month-input").oninput = () =>{
        document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
    }
    
    document.querySelector(".year-input").oninput = () =>{
        document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
    }
    
    document.querySelector(".cvv-input").oninput = () =>{
        document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
    }
}

var layout = new Layout();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//Chamando o código para preencher o cartão com animação
PreencheCartaoAnimacao();
