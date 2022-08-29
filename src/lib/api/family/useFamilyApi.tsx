import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import {
  IDeleteFamilyPayload,
  IGetFamilyResData,
  IGetKidResDataItem,
} from './family.type';

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

  const deleteFamily = async (payload: IDeleteFamilyPayload) => {
    const response = await axiosPrivate.delete('/family/user', {
      data: payload,
    });
    const data = response.data.data;
    return data as IGetFamilyResData;
  };

  return { getFamily, getKid, deleteFamily };
};

export default useFamilyApi;
