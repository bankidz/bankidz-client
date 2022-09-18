import { TNoticesDTO } from '@lib/apis/notice/noticeDTO';
import noticeAPI from '@lib/apis/notice/noticeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useNoticeQuery = (
  options?: UseQueryOptions<TNoticesDTO, AxiosError, TNoticesDTO, string>,
) => {
  return useQuery(queryKeys.NOTICE, noticeAPI.getNotice, options);
};
export default useNoticeQuery;
