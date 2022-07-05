import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      yellow: ['#FFBE41', '#FFF7E5', '#FFEDC1', '#FFD56F', '#FFAA42'];
      blue: ['#000', '#C6E8FF', '#9AD7FF', '#0099FF'];
      red: ['#000', '#FFCFB1', '#FFBA8E', '#FF6F42'];
      green: ['#000', '#C0F0A4', '#A5EE79', '#94DD7A'];
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
      white: '#fff';
      black: '#000';
    };
    boxShadow: {
      normal: '0 3px 8px 0 rgb(0 0 0 / 10%)';
    };
  }
}
