import Receipt from '@components/common/Receipt';
import ProceedingStemp from '@components/home/walking/ProceedingStemp';
import MarginTemplate from '@components/layout/MarginTemplate';
import Spaceholder from '@components/layout/Spaceholder';
import { calcRatio } from '@lib/styles/theme';
import { TPercent } from '@lib/types/kid';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import renderGraph from '@lib/utils/kid/renderGraph';
import { useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import { selectWalkingMoneyRoads } from '@store/slices/walkingMoneyRoadsSlice';
import { selectWeeklyProgress } from '@store/slices/weeklyProgressSlice';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// {
//   "message": null,
//   "data": {
//     "currentSavings": 10000,
//     "totalPrice": 10000
//   }
// }

// {
//   "message": null,
//   "data": [
//     {
//       "id": 8,
//       "isMom": true,
//       "title": "아이패드 사기",
//       "targetItemName": "전자제품",
//       "challengeCategoryName": "이자율 받기",
//       "isAchieved": false,
//       "interestRate": 10,
//       "totalPrice": 150000,
//       "weekPrice": 10000,
//       "weeks": 15,
//       "createdAt": "2022-07-14 03:28:29",
//       "status": 2,
//       "progressList": [
//         {                       // 해당 주차에 맞는 progress까지만 보내줌
//           "challengeId": 8,
//           "weeks": 1,
//           "isAchieved": false
//         }
//       ],
//       "comment": null
//     }
//   ]
// }

function KidWalking() {
  const { challengeId } = useParams();
  const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);

  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  const targetWalkingMoneyRoad = walkingMoneyRoads?.find(
    (walkingMoneyRoad) => walkingMoneyRoad.id === parseInt(challengeId!),
  );
  console.log(targetWalkingMoneyRoad);
  const {
    id,
    isMom,
    title,
    itemName,
    challengeCategoryName,
    isAchieved,
    interestRate,
    totalPrice,
    weekPrice,
    weeks,
    createdAt,
    status,
    progressList,
    comment,
  } = targetWalkingMoneyRoad!;

  const weeklyProgress = useAppSelector(selectWeeklyProgress);
  const { currentSavings } = weeklyProgress!;

  const percent = Math.ceil((currentSavings / totalPrice / 10) * 100) * 10;
  const currentCompletionRate = Math.round((currentSavings / totalPrice) * 100);
  return (
    <Wrapper>
      <Content>
        <MarginTemplate>
          <FlexBox>
            <div className="graph-wrapper">
              {renderGraph(percent as TPercent)}
            </div>
            <span className="challenging">
              {progressList!.length}주차 도전중
            </span>
            <div className="title">{title}</div>
            <div>현재 저금액: {currentSavings}</div>
            <div>현재 완주율: {currentCompletionRate}</div>

            <InterestStamp>
              <div className="text-wrapper">
                <span className="header">이자 스탬프</span>
                <span className="body">
                  돈길 걷기를 완료한 주차에 해당하는 만큼 이자를 받아요
                </span>
                <ProceedingStemp weeks={weeks} stemp={progressList!} />
              </div>
            </InterestStamp>

            <div>
              <span>1주마다 3,000원</span>
              <span>15주 걷기 성공해서</span>
              <span>이자가 90,000원 쌓였어요</span>
              <span>별도 API 제작 예정</span>
            </div>

            <MoneyRoadContractContent>
              <span>돈길 계약 내용</span>
              <Receipt
                createdAt={createdAt}
                interestRate={interestRate}
                isMom={isMom}
                itemName={itemName}
                totalPrice={totalPrice}
                weekPrice={weekPrice}
                weeks={weeks}
              />
            </MoneyRoadContractContent>
            <Spaceholder />
          </FlexBox>
        </MarginTemplate>
      </Content>
      <Background colorByLevel={colorByLevel}></Background>
    </Wrapper>
  );
}

export default KidWalking;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;

  position: absolute;
  z-index: 100;

  .graph-wrapper {
    margin-top: 56px;
    height: 240px;
    width: 250px;

    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      height: 208.1px;
      margin-top: 32px;
      margin-left: ${calcRatio(13, 250)};
    }
  }
  .challenging {
    margin-top: 32px;
    ${({ theme }) => theme.typo.text.T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
  .title {
    margin-top: 16px;
    ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InterestStamp = styled.div`
  margin-top: 80px;
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

const MoneyRoadContractContent = styled.div`
  margin-top: 80px;
  width: 100%;
  span {
    ${({ theme }) => theme.typo.text.T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const Background = styled.div<{ colorByLevel: string }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  height: 337px;
  width: 100%;
  z-index: 1;

  background-color: ${({ colorByLevel }) => colorByLevel};
  /* margin-top: -17px; */

  &:after {
    width: ${calcRatio(530, 360)};
    margin: 0 auto;
    height: 230px;
    background-color: ${({ theme }) => theme.palette.greyScale.white};
    border-radius: 50%;
    position: absolute;
    top: 305px;
    left: calc(-${calcRatio(530, 360)} / 2 + 50%);
    content: '';
  }
`;

// const Positioner = styled.div`
//   position: absolute;
//   z-index: 100;

//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;

//   .graph-wrapper {
//     margin-top: 56px;
//     height: 240px;
//     width: 250px;

//     display: flex;
//     justify-content: center;
//     align-items: center;
//     svg {
//       background: skyblue;
//       height: 208.1px;
//       margin-top: 32px;
//       margin-left: ${calcRatio(13, 250)};
//     }
//   }
//   .challenging {
//     margin-top: 32px;
//     background: pink;
//     width: 100%;
//     text-align: center;
//     ${({ theme }) => theme.typo.text.T_16_EB};
//     color: ${({ theme }) => theme.palette.greyScale.grey500};
//   }
//   .title {
//     margin-top: 16px;
//     ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB};
//     color: ${({ theme }) => theme.palette.greyScale.black};
//   }
// `;
