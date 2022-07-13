//Classe Layout, aqui podemos definir todas as interfaces que serão usadas por várias telas,
//como a NavBar e o Footer
export class Layout{
    //Método que carrega a NavBar no local da Div com id = divNavBar
    carregarNavBar(urlHead, urlCSS) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            document.getElementById("divNavBar").innerHTML = this.responseText;
            document.getElementById("css").setAttribute("href", urlCSS);
            var autenticado = window.sessionStorage.getItem("autenticado");

            //Verifica se o usuário já está autenticado, caso não esteja, limita os links da navBar
            if(autenticado != "true"){
                document.getElementById("aQrCode").className = " escondido";
                document.getElementById("aPagamento").className = " escondido";
                document.getElementById("aPasse").className = " escondido";
                document.getElementById("btnLogout").className = " escondido";
                document.getElementById("divButtonDropdown").className = " escondido";
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
           }
       xhttp.open("GET", urlFoot, true);
       xhttp.send();
   }
}
