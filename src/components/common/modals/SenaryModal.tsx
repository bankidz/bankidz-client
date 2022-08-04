import styled, { ThemeProvider } from 'styled-components';
import ReactModal from 'react-modal';
import { calcRatio, theme } from '@lib/styles/theme';
import { ReactComponent as HorizontalDashedBorder } from '@assets/borders/horizontal-dashed-border.svg';
import { ReactComponent as VerticalDashedBorder } from '@assets/borders/vertical-dashed-border.svg';
import { ReactComponent as BankiDad } from '@assets/illusts/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illusts/banki/banki_mom.svg';
import { TItemName } from '@lib/types/kid';
import PerforatedLineTop from './quaternaryModal/PerforatedLineTop';
import PerforatedLineBottom from './quaternaryModal/PerforatedLineBottom';
import SuggestBadge from '../badges/SuggestBadge';
import Button from '../buttons/Button';
import renderItemIllust from '@lib/utils/common/renderItemIllust';
import { getContractEndDate } from '@lib/utils/common/getContractEndDate';
import getWeekNumberByMonth from '@lib/utils/common/getWeekNumberByMonth';

interface SenaryModalProps {
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
  comment: string;
}

// 모달 내부에 표시될 UI 작성
function SenaryModal({
  onSubmit,
  createdAt = '2022/07/05 05:05:05',
  interestRate = 30,
  isMom = true,
  itemName = '전자제품',
  title = '에어팟 사기',
  totalPrice = 150000,
  weekPrice = 10000,
  weeks = 15,
  comment = '큰 이자를 줄만한 목표가 아닌것 같다~',
}: SenaryModalProps) {
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
        height: '645px',
        position: 'absolute',
        // top: '5vh',
        // top: '50vh',
        top: 'calc(var(--vh, 1vh) * 50)',
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

  const contractEndDate = getContractEndDate(createdAt, weeks);
  const { year, month, weekNo } = getWeekNumberByMonth(contractEndDate);
  return (
    // @ts-expect-error
    <ReactModal {...reactModalParams}>
      <Content>
        <PerforatedLineTop fill={theme.palette.greyScale.white} />
        <Top>
          <SuggestBadge isSuggesting={false} />
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
        <div className="fourth-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder fill={theme.palette.greyScale.grey100} />
        </div>

        <Bottom>
          <div className="first-row">
            <div className="계약대상">
              <div className="banki-illust">
                {isMom ? <BankiMom /> : <BankiDad />}
              </div>
              <div className="text-wrapper">
                <div className="title">계약 대상</div>
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
            <div className="계약종료주차">
              <div className="text-wrapper">
                <div className="title">계약종료 주차</div>
                <div className="content">
                  {`${year}년 ${month}월 ${weekNo}주`}
                </div>
              </div>
            </div>
          </div>

          <SignatureWrapper>Signature</SignatureWrapper>
        </Bottom>
        <Comment>
          <div className="header">부모님의 한줄평</div>
          <div className="body">{comment}</div>
        </Comment>
        <PerforatedLineBottom fill={theme.palette.greyScale.white} />
        <CheckButtonWrapper>
          <Button
            onClick={handleSubmit}
            property="default"
            label="삭제하기"
            fixed
          />
        </CheckButtonWrapper>
      </Content>
    </ReactModal>
  );
}

export default SenaryModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  // background border (vertical, horizontal)
  position: relative;
  .vertical-dashed-border-wrapper {
    z-index: 700;
    position: absolute;
    left: 50%;
    top: 180px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 2px;
    height: 100px;
  }
  .first-horizontal-dashed-border-wrapper {
    z-index: 700;
    position: absolute;
    left: 50%;
    top: 130px; // 10px decreased
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
    z-index: 700;
    position: absolute;
    left: 50%;
    top: 231px; // 10px decreased
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
    z-index: 700;
    position: absolute;
    left: 50%;
    top: 301px; // 10px decreased
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3px;
    padding-left: 16px;
    padding-right: 16px;
  }
  .fourth-horizontal-dashed-border-wrapper {
    z-index: 700;
    position: absolute;
    left: 50%;
    top: 478px; // 10px decreased
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
  margin: -1px 0; // overlaps 1px
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 116px; // 10px decreased
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: ${({ theme }) => theme.radius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.radius.medium};

  .body {
    margin-top: 16px;
    ${({ theme }) => theme.typo.popup.T_24_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
  }
`;

const Bottom = styled.div`
  margin-bottom: -1px; // overlaps 1px
  background: ${({ theme }) => theme.palette.greyScale.white};
  width: 100%;
  height: 350px; // 10px decreased

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
    height: 70px;
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

    .계약종료주차 {
      width: 66.6%;
      height: 100%;
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
  border-bottom-left-radius: ${({ theme }) => theme.radius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.radius.medium};
`;

const SignatureWrapper = styled.div`
  z-index: 710;
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

const Comment = styled.div`
  border-top-left-radius: ${({ theme }) => theme.radius.medium};
  border-top-right-radius: ${({ theme }) => theme.radius.medium};
  width: 100%;
  height: 86px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  margin: -1px 0; // overlap 1px

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .header {
    width: 80px;
    height: 12px;
    ${({ theme }) => theme.typo.text.S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-left: 24px;
    margin-top: 18px;
  }
  .body {
    width: 276px;
    height: 14px; // arbitrary decreased 2px
    ${({ theme }) => theme.typo.text.T_16_EB}
    color: ${({ theme }) => theme.palette.sementic.red300};
    margin-left: 24px;
    margin-top: 18px;
    margin-bottom: 32px;
  }
`;

const CheckButtonWrapper = styled.div`
  margin-top: 16px;
`;

// http://jsfiddle.net/dineshranawat/Ls95n95L/
// http://www.liangshunet.com/en/202004/998851523.htm
