import styled from 'styled-components';
import { calcRatio, theme } from '@lib/styles/theme';
import { TItemName } from '@lib/types/TItemName';

import { ReactComponent as BankiDad } from '@assets/illusts/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illusts/banki/banki_mom.svg';
import renderItemIllust from '@lib/utils/render/renderItemIllust';
import getWeekNumberByMonth from '@lib/utils/get/getWeekNumberByMonth';
import getContractEndDate from '@lib/utils/get/getContractEndDate';
import PerforatedLineTop from '../modals/receiptModal/PerforatedLineTop';
import PerforatedLineBottom from '../modals/receiptModal/PerforatedLineBottom';
import getDashedBorder from './getDashedBorder';
import getFirstRow from './getFirstRow';
import getSecondRow from './getSecondRow';
import { TInterestRate } from '@lib/types/IInterestRate';
import getThirdRow from './getThirdRow';

interface ReceiptProps {
  createdAt: string;
  interestRate: TInterestRate;
  isMom: boolean;
  itemName: TItemName;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
}

function Receipt({
  createdAt,
  interestRate,
  isMom,
  itemName,
  totalPrice,
  weekPrice,
  weeks,
}: ReceiptProps) {
  const dashedBorder = getDashedBorder();
  const firstRow = getFirstRow(isMom, itemName);
  const secondRow = getSecondRow(totalPrice, weekPrice, interestRate);
  const thirdRow = getThirdRow(createdAt, weeks);

  return (
    <Wrapper>
      {dashedBorder}
      <PerforatedLineTop fill={theme.palette.greyScale.grey100} />
      <Content>
        {firstRow}
        {secondRow}
        {thirdRow}
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
  position: relative;
`;

const Content = styled.div`
  margin: -2px 0; // overlaps 2px
  background: ${({ theme }) => theme.palette.greyScale.grey100};
  width: 100%;
  height: 360px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
`;
