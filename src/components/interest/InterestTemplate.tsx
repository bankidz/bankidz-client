import FixedBar from '@components/home/homeTemplate/FixedBar';
import styled from 'styled-components';

interface InterestTemplateProps {
  children: React.ReactNode;
}

function InterestTemplate({ children }: InterestTemplateProps) {
  return (
    <Wrapper>
      <FixedBar variant="Interest" />
      {children}
    </Wrapper>
  );
}

export default InterestTemplate;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
