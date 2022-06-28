import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

// export const GlobalStyle = createGlobalStyle`
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
      min-height: 100%;
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
`;
