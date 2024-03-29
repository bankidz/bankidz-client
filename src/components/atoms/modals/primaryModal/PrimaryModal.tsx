import { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { slideAnimation } from '../slideAnimation';
import { modals } from '../Modals';
import { calcRatio } from '@lib/styles/theme';
import renderCongratsIllust from '@lib/utils/render/renderCongratsIllust';
import '../styles.css';
import CheckButton from '@components/atoms/buttons/CheckButton';
import { MODAL_CLOSE_TRANSITION_TIME } from '@lib/constants/MODAL';
import useModals from '@lib/hooks/useModals';
import { ReactComponent as CongratsFamily } from '@assets/illusts/congrats/congrats_family.svg';

interface PrimaryModalProps {
  onSubmit: any;
  isKid?: boolean;
  isFemale?: boolean;
  headerText: string;
  bodyText: string;
  isFamilyCreated?: boolean;
  shouldCloseOnOverlayClick?: boolean;
}

/**
 * @param onSubmit submit (모달 하단 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
 * useModals hook에 의해 반환 됩니다.
 * @param headerText header에 표시될 내용을 입력합니다.
 * @param bodyText body에 표시될 내용을 입력합니다.
 * @param isFamilyCreated '가족이 생겼어요' 컨텐츠 사용 시 true로 설정합니다.
 * 기본값은 false 입니다.
 */
function PrimaryModal({
  onSubmit,
  isKid,
  isFemale,
  headerText,
  bodyText,
  isFamilyCreated = false,
  shouldCloseOnOverlayClick = false,
}: PrimaryModalProps) {
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
        height: '488px',
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
    setIsOpen(false); // close transition 적용을 위해 필요
    setTimeout(() => {
      onSubmit();
    }, MODAL_CLOSE_TRANSITION_TIME);
  };

  return (
    // @ts-expect-error
    <StyledReactModal {...reactModalParams}>
      <Content>
        <WhiteBox isFamilyCreated={isFamilyCreated}>
          <div className="illust-wrapper">
            {isFamilyCreated ? (
              <CongratsFamily />
            ) : (
              renderCongratsIllust(isKid!, isFemale!)
            )}
          </div>
          <span className="header">{headerText}</span>
          <span className="body">{bodyText}</span>
        </WhiteBox>
        <CheckButtonOverlay
          onClick={() => {
            shouldCloseOnOverlayClick && setIsOpen(false);
          }}
        />
        <CheckButtonWrapper>
          <CheckButton onClick={handleSubmit} />
        </CheckButtonWrapper>
      </Content>
    </StyledReactModal>
  );
}

export default PrimaryModal;

const StyledReactModal = styled(ReactModal)`
  ${slideAnimation}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const WhiteBox = styled.div<{ isFamilyCreated: boolean }>`
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 424px;
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
    width: ${({ isFamilyCreated }) =>
      isFamilyCreated ? `${calcRatio(245, 292)}` : `${calcRatio(206, 292)}`};
  }
  .header {
    ${({ theme }) => theme.typo.popup.Title_T_21_EB}
    height: 21px;
    margin-top: 8px;
    margin-bottom: 16px;
  }
  .body {
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    height: 14px;
    margin-bottom: 36px;
  }
`;

const CheckButtonOverlay = styled.button`
  width: 100%;
  height: 64px;
  cursor: default;
`;

const CheckButtonWrapper = styled.div`
  margin-top: 440px;
  position: absolute;
  z-index: 701;
`;

// https://codepen.io/designcouch/pen/obvKxm
// https://reactcommunity.org/react-modal/styles/transitions/
// https://stackoverflow.com/questions/58355628/animate-react-modal
// https://codesandbox.io/s/csstransition-component-forked-7jiwn
// https://www.faqcode4u.com/faq/80486/animate-react-modal
