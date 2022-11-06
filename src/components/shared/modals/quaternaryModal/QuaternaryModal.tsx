import { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import '../styles.css';
import { modals } from '../Modals';
import { slideAnimation } from '../slideAnimation';
import { MODAL_CLOSE_TRANSITION_TIME } from '@lib/constants/MODAL';
import useModals from '@lib/hooks/useModals';
import renderBankiWalk from '@lib/utils/render/renderBankiWalk';
import Button from '@components/shared/buttons/Button';

interface QuaternaryModalProps {
  onSubmit: any;
  onExtraSubmit: any;
  interestPrice: number;
  title: string;
  weeks: number;
  successWeeks: number;
  shouldCloseOnOverlayClick?: boolean;
}

/**
 * @param onSubmit @param onExtraSubmit
 * submit (모달 하단 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
 * 왼쪽 버튼은 onSubmit을, 오른쪽 버튼은 onExtraSubmit을 사용합니다.
 */
function QuaternaryModal({
  onSubmit,
  onExtraSubmit,
  interestPrice,
  title,
  weeks,
  successWeeks,
  shouldCloseOnOverlayClick = false,
}: QuaternaryModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { closeModal } = useModals();
  const reactModalParams = {
    isOpen: isOpen,
    onRequestClose: () => {
      setIsOpen(false);
      setTimeout(() => {
        closeModal(modals.primaryModal);
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
        height: '409px',
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

  const handleSubmit = () => {
    setIsOpen(false);
    setTimeout(() => {
      onSubmit();
    }, MODAL_CLOSE_TRANSITION_TIME);
  };
  const handleExtraSubmit = () => {
    setIsOpen(false);
    setTimeout(() => {
      onExtraSubmit();
    }, MODAL_CLOSE_TRANSITION_TIME);
  };

  return (
    // @ts-expect-error
    <StyledReactModal {...reactModalParams}>
      <Content>
        <WhiteBox>
          <header>
            <h1>{interestPrice.toLocaleString('ko-KR')}원을 지급하셨나요?</h1>
            <h2>자녀의 실제 저금액이 맞는지 따로 확인해주세요</h2>
          </header>
          <div className="illust-wrapper">{renderBankiWalk(10)}</div>
          <section>
            <h1>{title}</h1>
            <p>
              {`총 ${weeks}주 중에 `}
              <span>{`${successWeeks}주 `}</span>
              {`걷기 성공해서\n이자가 `}
              <span>{`${interestPrice.toLocaleString('ko-KR')}원 `}</span>
              쌓였어요
            </p>
          </section>
        </WhiteBox>
        <DoubleButtonWrapper>
          <Button
            property="delete"
            label="나중에 할게요"
            onClick={handleSubmit}
          />
          <Button
            property="default"
            label="지급했어요"
            onClick={handleExtraSubmit}
          />
        </DoubleButtonWrapper>
      </Content>
    </StyledReactModal>
  );
}

export default QuaternaryModal;

const StyledReactModal = styled(ReactModal)`
  ${slideAnimation}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const WhiteBox = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 345px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.large};
  text-align: center;

  header h1 {
    margin-top: 32px;
    ${({ theme }) => theme.typo.popup.Title_T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  header h2 {
    margin-top: 12px;
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
  }
  .illust-wrapper {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 92px;
    height: 92px;
  }
  section {
    background: ${({ theme }) => theme.palette.greyScale.white};
  }
  section h1 {
    margin-top: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  section p {
    margin-top: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    white-space: pre-wrap;
    line-height: 150%;

    span {
      color: ${({ theme }) => theme.palette.main.yellow400};
    }
  }
`;

const DoubleButtonWrapper = styled.div`
  width: 100%;
  margin-top: 361px;
  position: absolute;
  z-index: 701;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
`;
