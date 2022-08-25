import { calcRatio } from '@lib/styles/theme';
import { IDongil } from '@lib/types/IDongil';
import styled, { css } from 'styled-components';
import FirstRow from '../rows/FirstRow';
import SecondRow from '../rows/SecondRow';
import ThirdRow from '../rows/ThirdRow';
import { TReceiptModalVariant } from '../TReceiptModalVariant';

interface BottomContentProps
  extends Pick<
    IDongil,
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
        <img
          src={`https://ppoketdon-bucket.s3.ap-northeast-2.amazonaws.com/${fileName}`}
        />
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
`;

const SignatureWrapper = styled.div`
  z-index: 710;
  position: absolute;
  width: ${calcRatio(146, 324)};
  // TODO: 도영이는 뒤에 글씨 가리는게 별로라고 생각해서 기디 회의 후에
  // 서명 크기 재조정 필요할것 같습니다.
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
