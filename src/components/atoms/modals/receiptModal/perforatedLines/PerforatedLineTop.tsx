import styled from 'styled-components';
import { ReactComponent as PerforatedLineShapeTop } from '@assets/borders/perforated-line-shape-top.svg';

interface PerforatedLineTopProps {
  fill: string;
}

function PerforatedLineTop({ fill }: PerforatedLineTopProps) {
  function render() {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    );
    const cnt = vw / 20; // 반응형 테스트하여 산정하였습니다.
    const ret: any = [];
    for (let i = 0; i < cnt; ++i) {
      ret.push(
        <div key={i} className="shape">
          <PerforatedLineShapeTop fill={fill} />
        </div>,
      );
    }
    return ret;
  }
  return <Wrapper>{render()}</Wrapper>;
}

export default PerforatedLineTop;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 15px; // 5px for unknown border top radius
  width: 100%;
  border: none;
  outline: none;

  .shape {
    margin: 0 -1.5px;
    flex: 1;
    border: none;
    outline: none;
    height: 10px;
    width: 20px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
`;
