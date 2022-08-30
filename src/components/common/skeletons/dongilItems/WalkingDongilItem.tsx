import styled from 'styled-components';
import { ReactComponent as Arrow } from '@assets/icons/arrow-walking.svg';
import PrimaryRectangleElement from '../elements/PrimaryRectangleElement';
import SecondaryRectangleElement from '../elements/SecondaryRectangleElement';

const RIGHT_CONTENT_HEIGHT = 14;

function WalkingDongilItem() {
  return (
    <Wrapper>
      <div className="content-wrapper">
        <div className="left">
          <PrimaryRectangleElement />
        </div>
        <div className="right">
          <SecondaryRectangleElement height={RIGHT_CONTENT_HEIGHT} />
        </div>
      </div>
      <div className="icon-wrapper">
        <Arrow />
      </div>
    </Wrapper>
  );
}

export default WalkingDongilItem;

const Wrapper = styled.div`
  width: 100%;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  .content-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left {
      width: 30px;
      height: 30px;
      margin-right: 8px;
    }
    .right {
      width: 180px;
      height: ${RIGHT_CONTENT_HEIGHT}px;
    }
  }
  .icon-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
