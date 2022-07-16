import styled from 'styled-components';
import { ReactComponent as PerforatedLineShapeBottom } from '@assets/border/perforated-line-shape-bottom.svg';

function PerforatedLineBottom() {
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
          <PerforatedLineShapeBottom />
        </div>,
      );
    }
    return ret;
  }
  return <Wrapper>{render()}</Wrapper>;
}

export default PerforatedLineBottom;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 15px; // 5px for unknown border top radius
  width: 100%;
  border: none;
  outline: none;

  .shape {
    margin: 0 -1px;
    flex: 1;
    border: none;
    outline: none;
    height: 10px;
    width: 20px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;
