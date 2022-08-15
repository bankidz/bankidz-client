import styled from 'styled-components';
import { ReactComponent as BankiDad } from '@assets/illusts/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illusts/banki/banki_mom.svg';
import renderItemIllust from '@lib/utils/render/renderItemIllust';
import { TItemName } from '@lib/types/TItemName';
import { calcRatio } from '@lib/styles/theme';

function getFirstRow(isMom: boolean, itemName: TItemName) {
  return (
    <Wrapper>
      <div className="계약대상">
        <div className="banki-illust">
          {isMom ? <BankiMom /> : <BankiDad />}
        </div>
        <div className="text-wrapper">
          <div className="title">계약 대상</div>
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
    </Wrapper>
  );
}

export default getFirstRow;

const Wrapper = styled.div`
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
`;
