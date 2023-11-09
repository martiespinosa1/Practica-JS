// Definir la función para generar un número aleatorio
function generarNumeroAleatorio() {
    // Generar un número aleatorio entre 0 y 99999
    var numeroAleatorio = Math.floor(Math.random() * 100000);
    // Rellenar con ceros al inicio si el número tiene menos de 5 cifras
    numeroAleatorio = numeroAleatorio.toString().padStart(5, '0');
    return numeroAleatorio;
}

// Llamar a la función generarNumeroAleatorio cuando se cargue la página
document.addEventListener("DOMContentLoaded", function() {
    var numeroRandom = generarNumeroAleatorio();
    numerorandomSplit = numeroRandom.split("")
    console.log(numeroRandom); // imprime el numeroRandom por consola
});

// inicializa intents y numerosCorrectes a 0
var intents = 0;
var numerosCorrectes = 0

function comprobar() {
    if (document.getElementById("numUsuari").value.length === 5) {
        numerosCorrectes = 0
        if (intents < 5) {
            var numUsuari = document.getElementById("numUsuari").value;
            numUsuariSplit = numUsuari.split('');
            for (let i = 0; i < 5; i++) {
              setTimeout(function(){ // comprueba cada numero con un delay de 200ms entre cada una
                const newdiv = document.createElement("div");
                newdiv.className = "newdiv";
                document.querySelector("main").appendChild(newdiv);
                newdiv.classList.add("newdiv");
                newdiv.innerHTML = numUsuariSplit[i];
                
                // mira si el numero es correcto o si esta pero no en su sitio
                if (numUsuariSplit[i] === numerorandomSplit[i]) {
                  newdiv.style.backgroundColor = "#00cd00";
                  numerosCorrectes++;
                } else {
                  for (let j = 0; j < 5; j++) {
                    if (numUsuariSplit[i] === numerorandomSplit[j]) {
                      newdiv.style.backgroundColor = "#ffd731";
                    }
                  }
                }
                
                // Add fade-in effect
                newdiv.style.opacity = 0;
                newdiv.style.transition = "opacity 0.5s ease";
                setTimeout(function() {
                  newdiv.style.opacity = 1;
                }, 100);
              }, i * 200);
            }
            // borra el contenido de numUsuari, le pone el foco e incrementa el contador de intents
            document.getElementById("numUsuari").value = "";
            document.getElementById("numUsuari").focus();
            intents++;
          }
        
          // comprueba cuantos numeros correctos hay
          for (let i = 0; i < 5; i++) {
            if (numUsuariSplit[i] === numerorandomSplit[i]) numerosCorrectes++;            
          }

        
        if (numerosCorrectes === 5) {
            // da mensaje de vicoria, escribe el numero el los divs de arriba y desactiba el boton comprobar
            document.getElementById("rojo").innerHTML = "¡¡¡HAS GANADO!!!" 
            document.getElementById("rojo").style.backgroundColor = "#00cd00"    
            intents = 5        
            
            const divs = document.querySelectorAll("#CODIGO div");
            for (let k = 0; k < divs.length; k++) {
                divs[k].innerHTML = numerorandomSplit[k];
            }          
            document.getElementById("numUsuari").value = ""
            document.querySelector("button").disabled = true

        } else { // informa de por que intento va
            switch (intents) {
                case 1: {
                    document.getElementById("rojo").innerHTML = "Segundo intento, suerte!" 
                    break
                } case 2: {
                    document.getElementById("rojo").innerHTML = "Tercer intento, suerte!"
                    break
                } case 3: {
                    document.getElementById("rojo").innerHTML = "Cuarto intento, suerte!"
                    break
                } case 4: {
                    document.getElementById("rojo").innerHTML = "Quinto y último intento, surte!"
                    break
                } default: document.getElementById("rojo").innerHTML = "HAS PERDIDO"        
            }
        }
    } else document.getElementById("rojo").innerHTML = "Alto, ¡tienes que entrar 5 números!"    
}
