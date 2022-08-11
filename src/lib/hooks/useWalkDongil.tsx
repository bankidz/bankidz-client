import { IDongil } from '@lib/types/IDongil';
import { useState } from 'react';

export type TWalkDongilType = {
  value: number;
  id: number;
  isAchieved: boolean;
};

// 걷고 있는 돈길들에 대한 state의 게터 세터 -> 현재 보여주고 있는 돈길 하나에 대한 게터 세터로 추상화
const useWalkDongil = (walkingDongils: IDongil[]) => {
  const [walkDongils, setWalkDongils] = useState<TWalkDongilType[]>(
    walkingDongils.map((v) => {
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

  // 해당 돈길 value 게터 세터. 0~100
  const getValue = (id: number) => {
    const [value] = walkDongils.filter((v) => v.id === id);
    return value.value;
  };
  const setValue = (id: number, newValue: number) => {
    const newWalkDongils = walkDongils.map((v) =>
      v.id === id ? { ...v, value: newValue } : v,
    );
    return setWalkDongils(newWalkDongils);
  };

  //isAchieved 상태를 따로 두었음. value가 100이 되었을때 손을 떼지 않았음에도 스탬프가 찍히는 이슈 때문에
  const getIsAchieved = (id: number) => {
    const [value] = walkDongils.filter((v) => v.id === id);
    return value.isAchieved;
  };
  const setIsAchieved = (id: number, newValue: boolean) => {
    const newWalkDongils = walkDongils.map((v) =>
      v.id === id ? { id: id, value: 100, isAchieved: newValue } : v,
    );
    return setWalkDongils(newWalkDongils);
  };

  // 이번주 저금 완료 여부
  const getWeeklySuccess = () => {
    const isAchievedList = walkingDongils.map((v) =>
      v.progressList
        ? v.progressList[v.progressList?.length - 1].isAchieved
        : false,
    );
    return isAchievedList.every((v) => v === true);
  };

  return { getValue, setValue, getIsAchieved, setIsAchieved, getWeeklySuccess };
};

export default useWalkDongil;
