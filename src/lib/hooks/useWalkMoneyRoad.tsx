import { IMoneyRoad } from '@store/slices/walkingMoneyRoadsSlice';
import { useState } from 'react';

export type TWalkMoneyRoadType = {
  value: number;
  id: number;
  isAchieved: boolean;
};

// 걷고 있는 돈길들에 대한 state의 게터 세터 -> 현재 보여주고 있는 돈길 하나에 대한 게터 세터로 추상화
const useWalkMoneyRoad = (walkingMoneyRoads: IMoneyRoad[]) => {
  const [walkMoneyRoads, setWalkMoneyRoads] = useState<TWalkMoneyRoadType[]>(
    walkingMoneyRoads.map((v) => {
      if (v.progressList) {
        return {
          value: v.progressList[v.progressList.length - 1].isAchieved ? 100 : 0,
          id: v.id,
          isAchieved: v.progressList[v.progressList.length - 1].isAchieved
            ? true
            : false,
        };
      } else return { value: 0, id: v.id, isAchieved: false }; //error
    }),
  );

  const getValue = (id: number) => {
    const [value] = walkMoneyRoads.filter((v) => v.id === id);
    return value.value;
  };

  const setValue = (id: number, newValue: number) => {
    const newWalkMoneyRoads = walkMoneyRoads.map((v) =>
      v.id === id ? { ...v, value: newValue } : v,
    );
    return setWalkMoneyRoads(newWalkMoneyRoads);
  };

  //isAchieved 상태를 따로 두었음. value가 100이 되었을때 손을 떼지 않았음에도 스탬프가 찍히는 이슈 때문에
  const getIsAchieved = (id: number) => {
    const [value] = walkMoneyRoads.filter((v) => v.id === id);
    return value.isAchieved;
  };

  const setIsAchieved = (id: number, newValue: boolean) => {
    const newWalkMoneyRoads = walkMoneyRoads.map((v) =>
      v.id === id ? { id: id, value: 100, isAchieved: newValue } : v,
    );
    return setWalkMoneyRoads(newWalkMoneyRoads);
  };

  return { getValue, setValue, getIsAchieved, setIsAchieved };
};

export default useWalkMoneyRoad;
