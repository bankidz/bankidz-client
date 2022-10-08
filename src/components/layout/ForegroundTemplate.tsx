import { TLevel } from '@lib/types/TLevel';
import styled from 'styled-components';
import AppBar from './AppBar';

interface ForegroundTemplateProps {
  level?: TLevel | null;
  label?: string;
  to?: string;
  children: JSX.Element;
}

// 화면 상단에 'AppBar'를 함께 랜더링 하는 activity stack의 상위 UI template
function ForegroundTemplate({
  level,
  label,
  children,
  to,
}: ForegroundTemplateProps) {
  return (
    <Wrapper>
      <AppBar label={label} level={level} to={to} />
      <Screen>{children}</Screen>
    </Wrapper>
  );
}

export default ForegroundTemplate;

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
`;

const Screen = styled.div`
  margin-top: 48px;
`;
