import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { IFamilyGroupPayload, IFamilyDTO, IKidListDTO } from './family.type';

const useFamilyApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getFamily = async () => {
    const response = await axiosPrivate.get('/family');
    const data = response.data.data;
    return data as IFamilyDTO;
  };

  const getKid = async () => {
    const response = await axiosPrivate.get('/family/kid');
    const data = response.data.data;
    return data as IKidListDTO[];
  };

  const createFamily = async () => {
    const response = await axiosPrivate.post('/family');
    const data = response.data.data;
    return data as IFamilyDTO;
  };

  const leaveFamily = async (payload: IFamilyGroupPayload) => {
    const response = await axiosPrivate.delete('/family/user', {
      data: payload,
    });
    const data = response.data.data;
    return data as IFamilyDTO;
  };

  const joinFamily = async (payload: IFamilyGroupPayload) => {
    const response = await axiosPrivate.post('/family/user', payload);
    const data = response.data.data;
    return data as IFamilyDTO;
  };

  return { getFamily, getKid, createFamily, leaveFamily, joinFamily };
};

export default useFamilyApi;
