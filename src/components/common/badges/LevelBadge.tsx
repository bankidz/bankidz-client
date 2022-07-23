import styled, { css } from 'styled-components';

interface LevelBadgeProps {
  /** 레벨을 입력합니다. */
  level: 1 | 2 | 3 | 4 | 5;
}

function LevelBadge({ level }: LevelBadgeProps) {
  function renderText(level: 1 | 2 | 3 | 4 | 5) {
    if (level === 1) {
      return 'Lv.1 뱅키학';
    } else if (level === 2) {
      return 'Lv.2 태계뱅키';
    } else if (level === 3) {
      return 'Lv.3 율곡뱅키';
    } else if (level === 4) {
      return 'Lv.4 뱅키대왕';
    } else if (level === 5) {
      return 'Lv.5 뱅키임당';
    }
  }
  return (
    <Wrapper>
      <StyledSpan level={level}>{renderText(level)}</StyledSpan>
    </Wrapper>
  );
}

export default LevelBadge;

const Wrapper = styled.div`
  height: 28px;
`;

const StyledSpan = styled.span<{ level: 1 | 2 | 3 | 4 | 5 }>`
  width: 100px;
  padding: 8px 12px;
  gap: 8px;

  line-height: 28px;
  vertical-align: center;
  display: inline-block;
  text-align: center;

  background: ${({ theme }) => theme.palette.greyScale.grey100};
  border-radius: ${({ theme }) => theme.radius.small};

  ${({ theme }) => theme.typo.tag.T_12_EB};

  ${({ level }) =>
    level === 1 &&
    css`
      color: ${({ theme }) => theme.palette.level.grey100};
    `}
  ${({ level }) =>
    level === 2 &&
    css`
      color: ${({ theme }) => theme.palette.level.blue100};
    `}
  ${({ level }) =>
    level === 3 &&
    css`
      color: ${({ theme }) => theme.palette.level.red100};
    `}
  ${({ level }) =>
    level === 4 &&
    css`
      color: ${({ theme }) => theme.palette.level.green100};
    `}
  ${({ level }) =>
    level === 5 &&
    css`
      color: ${({ theme }) => theme.palette.level.yellow100};
    `}
`;
