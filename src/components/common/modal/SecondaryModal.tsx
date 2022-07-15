import styled from 'styled-components';
import { ReactComponent as ModalContentFinish } from '@assets/illust/congrats/congrats_goal.svg';
import ReactModal from 'react-modal';
import CheckButton from '../button/CheckButton';
import { calcRatio } from '@lib/styles/theme';

interface SecondaryModalProps {
  /** submit 시 처리될 지스니스 로직을 처리하는 함수 입니다. */
  onSubmit?: any;
  /** badge에 표시될 내용을 입력합니다. */
  badgeText: string;
  /** header에 표시될 내용을 입력합니다. */
  headerText: string;
  /** body에 표시될 내용을 입력합니다. */
  bodyText: string;
}

// 모달 내부에 표시될 UI 작성
function SecondaryModal({
  onSubmit,
  badgeText,
  headerText,
  bodyText,
}: SecondaryModalProps) {
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
        height: '560px',
        position: 'absolute',
        top: `${calcRatio(100, 760)}`,
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
          <ModalContentFinish />
          <span className="badge">{badgeText}</span>
          <span className="header">{headerText}</span>
          <div className="body">{bodyText}</div>
        </WhiteBox>
        <CheckButtonPositioner>
          <CheckButton onClick={handleSubmit} />
        </CheckButtonPositioner>
      </Content>
    </ReactModal>
  );
}

export default SecondaryModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WhiteBox = styled.div`
  background: white;
  height: 496px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.large};

  // TODO:
  svg {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 36px;
    padding-bottom: 8px;
  }

  .badge {
    padding: 4px 8px;
    gap: 8px;
    height: 26px;
    background: ${({ theme }) => theme.palette.main.yellow400}; // TODO:
    border-radius: ${({ theme }) => theme.radius.large};

    font-style: normal;
    font-weight: 800;
    font-size: 12px;
    line-height: 150%;
    color: white;
  }

  .header {
    margin-top: 12px;
    ${({ theme }) => theme.typo.popup.Title_T_21_EB}
  }

  .body {
    margin-top: 16px;
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    line-height: 150%;

    display: flex;
    align-items: center;
    text-align: center;
    white-space: pre-wrap;
  }
`;

const CheckButtonPositioner = styled.div`
  margin-top: 16px;
`;
