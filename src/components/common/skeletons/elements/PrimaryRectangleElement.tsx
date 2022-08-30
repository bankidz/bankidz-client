import StyledContentLoader from './CustomContentLoader';

/**
 * PrimaryRectangleElement는 border-radius가 8px로 고정되어 있습니다.
 *
 * 본 컴포넌트(svg)는 height: 100%, width: 100%로 설정되어 있습니다.
 * 본 컴포넌트를 import 하는 컴포넌트에서 반응형에 맞추어 Wrapper를 설정합니다.
 * 본 컴포넌트의 크기는 svg와 같은 방식으로 Wrapper의 크기에 의해 결정됩니다.
 * */
function PrimaryRectangleElement() {
  return (
    <StyledContentLoader>
      <rect x="0" y="0" rx="8px" ry="8px" width="100%" height="100%" />
    </StyledContentLoader>
  );
}

export default PrimaryRectangleElement;
