import styled from 'styled-components';
import FixedBar from '@components/blocks/home/homeTemplate/FixedBar';
import LargeSpacer from '@components/atoms/layout/LargeSpacer';
import MarginTemplate from '@components/atoms/layout/MarginTemplate';

interface InterestTemplateProps {
  children: React.ReactNode;
}

function InterestTemplate({ children }: InterestTemplateProps) {
  return (
    <Wrapper>
      <FixedBar variant="Interest" />
      <MarginTemplate>
        <Positioner>{children}</Positioner>
      </MarginTemplate>
      <LargeSpacer />
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

  background: ${({ theme }) => theme.palette.greyScale.grey100};
`;

const Positioner = styled.div`
  margin-top: 100px;
`;
