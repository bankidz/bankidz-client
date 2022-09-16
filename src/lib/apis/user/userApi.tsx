import { axiosPrivateTemp } from '../axios';
import { IMyPageDTO, IOptInDTO, IUserDTO, IUserTypeRequest } from './user.dto';

const userApi = {
  getUser: async (): Promise<IMyPageDTO> => {
    const response = await axiosPrivateTemp.get('/user');
    console.log(response);
    const data = response.data;
    return data;
  },

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

export default userApi;
