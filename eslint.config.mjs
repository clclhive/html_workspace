// eslint.config.mjs

import globals from "globals";
import js from "@eslint/js";

export default [
  // 1. ESLint가 추천하는 기본 규칙(const 재할당 금지 등)을 적용합니다.
  js.configs.recommended,

  // 2. 이 프로젝트의 세부 설정을 합니다.
  {
    languageOptions: {
      // 3. 코드가 실행될 환경을 알려줍니다. (가장 중요!)
      globals: {
        ...globals.browser, // <-- 'window', 'document' 같은 브라우저 전역 변수 인식
      },

      // 4. 최신 자바스크립트 문법(const, let 등)을 사용한다고 알려줍니다.
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];