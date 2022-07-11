import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      yellow: ['#FFD749', '#FFF7E5', '#FFEDC1', '#FFD56F', '#FFAA42'];
      blue: ['#000', '#C6E8FF', '#9AD7FF', '#0099FF'];
      red: ['#000', '#FFCFB1', '#FFBA8E', '#FF6F42'];
      green: ['#000', '#C0F0A4', '#A5EE79', '#94DD7A'];
      white: '#fff';
      lightGray: '#FAFAFC';
      gray: [
        '#000',
        '#F7F7F8',
        '#EDEDED',
        '#D1D1D4',
        '#B3B2B8',
        '#82818B',
        '#4C4C52',
        '#26262D',
      ];
      black: '#000';
    };
    boxShadow: {
      normal: '0 3px 8px 0 rgb(0 0 0 / 10%)';
    };
    typo: {
      input: {
        Title_T_24_EB: `font-family: 'TmoneyRoundWind';font-size: 24px;line-height: 100%;font-weight: 800;`;
        TextField_T_16_EB: `font-family: 'TmoneyRoundWind';font-size: 16px;line-height: 100%;font-weight: 800;`;
        TextField_Num_T_21_EB: `font-family: 'TmoneyRoundWind';font-size: 21px;line-height: 100%;font-weight: 800;`;
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
        InnerText_T_15_EB: `font-family: 'Spoqa Han Sans Neo';font-size: 15px;line-height: 100%;font-weight: 400;`;
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
