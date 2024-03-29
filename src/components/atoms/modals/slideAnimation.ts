import { css } from 'styled-components';
import {
  MODAL_SLIDE_FROM_POSITION,
  MODAL_SLIDE_TO_POSITION,
} from '@lib/constants/MODAL';

export const slideAnimation = css`
  @keyframes slide {
    from {
      transform: translateY(${MODAL_SLIDE_FROM_POSITION});
    }
    to {
      transform: translateY(${MODAL_SLIDE_TO_POSITION});
    }
  }
  animation: slide ${({ theme }) => theme.animation.modalOpen};
`;
