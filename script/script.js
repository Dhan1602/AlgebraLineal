// Variables Globales
sistemaDeEcuaciones = 2; // Si es 2x2, su valor es 2, si es 3x3, su valor es 3, etc

// Interfaz de Usuario //

//Botones de 2x2, 3x3 y 4x4
var botonesSistema = document.querySelectorAll("#elegirSistema button");

// Hacer click en 2x2, 3x3, etc
botonesSistema.forEach(boton => {
    boton.addEventListener("click", () => {
        deseleccionarBotones();
        boton.classList.add("elegido");
        sistemaDeEcuaciones = boton.value
        crearEcuacionesHTML(sistemaDeEcuaciones);
    })
})

// Deseleccionar todos los sistemas (2x2, 3x3, 4x4)
function deseleccionarBotones() {
    botonesSistema.forEach(boton => {
        boton.classList.remove("elegido")
    })
}

// Cargar 2x2 al iniciar la pagina
function alCargar() {
    crearEcuacionesHTML(sistemaDeEcuaciones);
}


function crearEcuacionesHTML(cantidad) {
    let divEcuaciones = document.querySelector("#formEcuaciones");
    divEcuaciones.innerHTML = ""

    for (let i = 0; i < cantidad; i++) {
        const spanEcuacion = document.createElement("span");
        spanEcuacion.classList.add("ecuacion");
        spanEcuacion.innerHTML = "Ecuación " + (i + 1) +
            "<input type='number' class='inputEcuacion x'><span class='incognita'>x</span>" +
            "<input type='number' class='inputEcuacion y '><span class='incognita'>y =</span>" +
            "<input type='number' class='inputEcuacion independiente'>";
        divEcuaciones.append(spanEcuacion);
    }

    const botonCalculo = document.createElement("button");

    // Propiedades del boton de Calcular, id, texto y evento "Click"
    botonCalculo.id = "Calcular";
    botonCalculo.innerText = "Calcular";
    botonCalculo.addEventListener("click", calcularResultados);

    divEcuaciones.append(botonCalculo);

    //Evento "Enter" en los cuadros de texto
    var inputs = divEcuaciones.querySelectorAll(".inputEcuacion");
    inputs.forEach(input => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                calcularResultados();
            }
        });
    });

}


// Código puro //

function calcularResultados() {
    window.location = '#contenedorDeltas'; // La versión movil hace scroll a los resultados

    //Obtener variables necesarias
    todosLosValores = document.querySelectorAll("input");
    let CoeficientesX = [];
    let CoeficientesY = [];
    let Independientes = [];

    todosLosValores.forEach(elemento => {
        if (elemento.classList.contains("x")) {
            CoeficientesX.push(parseFloat(elemento.value));
        } else if (elemento.classList.contains("y")) {
            CoeficientesY.push(parseFloat(elemento.value));
        } else {
            Independientes.push(parseFloat(elemento.value));
        }
    });

    //Calculos

    let delta = (CoeficientesX[0] * CoeficientesY[1]) - (CoeficientesY[0] * CoeficientesX[1]);
    let deltaX = 0
    let deltaY = 0
    let valorX = 0
    let valorY = 0
    

    if (sistemaDeEcuaciones == 2) { //Si el sistema es 2x2
        document.querySelector("#Delta").innerHTML = "&#9651; = " + delta;
        document.querySelector("#DeltaX").innerHTML = "&#9651;x = " + deltaX;
        document.querySelector("#DeltaY").innerHTML = "&#9651;y = " + deltaY;
        document.querySelector("#ValorX").innerHTML = "x = " + valorX;
        document.querySelector("#ValorY").innerHTML = "y = " + valorY;
    };
};