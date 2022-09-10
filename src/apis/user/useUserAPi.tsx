import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { IMyPageDTO, IOptInDTO } from './user.dto';

const useUserApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUser = async (): Promise<IMyPageDTO> => {
    const response = await axiosPrivate.get('/user');
    const data = response.data.data;
    return data;
  };

  const getUserOptIn = async (): Promise<IOptInDTO> => {
    const response = await axiosPrivate.get('/user/opt-in');
    const data = response.data.data;
    return data;
  };
  const patchNoticeAlert = async (): Promise<IOptInDTO> => {
    const response = await axiosPrivate.patch('/user/notice');
    const data = response.data.data;
    return data;
  };
  const patchServiceAlert = async (): Promise<IOptInDTO> => {
    const response = await axiosPrivate.patch('/user/service');
    const data = response.data.data;
    return data;
  };
  return { getUser, getUserOptIn, patchNoticeAlert, patchServiceAlert };
};

export default useUserApi;
