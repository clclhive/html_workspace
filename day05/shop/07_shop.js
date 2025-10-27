/**
 * @file 07_shop.js
 * @description 'fakestoreapi.com'에서 상품 데이터를 가져와 웹 페이지에 동적으로 표시하는 스크립트입니다.
 */

// HTML 문서가 모두 로드된 후 상품 데이터를 가져와 화면에 렌더링하는 비동기 함수
async function fetchProducts() {
    
    // 1. [DOM 조작] 상품 목록이 표시될 HTML 요소를 선택합니다.
    const productGrid = document.querySelector('.product-grid');

    // 2. [네트워크 요청] API 요청 및 데이터 처리 중 발생할 수 있는 오류를 잡기 위해 try...catch 구문을 사용합니다.
    try {
        // 3. [API 호출] 'fakestoreapi'에 GET 요청을 보내 상품 9개의 데이터를 비동기적으로 요청합니다.
        const response = await fetch('https://fakestoreapi.com/products?limit=9');
        
        // 4. [데이터 파싱] 응답받은 데이터를 JavaScript 객체 배열(JSON) 형태로 변환합니다.
        const products = await response.json();

        // 5. [HTML 생성 준비] 모든 상품의 HTML 코드를 하나로 합치기 위한 빈 문자열 변수를 선언합니다.
        let productsHTML = '';

        // 6. [데이터 순회 및 HTML 생성] 받아온 상품 배열(products)을 순회하며 각 상품에 대한 HTML 구조를 만듭니다.
        products.forEach(product => {b
            // 각 상품의 이미지, 제목을 사용해 HTML 문자열을 생성하고 `productsHTML` 변수에 추가합니다.
            productsHTML += `
                <div class="product-item">
                    <img src="${product.image}" alt="${product.title}">
                    <h4 class="product-name">${product.title}</h4>
                </div>
            `;
        });

        // 7. [DOM 업데이트] 완성된 HTML 문자열을 `.product-grid` 요소의 내부에 삽입하여 화면에 상품들을 표시합니다.
        // (innerHTML을 사용하면 기존 내용은 모두 지워지고 새로운 내용으로 대체됩니다.)
        productGrid.innerHTML = productsHTML;

    } catch (error) {
        // 8. [오류 처리] API 요청이나 데이터 처리 중 오류가 발생하면 콘솔에 에러 메시지를 출력합니다.
        console.error('상품 정보를 가져오는 데 실패했습니다:', error);
        productGrid.innerHTML = '<p>상품을 불러오는 데 문제가 발생했습니다.</p>';
    }
}

// 페이지가 로드되면 fetchProducts 함수를 호출하여 상품 목록을 가져옵니다.
fetchProducts();