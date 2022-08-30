import ContentLoader from 'react-content-loader';

interface CircleElementProps {
  radius: number;
}

/**
 * @param radius 반지름을 지정합니다.
 *
 * 본 컴포넌트(svg)는 height: 100%, width: 100%로 설정되어 있습니다.
 * 본 컴포넌트를 import 하는 컴포넌트에서 반응형에 맞추어 Wrapper를 설정합니다.
 * 본 컴포넌트의 크기는 svg와 같은 방식으로 Wrapper의 크기에 의해 결정됩니다.
 * */
function CircleElement({ radius = 0 }: CircleElementProps) {
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

export default CircleElement;
