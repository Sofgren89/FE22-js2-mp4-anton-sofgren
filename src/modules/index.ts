
const img = document.createElement('img');
document.body.append(img);

const imgUrl = new URL('./images/mini-bild.jpg', import.meta.url);
img.src = imgUrl.href;

document.addEventListener('DOMContentLoaded', () => {
  const display = document.querySelector('.display') as HTMLDivElement;
  let operation = '';
  let firstOperand = '';
  let secondOperand = '';
  let calculating = false;

  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent;
      if (!value) {
        return;
      }

      handleButtonClick(value);
    });
  });

  function handleButtonClick(value: string) {
    if (isNumber(value) || value === '.') {
      handleNumberInput(value);
    } else if (isOperator(value)) {
      handleOperatorInput(value);
    } else if (value === '=') {
      handleEqualInput();
    }
  }

  function isNumber(value: string) {
    return /\d/.test(value);
  }

  function isOperator(value: string) {
    return ['+', '-', '*', '/'].includes(value);
  }

  function handleNumberInput(value: string) {
    if (calculating) {
      secondOperand += value;
      display.textContent = secondOperand;
    } else {
      firstOperand += value;
      display.textContent = firstOperand;
    }
  }

  function handleOperatorInput(value: string) {
    operation = value;
    calculating = true;
  }
  function handleEqualInput() {
    if (firstOperand && secondOperand && operation) {
      display.textContent = calculate(parseFloat(firstOperand), parseFloat(secondOperand), operation).toString();
      firstOperand = '';
      secondOperand = '';
      operation = '';
      calculating = false;
    }
  }

  function calculate(a: number, b: number, op: string): number {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return 0;
    }
  }
  });

