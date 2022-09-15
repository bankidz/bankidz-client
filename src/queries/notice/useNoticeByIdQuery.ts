import { INoticeDTO } from '@lib/apis/notice/notice.dto';
import noticeApi from '@lib/apis/notice/noticeApi';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useNoticeByIdQuery = (
  id: string,
  options?: UseQueryOptions<INoticeDTO, AxiosError, INoticeDTO, any>,
) => {
  return useQuery(
    [queryKeys.NOTICE, id],
    () => noticeApi.getNoticeById(id),
    options,
  );
};
export default useNoticeByIdQuery;
