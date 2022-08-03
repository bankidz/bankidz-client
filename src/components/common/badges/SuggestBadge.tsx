import styled, { css } from 'styled-components';

interface SuggestBadgeProps {
  /** 상태를 선택합니다. isSuggesting이 true면 '제안중', false면 '거절됨'을 의미합니다. */
  isSuggesting: boolean;
}

function SuggestBadge({ isSuggesting }: SuggestBadgeProps) {
  return (
    <Wrapper isSuggesting={isSuggesting}>
      {isSuggesting ? '제안중' : '거절됨'}
    </Wrapper>
  );
}

export default SuggestBadge;

const Wrapper = styled.div<{ isSuggesting: boolean }>`
  height: 26px;
  width: 67px;
  border-radius: ${({ theme }) => theme.radius.small};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.typo.button.InnerText_T_12_EB}
  color: ${({ theme, isSuggesting }) =>
    isSuggesting
      ? theme.palette.greyScale.grey600
      : theme.palette.sementic.red300};
  background-color: ${({ theme, isSuggesting }) =>
    isSuggesting
      ? theme.palette.greyScale.grey200
      : theme.palette.sementic.red100};
`;
