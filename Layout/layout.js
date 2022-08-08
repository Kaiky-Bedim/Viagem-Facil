import { UsuarioManager } from "../Infra/ContaManager/UsuarioManager/usuarioManager.js";
import { PopUp } from '../Pop-Ups/popUp.js';

//Classe Layout, aqui podemos definir todas as interfaces que serão usadas por várias telas,
//como a NavBar e o Footer
export class Layout{

    //Método que carrega a NavBar no local da Div com id = divNavBar
    carregarNavBar(urlHead, urlCSS) {
        var usuarioManager = new UsuarioManager();
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            document.getElementById("divNavBar").innerHTML = this.responseText;
            document.getElementById("css").setAttribute("href", urlCSS);
            var autenticado = window.sessionStorage.getItem("autenticado");

            //Verifica se o usuário já está autenticado, caso não esteja, limita os links da navBar
            if(autenticado != "true"){
                document.getElementById("aImg").setAttribute("href", "");
                document.getElementById("aQrCode").className = " escondido";
                document.getElementById("aPagamento").className = " escondido";
                document.getElementById("aPasse").className = " escondido";
                document.getElementById("btnLogout").className = " escondido";
            }else{
                //O código abaixo trabalha com promises e com requisições assíncronas !!!
                usuarioManager.buscarDadosUsuario("nome", "../Infra/ContaManager/UsuarioManager/controllerUsuarioManager.php")
                .then(nome => {
                    document.getElementById("divCumprimento").innerText = "Olá, " + nome + " !";
                });

                //Código para o botão LogOut
                var popUp = new PopUp();
                document.getElementById("btnLogout").addEventListener("click", function(){
                    let httpRequest = new XMLHttpRequest();
                    httpRequest.open('GET', '../Infra/Autenticacao/controllerLogout.php');
                    httpRequest.send();
                    httpRequest.onreadystatechange = function(){
                        if(this.readyState == 4){
                            if(this.status == 200){
                                if(this.response == 'Sucesso'){
                                    //Removendo as sessions no lado do navegador
                                    window.sessionStorage.setItem('autenticado', 'false');
                                    window.location.href = '../Login/login.html';
                                }else{
                                    popUp.imprimirPopUp('../Pop-Ups/popUp.html', '../Pop-Ups/stylePopUp.css', 'divPopUp', this.response);
                                }
                            }else{
                                popUp.imprimirPopUp('../Pop-Ups/popUp.html', '../Pop-Ups/stylePopUp.css', 'divPopUp', 'Não foi possível terminar a requisição');
                            }
                        }
                    }
                });
            }
        }
        xhttp.open("GET", urlHead, true);
        xhttp.send();
    }
   
    //Método que carrega o Foot no local da Div com id = divFoot
    carregarFoot(urlFoot, urlCSS) {
       const xhttp = new XMLHttpRequest();
       xhttp.onload = function() {
            document.getElementById("divFoot").innerHTML = this.responseText;
            document.getElementById("css").setAttribute("href", urlCSS);

            //Este código abaixo deixa o Footer Responsivo, o observer fica de olho para ver se houve mudanças no HTML,
            //se isso ocorrer, ele vê o tamanho da página e posiciona o Footer de acordo
            function sizeOfThings(){
                let body = document.body, html = document.documentElement;
                let docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

                const divMainFooter = document.getElementById("divMainFooter");
                const rowFooter = document.getElementById("rowFooter");

                //Verifica o tamanho da tela para decidir a situação do Footer
                if(docHeight > 680 && !rowFooter.classList.contains("divContentFootRelative")){
                    divMainFooter.classList.remove("divContentFootAbsolute");
                    rowFooter.classList.add("divContentFootRelative");
                }

                if(docHeight < 680 && rowFooter.classList.contains("divContentFootRelative")){
                    divMainFooter.classList.add("divContentFootAbsolute");
                    rowFooter.classList.remove("divContentFootRelative");
                }
            };
            sizeOfThings();
            
            //Este é o observer que vigia o HTML.Body
            var observer = new MutationObserver(function(mutations, observer) {
                sizeOfThings();
            });

            observer.observe(document.body, {
            subtree: true,
            attributes: true
            });

        }

    xhttp.open("GET", urlFoot, true);
    xhttp.send();
   }
}
