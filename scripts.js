/* gotta store that data yo*/
class Calculator {
    constructor  (previousEntryText,currentEntryText){
    /*constructor is going to take all of the data and instructions for Calculator class*/
        this.previousEntryText = previousEntryText
    /* this. is self referencing this class as it is in the same block*/
        this.currentEntryText =     currentEntryText
        this.clear()
        }
    clear () {
        this.currentEntry = ''
        this.previousEntry = ''
        this.operation = undefined
    }
    delete() {
        this.currentEntry = this.currentEntry.toString().slice(0,-1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentEntry.includes('.')) return 
        /* this prevents two . from being put into the text field */
        this.currentEntry = this.currentEntry.toString() + number.toString()
        /*convert to string because JS is dumb and will say 1 + 1 is 2, instead of append to make 11*/
    }
    chooseOperation(operation) {
        if (this.currentEntry === '') return
        if (this.previousEntry !== '') {
            this.compute()
        } 
        this.operation = operation
        this.previousEntry = this.currentEntry
        this.currentEntry = ''

    }
    compute() {
        let computation
        const prev = parseFloat(this.previousEntry)
        const current = parseFloat(this.currentEntry)
        if (isNaN(prev) || isNaN(current)) return       
        /*isNaN = is Not a Number */
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                break
        }
        /* switch statement allows you to do a lot of functions at once, chain em together. define if statements by using term CASE. Think ELIF */
        this.currentEntry = computation
        this.operation = undefined
        this.previousEntry = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentEntryText.innerText = this.getDisplayNumber(this.currentEntry)
        if (this.operation != null){
            this.previousEntryText.innerText = `${this.getDisplayNumber(this.previousEntry)} ${this.operation}`}
            else {
                this.previousEntryText.innerText = ''
        }
    }
}
const numberButtons = document.querySelectorAll('[data-number]') 
//this will search, locate, and bring forward any class linked to data-number

const operationButtons = document.querySelectorAll('[data-operation]')

const equalsButton = document.querySelector('[data-equals]')
/*querySelector vs querySelectorAll because there is only one file being searched for*/

const deleteButton = document.querySelector('[data-delete]')

const allClearButton = document.querySelector('[data-allClear]')

const previousEntryText = document.querySelector('[data-previousEntry]')

const currentEntryText = document.querySelector('[data-currentEntry]')

const calculator = new Calculator(previousEntryText,currentEntryText)

numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()    
})
