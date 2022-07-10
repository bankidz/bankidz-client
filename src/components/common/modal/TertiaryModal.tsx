import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import { clacRatio } from '../../../lib/styles/theme';
import { ReactComponent as ModalContentMoney } from '../../../assets/icons/modal-content-money.svg';
import { ReactComponent as Close } from '../../../assets/icons/close.svg';
import { darken } from 'polished';

interface TertiaryProps {
  /** submit 시 처리될 지스니스 로직을 처리하는 함수 입니다. */
  onClose: any;
  /** header에 표시될 내용을 입력합니다. */
  headerContent: string;
  /** body에 표시될 내용을 입력합니다. */
  bodyContent: string;
  progress: number;
}

// 모달 내부에 표시될 UI 작성
function Tertiary({ onClose, headerContent, bodyContent }: TertiaryProps) {
  function handleCancel() {
    onClose();
  }
  // 확장성을 위해 함수로 작성하였습니다.
  function renderSvgContent() {
    return <ModalContentMoney />;
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
          height: '568px',
          position: 'absolute',
          top: `${clacRatio(96, 760)}`, // TODO: status bar 포함해서 정렬하는지 확인 필요
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
        <YellowBox>{renderSvgContent()}</YellowBox>
        <WhiteBox>
          <div className="text-positioner">
            <span className="header">{headerContent}</span>
            <div className="body">{bodyContent}</div>
          </div>
          <ProgressCircle>
            <div className="one" />
            <div className="two" />
            <div className="three" />
          </ProgressCircle>
        </WhiteBox>
        <OverlayBox>
          <button onClick={handleCancel}>
            <Close />
          </button>
        </OverlayBox>
      </Content>
    </ReactModal>
  );
}

export default Tertiary;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const YellowBox = styled.div`
  background: ${({ theme }) => theme.palette.yellow[1]};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  height: 230px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  background: white;
  height: 274px; // 504 - 230
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;

  .text-positioner {
    margin-top: 24px;
    gap: 16px;
    width: 292px;
    height: 198px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .header {
      font-weight: 800;
      font-size: 24px;
      line-height: 100%;
      color: #191919;
    }

    .body {
      margin-top: 16px;
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 160%;

      display: flex;
      align-items: center;
      text-align: center;
      white-space: pre-wrap;
    }
  }
`;

const ProgressCircle = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 46px;
  height: 10px;
  div {
    border-radius: 3px;
    width: 10px;
    height: 10px;
  }
  .one {
    background-color: ${({ theme }) => theme.palette.yellow[0]};
  }
  .two {
    background-color: ${({ theme }) => theme.palette.gray[2]};
  }
  .three {
    background-color: ${({ theme }) => theme.palette.gray[2]};
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

    background: ${({ theme }) => theme.palette.gray[2]};
    border-radius: 12px;
    ${({ theme }) => {
      const selected = theme.palette.gray[2];
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
