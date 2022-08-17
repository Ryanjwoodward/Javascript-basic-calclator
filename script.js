/*
    Author: Ryan Woodward
    Date: 8-16-2022
    Description: A basic Calculator that supports all basic arithmetic operations for float and integer types
            supports chaining these operations, and allows for deletion of a character, and all clear.
    File: script.js
    Dependencies: index.html, style.css
*/
class Calculator{

    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }// constructor()


    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }// clear()

    delete(){ //deletes a single character from output screen
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }// delete()

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }// appendNumber()

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
          this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }// chooseOperation()

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }// compute()

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }// getDisplayNumber()

    updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
    }//updateDisplay()
};

//----------------------------
// Fields
//----------------------------
const numberButtons = document.querySelectorAll('[data-number]'); /* data- selection requires brackets */
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calcr = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calcr.appendNumber(button.innerText);
        calcr.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calcr.chooseOperation(button.innerText)
      calcr.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calcr.compute()
    calcr.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calcr.clear()
    calcr.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calcr.delete()
    calcr.updateDisplay()
  })