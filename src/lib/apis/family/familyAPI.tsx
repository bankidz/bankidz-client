import { axiosPrivate } from '../axios';
import { IFamilyGroupPayload, IFamilyDTO, IKidListDTO } from './familyDTO';

const familyAPI = {
  getFamily: async (): Promise<IFamilyDTO> => {
    const response = await axiosPrivate.get('/family');
    const data = response.data;
    return data;
  },

  getKid: async (): Promise<IKidListDTO[]> => {
    const response = await axiosPrivate.get('/family/kid');
    const data = response.data;
    return data;
  },

  createFamily: async (): Promise<IFamilyDTO> => {
    const response = await axiosPrivate.post('/family');
    const data = response.data;
    return data;
  },

  leaveFamily: async (payload: IFamilyGroupPayload): Promise<IFamilyDTO> => {
    const response = await axiosPrivate.delete('/family/user', {
      data: payload,
    });
    const data = response.data;
    return data;
  },

  joinFamily: async (payload: IFamilyGroupPayload): Promise<IFamilyDTO> => {
    const response = await axiosPrivate.post('/family/user', payload);
    const data = response.data;
    return data;
  },
};

export default familyAPI;
