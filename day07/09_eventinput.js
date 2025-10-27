// 09_eventinput.js

// 1. 필요한 DOM 요소들을 가져옵니다.
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const addrInput = document.getElementById('addr');
const printButton = document.getElementById('printBtn');
const printResultDiv = document.getElementById('printResult');

// 2. '출력' 버튼에 클릭 이벤트 리스너를 추가합니다.
printButton.addEventListener('click', function() {
    // 3. 각 입력 필드의 현재 값을 가져옵니다.
    const name = nameInput.value;
    const age = ageInput.value;
    const address = addrInput.value;

    // 콘솔에도 출력합니다.
    console.log('--- 입력 정보 ---');
    console.log('이름:', name);
    console.log('나이:', age);
    console.log('주소:', address);
    // 4. 가져온 값들을 이용하여 출력할 HTML 문자열을 만듭니다.
    const resultHtml = `
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>나이:</strong> ${age}</p>
        <p><strong>주소:</strong> ${address}</p>
    `;
    // 5. 결과를 표시할 div에 HTML을 삽입합니다.
    printResultDiv.innerHTML = resultHtml;
});