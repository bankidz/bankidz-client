import styled from 'styled-components';
import { ReactComponent as CongratsGoal } from '@assets/illust/congrats/congrats_goal.svg';
import ReactModal from 'react-modal';
import CheckButton from '../button/CheckButton';
import { calcRatio } from '@lib/styles/theme';

interface SecondaryModalProps {
  /**
   * submit (제출 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
   * useModals hook에 의해 반환 됩니다.
   * */
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
        height: '552px',
        position: 'absolute',
        top: '14vh',
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
          <div className="illust-wrapper">
            <CongratsGoal />
          </div>
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
  width: 100%;
`;

const WhiteBox = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 488px;
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

  .header {
    margin-top: 16px;
    ${({ theme }) => theme.typo.popup.Title_T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }

  .body {
    margin-top: 16px;
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
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
