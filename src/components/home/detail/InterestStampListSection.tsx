import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import styled from 'styled-components';
import InterestStampList from './InterestStampList';

interface DetailInterestStampListProps
  extends Pick<IChallengeDTO, 'weeks' | 'progressList'> {}

function InterestStampListSection({
  weeks,
  progressList,
}: DetailInterestStampListProps) {
  return (
    <Wrapper>
      <div className="text-wrapper">
        <span className="header">이자 스탬프</span>
        <span className="body">
          돈길 걷기를 완료한 주차에 해당하는 만큼 이자를 받아요
        </span>
        <InterestStampList weeks={weeks} stamps={progressList!} />
      </div>
    </Wrapper>
  );
}

export default InterestStampListSection;

const Wrapper = styled.section`
  margin-top: 80px;
  margin-bottom: 40px;
  width: 100%;

  .text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .header {
      ${({ theme }) => theme.typo.text.T_16_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
    .body {
      margin-top: 16px;
      margin-bottom: 24px;
      ${({ theme }) => theme.typo.text.S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey600};
    }
  }
`;

// https://kyounghwan01.github.io/blog/TS/fundamentals/utility-types/#partial
