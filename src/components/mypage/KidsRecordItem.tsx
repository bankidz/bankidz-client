import styled from 'styled-components';
import OverViewData from './OverViewData';

function KidsRecordItem({ kid }: { kid: any }) {
  return (
    <Wrapper>
      <p>{kid.username} 뱅키</p>
      <OverViewData isKid={false} forParent={kid} />
    </Wrapper>
  );
}

export default KidsRecordItem;

const Wrapper = styled.div`
  height: 135px;
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  padding-top: 32px;
  padding-bottom: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > p {
    ${({ theme }) => theme.typo.text.T_14_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;
