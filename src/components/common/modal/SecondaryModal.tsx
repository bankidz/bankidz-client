import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import { calcRatio } from '@lib/styles/theme';
import { ReactComponent as ModalContentFinish } from '@assets/illust/modal-content-finish.svg';
import { ReactComponent as Check } from '@assets/icon/check.svg';
import { darken } from 'polished';

interface SecondaryModalProps {
  /** submit 시 처리될 지스니스 로직을 처리하는 함수 입니다. */
  onSubmit?: any;
  /** badge에 표시될 내용을 입력합니다. */
  badgeContent: string;
  /** header에 표시될 내용을 입력합니다. */
  headerContent: string;
  /** body에 표시될 내용을 입력합니다. */
  bodyContent: string;
}

// 모달 내부에 표시될 UI 작성
function SecondaryModal({
  onSubmit,
  badgeContent,
  headerContent,
  bodyContent,
}: SecondaryModalProps) {
  function handleSubmit() {
    onSubmit();
  }
  // 확장성을 위해 함수로 작성하였습니다.
  function renderSvgContent() {
    return <ModalContentFinish />;
  }
  return (
    <ReactModal
      isOpen
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#191919',
          opacity: '0.7',
        },
        content: {
          height: '560px',
          position: 'absolute',
          top: `${calcRatio(100, 760)}`, // TODO: status bar 포함해서 정렬하는지 확인 필요
          left: '18px',
          right: '18px',
          background: '#191919',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          border: 'none',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
      }}
    >
      <Content>
        <WhiteBox>
          {renderSvgContent()}
          <span className="badge">{badgeContent}</span>
          <span className="header">{headerContent}</span>
          <div className="body">{bodyContent}</div>
        </WhiteBox>
        <OverlayBox>
          <button onClick={handleSubmit}>
            <Check />
          </button>
        </OverlayBox>
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

  // TODO: 디자인 이삼함. 피그마에 디자인팀 맨션해서 코멘트 남김.
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
    background: ${({ theme }) =>
      theme.palette.main.yellow400}; // TODO: color 확인 필요
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

const OverlayBox = styled.div`
  padding-top: 16px;
  button {
    width: 48px;
    height: 48px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: ${({ theme }) =>
      theme.palette.main.yellow400}; // TODO: color 확인 필요
    border-radius: ${({ theme }) => theme.radius.medium};

    ${({ theme }) => {
      const selected = theme.palette.main.yellow400; // TODO: color 확인 필요
      return css`
        &:active {
          background: ${darken(0.1, selected)};
        }
      `;
    }}
  }
`;

// https://stackoverflow.com/questions/58355628/animate-react-modal
// https://codepen.io/designcouch/pen/obvKxm
