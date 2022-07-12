import 'styled-components';
import { clacRem } from '@lib/styles/theme';
declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      main: {
        yellow100: '#FFF6D2';
        yellow200: '#FFEEA6';
        yellow300: '#FFDA40';
        yellow400: '#FFC52F';
      };
      greyScale: {
        white: '#FFFFFF';
        grey100: '#FAFAFC';
        grey200: '#EAEAEC';
        grey300: '#DBDEE1';
        grey400: '#CFCFCF';
        grey500: '#A6A9AD';
        grey600: '#828489';
        grey700: '#525354';
        black: '#2E3234';
      };
      sementic: {
        red100: '#FFDDCA';
        red200: '#FFAD80';
        red300: '#FF6F42';
        green300: '#62BE36';
      };
      level: {
        grey100: '#AAAECD';
        blue100: '#A8CAFC';
        red100: '#FFB384';
        green100: '#98E27D';
        yellow100: '#FDD752';
      };
    };
    radius: {
      small: '8px';
      medium: '12px';
      large: '24px';
    };
    typo: {
      input: {
        Title_T_24_EB: string;
        TextField_T_16_EB: string;
        TextField_Num_T_21_EB: string;
        TextMessage_S_12_M: `font-family: 'Spoqa Han Sans Neo';font-size: 12px;line-height: 100%;font-weight: 500;`;
      };
      text: {
        T_21_EB: `font-family: 'TmoneyRoundWind';font-size: 21px;line-height: 100%;font-weight: 800;`;
        T_18_EB: `font-family: 'TmoneyRoundWind';font-size: 18px;line-height: 100%;font-weight: 800;`;
        T_16_EB: `font-family: 'TmoneyRoundWind';font-size: 16px;line-height: 100%;font-weight: 800;`;
        S_14_M: `font-family: 'Spoqa Han Sans Neo';font-size: 14px;line-height: 100%;font-weight: 500;`;
        T_12_EB: ` font-family: 'TmoneyRoundWind';font-size: 12px;line-height: 100%;font-weight: 800;`;
        S_12_M: `font-family: 'Spoqa Han Sans Neo';font-size: 12px;line-height: 100%;font-weight: 500;`;
      };
      popup: {
        T_24_EB: `font-family: 'TmoneyRoundWind';font-size: 24px;line-height: 100%;font-weight: 800;`;
        Title_T_21_EB: `font-family: 'TmoneyRoundWind';font-size: 21px;line-height: 100%;font-weight: 800;`;
        S_15_R: `font-family: 'Spoqa Han Sans Neo';font-size: 15px;line-height: 100%;font-weight: 400;`;
        Sub_S_14_R: `font-family: 'Spoqa Han Sans Neo';font-size: 14px;line-height: 100%;font-weight: 400;`;
      };
      button: {
        Primary_T_15_EB: `font-family: 'TmoneyRoundWind';font-size: 15px;line-height: 100%;font-weight: 800;`;
        InnerText_T_12_EB: `font-family: 'TmoneyRoundWind';font-size: 12px;line-height: 100%;font-weight: 800;`;
        InnerText_T_15_EB: `font-family: 'TmoneyRoundWind';font-size: 15px;line-height: 100%;font-weight: 800;`;
      };
      bottomSheet: {
        T_14_EB: `font-family: 'TmoneyRoundWind';font-size: 14px;line-height: 100%;font-weight: 800;`;
        S_12_R: `font-family: 'Spoqa Han Sans Neo';font-size: 12px;line-height: 100%;font-weight: 400;`;
      };
      tag: {
        T_8_EB: `font-family: 'TmoneyRoundWind';font-size: 8px;line-height: 100%;font-weight: 800;`;
      };
    };
  }
}
