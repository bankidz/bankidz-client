import styled from 'styled-components';
import { useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { TLevel } from '@lib/types/TLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import FixedBar from './FixedBar';
import Background from '@components/home/homeTemplate/Background';
import Content from './Content';
import usePreventGoBack from '@lib/hooks/usePreventGoBack';

interface HomeTemplateProps {
  children: React.ReactNode;
  variant: 'KidHome' | 'ParentHome';
}

function HomeTemplate({ children, variant }: HomeTemplateProps) {
  const selectedKid = useAppSelector(selectSelectedKid);
  let level: TLevel;
  const temp = useAppSelector(selectLevel)!;
  if (variant === 'KidHome') {
    level = temp;
  } else if (variant === 'ParentHome') {
    level = selectedKid?.level!;
  }
  const colorByLevel = getColorByLevel(level!);
  usePreventGoBack();

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
