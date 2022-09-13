import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { IFamilyGroupPayload, IFamilyDTO, IKidListDTO } from './family.dto';

const useFamilyApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getFamily = async (): Promise<IFamilyDTO> => {
    const response = await axiosPrivate.get('/family');
    const data = response.data.data;
    return data;
  };

  const getKid = async (): Promise<IKidListDTO[]> => {
    const response = await axiosPrivate.get('/family/kid');
    const data = response.data.data;
    return data;
  };

  const createFamily = async (): Promise<IFamilyDTO> => {
    const response = await axiosPrivate.post('/family');
    const data = response.data.data;
    return data;
  };

  const leaveFamily = async (
    payload: IFamilyGroupPayload,
  ): Promise<IFamilyDTO> => {
    const response = await axiosPrivate.delete('/family/user', {
      data: payload,
    });
    const data = response.data.data;
    return data;
  };

  const joinFamily = async (
    payload: IFamilyGroupPayload,
  ): Promise<IFamilyDTO> => {
    const response = await axiosPrivate.post('/family/user', payload);
    const data = response.data.data;
    return data;
  };

  return { getFamily, getKid, createFamily, leaveFamily, joinFamily };
};

export default useFamilyApi;
