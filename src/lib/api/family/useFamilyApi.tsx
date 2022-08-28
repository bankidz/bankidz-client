import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { IGetFamilyResData, IGetKidResDataItem } from './family.type';

const useFamilyApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getFamily = async () => {
    const response = await axiosPrivate.get('/family');
    const data = response.data.data;
    return data as IGetFamilyResData;
  };

  const getKid = async () => {
    const response = await axiosPrivate.get('/family/kid');
    const data = response.data.data;
    return data as IGetKidResDataItem[];
  };

  return { getFamily, getKid };
};

export default useFamilyApi;
