import { axiosPublic } from '../axios';
import { IKakaoRequest, ILoginDTO } from './kakaoDTO';

const kakaoAPI = {
  login: async ({ code }: IKakaoRequest): Promise<ILoginDTO> => {
    const response = await axiosPublic.post('/kakao/login', code);
    return response.data.data;
  },
};

export default kakaoAPI;
