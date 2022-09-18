import { axiosPrivateTemp } from '../axios';
import { IFamilyGroupPayload, IFamilyDTO, IKidListDTO } from './family.dto';

const familyApi = {
  // 가족 정보 조회하기
  getFamily: async (): Promise<IFamilyDTO> => {
    const response = await axiosPrivateTemp.get('/family');
    const data = response.data;
    return data;
  },

  // 가족 생성하기
  createFamily: async (): Promise<IFamilyDTO> => {
    const response = await axiosPrivateTemp.post('/family');
    const data = response.data;
    return data;
  },

  // 아이들 목록 조회하기
  getFamilyKid: async (): Promise<IKidListDTO[]> => {
    const response = await axiosPrivateTemp.get('/family/kid');
    const data = response.data;
    return data;
  },

  // 가족 참여하기
  joinFamily: async (payload: IFamilyGroupPayload): Promise<IFamilyDTO> => {
    const response = await axiosPrivateTemp.post('/family/user', payload);
    const data = response.data;
    return data;
  },

  // 가족 나가기
  leaveFamily: async (payload: IFamilyGroupPayload): Promise<IFamilyDTO> => {
    const response = await axiosPrivateTemp.delete('/family/user', {
      data: payload,
    });
    const data = response.data;
    return data;
  },
};

export default familyApi;
