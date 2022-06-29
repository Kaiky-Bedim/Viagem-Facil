import { Layout } from "../Layout/layout.js";

//Objeto Layout
var layout = new Layout();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//Códigos para validar o formulário
document.getElementById('cpf').oninvalid = function() {
    //Remove mensagens de erro antigas
    this.setCustomValidity("");
  
    //Reexecuta validação
    if (!this.validity.valid) {
        //Se inválido, coloca mensagem de erro
        if(document.getElementById('cpf').value == ""){
            document.getElementById("labelCpf").innerHTML = "CPF*";
            this.setCustomValidity("O campo CPF é obrigatório");
        }else{
            document.getElementById("labelCpf").innerHTML = "CPF*";
            this.setCustomValidity("Um CPF válido deve possuir 11 dígitos");
        }
    }
  };

  document.getElementById('senha').oninvalid = function() {
    //Remove mensagens de erro antigas
    this.setCustomValidity("");
  
    //Reexecuta validação
    if (!this.validity.valid) {
        //Se inválido, coloca mensagem de erro
        document.getElementById("labelSenha").innerHTML = "Senha*";
        this.setCustomValidity("O campo Senha é obrigatório");
    }
  };
  //Códigos de validação dos formulários terminam aqui