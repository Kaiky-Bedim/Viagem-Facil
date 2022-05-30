class Login{
    cpf;
    senha;
    xmlHttp;

    validarFormulario(){
        this.cpf = document.getElementById("txtcpf").value;
        this.senha = document.getElementById("txtsenha").value;

        if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest;
        }else{
            xmlHttp = new ActiveXObject("Microsft.XMLHTTP");
        }

        ajax.open("POST", "http://localhost/Viagem-Facil/Login/controllerLogin.php");
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        const json = {
                        cpf: this.cpf,
                        senha: this.senha
        }
        var variaveis = JSON.stringify(json);
        console.log(variaveis)
        var resp = ajax.send(variaveis);
        console.log(resp);
    }
}
var login = new Login();

 function carregarNavBar() {
     const xhttp = new XMLHttpRequest();
     xhttp.onload = function() {
         document.getElementById("divNavBar").innerHTML = this.responseText;
         }
     xhttp.open("GET", "../Layout/head.html", true);
     xhttp.send();
 }

function carregarFoot() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("divFoot").innerHTML = this.responseText;
        }
    xhttp.open("GET", "../Layout/foot.html", true);
    xhttp.send();
}

carregarNavBar();
carregarFoot();