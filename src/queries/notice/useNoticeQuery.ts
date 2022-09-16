import { TNoticesDTO } from '@queries/notice/api/noticeDTO';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import noticeAPI from './api/noticeAPI';

const useNoticeQuery = (
  options?: UseQueryOptions<TNoticesDTO, AxiosError, TNoticesDTO, string>,
) => {
  return useQuery(queryKeys.NOTICE, noticeAPI.getNotice, options);
};
export default useNoticeQuery;
