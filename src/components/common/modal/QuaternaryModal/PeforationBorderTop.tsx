import styled from 'styled-components';
import { ReactComponent as PerforationShape } from '@assets/border/perforation-shape.svg';

function PerforatedLineTop() {
  function render() {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    );
    const cnt = vw / 20 - 1;
    const ret: any = [];
    for (let i = 0; i < cnt; ++i) {
      ret.push(
        <div key={i} className="shape">
          <PerforationShape />
        </div>,
      );
    }
    return ret;
  }
  return (
    <Wrapper>
      {render()}
      {/* <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div>
      <div className="shape">
        <PerforationShape />
      </div> */}
    </Wrapper>
  );
}

export default PerforatedLineTop;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 15px; // unknown border top radius
  /* background: pink; */
  width: 100%;
  border: none;
  outline: none;

  .shape {
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
