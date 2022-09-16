import { TNoticesDTO } from '@lib/apis/notice/notice.dto';
import noticeApi from '@lib/apis/notice/noticeApi';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useNoticeQuery = (
  options?: UseQueryOptions<TNoticesDTO, AxiosError, TNoticesDTO, string>,
) => {
  return useQuery(queryKeys.NOTICE, noticeApi.getNotice, options);
};
export default useNoticeQuery;
