import { axiosPrivateTemp } from '../axios';
import {
  IChallengeRequest,
  IChallengeDTO,
  IProgressDTO,
  IAchievedChallengeDTO,
  IKidChallengeListDTO,
  IKidAchievedChallengeListDTO,
  IKidWeekDTO,
  IWeekDTO,
  IPatchChallengePayload,
} from './challengeDTO';

const challengeAPI = {
  // 돈길 리스트 가져오기
  getChallenge: async (
    status: 'pending' | 'walking',
  ): Promise<IChallengeDTO[]> => {
    const response = await axiosPrivateTemp.get(`/challenge?status=${status}`);
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
  }: IChallengeRequest): Promise<IChallengeDTO> => {
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
  deleteChallenge: async (challengeId: number): Promise<IChallengeDTO> => {
    const response = await axiosPrivateTemp.delete(`/challenge/${challengeId}`);
    return response.data;
  },

  // 자녀의 돈길 수락 / 거절
  patchChallenge: async ({
    challengeId,
    accept,
    comment,
  }: IPatchChallengePayload): Promise<IChallengeDTO> => {
    const response = await axiosPrivateTemp.patch(`/challenge/${challengeId}`, {
      accept,
      comment,
    });
    return response.data;
  },

  // 돈길 걷기
  patchChallengeProgress: async (
    challengeId: number,
  ): Promise<IProgressDTO> => {
    const response = await axiosPrivateTemp.patch(
      `/challenge/${challengeId}/progress`,
    );
    return response.data;
  },

  // 완주한 돈길에 이자 지급하기
  patchChallengeInterestPayment: async (
    challengeId: number,
  ): Promise<IAchievedChallengeDTO> => {
    const response = await axiosPrivateTemp.patch(
      `/challenge/interest-payment/${challengeId}`,
    );
    return response.data;
  },

  // 자녀의 돈길 리스트 가져오기
  getChallengeKid: async (
    kidId: number,
    status: 'pending' | 'walking',
  ): Promise<IKidChallengeListDTO> => {
    const response = await axiosPrivateTemp.get(
      `/challenge/kid/${kidId}?status=${status}`,
    );
    return response.data;
  },

  // 자녀의 완주한 돈길 리스트 가져오기
  getChallengeKidAchieved: async (
    interestPayment: 'payed' | 'notPayed',
    kidId: number,
  ): Promise<IKidAchievedChallengeListDTO> => {
    const response = await axiosPrivateTemp.get(
      `/challenge/kid/achieved/${kidId}?interestPayment=${interestPayment}`,
    );
    return response.data;
  },

  // 자녀의 주차 정보 가져오기
  getChallengeKidProgress: async (kidId: number): Promise<IKidWeekDTO> => {
    const response = await axiosPrivateTemp.get(
      `/challenge/kid/progress/${kidId}`,
    );
    return response.data;
  },

  // 주차 정보 가져오기
  getChallengeProgress: async (): Promise<IWeekDTO> => {
    const response = await axiosPrivateTemp.get('/challenge/progress');
    return response.data;
  },
};

export default challengeAPI;
