import styled from 'styled-components';
import ReactModal from 'react-modal';
import CheckButton from '../buttons/CheckButton';
import { calcRatio } from '@lib/styles/theme';
import renderCongratsIllust from '@lib/utils/common/renderCongratsIllust';

interface PrimaryModalProps {
  /**
   * submit (제출 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
   * useModals hook에 의해 반환 됩니다.
   * */
  onSubmit?: any;
  isKid: boolean;
  isFemale: boolean;
  /** header에 표시될 내용을 입력합니다. */
  headerText: string;
  /** body에 표시될 내용을 입력합니다. */
  bodyText: string;
}

function PrimaryModal({
  onSubmit,
  isKid,
  isFemale,
  headerText,
  bodyText,
}: PrimaryModalProps) {
  const reactModalParams = {
    isOpen: true,
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
        // top: '19vh',
        top: '50vh',
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

  function handleSubmit() {
    onSubmit();
  }

  return (
    // @ts-expect-error
    <ReactModal {...reactModalParams}>
      <Content>
        <WhiteBox>
          <div className="illust-wrapper">
            {renderCongratsIllust(isKid, isFemale)}
          </div>
          <span className="header">{headerText}</span>
          <span className="body">{bodyText}</span>
        </WhiteBox>
        <CheckButtonWrapper>
          <CheckButton onClick={handleSubmit} />
        </CheckButtonWrapper>
      </Content>
    </ReactModal>
  );
}

export default PrimaryModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
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
    width: ${calcRatio(206, 292)};
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

const CheckButtonWrapper = styled.div`
  margin-top: 16px;
`;

// https://codepen.io/designcouch/pen/obvKxm
