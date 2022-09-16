import { axiosPrivateTemp } from '@lib/axios/axios';
import { IMyPageDTO, IOptInDTO } from './userDTO';

const userAPI = {
  getUser: async (): Promise<IMyPageDTO> => {
    const response = await axiosPrivateTemp.get('/user');
    console.log(response);
    const data = response.data;
    return data;
  },
  getUserOptIn: async (): Promise<IOptInDTO> => {
    const response = await axiosPrivateTemp.get('/user/opt-in');
    const data = response.data;
    return data;
  },
  patchNoticeAlert: async (): Promise<IOptInDTO> => {
    const response = await axiosPrivateTemp.patch('/user/notice');
    const data = response.data;
    return data;
  },
  patchServiceAlert: async (): Promise<IOptInDTO> => {
    const response = await axiosPrivateTemp.patch('/user/service');
    const data = response.data;
    return data;
  },
};

export default userAPI;
