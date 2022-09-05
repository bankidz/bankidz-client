import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import noticeData from '@components/setting/notices/noticeData';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Notices = () => {
  const navigate = useNavigate();
  return (
    <ForegroundTemplate label="공지사항">
      <>
        {noticeData.map((notice) => (
          <Item
            onClick={() => {
              navigate(`${notice.id}`);
            }}
          >
            <p>{notice.title}</p>
            <p>{notice.date}</p>
          </Item>
        ))}
      </>
    </ForegroundTemplate>
  );
};
export default Notices;

const Item = styled.button`
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
