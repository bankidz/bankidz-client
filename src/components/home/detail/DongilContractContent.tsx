import Receipt from '@components/common/receipt/Receipt';
import { IDongil } from '@lib/types/IDongil';
import styled from 'styled-components';

interface DongilContractContentProps
  extends Pick<
    IDongil,
    | 'progressList'
    | 'interestRate'
    | 'isMom'
    | 'itemName'
    | 'totalPrice'
    | 'weekPrice'
    | 'weeks'
  > {}

function DongilContractContent({
  progressList,
  interestRate,
  isMom,
  itemName,
  totalPrice,
  weekPrice,
  weeks,
}: DongilContractContentProps) {
  return (
    <Wrapper>
      <span>돈길 계약 내용</span>
      <div className="receipt-wrapper">
        {progressList && (
          <Receipt
            createdAt={progressList[0].approvedAt}
            interestRate={interestRate}
            isMom={isMom}
            itemName={itemName}
            totalPrice={totalPrice}
            weekPrice={weekPrice}
            weeks={weeks}
          />
        )}
      </div>
    </Wrapper>
  );
}

export default DongilContractContent;

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  span {
    height: 16px;
    ${({ theme }) => theme.typo.text.T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  .receipt-wrapper {
    margin-top: 20px;
  }
`;
