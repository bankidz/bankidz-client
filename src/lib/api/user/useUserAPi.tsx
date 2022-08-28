import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { IGetUserResData } from './user.type';

const useUserApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUser = async () => {
    const response = await axiosPrivate.get('/user');
    const data = response.data.data;
    return data as IGetUserResData;
  };

  return { getUser };
};

export default useUserApi;
