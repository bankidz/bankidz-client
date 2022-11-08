import { ReactNode } from 'react';
import styled from 'styled-components';

type TMarginValue = 26;

interface MarginTemplateProps {
  children: ReactNode;
  margin?: TMarginValue;
}

/**
 * 디자인 시스템에 맞추어 좌우 18px margin을 부여하는 template
 * @param margin 추가적인 margin 값이 필요한 경우 값을 부여합니다.
 * 기본값은 18px 입니다.
 */
function MarginTemplate({ children, margin }: MarginTemplateProps) {
  return <Wrapper margin={margin}>{children}</Wrapper>;
}

export default MarginTemplate;

const Wrapper = styled.div<{ margin?: TMarginValue }>`
  width: 100%;
  padding: ${({ margin }) => (margin ? '0px 26px' : '0px 18px')};
  box-sizing: border-box;
`;
