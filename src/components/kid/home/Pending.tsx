import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import SuggestBadge from '@components/common/badges/SuggestBadge';
import { darken } from 'polished';

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
        <p>{name}</p>
        <p>{dateOnly}</p>
      </Left>
      <SuggestBadge isSuggesting={isSuggesting} />
    </Wrapper>
  );
}

export default Pending;

const Wrapper = styled.button`
  width: 100%;
  height: 68px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: white;
  padding: 16px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme }) => {
    const selected = theme.palette.greyScale.white;
    return css`
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  text-align: left;

  p:first-child {
    ${({ theme }) => theme.typo.button.Text_T_14_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  p:last-child {
    margin-top: 8px;
    ${({ theme }) => theme.typo.text.S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;
