import { DefaultTheme } from 'styled-components';

// div 내부에 svg를 삽입하여 위치시키는 경우 내부 svg의 width를
// % 단위로 계산하기 위한 함수, 소수점 아래는 버림
export const calcRatio = (innerPx: number, OuterPx: number) =>
  `${Math.floor((innerPx * 100) / OuterPx)}%`;
export const calcRem = (px: number) => `${px / 16}rem`;

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;
export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};

export const theme: DefaultTheme = {
  palette: {
    main: {
      yellow100: '#FFF6D2',
      yellow200: '#FFEEA6',
      yellow300: '#FFDA40',
      yellow400: '#FFC52F',
    },
    greyScale: {
      white: '#FFFFFF',
      grey100: '#FAFAFC',
      grey200: '#EAEAEC',
      grey300: '#DBDEE1',
      grey400: '#CFCFCF',
      grey500: '#A6A9AD',
      grey600: '#828489',
      grey700: '#525354',
      black: '#2E3234',
    },
    sementic: {
      red100: '#FFDDCA',
      red200: '#FFAD80',
      red300: '#FF6F42',
      green300: '#62BE36',
    },
    level: {
      grey100: '#AAAECD',
      blue100: '#A8CAFC',
      red100: '#FFB384',
      green100: '#98E27D',
      yellow100: '#FDD752',
    },
  },
  radius: {
    small: '8px',
    medium: '12px',
    large: '24px',
  },
  border: {
    receipt: '#eaeaec dotted 2px',
  },
  transition: {
    inputFocus: '0.1s all ease-in',
    kidSelect: '0.125s all ease-in',
  },
  animation: {
    homeMount: '0.175s ease-in forwards',
    modalOpen: '0.3s ease-in-out forwards',
  },
  typo: {
    fixed: {
      Navbar_T_17_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        17,
      )};line-height: 100%;font-weight: 800;`,
      TabName_T_21_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        21,
      )};line-height: 100%;font-weight: 800;`,
      HomeTitle_T_24_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        24,
      )};line-height: 100%;font-weight: 800;`,
      HomeSubtitle_T_16_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        16,
      )};line-height: 100%;font-weight: 800;`,
      GraphNum_T_21_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        21,
      )};line-height: 100%;font-weight: 800;`,
      GraphNum_T_18_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        18,
      )};line-height: 100%;font-weight: 800;`,
      GraphSub_S_12_M: `font-family: 'Spoqa Han Sans Neo';font-size: ${calcRem(
        12,
      )};line-height: 100%;font-weight: 500;`,
      EmptyText_S_16_M: `font-family: 'Spoqa Han Sans Neo';font-size: ${calcRem(
        16,
      )};line-height: 100%;font-weight: 500;`,
    },

    input: {
      Title_T_24_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        24,
      )};line-height: 100%;font-weight: 800;`,
      TextField_T_16_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        16,
      )};line-height: 150%;font-weight: 800;`,
      TextField_Num_T_21_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        21,
      )};line-height: 100%;font-weight: 800;`,
      TextMessage_S_12_M: `font-family: 'Spoqa Han Sans Neo';font-size: ${calcRem(
        12,
      )};line-height: 100%;font-weight: 500;`,
    },
    text: {
      T_21_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        21,
      )};line-height: 100%;font-weight: 800;`,
      T_18_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        18,
      )};line-height: 100%;font-weight: 800;`,
      T_16_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        16,
      )};line-height: 100%;font-weight: 800;`,
      T_14_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        14,
      )};line-height: 100%;font-weight: 800;`,
      S_14_M: `font-family: 'Spoqa Han Sans Neo';font-size: ${calcRem(
        14,
      )};line-height: 150%;font-weight: 500;`,
      T_12_EB: ` font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        12,
      )};line-height: 100%;font-weight: 800;`,
      S_12_M: `font-family: 'Spoqa Han Sans Neo';font-size: ${calcRem(
        12,
      )};line-height: 150%;font-weight: 500;`,
      S_16_B: `font-family: 'Spoqa Han Sans Neo';font-size: ${calcRem(
        16,
      )};line-height: 21px;font-weight: 700;`,
    },
    popup: {
      T_24_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        24,
      )};line-height: 100%;font-weight: 800;`,
      Title_T_21_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        21,
      )};line-height: 100%;font-weight: 800;`,
      S_15_R: `font-family: 'Spoqa Han Sans Neo';font-size: ${calcRem(
        15,
      )};line-height: 100%;font-weight: 400;`,
      Sub_S_14_R: `font-family: 'Spoqa Han Sans Neo';font-size: ${calcRem(
        14,
      )};line-height: 100%;font-weight: 400;`,
    },
    button: {
      Primary_T_15_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        15,
      )};line-height: 100%;font-weight: 800;`,
      Secondary_T_13_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        13,
      )};line-height: 100%;font-weight: 800;`,
      UnderlinedText_14_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        14,
      )};line-height: 100%;font-weight: 800;`,
      Text_T_14_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        14,
      )};line-height: 100%;font-weight: 800;`,
      Title_T_14_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        14,
      )};line-height: 100%;font-weight: 800;`,
      InnerText_T_12_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        12,
      )};line-height: 100%;font-weight: 800;`,
      InnerText_T_15_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        15,
      )};line-height: 100%;font-weight: 800;`,
    },
    bottomSheet: {
      T_21_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        21,
      )};line-height: 100%;font-weight: 800;`,
      T_14_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        14,
      )};line-height: 100%;font-weight: 800;`,
      S_12_R: `font-family: 'Spoqa Han Sans Neo';font-size: ${calcRem(
        12,
      )};line-height: 100%;font-weight: 400;`,
    },
    tag: {
      T_12_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        12,
      )};line-height: 100%;font-weight: 800;`,
      T_8_EB: `font-family: 'TmoneyRoundWind';font-size: ${calcRem(
        8,
      )};line-height: 100%;font-weight: 800;`,
    },
  },
};
