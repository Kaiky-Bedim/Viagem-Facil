//Classe Layout, aqui podemos definir todas as interfaces que serão usadas por várias telas,
//como a NavBar e o Footer
export class Layout{
    //Método que carrega a NavBar no local da Div com id = divNavBar
    carregarNavBar(urlHead, urlCSS) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            document.getElementById("divNavBar").innerHTML = this.responseText;
            document.getElementById("css").setAttribute("href", urlCSS);
            }
        xhttp.open("GET", urlHead, true);
        xhttp.send();
    }
   
    //Método que carrega o Foot no local da Div com id = divFoot
   carregarFoot(urlFoot, urlCSS) {
       const xhttp = new XMLHttpRequest();
       xhttp.onload = function() {
           document.getElementById("divFoot").innerHTML = this.responseText;
           }
       xhttp.open("GET", urlFoot, true);
       xhttp.send();
   }
}