// funciones para el darkMode
cambiarIconoDark(modoDia, modoNoche, `#fff`, `#000`, `dia`)
cambiarIconoDark(modoNoche, modoDia, `#000`, `#fff`, `noche`)
function cambiarIconoDark(tipoModo, aparecer, background, colorLetra, queModo) {


    tipoModo.addEventListener(`click`, () => {
        tipoModo.style.transform = `scale(0)`
        aparecer.style.transform = `scale(1)`

        document.body.style.background = background
        document.body.style.color = colorLetra

        if (queModo == `dia`) {
            cambiarColores(`rgb(243, 243, 243)`, `#0099ff`, `#fff`, `#0099ff`, `rgb(230, 230, 230)`)
        } else {
            cambiarColores(`#000`, `#ff8800`, `#000`, `#ff8800`, `#000`)


        }
    })

    function cambiarColores(colorBotones, botonIgual, igualColor, colorOperacion, fondoOperacion) {
        document.querySelectorAll(`.calculadora__contentBotones_botones span`).forEach(span => {
            span.style.backgroundColor = colorBotones
            document.querySelector(`.bcgNaranja`).style.backgroundColor = botonIgual
            document.querySelector(`.bcgNaranja`).style.color = igualColor
            document.querySelectorAll(`.naranja`).forEach(naranjita => {
                naranjita.style.color = colorOperacion
                naranjita.style.backgroundColor = fondoOperacion
            })
        })
    }
}
//  FIN darkMode--------------------------------------------
const contenedorRespuesta = document.getElementById(`pantallaResultado`)

let operationStatus = false,
    number1,
    typeOperation

calculadora.addEventListener(`click`, (e) => {

    const t = e.target,
        d = t.dataset

    // detectar si se pulso un numero  || completada ||
    if (d.number) writeScreen(d.number)
    // detectar si se pulso una operacion matematica || completada ||
    if (d.math) getOperation(t, d.math)
    // detectar si se pulso otra operacion
    if (d.operation) runOperation(d.operation)
})


const writeScreen = number => {
    operationStatus === true
        ? pantallaResultado.textContent = number
        : number === `.` && !pantallaResultado.textContent.includes(`.`)
            ? pantallaResultado.textContent += number
            : number !== `.`
                ? pantallaResultado.textContent += number
                : null
    operationStatus = false
}

const getOperation = (element, operation) => {
    operationStatus = true
    number1 = Number(pantallaResultado.textContent)
    typeOperation = operation
    pantallaResultado.textContent = element.textContent
    // console.log(element.textContent)
}

const runOperation = (operation) => {
    const getResult = (number1, typeOperation) => {
        const number2 = Number(pantallaResultado.textContent)
        let result
        switch (typeOperation) {
            case `add`:
                result = number1 + number2
                break;
            case `minus`:
                result = number1 - number2
                break;
            case `multiplay`:
                result = number1 * number2
                break;
            case `divide`:
                result = number1 / number2
                break;

        }
        result === Infinity
            ? pantallaResultado.textContent = `error`
            : pantallaResultado.textContent = result

    }
    switch (operation) {
        case `clear`:
            pantallaResultado.textContent = ``
            break;
        case `iquals`:
            getResult(number1, typeOperation)
            break;
        case `delete`:
            pantallaResultado.textContent = pantallaResultado.textContent.substring(0, pantallaResultado.textContent.length - 1)
            break;
        case `percentage`:
            pantallaResultado.textContent = pantallaResultado.textContent / 100
            break;
    }

    // operationStatus = true
}




