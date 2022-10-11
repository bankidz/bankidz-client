import styled from 'styled-components';

interface BackgroundTemplateProps {
  children: JSX.Element;
}

function BackgroundTemplate({ children }: BackgroundTemplateProps) {
  return <Wrapper>{children}</Wrapper>;
}

export default BackgroundTemplate;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
`;
