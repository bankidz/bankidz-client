import { ReactNode } from '@mdx-js/react/lib';
import styled, { css } from 'styled-components';

interface InstructionBadgeProps {
  /** 스타일을 선택합니다. 'primary', 'secondary', 'tertiary' 중 하나를 입력합니다. */
  property: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode;
}

function InstructionBadge({ property, children }: InstructionBadgeProps) {
  return (
    <Wrapper>
      <StyledSpan property={property}>{children}</StyledSpan>
    </Wrapper>
  );
}

export default InstructionBadge;

const Wrapper = styled.div`
  height: 23px;
`;

const StyledSpan = styled.span<{
  property: 'primary' | 'secondary' | 'tertiary';
}>`
  height: 23px;
  border-radius: 6.56287px;

  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;

  line-height: 23px;
  vertical-align: middle;
  display: inline-block;
  text-align: center;

  padding-left: 6px;
  padding-right: 6px;

  ${({ property }) =>
    property === 'primary' &&
    css`
      background: ${({ theme }) => theme.palette.yellow[2]};
    `}
  ${({ property }) =>
    property === 'secondary' &&
    css`
      background: ${({ theme }) => theme.palette.yellow[4]};
    `}
  ${({ property }) =>
    property === 'tertiary' &&
    css`
      background: ${({ theme }) => theme.palette.yellow[3]};
    `}
`;
