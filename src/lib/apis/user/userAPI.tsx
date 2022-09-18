import { axiosPrivateTemp } from '../axios';
import { ILoginDTO } from '../kakao/kakaoDTO';
import {
  IMyPageDTO,
  IOptInDTO,
  IUserDTO,
  IUserTypeRequest,
  IWithdrawalRequest,
} from './userDTO';

const userAPI = {
  // 유저 정보 조회하기
  getUser: async (): Promise<IMyPageDTO> => {
    const response = await axiosPrivateTemp.get('/user');
    console.log(response);
    const data = response.data;
    return data;
  },

  // 유저 탈퇴
  deleteUser: async ({ message }: IWithdrawalRequest): Promise<IUserDTO> => {
    const response = await axiosPrivateTemp.delete('/user', {
      data: { message },
    });
    return response.data;
  },

  // 유저 타입 선택
  patchUser: async ({
    birthday,
    isFemale,
    isKid,
  }: IUserTypeRequest): Promise<IUserDTO> => {
    const response = await axiosPrivateTemp.patch('/user', {
      birthday,
      isFemale,
      isKid,
    });
    return response.data;
  },

  // 유저 로그아웃
  patchUserLogout: async (): Promise<IUserDTO> => {
    const response = await axiosPrivateTemp.patch('/user/logout');
    return response.data;
  },

  // 유저 공지 및 이벤트 알림 동의
  patchNoticeAlert: async (): Promise<IOptInDTO> => {
    const response = await axiosPrivateTemp.patch('/user/notice');
    const data = response.data;
    return data;
  },

  // 유저 알림 동의 조회
  getUserOptIn: async (): Promise<IOptInDTO> => {
    const response = await axiosPrivateTemp.get('/user/opt-in');
    const data = response.data;
    return data;
  },

  // 토큰 리프레시
  patchUserRefresh: async (): Promise<ILoginDTO> => {
    const response = await axiosPrivateTemp.patch('/user/refresh');
    return response.data;
  },

  // 가족 활동 알림 동의
  patchServiceAlert: async (): Promise<IOptInDTO> => {
    const response = await axiosPrivateTemp.patch('/user/service');
    const data = response.data;
    return data;
  },
};

export default userAPI;
