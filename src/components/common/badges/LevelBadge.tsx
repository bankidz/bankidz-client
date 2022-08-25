import styled from 'styled-components';
import getBankiNameByLevel from '@lib/utils/get/getBankiNameByLevel';
import { TLevel } from '@lib/types/TLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';

interface LevelBadgeProps {
  level: TLevel;
}

function LevelBadge({ level }: LevelBadgeProps) {
  const colorByLevel = getColorByLevel(level);

  return (
    <Wrapper>
      <StyledSpan colorByLevel={colorByLevel}>
        {getBankiNameByLevel(level!)}
      </StyledSpan>
    </Wrapper>
  );
}

export default LevelBadge;

const Wrapper = styled.div`
  height: 28px;
`;

const StyledSpan = styled.span<{ colorByLevel: string }>`
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

  transition: ${({ theme }) => theme.transition.kidSelect};
  color: ${({ colorByLevel }) => colorByLevel};
`;
