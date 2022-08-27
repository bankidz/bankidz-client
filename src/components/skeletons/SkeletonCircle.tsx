import ContentLoader from 'react-content-loader';

interface SkeletonCircleProps {
  /** px 단위로 radius(반지름)를 지정합니다. */
  radius: number;
}

/**
 * 본 컴포넌트(svg)는 height: 100%, width: 100%로 설정되어 있습니다.
 * 본 컴포넌트를 import 하는 컴포넌트에서 반응형에 맞추어 Wrapper를 설정합니다.
 * */
function SkeletonCircle({ radius }: SkeletonCircleProps) {
  return (
    <ContentLoader
      width={'100%'}
      height={'100%'}
      backgroundColor="#FAFAFC" // grey100
      foregroundColor="#EAEAEC" // grey200
    >
      <circle cx={radius} cy={radius} r={radius} />
    </ContentLoader>
  );
}

export default SkeletonCircle;
