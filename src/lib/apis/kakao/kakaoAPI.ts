import { axiosPublic } from '../axios';
import { ILoginDTO } from './kakaoDTO';

const kakaoAPI = {
  login: async (code: string): Promise<ILoginDTO> => {
    const response = await axiosPublic.post('/kakao/login', code);
    return response.data.data;
  },
};

export default kakaoAPI;
