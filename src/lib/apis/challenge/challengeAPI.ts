import { axiosPrivateTemp } from '../axios';
import { IDongilDTO } from './challengeDTO';

const challengeAPI = {
  getChallenge: async (): Promise<IDongilDTO> => {
    const response = await axiosPrivateTemp.get('/challenge/progress');
    return response.data;
  },
};

export default challengeAPI;
