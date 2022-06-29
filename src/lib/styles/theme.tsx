import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  // source: https://yeun.github.io/open-color/
  palette: {
    yellow: ['#FFBE41', '#FFF7E5', '#FFEDC1', '#FFD56F', '#FFAA42'],
    blue: ['#000', '#C6E8FF', '#9AD7FF', '#0099FF'],
    red: ['#000', '#FFCFB1', '#FFBA8E', '#FA7E49'],
    green: ['#000', '#C0F0A4', '#A5EE79', '#94DD7A'],

    lightGray: '#FAFAFC',
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
    white: '#fff',
    black: '#000',
  },
  boxShadow: {
    normal: '0 3px 8px 0 rgb(0 0 0 / 10%)',
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
