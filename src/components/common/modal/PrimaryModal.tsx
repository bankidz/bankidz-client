import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import { clacRatio } from '../../../lib/styles/theme';
import { ReactComponent as ModalContentBanky } from '../../../assets/icons/modal-content-banky.svg';
import { ReactComponent as Check } from '../../../assets/icons/check.svg';
import { darken } from 'polished';

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
  // 확장성을 위해 함수로 작성하였습니다.
  function renderSvgContent() {
    return <ModalContentBanky />;
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
          height: '488px',
          position: 'absolute',
          top: `${clacRatio(136, 760)}`, // TODO: status bar 포함해서 정렬하는지 확인 필요
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
          <span className="main-label">{headerContent}</span>
          <span className="sub-label">{bodyContent}</span>
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

export default PrimaryModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WhiteBox = styled.div`
  background: white;
  height: 424px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 24px;

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
    color: #82818b; // TODO: color: 디자인 시스템 확인 필요
    margin-bottom: 36px;
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

    background: ${({ theme }) => theme.palette.yellow[0]};
    border-radius: 12px;

    ${({ theme }) => {
      const selected = theme.palette.yellow[0];
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
