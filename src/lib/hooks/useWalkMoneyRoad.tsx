import { IMoneyRoad } from '@store/slices/walkingMoneyRoadsSlice';
import { useState } from 'react';

export type TWalkMoneyRoadType = {
  value: number;
  id: number;
};

// 걷고 있는 돈길들에 대한 state의 게터 세터 -> 현재 보여주고 있는 돈길 하나에 대한 게터 세터로 추상화
const useWalkMoneyRoad = (walkingMoneyRoads: IMoneyRoad[]) => {
  const [walkMoneyRoads, setWalkMoneyRoads] = useState<TWalkMoneyRoadType[]>(
    walkingMoneyRoads.map((v) => {
      if (v.progressList) {
        return {
          value: v.progressList[v.progressList.length - 1].isAchieved ? 100 : 0,
          id: v.id,
        };
      } else return { value: 0, id: v.id }; //error
    }),
  );

  const getValue = (id: number) => {
    const [value] = walkMoneyRoads.filter((v) => v.id === id);
    return value.value;
  };

  const setValue = (id: number, newValue: number) => {
    const newWalkMoneyRoads = walkMoneyRoads.map((v) =>
      v.id === id ? { value: newValue, id: id } : v,
    );
    return setWalkMoneyRoads(newWalkMoneyRoads);
  };

  return { getValue, setValue };
};

export default useWalkMoneyRoad;
