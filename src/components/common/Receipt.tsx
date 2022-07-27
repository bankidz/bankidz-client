import styled from 'styled-components';
import { calcRatio, theme } from '@lib/styles/theme';
import { TItemName } from '@lib/types/kid';
import PerforatedLineTop from './modals/quaternaryModal/PerforatedLineTop';
import PerforatedLineBottom from './modals/quaternaryModal/PerforatedLineBottom';
import { ReactComponent as HorizontalDashedBorder } from '@assets/borders/horizontal-dashed-border.svg';
import { ReactComponent as BankiDad } from '@assets/illusts/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illusts/banki/banki_mom.svg';
import renderItemIllust from '@lib/utils/common/renderItemIllust';
import { getContractEndDate } from '@lib/utils/common/getContractEndDate';

interface ReceiptProps {
  createdAt: string;
  interestRate: number;
  isMom: boolean;
  itemName: TItemName;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
}

function Receipt({
  createdAt = '2022-07-05 05:05:05',
  interestRate = 30,
  isMom = true,
  itemName = '전자제품',
  totalPrice = 150000,
  weekPrice = 10000,
  weeks = 15,
}: ReceiptProps) {
  return (
    <Wrapper>
      <PerforatedLineTop fill={theme.palette.greyScale.grey100} />

      {/* background border (only horizontal) */}
      <div className="first-horizontal-dashed-border-wrapper">
        <HorizontalDashedBorder fill={theme.palette.greyScale.grey200} />
      </div>
      <div className="second-horizontal-dashed-border-wrapper">
        <HorizontalDashedBorder fill={theme.palette.greyScale.grey200} />
      </div>

      <Content>
        <div className="first-row">
          <div className="계약대상">
            <div className="banki-illust">
              {isMom ? <BankiMom /> : <BankiDad />}
            </div>
            <div className="text-wrapper">
              <div className="title">계약대상</div>
              <div className="content">{isMom === true ? '엄마' : '아빠'}</div>
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
            <div className="content">{totalPrice.toLocaleString('ko-KR')}</div>
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
      </Content>
      <PerforatedLineBottom fill={theme.palette.greyScale.grey100} />
    </Wrapper>
  );
}

export default Receipt;

const Wrapper = styled.div`
  height: 278px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  // background border (only horizontal)
  position: relative;
  .first-horizontal-dashed-border-wrapper {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 110px;
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
    top: 186px;
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

const Content = styled.div`
  margin: -1px 0; // overlap 1px
  background: ${({ theme }) => theme.palette.greyScale.grey100};
  width: 100%;
  height: 360px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;

  .first-row {
    width: 100%;
    height: 107px;
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
    height: 68px;
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
    height: 79px;
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
`;
