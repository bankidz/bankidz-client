import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import ForegroundTemplate from '@components/atoms/layout/ForegroundTemplate';
import queryKeys from '@lib/constants/queryKeys';
import noticeAPI from '@lib/apis/notice/noticeAPI';
import LoadingSpinner from '@components/atoms/loaders/LoadingSpinner';

function Notices() {
  const navigate = useNavigate();
  const { data, status } = useQuery(queryKeys.NOTICE, noticeAPI.getNotice);
  let content;
  if (status === 'success') {
    content = (
      <>
        {data?.map((notice: any) => (
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
    );
  } else {
    content = (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  return (
    <ForegroundTemplate label="공지사항" to="/mypage/manage">
      {content}
    </ForegroundTemplate>
  );
}
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

const Wrapper = styled.div`
  height: 100vh;
`;
