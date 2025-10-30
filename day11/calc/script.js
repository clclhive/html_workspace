
// HTML에서 계산기 화면과 버튼 영역을 가져옵니다.
const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');

// 계산기의 현재 상태를 저장하는 변수입니다. 사용자가 입력하는 숫와 연산자가 문자열 형태로 저장됩니다.
let currentInput = '0';

// 모든 버튼의 부모인 'buttonsContainer'에 이벤트 리스너를 추가합니다. (이벤트 위임)
// 이렇게 하면 각 버튼마다 리스너를 달지 않고 한 곳에서 모든 버튼 클릭을 처리할 수 있어 효율적입니다.
buttonsContainer.addEventListener('click', (event) => {
    const target = event.target; // 사용자가 클릭한 실제 요소(버튼)
    const type = target.dataset.type; // 클릭한 버튼의 종류 (e.g., 'number', 'operator', 'clear')
    const value = target.dataset.value; // 클릭한 버튼의 값 (e.g., '7', '+', '=')

    // 클릭된 요소가 'btn' 클래스를 가지고 있지 않으면(즉, 버튼이 아니면) 아무 동작도 하지 않고 함수를 종료합니다.
    if (!target.classList.contains('btn')) {
        return;
    }

    // 'C' (Clear) 버튼을 눌렀을 경우
    if (type === 'clear') {
        currentInput = '0'; // 입력값을 '0'으로 초기화합니다.
    } 
    
    // '=' (Equals) 버튼을 눌렀을 경우
    else if (type === 'equals') {
        currentInput = calculate(currentInput); // 현재까지의 수식을 계산하여 결과를 입력값으로 설정합니다.
    } 
    
    // '.' (Decimal) 버튼을 눌렀을 경우
    else if (type === 'decimal') {
        const lastChar = currentInput[currentInput.length - 1]; // 현재 입력된 값의 마지막 문자
        // 마지막 문자가 숫자이고, 현재 입력 중인 숫자 덩어리에 소수점이 아직 없는 경우에만 소수점을 추가합니다.
        if (!isNaN(lastChar) && !currentInput.split(/[+\-*/]/).pop().includes('.')) {
            currentInput += '.';
        }
    }
    
    // 숫자 또는 연산자 버튼을 눌렀을 경우
    else {
        // 현재 입력값이 '0'일 때 숫자나 '0'을 누르면, '0'을 지우고 새로 입력된 값으로 대체합니다.
        if (currentInput === '0' && (type === 'number' || value === '0')) {
            currentInput = value;
        } 
        // 연산자를 눌렀는데, 마지막에 입력된 값도 연산자일 경우, 마지막 연산자를 새로 입력된 연산자로 교체합니다.
        else if (type === 'operator' && isNaN(currentInput[currentInput.length - 1])) {
            currentInput = currentInput.slice(0, -1) + value;
        }
        // 그 외의 모든 경우에는 입력된 값을 뒤에 이어 붙입니다.
        else {
            currentInput += value;
        }
    }

    // 처리된 최종 입력값(currentInput)을 화면(display)에 표시합니다.
    display.textContent = currentInput;
});

// 문자열 형태의 수식을 실제 계산하는 함수
function calculate(expression) {
        // new Function()은 문자열을 코드로 실행 가능하게 만들어주는 동적 함수 생성 방법입니다.
        // 'return ' + expression은 'return 5+3*2'와 같은 코드를 만들어줍니다.
        const func = new Function('return ' + expression);
        const result = func.call(null); // 생성된 함수를 실행하여 결과를 얻습니다.
        
        // 계산 결과가 소수(정수가 아님)일 경우
        if (result % 1 !== 0) {
            return String(result.toFixed(4)); // 소수점 4자리까지 반올림하여 문자열로 반환합니다.
        }
        return String(result); // 정수일 경우, 그대로 문자열로 반환합니다.
    }


// 초기화
display.textContent = currentInput;