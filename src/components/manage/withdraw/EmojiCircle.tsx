import styled from 'styled-components';
import { theme } from '@lib/styles/theme';

type TVariant = 'present' | 'creditCard' | 'friends' | 'cash' | 'books';

interface EmojiCircleProps {
  variant: TVariant;
}

function EmojiCircle({ variant }: EmojiCircleProps) {
  const emojiMap = new Map<TVariant, string>();
  emojiMap.set('present', '🎁');
  emojiMap.set('creditCard', '💳');
  emojiMap.set('friends', '👭');
  emojiMap.set('cash', '💵');
  emojiMap.set('books', '📚');

  const backgroundColorMap = new Map<TVariant, string>();
  backgroundColorMap.set('present', theme.palette.level.yellow100);
  backgroundColorMap.set('creditCard', theme.palette.level.green100);
  backgroundColorMap.set('friends', theme.palette.level.blue100);
  backgroundColorMap.set('cash', theme.palette.main.yellow100);
  backgroundColorMap.set('books', theme.palette.level.blue100);

  return (
    <StyledDiv backgroundColor={backgroundColorMap.get(variant)!}>
      {emojiMap.get(variant)}
    </StyledDiv>
  );
}

export default EmojiCircle;

const StyledDiv = styled.div<{ backgroundColor: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  flex-shrink: 0;

  text-align: center;
  ${({ theme }) => theme.typo.fixed.GraphNum_T_21_EB};
  line-height: 60px;

  background: ${({ backgroundColor }) => backgroundColor};
`;
