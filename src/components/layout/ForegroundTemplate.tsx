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
    <>
      <AppBar label={label} level={level} to={to} />
      <Screen>{children}</Screen>
    </>
  );
}

export default ForegroundTemplate;

const Screen = styled.div`
  margin-top: 48px;
`;
