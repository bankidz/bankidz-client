import styled from 'styled-components';
import ReactModal from 'react-modal';
import CheckButton from '../../Button/CheckButton';
import { calcRatio } from '@lib/styles/theme';
import PerforatedLineTop from './PeforatedLineTop';
import PerforatedLineBottom from './PerforatedLineBottom';
import { ReactComponent as HorizontalDashedBorder } from '@assets/border/horizontal-dashed-border.svg';
import { ReactComponent as VerticalDashedBorder } from '@assets/border/vertical-dashed-border.svg';

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
        height: '554px',
        position: 'absolute',
        top: `${calcRatio(103, 760)}`,
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
        <PerforatedLineTop />
        <Top>
          <span className="sub">계약서 전송 성공!</span>
          <span className="main">완구퍼펙트걸 되기</span>
          <div className="dashed-space"></div>
          <div className="dashed-space-linear"></div>
        </Top>
        <div className="vertical-dashed-border-wrapper">
          <VerticalDashedBorder />
        </div>
        <div className="first-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder />
        </div>
        <div className="second-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder />
        </div>
        <div className="third-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder />
        </div>
        <Bottom>
          <div className="first-row">
            <div className="계약-대상">계약대상</div>
            <div className="목표-아이템">목표 아이템</div>
          </div>
          <div className="second-row">
            <div className="목표-적금액">목표 저금액</div>
            <div className="매주-저금액">매주 저금액</div>
            <div className="이자부스터">이자부스터</div>
          </div>
          <div className="third-row">
            <div className="총-소요기간">총 소요기간</div>
            <div className="계약종료일">계약종료일</div>
            <div className="placeholder">placeholder</div>
          </div>
          <div className="signature">대충 서명</div>
        </Bottom>
        <CheckButtonPositioner>
          <CheckButton onClick={handleSubmit} />
        </CheckButtonPositioner>
        <PerforatedLineBottom />
      </Content>
    </ReactModal>
  );
}

export default PrimaryModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  // background border (vertical, horizontal)
  position: relative;
  .vertical-dashed-border-wrapper {
    position: absolute;
    left: 50%;
    top: 167px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    /* background: skyblue; */
    width: 2px;
    height: 100px;
  }
  .first-horizontal-dashed-border-wrapper {
    position: absolute;
    left: 50%;
    top: 115px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    /* background: pink; */
    width: 100%;
    height: 3px;
  }
  .second-horizontal-dashed-border-wrapper {
    position: absolute;
    left: 50%;
    top: 216px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    /* background: pink; */
    width: 100%;
    height: 3px;
  }
  .third-horizontal-dashed-border-wrapper {
    position: absolute;
    left: 50%;
    top: 286px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    /* background: pink; */
    width: 100%;
    height: 3px;
  }
`;

const Top = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 100px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: ${({ theme }) => theme.radius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.radius.medium};

  .sub {
    ${({ theme }) => theme.typo.text.S_14_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
  .main {
    margin-top: 12px;
    ${({ theme }) => theme.typo.popup.T_24_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
  }
`;

const Bottom = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  width: 100%;
  height: 360px;

  border-top-left-radius: ${({ theme }) => theme.radius.medium};
  border-top-right-radius: ${({ theme }) => theme.radius.medium};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;

  .first-row {
    width: 100%;
    height: 102px;
    background: green;
  }
  .second-row {
    width: 100%;
    height: 70px;
    background: red;
  }
  .third-row {
    width: 100%;
    height: 100px;
    background: blue;
  }
`;

const CheckButtonPositioner = styled.div`
  margin-top: 16px;
`;

// http://jsfiddle.net/dineshranawat/Ls95n95L/
// https://codepen.io/amit_sheen/pen/xxZeyjO
// http://www.liangshunet.com/en/202004/998851523.htm
