
const preguntaDinamica = document.getElementById("preguntaDinamica");
const botonesDeRespuesta = document.getElementById("botonesDeRespuesta")
const nextButton = document.getElementById("next-btn")
const imagenPregunta = document.getElementById("imagen")
let marcadorPreguntaActual = 0;
let puntuacionActual = 0;

function showAlert(){
    swal({
        className: "swal",
        icon: "info",
        title: '¿Crees ser un experto en futbol?',
        text: "¡Lo averiguaremos! \n Por favor, ingresa tu nombre",
        content: {
            element: "input",
            attributes: {
              placeholder: "Ingrese su nombre",
            },
          },
        button: "¡Vamos a empezar!",
        
      })
      .then((nombreUsuario) => {
        swal(`¡Bienvenido ${usuarioNombre} !`);
        sessionStorage.setItem(`NombreDelUsuario`,nombreUsuario)
      });
      
}
function iniciarQuiz(){ //Esta función sirve para iniciar el Quiz
    showAlert();
    marcadorPreguntaActual=0;
    puntuacionActual=0;
    nextButton.innerHTML = "Siguiente"
    mostrarPreguntas();
}

function mostrarPreguntas(){ //Esta función sirve para que se muestren las preguntas, respuestas e imagen correspondientes del array de preguntas.js
    removerHTMLOriginal();
    let preguntaActual = preguntas[marcadorPreguntaActual];
    let numeroDePregunta = marcadorPreguntaActual+1;
    preguntaDinamica.innerHTML = numeroDePregunta + ".- " + preguntaActual.pregunta;
    imagenPregunta.style.display = "flex";


    
    preguntaActual.respuestas.forEach(respuesta => {
        const button = document.createElement("button");
        button.innerHTML = respuesta.text;
        button.classList.add("btn");
        botonesDeRespuesta.appendChild(button);
        if(respuesta.correct){
            button.dataset.correct = respuesta.correct;
        }
        button.addEventListener("click", seleccionarRespuesta);
    });
    imagenPregunta.innerHTML = "<img src=" + preguntaActual.imagen + ">";
    imagenPregunta.classList.add("imagenPregunta");
    console.log(preguntaActual)


    }
function removerHTMLOriginal(){ //Esta función sirve para remover los botones de respuesta del HTML original
    nextButton.style.display = "none";
    while(botonesDeRespuesta.firstChild){
        botonesDeRespuesta.removeChild(botonesDeRespuesta.firstChild);
    }
}

function seleccionarRespuesta(e){ //Esta función es para seleccionar la respuesta y darle formato a los botones según la respuesta
    const btnSeleccionado = e.target;
    const Correcto = btnSeleccionado.dataset.correct === "true";
    // Correcto ? btnSeleccionado.classList.add("correcto"): btnSeleccionado.classList.add("incorrecto") ; (no supe como poner el puntuacion++ abreviado jeje de esta forma)
    if(Correcto){
        btnSeleccionado.classList.add("correcto");
        puntuacionActual++
    } else {
        btnSeleccionado.classList.add("incorrecto");
    }
    Array.from(botonesDeRespuesta.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correcto");
        }
        button.disabled = true; //Con esto evitamos respuestas multiples
    });
    nextButton.style.display = "flex";
    }

    function siguientePregunta(){
        marcadorPreguntaActual++;
        (marcadorPreguntaActual < preguntas.length) ? mostrarPreguntas() : mostrarPuntaje();
    }

    function mostrarPuntaje(){
        removerHTMLOriginal();
        nextButton.innerHTML = "Jugar de nuevo";
        nextButton.style.display = "flex";
        imagenPregunta.style.display = "none";

        sessionStorage.setItem(`Puntuación`,puntuacionActual)

        let usuarioNombre = sessionStorage.getItem("NombreDelUsuario") 
        let puntuacion = sessionStorage.getItem("Puntuación");
        if(puntuacionActual==5){
            preguntaDinamica.innerHTML = `<h2>¡${usuarioNombre} obtuviste ${puntuacionActual} puntos de ${preguntas.length}! <br> ¡Felicidades usted es un experto de futbol! ⚽💯</h2> <br>
            Porcentaje de aciertos:` + (puntuacion*100)/5 + "%";
            
        } else if (puntuacionActual==4){
            preguntaDinamica.innerHTML = `<h2>¡${usuarioNombre} obtuviste ${puntuacionActual} puntos de ${preguntas.length}! <br> ¡Felicidades usted es un gran fan de futbol! ⚽ </h2><br>
            Porcentaje de aciertos:` + (puntuacion*100)/5 + "%";

        } else if (puntuacionActual==3){
            preguntaDinamica.innerHTML = `<h2>¡${usuarioNombre} obtuviste ${puntuacionActual} puntos de ${preguntas.length}! <br> Usted es un fanatico del futbol mayor al promedio </h2><br>
            Porcentaje de aciertos:` + (puntuacion*100)/5 + "%" ;

        } else if (puntuacionActual==2){
            preguntaDinamica.innerHTML = `<h2>¡${usuarioNombre} obtuviste ${puntuacionActual} puntos de ${preguntas.length}! <br> Usted es un fan casual </h2><br>
            Porcentaje de aciertos:` + (puntuacion*100)/5 + "%";
        } else if (puntuacionActual==1){
            preguntaDinamica.innerHTML = `<h2>¡${usuarioNombre} obtuviste ${puntuacionActual} puntos de ${preguntas.length}! <br> Usted deberia ver más futbol </h2><br>
            Porcentaje de aciertos:` + (puntuacion*100)/5 + "%";
        } else {
            preguntaDinamica.innerHTML = `<h2>¡${usuarioNombre} obtuviste ${puntuacionActual} puntos de ${preguntas.length}! <br> ¿Alguna vez ha visto un partido? </h2><br>
            Porcentaje de aciertos:` + (puntuacion*100)/5 + "%";
        } 

        console.log(puntuacion)
    }
    nextButton.addEventListener("click", ()=>{
        (marcadorPreguntaActual < preguntas.length) ? siguientePregunta() : iniciarQuiz();
        });
