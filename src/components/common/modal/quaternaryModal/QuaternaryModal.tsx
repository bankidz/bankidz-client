import styled from 'styled-components';
import ReactModal from 'react-modal';
import { calcRatio, theme } from '@lib/styles/theme';
import CheckButton from '../../button/CheckButton';
import { ReactComponent as HorizontalDashedBorder } from '@assets/border/horizontal-dashed-border.svg';
import { ReactComponent as VerticalDashedBorder } from '@assets/border/vertical-dashed-border.svg';
import { ReactComponent as BankiDad } from '@assets/illust/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illust/banki/banki_mom.svg';
import { TItemName } from '@lib/types/kid';
import PerforatedLineTop from './PerforatedLineTop';
import PerforatedLineBottom from './PerforatedLineBottom';
import { renderItemIllust } from '@lib/utils/kid';
import { getContractEndDate } from '@lib/utils/common';

interface QuaternaryModalProps {
  /**
   * submit (제출 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
   * useModals hook에 의해 반환 됩니다.
   * */
  onSubmit?: any;
  createdAt: string;
  interestRate: number;
  isMom: boolean;
  itemName: TItemName;
  title: string;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
}

// 모달 내부에 표시될 UI 작성
function QuaternaryModal({
  onSubmit,
  createdAt = '2022-07-05 05:05:05',
  interestRate = 30,
  isMom = true,
  itemName = '전자제품',
  title = '에어팟 사기',
  totalPrice = 150000,
  weekPrice = 10000,
  weeks = 15,
}: QuaternaryModalProps) {
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

  function handleSubmit() {
    onSubmit();
  }

  return (
    // @ts-expect-error
    <ReactModal {...reactModalParams}>
      <Content>
        <PerforatedLineTop fill={theme.palette.greyScale.white} />
        <Top>
          <span className="header">계약서 전송 성공!</span>
          <span className="body">{title}</span>
        </Top>

        {/* background border (vertical, horizontal) */}
        <div className="vertical-dashed-border-wrapper">
          <VerticalDashedBorder />
        </div>
        <div className="first-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder fill={theme.palette.greyScale.grey100} />
        </div>
        <div className="second-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder fill={theme.palette.greyScale.grey100} />
        </div>
        <div className="third-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder fill={theme.palette.greyScale.grey100} />
        </div>

        <Bottom>
          <div className="first-row">
            <div className="계약대상">
              <div className="banki-illust">
                {isMom ? <BankiMom /> : <BankiDad />}
              </div>
              <div className="text-wrapper">
                <div className="title">계약대상</div>
                <div className="content">
                  {isMom === true ? '엄마' : '아빠'}
                </div>
              </div>
            </div>
            <div className="목표아이템">
              <div className="item-illust">{renderItemIllust(itemName)}</div>
              <div className="text-wrapper">
                <div className="title">목표 아이템</div>
                <div className="content">{itemName}</div>
              </div>
            </div>
          </div>
          <div className="second-row">
            <div className="목표저금액">
              <div className="title">목표 저금액</div>
              <div className="content">
                {totalPrice.toLocaleString('ko-KR')}
              </div>
            </div>
            <div className="매주저금액">
              <div className="title">매주 저금액</div>
              <div className="content">{weekPrice.toLocaleString('ko-KR')}</div>
            </div>
            <div className="이자부스터">
              <div className="title">이자부스터</div>
              <div className="content">{interestRate}%</div>
            </div>
          </div>
          <div className="third-row">
            <div className="총소요기간">
              <div className="title">총 소요기간</div>
              <div className="content">{weeks}주</div>
            </div>
            <div className="계약종료일">
              <div className="text-wrapper">
                <div className="title">계약종료일</div>
                <div className="content">
                  {getContractEndDate(createdAt, weeks)}
                </div>
              </div>
            </div>
          </div>

          <SignatureWrapper>대충 서명</SignatureWrapper>
        </Bottom>
        <PerforatedLineBottom fill={theme.palette.greyScale.white} />
        <CheckButtonPositioner>
          <CheckButton onClick={handleSubmit} />
        </CheckButtonPositioner>
      </Content>
    </ReactModal>
  );
}

export default QuaternaryModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  // background border (vertical, horizontal)
  position: relative;
  .vertical-dashed-border-wrapper {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 167px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 2px;
    height: 100px;
  }
  .first-horizontal-dashed-border-wrapper {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 115px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3px;
    padding-left: 16px;
    padding-right: 16px;
  }
  .second-horizontal-dashed-border-wrapper {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 216px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3px;
    padding-left: 16px;
    padding-right: 16px;
  }
  .third-horizontal-dashed-border-wrapper {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 286px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const Top = styled.div`
  margin: -1px 0; // overlap 1px
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 100px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: ${({ theme }) => theme.radius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.radius.medium};

  .header {
    ${({ theme }) => theme.typo.text.S_14_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
  .body {
    margin-top: 12px;
    ${({ theme }) => theme.typo.popup.T_24_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
  }
`;

const Bottom = styled.div`
  margin-bottom: -1px; // overlap 1px
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
    display: flex;
    justify-content: space-between;
    align-items: center;

    .계약대상 {
      display: flex;
      justify-content: space-between;
      width: 50%;
      height: 100%;
      .banki-illust {
        width: 60.98px;
        margin-left: ${calcRatio(21, 162)};
      }
      .text-wrapper {
        width: 47px;
        height: 100%;
        margin-right: ${calcRatio(20, 162)};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          ${({ theme }) => theme.typo.text.S_12_M};
          color: ${({ theme }) => theme.palette.greyScale.grey500};
          margin-bottom: 8px;
        }
        .content {
          ${({ theme }) => theme.typo.button.InnerText_T_15_EB};
          color: ${({ theme }) => theme.palette.greyScale.grey700};
        }
      }
    }

    .목표아이템 {
      display: flex;
      justify-content: space-between;
      width: 50%;
      height: 100%;
      .item-illust {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        margin-left: ${calcRatio(9, 162)};
      }
      .text-wrapper {
        width: 58px;
        height: 100%;
        margin-right: ${calcRatio(16, 162)};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          ${({ theme }) => theme.typo.text.S_12_M};
          color: ${({ theme }) => theme.palette.greyScale.grey500};
          margin-bottom: 8px;
        }
        .content {
          width: 65px;
          text-align: center;
          ${({ theme }) => theme.typo.button.InnerText_T_15_EB};
          color: ${({ theme }) => theme.palette.greyScale.grey700};
        }
      }
    }
  }

  .second-row {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      width: 33.3%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: ${calcRatio(24, 324)};
      .title {
        width: 100%;
        height: 12px;
        ${({ theme }) => theme.typo.text.S_12_M};
        color: ${({ theme }) => theme.palette.greyScale.grey500};
        margin-bottom: 8px;
        padding: 0;
      }
      .content {
        width: 100%;
        height: 16px;
        ${({ theme }) => theme.typo.text.T_16_EB};
        color: ${({ theme }) => theme.palette.greyScale.grey700};
        padding: 0;
      }
    }
  }

  .third-row {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .총소요기간 {
      width: 33.3%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: ${calcRatio(24, 324)};
      .title {
        height: 12px;
        ${({ theme }) => theme.typo.text.S_12_M};
        color: ${({ theme }) => theme.palette.greyScale.grey500};
        margin-bottom: 8px;
        padding: 0;
      }
      .content {
        height: 16px;
        ${({ theme }) => theme.typo.text.T_21_EB};
        color: ${({ theme }) => theme.palette.main.yellow400};
        padding: 0;
      }
    }

    .계약종료일 {
      width: 66.6%;
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: ${calcRatio(24, 324)};
      .text-wrapper {
        .title {
          height: 12px;
          ${({ theme }) => theme.typo.text.S_12_M};
          color: ${({ theme }) => theme.palette.greyScale.grey500};
          margin-bottom: 8px;
        }
        .content {
          height: 16px;
          ${({ theme }) => theme.typo.text.T_21_EB};
          color: ${({ theme }) => theme.palette.main.yellow400};
        }
      }
    }
  }
  position: relative;
`;

const SignatureWrapper = styled.div`
  z-index: 900;
  position: absolute;
  right: 2px;
  bottom: 0;

  width: ${calcRatio(146, 324)};
  height: 173px; // TODO: delete height (temporary)
  background: rgba(36, 39, 41, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckButtonPositioner = styled.div`
  margin-top: 16px;
`;

// http://jsfiddle.net/dineshranawat/Ls95n95L/
// http://www.liangshunet.com/en/202004/998851523.htm
