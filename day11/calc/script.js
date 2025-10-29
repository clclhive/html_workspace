
const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');

let currentInput = '0'; // 현재 화면에 표시된 값

buttonsContainer.addEventListener('click', (event) => {
    const target = event.target;
    const type = target.dataset.type;
    const value = target.dataset.value;

    if (!target.classList.contains('btn')) {
        return;
    }

    if (type === 'clear') {
        currentInput = '0';
    } 
    
    else if (type === 'equals') {
        currentInput = calculate(currentInput);
    } 
    
    else if (type === 'decimal') {

        const lastChar = currentInput[currentInput.length - 1];
        if (!isNaN(lastChar) && !currentInput.split(/[+\-*/]/).pop().includes('.')) {
            currentInput += '.';
        }
    }
    
    else {
        if (currentInput === '0' && (type === 'number' || value === '0')) {
            currentInput = value;
        } 
        else if (type === 'operator' && isNaN(currentInput[currentInput.length - 1])) {
            currentInput = currentInput.slice(0, -1) + value;
        }
        else {
            currentInput += value;
        }
    }

    display.textContent = currentInput;
});

function calculate(expression) {
        const func = new Function('return ' + expression);
        const result = func.call(null);
        
        if (result % 1 !== 0) {
            return String(result.toFixed(4));
        }
        return String(result);
    }


// 초기화
display.textContent = currentInput;