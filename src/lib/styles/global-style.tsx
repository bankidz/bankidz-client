import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box; /* 엘리먼트의 box-sizing 값을 border-box로 설정 */
      background-color: #fafafc;

      /* 바텀시트 작업 중 추가 */
      overflow: hidden;

       // 스크롤바 제거
      -ms-overflow-style: none;
    }

    // 스크롤바 제거
    ::-webkit-scrollbar {
      display: none;
    }

    #root {
      min-height: 100%;
    }

    html {
      height: 100%;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: inherit; /* 모든 엘리먼트의 box-sizing 값을 border-box로 설정 */
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    button {
      background: inherit;
      border: none;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
      overflow: visible;
      cursor: pointer;
    }
    button:focus {
      outline: none;
    }
    input:focus {
      outline: none;
    }

    /* react spring bottom sheet */
    :root {
      --rsbs-backdrop-bg: rgba(0, 0, 0, 0.7);
      --rsbs-bg: #fff;
      --rsbs-handle-bg: hsla(0, 0%, 0%, 0.14);
      --rsbs-max-w: auto;
      --rsbs-ml: env(safe-area-inset-left);
      --rsbs-mr: env(safe-area-inset-right);
      --rsbs-overlay-rounded: 16px;
    }

    /* removing the highlight in mobile webview */
    /* https://stackoverflow.com/questions/21003535/anyway-to-prevent-the-blue-highlighting-of-elements-in-chrome-when-clicking-quic */
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    *:focus {
      outline: none !important;
    }

    /* https://velog.io/@jjhstoday/Cross-Browsing-iPhone-inputtextarea-%EC%9E%91%EC%84%B1%EC%9D%B4-%EC%95%88%EB%90%9C%EB%8B%A4 */
    input, textarea {
      -webkit-user-select : auto;
    }
`;
