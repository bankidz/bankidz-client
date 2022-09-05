import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NoticeItem } from './Notices';

const NoticeView = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <ForegroundTemplate>
      <>
        <NoticeItem>
          <p>제목입니다</p>
          <p>날짜입니다</p>
        </NoticeItem>
        <Content>
          {`안녕하세요, 뱅키즈입니다.\n\n드디어 자녀와 부모가 함께 즐길 수 있는 저축 챌린지 ‘뱅키즈’서비스를 출시하였습니다.\n\n저희는 지난 5개월 간, 어린이들의 재밌는 금융 경험 제공과 올바른 금융 습관 형성을 목표로 서비스를 준비해왔습니다.\n\n이에 저희의 많은 고민이 담긴 서비스에 많은 이용 부탁드리며, 무엇이든 문의사항이나 피드백을 남겨주시면 감사하겠습니다.\n\n또한, 앞으로 추가될 소비관리, 앱 내 계좌연결 등 다양한 서비스에도 많은 관심 부탁드립니다.\n\n감사합니다.`}
        </Content>
      </>
    </ForegroundTemplate>
  );
};

export default NoticeView;

const Content = styled.div`
  padding: 26px;
  ${({ theme }) => theme.typo.text.S_14_M}
  color: ${({ theme }) => theme.palette.greyScale.black};
  white-space: pre-wrap;
`;
