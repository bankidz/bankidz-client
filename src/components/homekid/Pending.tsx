import styled from 'styled-components';
import SuggestBadge from '../badges/SuggestBadge';

interface PendingProps {
  date: string;
  name: string;
  isSuggesting: boolean;
}

function Pending({ date, name, isSuggesting }: PendingProps) {
  /* 나중에 페이지 컴포넌트나 유틸로 옮겨서 쓰면 될듯 */
  const selectDateOnly = (date: string) => {
    return date.split(' ')[0].replace(/-/g, '.');
  };
  const dateOnly = selectDateOnly(date);

  return (
    <ComponentWrapper>
      <Left>
        <p>{dateOnly}</p>
        <p>{name}</p>
      </Left>
      <SuggestBadge isSuggesting={isSuggesting} />
    </ComponentWrapper>
  );
}

export default Pending;

const ComponentWrapper = styled.div`
  width: 100%;
  height: 96px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 24px 16px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  p:first-child {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.gray[5]};
  }
  p:last-child {
    margin-top: 8px;
    font-family: 'TmoneyRoundWind';
    font-size: 20px;
    line-height: 26px;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.black};
  }
`;
