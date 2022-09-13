import { axiosPrivateTemp } from '../axios';
import { INoticeDTO, TNoticesDTO } from './notice.dto';

const noticeApi = {
  getNotices: async (): Promise<TNoticesDTO> => {
    const response = await axiosPrivateTemp.get('/notice');
    const data = response.data;
    return data;
  },

  getNotice: async (id: string): Promise<INoticeDTO> => {
    const response = await axiosPrivateTemp.get(`/notice/${id}`);
    const data = response.data;
    return data;
  },
};

export default noticeApi;
