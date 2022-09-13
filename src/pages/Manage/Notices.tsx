import useNoticeApi from '@lib/apis/notice/useNoticeApi';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import queryKeys from '@lib/constants/queryKeys';

const Notices = () => {
  const navigate = useNavigate();
  const { getNotices } = useNoticeApi();
  const { data } = useQuery(queryKeys.NOTICE, getNotices);
  console.log(data);
  return (
    <ForegroundTemplate label="공지사항">
      <>
        {data?.map((notice) => (
          <NoticeItem
            key={notice.id}
            onClick={() => {
              navigate(`${notice.id}`);
            }}
          >
            <p>{notice.title}</p>
            <p>{dayjs(notice.createdAt).format('YYYY.MM.DD')}</p>
          </NoticeItem>
        ))}
      </>
    </ForegroundTemplate>
  );
};
export default Notices;

export const NoticeItem = styled.button`
  padding: 20px 26px;
  width: 100%;
  height: 82px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.palette.greyScale.grey200};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:first-child {
    margin-top: 20px;
  }
  p:first-child {
    ${({ theme }) => theme.typo.text.T_16_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  p:last-child {
    ${({ theme }) => theme.typo.text.S_12_M}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
  }
`;
