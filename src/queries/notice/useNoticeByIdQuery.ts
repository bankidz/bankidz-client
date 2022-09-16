import { INoticeDTO } from '@queries/notice/api/noticeDTO';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import noticeAPI from './api/noticeAPI';

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
