import { axiosPrivateTemp } from '../axios';
import { INoticeDTO, TNoticesDTO } from './noticeDTO';

const noticeApi = {
  getNotice: async (): Promise<TNoticesDTO> => {
    const response = await axiosPrivateTemp.get('/notice');
    const data = response.data;
    return data;
  },

  getNoticeById: async (id: string): Promise<INoticeDTO> => {
    const response = await axiosPrivateTemp.get(`/notice/${id}`);
    const data = response.data;
    return data;
  },
};

export default noticeApi;
