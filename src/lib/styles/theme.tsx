import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  palette: {
    // yellow[0]: main yellow, yellow[1~4]: sub yellow
    yellow: ['#FFD749', '#FFF7E5', '#FFEDC1', '#FFD56F', '#FFAA42'],
    // blue[1~3]: sub blue
    blue: ['#000', '#C6E8FF', '#9AD7FF', '#0099FF'],
    // red[1~3]: sub red
    red: ['#000', '#FFCFB1', '#FFBA8E', '#FF6F42'],
    // green[1~3]: sub green
    green: ['#000', '#C0F0A4', '#A5EE79', '#94DD7A'],
    white: '#fff',
    lightGray: '#FAFAFC',
    // gray[1~6]: gray scale
    gray: [
      '#000',
      '#F7F7F8',
      '#EDEDED',
      '#D1D1D4',
      '#B3B2B8',
      '#82818B',
      '#4C4C52',
      '#26262D',
    ],
    black: '#000',
  },
  boxShadow: {
    normal: '0 3px 8px 0 rgb(0 0 0 / 10%)',
  },
  typo: {
    input: {
      Title_T_24_EB: `font-family: 'TmoneyRoundWind';font-size: 24px;line-height: 100%;font-weight: 800;`,
      TextField_T_16_EB: `font-family: 'TmoneyRoundWind';font-size: 16px;line-height: 100%;font-weight: 800;`,
      TextField_Num_T_21_EB: `font-family: 'TmoneyRoundWind';font-size: 21px;line-height: 100%;font-weight: 800;`,
      TextMessage_S_12_M: `font-family: 'Spoqa Han Sans Neo';font-size: 12px;line-height: 100%;font-weight: 500;`,
    },
    text: {
      T_21_EB: `font-family: 'TmoneyRoundWind';font-size: 21px;line-height: 100%;font-weight: 800;`,
      T_18_EB: `font-family: 'TmoneyRoundWind';font-size: 18px;line-height: 100%;font-weight: 800;`,
      T_16_EB: `font-family: 'TmoneyRoundWind';font-size: 16px;line-height: 100%;font-weight: 800;`,
      S_14_M: `font-family: 'Spoqa Han Sans Neo';font-size: 14px;line-height: 100%;font-weight: 500;`,
      T_12_EB: ` font-family: 'TmoneyRoundWind';font-size: 12px;line-height: 100%;font-weight: 800;`,
      S_12_M: `font-family: 'Spoqa Han Sans Neo';font-size: 12px;line-height: 100%;font-weight: 500;`,
    },
    popup: {
      T_24_EB: `font-family: 'TmoneyRoundWind';font-size: 24px;line-height: 100%;font-weight: 800;`,
      Title_T_21_EB: `font-family: 'TmoneyRoundWind';font-size: 21px;line-height: 100%;font-weight: 800;`,
      S_15_R: `font-family: 'Spoqa Han Sans Neo';font-size: 15px;line-height: 100%;font-weight: 400;`,
      Sub_S_14_R: `font-family: 'Spoqa Han Sans Neo';font-size: 14px;line-height: 100%;font-weight: 400;`,
    },
    button: {
      Primary_T_15_EB: `font-family: 'TmoneyRoundWind';font-size: 15px;line-height: 100%;font-weight: 800;`,
      InnerText_T_12_EB: `font-family: 'TmoneyRoundWind';font-size: 12px;line-height: 100%;font-weight: 800;`,
      InnerText_T_15_EB: `font-family: 'TmoneyRoundWind';font-size: 15px;line-height: 100%;font-weight: 800;`,
    },
    bottomSheet: {
      T_14_EB: `font-family: 'TmoneyRoundWind';font-size: 14px;line-height: 100%;font-weight: 800;`,
      S_12_R: `font-family: 'Spoqa Han Sans Neo';font-size: 12px;line-height: 100%;font-weight: 400;`,
    },
    tag: {
      T_8_EB: `font-family: 'TmoneyRoundWind';font-size: 8px;line-height: 100%;font-weight: 800;`,
    },
  },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};

// svg 내부에 svg를 삽입하여 위치시키는 경우 내부 svg의 width를
// % 단위로 계산하기 위한 함수, 소수점 아래는 버림
export const clacRatio = (innerPx: number, OuterPx: number) =>
  `${Math.floor((innerPx * 100) / OuterPx)}%`;
export const calcRem = (px: number) => `${px / 16}rem`;
