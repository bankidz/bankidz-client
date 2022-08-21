import styled from 'styled-components';
import { useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { TLevel } from '@lib/types/TLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import FixedBar from './FixedBar';
import Background from '@components/common/receipt/Background';
import Content from './Content';
import preventGoBack from '@lib/utils/preventGoBack';

type TVariant = 'KidHome' | 'ParentHome';

interface HomeTemplateProps {
  children: React.ReactNode;
  variant: TVariant;
}

function HomeTemplate({ children, variant }: HomeTemplateProps) {
  const selectedKid = useAppSelector(selectSelectedKid);
  let level: TLevel;
  if (variant === 'KidHome') {
    level = useAppSelector(selectLevel)!;
  } else if (variant === 'ParentHome') {
    level = selectedKid?.level!;
  }
  const colorByLevel = getColorByLevel(level!);
  preventGoBack();

  return (
    <Wrapper>
      <FixedBar colorByLevel={colorByLevel} />
      <Content level={level!} children={children} />
      <Background colorByLevel={colorByLevel} level={level!} />
    </Wrapper>
  );
}

export default HomeTemplate;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
