import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { INoticeDTO, TNoticesDTO } from './notice.dto';

const useNoticeApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getNotices = async (): Promise<TNoticesDTO> => {
    const response = await axiosPrivate.get('/notice');
    const data = response.data.data;
    return data;
  };

  const getNotice = async (id: string): Promise<INoticeDTO> => {
    const response = await axiosPrivate.get(`/notice/${id}`);
    const data = response.data.data;
    return data;
  };

  return { getNotices, getNotice };
};

export default useNoticeApi;
