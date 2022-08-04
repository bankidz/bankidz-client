import getWeekNumberByMonth from '@lib/utils/common/getWeekNumberByMonth';
import styled, { css } from 'styled-components';

type TUsage = 'KidHome' | 'Detail' | 'ParentHome';

interface SummaryProps {
  /**
   * 본 컴포넌트가 사용되는 Page를 선택합니다.
   * 'KidHome', 'Detail', 'ParentHome' 중 하나를 선택합니다.
   */
  usage: TUsage;
  currentSavings: number;
  weekPrice?: number;
  successWeeks?: number;
  weeks?: number;
  totalPrice?: number;
  /** usage: 'ParentHome'인 경우 표시될 자녀의 이름을 입력합니다. */
  username?: string;
}

function Summary({
  usage,
  currentSavings,
  weekPrice,
  successWeeks,
  weeks,
  totalPrice,
  username,
}: SummaryProps) {
  const today = new Date();
  const { month, weekNo } = getWeekNumberByMonth(today);
  // const currentCompletionRate = Math.round((currentSavings / totalPrice) * 100);

  // Detail
  let currentSavingsForDetailPage: number;
  let currentCompletionRate: number;
  if (usage === 'Detail') {
    currentSavingsForDetailPage = weekPrice! * successWeeks!;
    currentCompletionRate = Math.ceil((successWeeks! / weeks!) * 100);
  }
  return (
    <Wrapper usage={usage}>
      {/* KidHome, ParentHome */}
      <TitleWrapper usage={usage}>
        {(usage === 'KidHome' || usage === 'ParentHome') && (
          <span className="date">{`${month}월 ${weekNo}주차`}</span>
        )}
        {/* KidHome */}
        {usage === 'ParentHome' && username !== 'loading' && (
          <span className="username">{`${username} 저금통`}</span>
        )}
      </TitleWrapper>
      <Info>
        <TextWrapper>
          {/* KidHome, ParentHome */}
          {usage === 'KidHome' ||
            (usage === 'ParentHome' && (
              <div>{currentSavings!.toLocaleString('ko-KR')}원</div>
            ))}
          {usage === 'Detail' && (
            <div>{currentSavingsForDetailPage!.toLocaleString('ko-KR')}원</div>
          )}
          {/* KidHome */}
          {usage === 'KidHome' && <div>내 저금통</div>}
          {/* ParentHome, Detail */}
          {(usage === 'ParentHome' || usage === 'Detail') && (
            <div>현재 저금액</div>
          )}
        </TextWrapper>
        <Divider />
        <TextWrapper>
          {(usage === 'KidHome' || usage === 'ParentHome') && (
            <div>{totalPrice!.toLocaleString('ko-KR')}원</div>
          )}
          {usage === 'KidHome' && <div>목표 저금액</div>}
          {usage === 'Detail' && <div>{currentCompletionRate!}%</div>}
          {usage === 'Detail' && <div>현재 완주율</div>}
          {usage === 'ParentHome' && <div>목표 저금액</div>}
        </TextWrapper>
      </Info>
    </Wrapper>
  );
}

export default Summary;

const Wrapper = styled.div<{ usage: TUsage }>`
  ${({ usage }) =>
    usage === 'KidHome' &&
    css`
      height: 120px;
    `}
  ${({ usage }) =>
    usage === 'Detail' &&
    css`
      height: 89px;
    `}
  ${({ usage }) =>
    usage === 'ParentHome' &&
    css`
      height: 160px;
    `}

  width: 100%;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.large};
  border: 2px solid ${({ theme }) => theme.palette.greyScale.grey100};

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 0px;
  & > p {
    ${({ theme }) => theme.typo.text.T_14_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500}
  }
`;

const TitleWrapper = styled.div<{
  usage: TUsage;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .date {
    ${({ theme }) => theme.typo.text.T_14_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    ${({ usage }) =>
      usage === 'KidHome' &&
      css`
        margin-bottom: 16px;
      `}
    ${({ usage }) =>
      usage === 'ParentHome' &&
      css`
        margin-bottom: 10px;
      `}
  }
  .username {
    ${({ theme }) => theme.typo.text.T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    ${({ usage }) =>
      usage === 'ParentHome' &&
      css`
        margin-bottom: 10px;
      `}
  }
`;

const Info = styled.div`
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
