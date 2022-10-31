import styled from 'styled-components';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import { calcRatio } from '@lib/styles/theme';
import getContractEndDate from '@lib/utils/get/getContractEndDate';
import getWeekNumberByMonth from '@lib/utils/get/getWeekNumberByMonth';

type ThirdRowProps = Pick<IChallengeDTO, 'createdAt' | 'weeks'>;

function ThirdRow({ createdAt, weeks }: ThirdRowProps) {
  const contractEndDate = getContractEndDate(createdAt, weeks);
  const { year, month, weekNo } = getWeekNumberByMonth(contractEndDate);

  return (
    <Wrapper>
      <div className="총소요기간">
        <div className="title">총 소요기간</div>
        <div className="content">{weeks}주</div>
      </div>
      <div className="계약종료일">
        <div className="text-wrapper">
          <div className="title">계약종료일</div>
          <div className="content">{`${year}년 ${month}월 ${weekNo}주`}</div>
        </div>
      </div>
    </Wrapper>
  );
}

export default ThirdRow;

const Wrapper = styled.div`
  width: 100%;
  height: 79px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .총소요기간 {
    width: 33.3%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: ${calcRatio(9, 294)};
    .title {
      height: 12px;
      ${({ theme }) => theme.typo.text.S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey500};
      margin-top: 0;
      margin-bottom: 8px;
      padding: 0;
    }
    .content {
      height: 16px;
      ${({ theme }) => theme.typo.text.T_21_EB};
      color: ${({ theme }) => theme.palette.main.yellow400};
      padding: 0;
    }
  }

  .계약종료일 {
    width: 66.6%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: ${calcRatio(24, 324)};
    .text-wrapper {
      .title {
        height: 12px;
        ${({ theme }) => theme.typo.text.S_12_M};
        color: ${({ theme }) => theme.palette.greyScale.grey500};
        margin-top: 0;
        margin-bottom: 8px;
      }
      .content {
        height: 16px;
        ${({ theme }) => theme.typo.text.T_21_EB};
        color: ${({ theme }) => theme.palette.main.yellow400};
      }
    }
  }
`;
