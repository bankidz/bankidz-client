import { TDongilStatus } from '@lib/types/TDongilStatus';
import { axiosPrivateTemp } from '../axios';
import {
  IAchievedDongilDTO,
  IChallengeRequest,
  IDongilDTO,
  IKidChallengeRequest,
  IKidDongilDTO,
} from './challengeDTO';

const challengeAPI = {
  // 돈길 리스트 가져오기
  getChallenge: async (): Promise<IDongilDTO> => {
    const response = await axiosPrivateTemp.get('/challenge/progress');
    return response.data;
  },

  // 돈길 생성
  postChallenge: async ({
    challengeCategory,
    fileName,
    interestPrice,
    interestRate,
    isMom,
    itemName,
    title,
    totalPrice,
    weekPrice,
    weeks,
  }: IChallengeRequest): Promise<IDongilDTO> => {
    const response = await axiosPrivateTemp.patch('/challenge', {
      challengeCategory,
      fileName,
      interestPrice,
      interestRate,
      isMom,
      itemName,
      title,
      totalPrice,
      weekPrice,
      weeks,
    });
    return response.data;
  },

  // 돈길 포기하기
  deleteChallenge: async (challengeId: number): Promise<IDongilDTO> => {
    const response = await axiosPrivateTemp.delete(`/challenge/${challengeId}`);
    return response.data;
  },

  // 자녀의 돈길 수락 / 거절
  patchChallenge: async (
    challengeId: number,
    { accept, comment }: IKidChallengeRequest,
  ): Promise<IDongilDTO> => {
    const response = await axiosPrivateTemp.patch(`/challenge/${challengeId}`, {
      accept,
      comment,
    });
    return response.data;
  },

  // 완주한 돈길에 이자 지급하기
  patchChallengeInterestPayment: async (
    challengeId: number,
  ): Promise<IAchievedDongilDTO> => {
    const response = await axiosPrivateTemp.patch(
      `/challenge/interest-payment/${challengeId}`,
    );
    return response.data;
  },

  // 자녀의 돈길 리스트 가져오기
  getChallengeKid: async (
    kidId: number,
    status: 'pending' | 'walking',
  ): Promise<IKidDongilDTO> => {
    const response = await axiosPrivateTemp.get(
      `/challenge/kid/${kidId}?status=${status}`,
    );
    return response.data;
  },

  // 자녀의 완주한 돈길 리스트 가져오기
  getChallengeKidAchieved: async (
    interestPayment: 'payed' | 'notPayed',
    kidId: number,
  ) => {
    const response = await axiosPrivateTemp.get(
      `/challenge/kid/achieved/${kidId}?interestPayment=${interestPayment}`,
    );
    return response.data;
  },

  // 자녀의 주차 정보 가져오기
  getChallengeKidProgress: async (kidId: number) => {
    const response = await axiosPrivateTemp.get(
      `/challenge/kid/progress/${kidId}`,
    );
  },

  // 주차 정보 가져오기
};

export default challengeAPI;
