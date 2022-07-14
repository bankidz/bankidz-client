import styled from 'styled-components';
import { ReactComponent as ModalContentBanky } from '@assets/illust/modal-content-banki.svg';
import ReactModal from 'react-modal';
import CheckButton from '../Button/CheckButton';
import { calcRatio } from '@lib/styles/theme';
import { ReactComponent as PerforationShape } from '@assets/border/perforation-shape.svg';

interface PrimaryModalProps {
  /** submit 시 처리될 지스니스 로직을 처리하는 함수 입니다. */
  onSubmit?: any;
  id: string;
  isMom: string;
  title: string;
  isAchieved: string;
  interestRate: string;
  totalPrice: string;
  weekPrice: string;
  weeks: string;
  createdAt: string;
  progressList: string | null;
  comment: string | null;
}

// 모달 내부에 표시될 UI 작성
function PrimaryModal({
  onSubmit,
  id,
  isMom,
  title,
  isAchieved,
  interestRate,
  totalPrice,
  weekPrice,
  weeks,
  createdAt,
  progressList,
  comment,
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
        height: '544px',
        position: 'absolute',
        top: `${calcRatio(108, 760)}`,
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
        <PerforationBorder>
          <span className="receipt-shape">
            <PerforationShape />
          </span>
          <span className="receipt-shape">
            <PerforationShape />
          </span>
          <span className="receipt-shape">
            <PerforationShape />
          </span>
        </PerforationBorder>
        <Top>
          <span className="sub">계약서 전송 성공!</span>
          <span className="main">완구퍼펙트걸 되기</span>
          <div className="dashed-space"></div>
          <div className="dashed-space-linear"></div>
        </Top>
        <Bottom>아빠, 학용품</Bottom>
        <CheckButtonPositioner>
          <CheckButton onClick={handleSubmit} />
        </CheckButtonPositioner>
      </Content>
    </ReactModal>
  );
}

export default PrimaryModal;

const PerforationBorder = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  width: 100%;
  background: pink;

  .receipt-shape {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    display: inline-block;
    box-sizing: content-box;
    position: relative;

    height: 5px;
    width: 20px;

    /* font-size: 16px;
    background-size: 100%;
    background-repeat: no-repeat; */
    /* background-image: radial-gradient(
      circle at 13px 0,
      rgba(36, 39, 41, 0) 0.4em,
      white 0.5em
    );
    background-position: top left, top right; */
    /* background: radial-gradient(
      25% 25% at 50% 0%,
      rgba(255, 255, 255, 0) 99.99%,
      #ffffff 100%
    ); */
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .receipt-border {
  }
  .receipt-shape {
    /* display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    display: inline-block;
    box-sizing: content-box;
    position: relative;

    height: 5px;
    width: 20px; */

    /* font-size: 16px;
    background-size: 100%;
    background-repeat: no-repeat; */
    /* background-image: radial-gradient(
      circle at 13px 0,
      rgba(36, 39, 41, 0) 0.4em,
      white 0.5em
    );
    background-position: top left, top right; */
    /* background: radial-gradient(
      25% 25% at 50% 0%,
      rgba(255, 255, 255, 0) 99.99%,
      #ffffff 100%
    ); */
  }
`;

const Top = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 110px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: ${({ theme }) => theme.radius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.radius.medium};

  /* border-top-color: lightgrey;
  border-top-style: dotted;
  border-top-width: 3px; */

  /* border-bottom-color: lightgrey; // 선 색상
  border-bottom-style: dashed; // 선 모양
  border-bottom-width: 3px; // 선 두께 */

  .sub {
    ${({ theme }) => theme.typo.text.S_14_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
  .main {
    margin-top: 12px;
    ${({ theme }) => theme.typo.popup.T_24_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
  }

  position: relative;
  .dashed-space {
    position: absolute;
    left: 50%;
    top: 50px;
    transform: translate3d(-50%, -50%, 0);

    width: 92%;
    height: 1px;
    margin-top: 10px;
    background-image: linear-gradient(
      to right,
      #f20afb 0%,
      #f20afb 50%,
      transparent 50%
    );
    background-size: 28px 1px;
    background-repeat: repeat-x;
  }
  .dashed-space-linear {
    background-image: linear-gradient(
      to right,
      #ccc 0%,
      #f20afb 50%,
      transparent 50%
    );
    background-size: 40px 1px;
  }
`;

const Bottom = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  width: 100%;
  height: 370px;

  border-top-left-radius: ${({ theme }) => theme.radius.medium};
  border-top-right-radius: ${({ theme }) => theme.radius.medium};
`;

const CheckButtonPositioner = styled.div`
  margin-top: 16px;
`;

// http://jsfiddle.net/dineshranawat/Ls95n95L/
// https://codepen.io/amit_sheen/pen/xxZeyjO
// http://www.liangshunet.com/en/202004/998851523.htm
