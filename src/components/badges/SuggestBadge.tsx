import styled, { css } from 'styled-components';

interface SuggestBadgeProps {
  /** 상태를 선택합니다. isSuggesting이 true면 '제안중', false면 '거절됨'을 의미합니다. */
  isSuggesting: boolean;
}

function SuggestBadge({ isSuggesting }: SuggestBadgeProps) {
  return (
    <ComponentWrapper>
      <StyledSpan isSuggesting={isSuggesting}>
        {isSuggesting ? '제안중' : '거절됨'}
      </StyledSpan>
    </ComponentWrapper>
  );
}

export default SuggestBadge;

const ComponentWrapper = styled.div`
  height: 28px;
`;

const StyledSpan = styled.span<{
  isSuggesting: boolean;
}>`
  font-weight: 500;
  font-size: 12px;
  line-height: 28px;
  vertical-align: middle;
  color: white;

  width: 64px;
  height: 28px;
  border-radius: 8px;
  border: none;
  outline: none;

  display: inline-block;
  text-align: center;

  ${({ isSuggesting }) =>
    isSuggesting
      ? css`
          // gray 색상은 디자인 되어 있지 않아 임의로 설정하였습니다.
          background-color: ${({ theme }) => theme.palette.gray[3]};
        `
      : css`
          background-color: ${({ theme }) => theme.palette.red[3]};
        `};
`;
