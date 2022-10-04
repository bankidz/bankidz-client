import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import { AWS_S3_URL } from '@lib/constants/AWS_S3_URL';
import { calcRatio } from '@lib/styles/theme';
import styled, { css } from 'styled-components';
import FirstRow from '../rows/FirstRow';
import SecondRow from '../rows/SecondRow';
import ThirdRow from '../rows/ThirdRow';
import { TReceiptModalVariant } from '../TReceiptModalVariant';

interface BottomContentProps
  extends Pick<
    IChallengeDTO,
    | 'itemName'
    | 'totalPrice'
    | 'weekPrice'
    | 'interestRate'
    | 'weeks'
    | 'createdAt'
    | 'fileName'
  > {
  variant: TReceiptModalVariant;
  isMom: boolean;
}

function BottomContent({
  variant,
  isMom,
  itemName,
  totalPrice,
  weekPrice,
  interestRate,
  weeks,
  createdAt,
  fileName,
}: BottomContentProps) {
  return (
    <Wrapper variant={variant}>
      <FirstRow isMom={isMom} itemName={itemName} />
      <SecondRow
        totalPrice={totalPrice}
        weekPrice={weekPrice}
        interestRate={interestRate}
      />
      <ThirdRow weeks={weeks} createdAt={createdAt} />
      <SignatureWrapper>
        <img src={`${AWS_S3_URL}/${fileName}`} />
      </SignatureWrapper>
    </Wrapper>
  );
}

export default BottomContent;

const Wrapper = styled.div<{ variant: TReceiptModalVariant }>`
  margin-bottom: -2px; // overlaps 2px
  background: ${({ theme }) => theme.palette.greyScale.white};
  width: 100%;
  height: 360px;

  border-top-left-radius: ${({ theme }) => theme.radius.medium};
  border-top-right-radius: ${({ theme }) => theme.radius.medium};
  ${({ variant }) =>
    variant === 'rejected' &&
    css`
      border-bottom-left-radius: ${({ theme }) => theme.radius.medium};
      border-bottom-right-radius: ${({ theme }) => theme.radius.medium};
    `}

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  position: relative;

  padding-left: 17px;
  padding-right: 17px;
`;

const SignatureWrapper = styled.div`
  z-index: 710;
  position: absolute;
  width: ${calcRatio(146, 324)};
  height: 173px;
  right: 2px;
  bottom: 0;

  & > img {
    max-width: 100%;
    margin-top: auto;
    margin-bottom: 16px;
    height: 120px;
  }
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
