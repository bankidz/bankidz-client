import styled from 'styled-components';
import { theme } from '@lib/styles/theme';
import { TItemName } from '@lib/types/TItemName';
import { TInterestRate } from '@lib/types/IInterestRate';
import FirstRow from './FirstRow';
import SecondRow from './SecondRow';
import ThirdRow from './ThirdRow';
import PerforatedLineTop from '../modals/receiptModal/perforatedLines/PerforatedLineTop';
import PerforatedLineBottom from '../modals/receiptModal/perforatedLines/PerforatedLineBottom';

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
  return (
    <Wrapper>
      {/* <DashedBorder /> */}
      <PerforatedLineTop fill={theme.palette.greyScale.grey100} />
      <Content>
        <FirstRow isMom={isMom} itemName={itemName} />
        <SecondRow
          interestRate={interestRate}
          totalPrice={totalPrice}
          weekPrice={weekPrice}
        />
        <ThirdRow createdAt={createdAt} weeks={weeks} />
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

  padding-left: 15px;
  padding-right: 15px;
`;
