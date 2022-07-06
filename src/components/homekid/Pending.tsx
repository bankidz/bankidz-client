import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import SuggestBadge from '../badges/SuggestBadge';

interface PendingProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * 요청 날짜 : yyyy-MM-dd hh:mm:ss
   */
  date: string;
  name: string;
  /**
   * 상태를 선택합니다. isSuggesting이 true면 '제안중', false면 '거절됨'을 의미합니다.
   */
  isSuggesting: boolean;
}

function Pending({ date, name, isSuggesting, ...props }: PendingProps) {
  /* 나중에 페이지 컴포넌트나 유틸로 옮겨서 쓰면 될듯 */
  const selectDateOnly = (date: string) => {
    return date.split(' ')[0].replace(/-/g, '.');
  };
  const dateOnly = selectDateOnly(date);

  return (
    <Wrapper {...props}>
      <Left>
        <p>{dateOnly}</p>
        <p>{name}</p>
      </Left>
      <SuggestBadge isSuggesting={isSuggesting} />
    </Wrapper>
  );
}

export default Pending;

const Wrapper = styled.button`
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
  text-align: left;

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
