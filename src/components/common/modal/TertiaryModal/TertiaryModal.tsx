import styled from 'styled-components';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { calcRatio } from '@lib/styles/theme';
import InstructionCard from './InstructionCard';
import CloseButton from '../../Button/CloseButton';
import { ReactComponent as ModalContentMoney } from '@assets/illust/modal-content-money.svg';
import { ReactComponent as ModalContentSaving } from '@assets/illust/modal-content-saving.svg';

interface TertiaryProps {
  /** submit 시 처리될 지스니스 로직을 처리하는 함수 입니다. */
  onClose: any;
}

// 모달 내부에 표시될 UI 작성
function Tertiary({ onClose }: TertiaryProps) {
  const reactModalParams = {
    isOpen: true,
    style: {
      overlay: {
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
        top: `${calcRatio(96, 760)}`,
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
  function handleCancel() {
    onClose();
  }

  return (
    // @ts-expect-error
    <ReactModal {...reactModalParams}>
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
              bodyText={`은행에서는 돈을 맡기면\n맡긴 돈의 일정 부분을 주는 것`}
            >
              <ModalContentMoney />
            </InstructionCard>
          </SwiperSlide>
          <SwiperSlide>
            <InstructionCard
              headerText="아지율이란?"
              bodyText={`전체 맡긴 돈 중에 이자가\n얼마나 차지하는 지를 나태내는 말\n\n예를 들어 20%의 이자율을 주는\n은행이라면 내가 100만원을 저금했을 때\n20만원의 지아를 받을 수 있어요`}
            >
              <ModalContentMoney />
            </InstructionCard>
          </SwiperSlide>
          <SwiperSlide>
            <InstructionCard
              headerText="이자부스터란?"
              bodyText={`실제 은행의 이자율과 같은 말로\n뱅키즈 내에서 사용돼요!`}
            >
              <ModalContentSaving />
            </InstructionCard>
          </SwiperSlide>
        </StyledSwiper>
        <CloseButtonPositioner>
          <CloseButton onClick={handleCancel} />
        </CloseButtonPositioner>
      </Content>
    </ReactModal>
  );
}

export default Tertiary;

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 504px;

  .yellow-box {
    height: 230px;
    width: 100%;

    position: absolute;
    left: 50%;
    top: 116px; // overlap 1px
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

const CloseButtonPositioner = styled.div`
  margin-top: 16px;
`;
