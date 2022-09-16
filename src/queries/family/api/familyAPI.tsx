import { axiosPrivateTemp } from '@lib/axios/axios';
import { IFamilyGroupPayload, IFamilyDTO, IKidListDTO } from './familyDTO';

const familyAPI = {
  getFamily: async (): Promise<IFamilyDTO> => {
    const response = await axiosPrivateTemp.get('/family');
    const data = response.data;
    return data;
  },

  getKid: async (): Promise<IKidListDTO[]> => {
    const response = await axiosPrivateTemp.get('/family/kid');
    const data = response.data;
    return data;
  },

  createFamily: async (): Promise<IFamilyDTO> => {
    const response = await axiosPrivateTemp.post('/family');
    const data = response.data;
    return data;
  },

  leaveFamily: async (payload: IFamilyGroupPayload): Promise<IFamilyDTO> => {
    const response = await axiosPrivateTemp.delete('/family/user', {
      data: payload,
    });
    const data = response.data;
    return data;
  },

  joinFamily: async (payload: IFamilyGroupPayload): Promise<IFamilyDTO> => {
    const response = await axiosPrivateTemp.post('/family/user', payload);
    const data = response.data;
    return data;
  },
};

export default familyAPI;
