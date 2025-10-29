// eslint.config.mjs

import globals from "globals";
import js from "@eslint/js";

export default [
  // 1. ESLint가 추천하는 기본 규칙 적용
  js.configs.recommended,

  // 2. .js 파일에 대한 세부 설정
  {
    languageOptions: {
      // 3. 'document', 'window' 등 브라우저 전역 변수 인식
      globals: {
        ...globals.browser,
      },

      // 4. 최신 자바스크립트 문법 사용
      ecmaVersion: "latest",
      
      // 5. <script src="...">로 파일을 불러왔으므로 'script' (기본값)
      // (만약 .js 파일 안에서 import/export를 쓴다면 "module"로 변경)
      sourceType: "script", 
    },
  },
];