import { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import '../styles.css';
import Background from './Background';
import StyledSwiper from './StyledSwiper';
import CloseButtonSection from './CloseButton';
import {
  MODAL_CLOSE_TRANSITION_TIME,
  MODAL_SLIDE_FROM_POSITION,
  MODAL_SLIDE_TO_POSITION,
} from '@lib/constants/MODAL';
// import useModals from '@lib/hooks/useModals';
import { modals } from '../Modals';

interface TertiaryModalProps {
  onSubmit: any;
  shouldCloseOnOverlayClick: boolean;
}

/**
 * @param onSubmit submit (모달 하단 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
 * useModals hook에 의해 반환 됩니다.
 */
function TertiaryModal({
  onSubmit,
  shouldCloseOnOverlayClick = false,
}: TertiaryModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  // const { closeModal } = useModals();
  const reactModalParams = {
    isOpen: isOpen,
    onRequestClose: () => {
      setIsOpen(false);
      setTimeout(() => {
        // closeModal(modals.tertiaryModal);
      }, MODAL_CLOSE_TRANSITION_TIME);
    },
    shouldCloseOnOverlayClick: shouldCloseOnOverlayClick,
    closeTimeoutMS: MODAL_CLOSE_TRANSITION_TIME,
    style: {
      overlay: {
        zIndex: '700',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(36, 39, 41, 0.7)',
      },
      content: {
        height: '568px',
        position: 'absolute',
        top: 'calc(var(--vh, 1vh) * 50)',
        transform: 'translate3d(0, -50%, 0)',
        left: '18px',
        right: '18px',
        background: 'rgba(36, 39, 41, 0)',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
        border: 'none',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    },
  };

  return (
    // @ts-expect-error
    <StyledReactModal {...reactModalParams}>
      <Background currentCardIdx={currentCardIdx} />
      <Content>
        <StyledSwiper
          currentCardIdx={currentCardIdx}
          setCurrentCardIdx={setCurrentCardIdx}
        />
        <CloseButtonSection
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
          setIsOpen={setIsOpen}
          onSubmit={onSubmit}
        />
      </Content>
    </StyledReactModal>
  );
}

export default TertiaryModal;

const StyledReactModal = styled(ReactModal)`
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
