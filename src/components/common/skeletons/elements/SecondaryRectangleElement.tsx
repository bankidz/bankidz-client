import StyledContentLoader from './CustomContentLoader';

interface SecondaryRectangleProps {
  height: number;
}

/**
 * @param height Wrapper의 height를 입력합니다. SecondaryRectangleElement는
 * border-radius가 height의 50%로 설정됩니다.
 *
 * 본 컴포넌트(svg)는 height: 100%, width: 100%로 설정되어 있습니다.
 * 본 컴포넌트를 import 하는 컴포넌트에서 반응형에 맞추어 Wrapper를 설정합니다.
 * 본 컴포넌트의 크기는 svg와 같은 방식으로 Wrapper의 크기에 의해 결정됩니다.
 * */
function SecondaryRectangleElement({ height = 0 }: SecondaryRectangleProps) {
  return (
    <StyledContentLoader>
      <rect
        x="0"
        y="0"
        rx={`${height / 2}px`}
        ry={`${height / 2}px`}
        width="100%"
        height="100%"
      />
    </StyledContentLoader>
  );
}

export default SecondaryRectangleElement;
