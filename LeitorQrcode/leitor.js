import { Layout } from "../Layout/layout.js";
import { PopUp } from "../Pop-Ups/popUp.js";

//Objeto Layout
var layout = new Layout();

//Objeto PopUp
var popUp = new PopUp();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

let scanner = new Instascan.Scanner({ video: document.getElementById('preview')});
Instascan.Camera.getCameras().then(function(cameras){
    if(cameras.length > 0){
        scanner.start(cameras[0]);
    }else{
        alert('Não tem camera');
    }

}).catch(function(e){
    console.error(e);
});


scanner.addListener('scan',function(c){
    document.getElementById('text').value=c;

    const form = document.getElementById("form");

    let data = new FormData(form);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "controllerLeitor.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                alert("Foi porra");
            }
        }
    }
    
});

//scanner.addListener('scan',function(c){
    //let httpRequest = new XMLHttpRequest();
    //httpRequest.open("POST", "controllerLogin.php");
    //httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    //httpRequest.send(c);
    //httpRequest.onreadystatechange = function(){
        //if(this.readyState == 4){
            //if(this.status == 200){
                //document.getElementById("text").value = "Realizado com Sucesso";
            //}
        //}
    ///}
//})