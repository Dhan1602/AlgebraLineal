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
        sistemaDeEcuaciones = boton.value;
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
        if (cantidad == 2) {
            spanEcuacion.innerHTML = "Ecuación " + (i + 1) +
                "<input type='number' class='inputEcuacion x'><span class='incognita'>x</span>" +
                "<input type='number' class='inputEcuacion y '><span class='incognita'>y =</span>" +
                "<input type='number' class='inputEcuacion independiente'>";
        } else if (cantidad == 3) {
            spanEcuacion.classList.add("ecuacionTres");
            spanEcuacion.innerHTML = "Ecuación " + (i + 1) +
                "<input type='number' class='inputEcuacion x'><span class='incognita'>x</span>" +
                "<input type='number' class='inputEcuacion y '><span class='incognita'>y</span>" +
                "<input type='number' class='inputEcuacion z '><span class='incognita'>z =</span>" +
                "<input type='number' class='inputEcuacion independiente'>";
        }
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

    //Mostrar "Z" si el sistema es 3x3 y ocultar si es 2X2
    if (cantidad == 2) {
        document.querySelectorAll(".ValorZ").forEach(cuadro => {
            cuadro.classList.add("tres");
        })
    } else if (cantidad == 3) {
        document.querySelectorAll(".ValorZ").forEach(cuadro => {
            cuadro.classList.remove("tres");
        })
    }

}

function validarInputVacios(inputs) {
    var vacios = false;
    inputs.forEach(inpt => {
        if (inpt.value.trim() == "") {
            vacios = true;
        }
    })
    return vacios;
}


// Código puro //

function calcularResultados() {
    window.location = '#contenedorDeltas'; // La versión movil hace scroll a los resultados


    //Obtener variables necesarias
    todosLosValores = document.querySelectorAll("input");
    let CoeficientesX = [];
    let CoeficientesY = [];
    let CoeficientesZ = [];
    let Independientes = [];

    var inputVacios = validarInputVacios(todosLosValores); // Validar que no haya ningun campo de texto vacio

    // Si no estan vacios los campos de texto
    if (!inputVacios) {
        todosLosValores.forEach(elemento => {
            if (elemento.classList.contains("x")) {
                CoeficientesX.push(parseFloat(elemento.value));
            } else if (elemento.classList.contains("y")) {
                CoeficientesY.push(parseFloat(elemento.value));
            } else if (elemento.classList.contains("z")) {
                CoeficientesZ.push(parseFloat(elemento.value));
            } else {
                Independientes.push(parseFloat(elemento.value));
            }
        });



        if (sistemaDeEcuaciones == 2) { //Si el sistema es 2x2

            // Calculos 2x2

            let delta = (CoeficientesX[0] * CoeficientesY[1]) - (CoeficientesY[0] * CoeficientesX[1]);
            let deltaX = (Independientes[0] * CoeficientesY[1]) - (CoeficientesY[0] * Independientes[1]);
            let deltaY = 0;
            let valorX = (deltaX / delta);
            let valorY = 0;

            mostrarResultados(delta, deltaX, deltaY, valorX, valorY);

        } else if (sistemaDeEcuaciones == 3) { // Si el sistema es 3x3

            // Calculos 3x3
            var matrizDeltas = generarMatriz(CoeficientesX, CoeficientesY, CoeficientesZ);
            let delta = multiplicarDiagonales(matrizDeltas);

            matrizDeltas = generarMatriz(Independientes, CoeficientesY, CoeficientesZ);
            let deltaX = multiplicarDiagonales(matrizDeltas);

            let deltaY = 0;

            let deltaZ = 0;

            let valorX = deltaX / delta;

            let valorY = 0;

            let valorZ = 0;

            mostrarResultados(delta, deltaX, deltaY, valorX, valorY, deltaZ, valorZ);

        };
    } else {
        alert("No debe dejar ningún campo vacío")
    }
};

function generarMatriz(columna0, columna1, columna2) {
    return [
        [columna0[0], columna1[0], columna2[0]],
        [columna0[1], columna1[1], columna2[1]],
        [columna0[2], columna1[2], columna2[2]]
    ];
}

function multiplicarDiagonales(matriz) {
    let resultado1 = matriz[0][0] * matriz[1][1] * matriz[2][2] +
                     matriz[1][0] * matriz[2][1] * matriz[0][2] +
                     matriz[2][0] * matriz[0][1] * matriz[1][2];

    let resultado2 = matriz[0][2] * matriz[1][1] * matriz[2][0] +
                     matriz[1][2] * matriz[2][1] * matriz[0][0] +
                     matriz[2][2] * matriz[0][1] * matriz[1][0];

    return resultado1 - resultado2;
}

function mostrarResultados(delta, deltaX, deltaY, valorX, valorY, deltaZ, valorZ) {
    document.querySelector("#Delta").innerHTML = `&#9651; = ${delta}`;
    document.querySelector("#DeltaX").innerHTML = `&#9651;x = ${deltaX}`;
    document.querySelector("#DeltaY").innerHTML = `&#9651;y = ${deltaY}`;
    document.querySelector("#ValorX").innerHTML = `x = ${valorX}`;
    document.querySelector("#ValorY").innerHTML = `y = ${valorY}`;
    if (valorZ !== undefined) {
        document.querySelector("#ValorZ").innerHTML = `z = ${valorZ}`;
        document.querySelector("#DeltaZ").innerHTML = `&#9651;z = ${deltaZ}`;
    }
    validarSoluciones(delta, deltaX, deltaY);
}

function validarSoluciones(delta, deltaX, deltaY) {
    let mensaje = "<b>El sistema es consistente y tiene una única solución</b>";
    if (delta === 0) {
        if (deltaX === 0 && deltaY === 0) {
            mensaje = "<b>El sistema es consistente y tiene infinitas soluciones</b>";
        } else {
            mensaje = "<b>El sistema es inconsistente y no tiene solución</b>";
        }
    }
    document.querySelector("#Nota").innerHTML = mensaje;
}
