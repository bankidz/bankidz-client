import { useState } from 'react';
import styled from 'styled-components';
import CloseButton from '../../buttons/CloseButton';
import InstructionCard from './InstructionCard';
import { ReactComponent as ModalContentMoney } from '@assets/illusts/congrats/coins.svg';
import { ReactComponent as ModalContentSaving } from '@assets/illusts/congrats/congrats_banki_with_coins.svg';
import ReactModal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import '../styles.css';

interface TertiaryModalProps {
  /**
   * submit (모달 하단 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
   * useModals hook에 의해 반환 됩니다.
   * */
  onSubmit: any;
}

function TertiaryModal({ onSubmit }: TertiaryModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  function handleSubmit() {
    setIsOpen(false);
    setTimeout(() => {
      onSubmit();
    }, 125);
  }

  const reactModalParams = {
    isOpen: isOpen,
    onRequestClose: () => setIsOpen(false),
    // shouldCloseOnOverlayClick: true,
    closeTimeoutMS: 125,
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

  const [swiper, setSwiper] = useState(null);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const swiperParams = {
    onSwiper: setSwiper,
    onSlideChange: (e: any) => setCurrentCardIdx(e.activeIndex),
    slidesPerView: 1,
  };

  return (
    // @ts-expect-error
    <StyledReactModal {...reactModalParams}>
      <Background>
        <div className="yellow-box"></div>
        <div className="white-box">
          <ProgressCircle currentCardIdx={currentCardIdx}>
            <div className="first" />
            <div className="second" />
            <div className="third" />
          </ProgressCircle>
        </div>
      </Background>
      <Content>
        {/* @ts-expect-error */}
        <StyledSwiper {...swiperParams} ref={setSwiper}>
          <SwiperSlide>
            <InstructionCard
              headerText="이자란?"
              bodyText={`우리가 맡긴 돈에\n추가로 은행이 주는 돈`}
              currentCardIdx={currentCardIdx}
            >
              <ModalContentMoney />
            </InstructionCard>
          </SwiperSlide>
          <SwiperSlide>
            <InstructionCard
              headerText="이자율이란?"
              bodyText={`돈을 밭기면 얼만큼 이자를\n받을 수 있는지 나타내는 말\n\n예를 들어 내가 100만원을 저금하고\n이자율이 20%라면,\n100 X 20% (0.02) = 20만원\n이자를 받을 수 있어요`}
              currentCardIdx={currentCardIdx}
            >
              <ModalContentMoney />
            </InstructionCard>
          </SwiperSlide>
          <SwiperSlide>
            <InstructionCard
              headerText="이자부스터란?"
              bodyText={`실제 은행의 이자율과 같은 말로\n뱅키즈 내에서 사용돼요!`}
              currentCardIdx={currentCardIdx}
            >
              <ModalContentSaving />
            </InstructionCard>
          </SwiperSlide>
        </StyledSwiper>
        {/* <CloseButtonOverlay onClick={() => setIsOpen(false)} /> */}
        <CloseButtonOverlay />
        <CloseButtonWrapper>
          <CloseButton onClick={handleSubmit} />
        </CloseButtonWrapper>
      </Content>
    </StyledReactModal>
  );
}

export default TertiaryModal;

const StyledReactModal = styled(ReactModal)`
  @keyframes slide {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50%);
    }
  }
  animation: slide ${({ theme }) => theme.animation.modalOpen};
`;

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 504px;

  .yellow-box {
    height: 230px;
    width: 100%;

    position: absolute;
    left: 50%;
    top: 117px; // overlaps 2px
    transform: translate3d(-50%, -50%, 0);

    background: ${({ theme }) => theme.palette.main.yellow100};
    border-top-left-radius: ${({ theme }) => theme.radius.large};
    border-top-right-radius: ${({ theme }) => theme.radius.large};
  }
  .white-box {
    height: 274px;
    width: 100%;

    display: flex;
    justify-content: center;

    position: absolute;
    left: 50%;
    top: 367px; // 230 + 274 / 2
    transform: translate3d(-50%, -50%, 0);

    background: ${({ theme }) => theme.palette.greyScale.white};
    border-bottom-left-radius: ${({ theme }) => theme.radius.large};
    border-bottom-right-radius: ${({ theme }) => theme.radius.large};
  }
`;

const ProgressCircle = styled.div<{ currentCardIdx: number }>`
  margin-top: 246px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 52px;
  height: 12px;

  div {
    border-radius: 100%;
    width: 12px;
    height: 12px;
  }
  .first {
    background: ${({ currentCardIdx, theme }) =>
      currentCardIdx === 0
        ? theme.palette.main.yellow300
        : theme.palette.greyScale.grey200};
  }
  .second {
    background: ${({ currentCardIdx, theme }) =>
      currentCardIdx === 1
        ? theme.palette.main.yellow300
        : theme.palette.greyScale.grey200};
  }
  .third {
    background: ${({ currentCardIdx, theme }) =>
      currentCardIdx === 2
        ? theme.palette.main.yellow300
        : theme.palette.greyScale.grey200};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 90%;
  width: 100%;
  height: 504px;
`;

const CloseButtonOverlay = styled.button`
  width: 100%;
  height: 64px;
  cursor: default;
`;

const CloseButtonWrapper = styled.div`
  margin-top: 520px;
  position: absolute;
  z-index: 701;
`;
