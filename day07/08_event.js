function eventFunc(num){
    // 버튼을 클릭하면 printResult에 메시지를 출력합니다.
    // 어떤 버튼이 클릭되었는지 식별하기 위해 매개변수(num)를 사용합니다.
    const printResult = document.getElementById('printResult');
    printResult.innerHTML = `<strong>${num}번 버튼을 클릭했습니다.</strong>`;
}