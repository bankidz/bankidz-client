import styled, { css } from 'styled-components';
import { TPage } from '@lib/types/TPage';
import getWeekNumberByMonth from '@lib/utils/get/getWeekNumberByMonth';

type TVariant = Extract<TPage, 'KidHome' | 'Detail' | 'ParentHome'>;

interface SummaryProps {
  variant: TVariant;
  currentSavings?: number;
  totalPrice?: number;
  username?: string;
  weekPrice?: number;
  weeks?: number;
  successWeeks?: number;
}

/**
 * @param variant 본 컴포넌트가 사용되는 Page를 선택합니다.
 * 'KidHome', 'Detail', 'ParentHome' 중 하나를 선택합니다.
 * @param username variant: 'ParentHome'인 경우 표시될 자녀의 이름을 입력합니다.
 * @param weekPrice variant: 다음은 'Detail'인 경우 필요한 props 입니다.
 */
function Summary({
  variant,
  currentSavings,
  weekPrice,
  weeks,
  successWeeks,
  totalPrice,
  username,
}: SummaryProps) {
  const today = new Date();
  const { month, weekNo } = getWeekNumberByMonth(today);

  let currentSavingsForDetailPage: number;
  let currentCompletionRate: number;
  if (variant === 'Detail') {
    currentSavingsForDetailPage = weekPrice! * successWeeks!;
    currentCompletionRate = Math.ceil((successWeeks! / weeks!) * 100);
  }

  let content;
  if (variant === 'KidHome') {
    content = (
      <>
        <TitleWrapper variant={variant}>
          <span className="date">{`${month}월 ${weekNo}주차`}</span>
        </TitleWrapper>
        <InfoWrapper>
          <TextWrapper>
            <div>{currentSavings!.toLocaleString('ko-KR')}원</div>
            {<div>내 저금통</div>}
          </TextWrapper>
          <Divider />
          <TextWrapper>
            <div>{totalPrice!.toLocaleString('ko-KR')}원</div>
            <div>목표 저금액</div>
          </TextWrapper>
        </InfoWrapper>
      </>
    );
  } else if (variant === 'ParentHome') {
    content = (
      <>
        <TitleWrapper variant={variant}>
          <span className="date">{`${month}월 ${weekNo}주차`}</span>
          <span className="username">{`${username} 저금통`}</span>
        </TitleWrapper>
        <InfoWrapper>
          <TextWrapper>
            <div>{currentSavings!.toLocaleString('ko-KR')}원</div>
            <div>현재 저금액</div>
          </TextWrapper>
          <Divider />
          <TextWrapper>
            <div>{totalPrice!.toLocaleString('ko-KR')}원</div>
            <div>목표 저금액</div>
          </TextWrapper>
        </InfoWrapper>
      </>
    );
  } else if (variant === 'Detail') {
    content = (
      <InfoWrapper>
        <TextWrapper>
          <div>{currentSavingsForDetailPage!.toLocaleString('ko-KR')}원</div>
          <div>현재 저금액</div>
        </TextWrapper>
        <Divider />
        <TextWrapper>
          <div>{currentCompletionRate!}%</div>
          <div>현재 완주율</div>
        </TextWrapper>
      </InfoWrapper>
    );
  }
  return <Wrapper variant={variant}>{content}</Wrapper>;
}

export default Summary;

const Wrapper = styled.div<{ variant: TVariant }>`
  ${({ variant }) =>
    variant === 'KidHome' &&
    css`
      height: 120px;
    `}
  ${({ variant }) =>
    variant === 'ParentHome' &&
    css`
      height: 160px;
    `}
  ${({ variant }) =>
    variant === 'Detail' &&
    css`
      height: 89px;
    `}

  width: 100%;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.large};
  border: 2px solid ${({ theme }) => theme.palette.greyScale.grey100};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 16px;
  padding-bottom: 16px;
  & > p {
    ${({ theme }) => theme.typo.text.T_14_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500}
  }
`;

const TitleWrapper = styled.div<{
  variant: TVariant;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .date {
    ${({ theme }) => theme.typo.text.T_14_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    ${({ variant }) =>
      variant === 'KidHome' &&
      css`
        margin-bottom: 16px;
      `}
    ${({ variant }) =>
      variant === 'ParentHome' &&
      css`
        margin-bottom: 10px;
      `}
  }
  .username {
    width: 276px;
    height: 22px;
    text-align: center;
    ${({ theme }) => theme.typo.text.T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    ${({ variant }) =>
      variant === 'ParentHome' &&
      css`
        margin-bottom: 16px;
      `}
  }
`;

const InfoWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;

  width: 100%;
  grid-template-columns: 1fr 2px 1fr;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div:first-child {
    ${({ theme }) => theme.typo.fixed.GraphNum_T_21_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
  }
  div:last-child {
    ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-top: 8px;
  }
`;

const Divider = styled.div`
  width: 2px;
  height: 53px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
`;
