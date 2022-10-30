import styled from 'styled-components';
import Receipt from '@components/common/receipt/Receipt';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

type DongilContractContentSectionProps = Pick<
  IChallengeDTO,
  | 'progressList'
  | 'interestRate'
  | 'isMom'
  | 'itemName'
  | 'totalPrice'
  | 'weekPrice'
  | 'weeks'
>;

function DongilContractContentSection({
  progressList,
  interestRate,
  isMom,
  itemName,
  totalPrice,
  weekPrice,
  weeks,
}: DongilContractContentSectionProps) {
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

export default DongilContractContentSection;

const Wrapper = styled.section`
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
