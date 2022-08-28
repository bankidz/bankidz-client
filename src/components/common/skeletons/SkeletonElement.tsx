import ContentLoader from 'react-content-loader';

interface SkeletonRectangleProps {
  /** Element의 종류를 선택합니다. */
  variant: 'rectangle' | 'circle';
  /** variant: 'rectangle' 선택 시 px 단위로 border-radius를 지정합니다. */
  borderRadius?: number;
  /** variant: 'circle' 선택 시 px 단위로 radius(반지름)를 지정합니다. */
  radius?: number;
}

/**
 * 본 컴포넌트(svg)는 height: 100%, width: 100%로 설정되어 있습니다.
 * 본 컴포넌트를 import 하는 컴포넌트에서 반응형에 맞추어 Wrapper를 설정합니다.
 * */
function SkeletonElement({
  variant,
  borderRadius,
  radius,
}: SkeletonRectangleProps) {
  let figure;
  if (variant === 'rectangle') {
    figure = (
      <rect
        x="0"
        y="0"
        rx={borderRadius}
        ry={borderRadius}
        width="100%"
        height="100%"
      />
    );
  } else if (variant === 'circle') {
    figure = <circle cx={radius} cy={radius} r={radius} />;
  }

  return (
    <ContentLoader
      width={'100%'}
      height={'100%'}
      backgroundColor="#FAFAFC" // grey100
      foregroundColor="#EAEAEC" // grey200
    >
      {figure}
    </ContentLoader>
  );
}

export default SkeletonElement;
