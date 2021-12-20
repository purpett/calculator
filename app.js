let numberInserted = ""
let operatorChosen = ""
let display = document.querySelector('.display')
let oldNumber = 0

function receiveNumber(n) {
    numberInserted += n
    display.innerHTML = numberInserted
}


function receiveOperator(op) {
    if (operatorChosen != "") {
        receiveEquals()
    }

    operatorChosen = op
    if (numberInserted != "") {
        oldNumber = parseFloat(numberInserted)
    }
    numberInserted = ""
}

function receiveEquals() {
    let newNumber = parseFloat(numberInserted)
    switch(operatorChosen) {
        case '/':
            oldNumber /= newNumber
            break
        case '*':
            oldNumber *= newNumber
            break
        case '-':
            oldNumber -= newNumber
            break
        case '+':
            oldNumber += newNumber
            break
    }
    display.innerHTML = oldNumber
    numberInserted = "" + oldNumber
    operatorChosen = ""
}

function allClear() {
    numberInserted = ""
    operatorChosen = ""
    display.innerHTML = ""
    oldNumber = ""
}

function clickListener(e) {
    switch(e.target.dataset.type) {
        case 'number': 
            receiveNumber(e.target.value)
            break
        case 'operator':
            receiveOperator(e.target.value)
            break
        case 'allClear':
            allClear()
            break
        case 'clear':
            numberInserted = ""
            display.innerHTML = ""
            break
        case 'equal':
            receiveEquals()
            break
        case 'sign':
            let tmp = parseFloat(numberInserted)
            numberInserted = "" + (tmp * -1)
            display.innerHTML = numberInserted
            break
    }
    console.log(`oldNumber: ${oldNumber}, numberInserted: ${numberInserted}, operatorChosen: ${operatorChosen}`)

}

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', clickListener)
})

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            receiveNumber(e.key)
            break
        case '%':
            break
        case '/':
        case '*':
        case '-':
        case '+':
            receiveOperator(e.key)
            break
        case '=':
        case 'Enter':
            receiveEquals()
            break
        case 'Escape':
            allClear()
            break
        case 'Backspace':
            numberInserted = numberInserted.slice(0, numberInserted.length-1)
            display.innerHTML = numberInserted
            break
    }
})