import styled from 'styled-components';
import { ReactComponent as ModalContentBanky } from '@assets/illust/modal-content-banki.svg';
import ReactModal from 'react-modal';
import CheckButton from '../Button/CheckButton';
import { clacRatio } from '@lib/styles/theme';

interface PrimaryModalProps {
  /** submit 시 처리될 지스니스 로직을 처리하는 함수 입니다. */
  onSubmit?: any;
  /** header에 표시될 내용을 입력합니다. */
  headerContent: string;
  /** body에 표시될 내용을 입력합니다. */
  bodyContent: string;
}

// 모달 내부에 표시될 UI 작성
function PrimaryModal({
  onSubmit,
  headerContent,
  bodyContent,
}: PrimaryModalProps) {
  function handleSubmit() {
    onSubmit();
  }

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
        height: '488px',
        position: 'absolute',
        top: `${clacRatio(136, 760)}`,
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
    <ReactModal {...reactModalParams}>
      <Content>
        <WhiteBox>
          <ModalContentBanky />
          <span className="main-label">{headerContent}</span>
          <span className="sub-label">{bodyContent}</span>
        </WhiteBox>
        <CheckButtonPositioner>
          <CheckButton onClick={handleSubmit} />
        </CheckButtonPositioner>
      </Content>
    </ReactModal>
  );
}

export default PrimaryModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WhiteBox = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 424px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.large};

  svg {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .main-label {
    ${({ theme }) => theme.typo.popup.Title_T_21_EB}
    height: 21px;
    margin-top: 8px;
    margin-bottom: 16px;
  }

  .sub-label {
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    height: 14px;
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    margin-bottom: 36px;
  }
`;

const CheckButtonPositioner = styled.div`
  margin-top: 16px;
`;
