// Variables Globales
    sistemaDeEcuaciones = 2; // Si es 2x2, su valor es 2, si es 3x3, su valor es 3, etc
    var todosLosValores = document.querySelectorAll("input")

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

    // Cargar la cantidad de ecuaciones dependiendo de la elección del sistema

    var ecuacionHTML = "<span class='ecuacion'>Ecuación 1" +
        "<input type='number' class='inputEcuacion' ><span class='incognita'>x</span>" +
        "<input type='number' class='inputEcuacion' ><span class='incognita'>y =</span>" +
        "<input type='number' class='inputEcuacion' >" +
        "</span> "

    // Cargar 2x2 al iniciar la pagina
    function alCargar() {
        crearEcuacionesHTML(2); 
    }


    function crearEcuacionesHTML(cantidad) {
        let divEcuaciones = document.querySelector("#formEcuaciones");
        divEcuaciones.innerHTML = ""

        for (let i = 0; i < cantidad; i++) { 
            const spanEcuacion = document.createElement("span");
            spanEcuacion.classList.add("ecuacion");
            spanEcuacion.innerHTML = "Ecuación " + (i + 1) +
                                     "<input type='number' class='inputEcuacion'><span class='incognita'>x</span>" +
                                     "<input type='number' class='inputEcuacion'><span class='incognita'>y =</span>" +
                                     "<input type='number' class='inputEcuacion'>";
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

    function calcularResultados(){
        window.location='#contenedorDeltas'; // La versión movil hace scroll a los resultados
        todosLosValores = document.querySelectorAll("input");
        if (sistemaDeEcuaciones == 2) {
            document.querySelector("#Delta").innerHTML = "&#9651; = " + + ((parseInt(todosLosValores[0].value)*parseInt(todosLosValores[4].value))-(parseInt(todosLosValores[1].value)*parseInt(todosLosValores[3].value)))
        }
    };