import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { INoticeDTO } from '@lib/apis/notice/noticeDTO';
import noticeAPI from '@lib/apis/notice/noticeAPI';
import queryKeys from '@lib/constants/queryKeys';

const useNoticeByIdQuery = (
  id: string,
  options?: UseQueryOptions<INoticeDTO, AxiosError, INoticeDTO, any>,
) => {
  return useQuery(
    [queryKeys.NOTICE, id],
    () => noticeAPI.getNoticeById(id),
    options,
  );
};
export default useNoticeByIdQuery;
