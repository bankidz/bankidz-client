import { axiosPrivate } from '../axios';
import { INoticeDTO, TNoticesDTO } from './noticeDTO';

const noticeAPI = {
  getNotice: async (): Promise<TNoticesDTO> => {
    const response = await axiosPrivate.get('/notice');
    const data = response.data;
    return data;
  },

  getNoticeById: async (id: string): Promise<INoticeDTO> => {
    const response = await axiosPrivate.get(`/notice/${id}`);
    const data = response.data;
    return data;
  },
};

export default noticeAPI;
