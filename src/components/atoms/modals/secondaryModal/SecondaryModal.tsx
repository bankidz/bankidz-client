import { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { slideAnimation } from '../slideAnimation';
import { modals } from '../Modals';
import { ReactComponent as CongratsGoal } from '@assets/illusts/congrats/congrats_goal.svg';
import { calcRatio } from '@lib/styles/theme';
import '../styles.css';
import CheckButton from '@components/atoms/buttons/CheckButton';
import { MODAL_CLOSE_TRANSITION_TIME } from '@lib/constants/MODAL';
import useModals from '@lib/hooks/useModals';

interface SecondaryModalProps {
  onSubmit: any;
  badgeText?: string;
  headerText: string;
  bodyText: string;
  hasBadge?: boolean;
  shouldCloseOnOverlayClick?: boolean;
}

/**
 * @param onSubmit submit (모달 하단 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
 * useModals hook에 의해 반환 됩니다.
 * @param badgeText badge에 표시될 내용을 입력합니다.
 * @param headerText header에 표시될 내용을 입력합니다.
 * @param bodyText body에 표시될 내용을 입력합니다.
 * @param hasBadge 노란색 배지 포함 여부를 선택합니다. 기본값은 true 입니다.
 */
function SecondaryModal({
  onSubmit,
  badgeText,
  headerText,
  bodyText,
  hasBadge = true,
  shouldCloseOnOverlayClick = false,
}: SecondaryModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  let height;
  if (hasBadge) {
    height = '552px';
  } else {
    height = '488px';
  }
  const { closeModal } = useModals();
  const reactModalParams = {
    isOpen: isOpen,
    onRequestClose: () => {
      setIsOpen(false);
      setTimeout(() => {
        closeModal(modals.secondaryModal);
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
        height: height,
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

  return (
    // @ts-expect-error
    <StyledReactModal {...reactModalParams}>
      <Content>
        <WhiteBox hasBadge={hasBadge}>
          <div className="illust-wrapper">
            <CongratsGoal />
          </div>
          {hasBadge && <span className="badge">{badgeText}</span>}
          <HeaderText hasBadge={hasBadge}>{headerText}</HeaderText>
          <BodyText>{bodyText}</BodyText>
        </WhiteBox>
        <CheckButtonOverlay
          onClick={() => shouldCloseOnOverlayClick && setIsOpen(false)}
        />
        <CheckButtonWrapper hasBadge={hasBadge}>
          <CheckButton onClick={handleSubmit} />
        </CheckButtonWrapper>
      </Content>
    </StyledReactModal>
  );
}

export default SecondaryModal;

const StyledReactModal = styled(ReactModal)`
  ${slideAnimation}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const WhiteBox = styled.div<{ hasBadge: boolean }>`
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: ${({ hasBadge }) => (hasBadge ? '488px' : '424px')};
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.large};

  padding-left: 16px;
  padding-right: 16px;

  .illust-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 293px;

    margin-top: 32px;
    margin-bottom: 8px;
  }

  svg {
    width: ${calcRatio(202, 292)};
  }

  .badge {
    width: 97px;
    height: 26px;

    background: ${({ theme }) => theme.palette.main.yellow100};
    border-radius: ${({ theme }) => theme.radius.large};

    ${({ theme }) => theme.typo.tag.T_12_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};

    line-height: 26px;
    vertical-align: center;
    display: inline-block;
    text-align: center;
  }
`;

const HeaderText = styled.span<{ hasBadge: boolean }>`
  margin-top: ${({ hasBadge }) => (hasBadge ? '16px' : '33.04')};
  ${({ theme }) => theme.typo.popup.Title_T_21_EB};
  color: ${({ theme }) => theme.palette.greyScale.black};
`;

const BodyText = styled.div`
  margin-top: 16px;
  ${({ theme }) => theme.typo.popup.Sub_S_14_R}
  color: ${({ theme }) => theme.palette.greyScale.grey600};
  line-height: 150%;

  display: flex;
  align-items: center;
  text-align: center;
  white-space: pre-wrap;
`;

const CheckButtonOverlay = styled.button`
  width: 100%;
  height: 64px;
  cursor: default;
`;

const CheckButtonWrapper = styled.div<{ hasBadge: boolean }>`
  margin-top: ${({ hasBadge }) => (hasBadge ? '504px' : '440px')};
  position: absolute;
  z-index: 701;
`;
