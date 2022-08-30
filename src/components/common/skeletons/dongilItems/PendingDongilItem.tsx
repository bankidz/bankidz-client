import styled from 'styled-components';
import PrimaryRectangleElement from '../elements/PrimaryRectangleElement';
import SecondaryRectangleElement from '../elements/SecondaryRectangleElement';

const TITLE_HEIGHT = 14;
const CREATED_AT_HEIGHT = 12;

function PendingDongilItem() {
  return (
    <Wrapper>
      <div className="text-wrapper">
        <span className="title">
          <SecondaryRectangleElement height={TITLE_HEIGHT} />
        </span>
        <span className="createdAt">
          <SecondaryRectangleElement height={CREATED_AT_HEIGHT} />
        </span>
      </div>
      <div className="badge-wrapper">
        <PrimaryRectangleElement />
      </div>
    </Wrapper>
  );
}

export default PendingDongilItem;

const Wrapper = styled.div`
  width: 100%;
  height: 68px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};
  margin-bottom: 12px;
  padding: 18px 16px 16px 16px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .title {
      margin-bottom: 8px;
      width: 207px;
      height: ${TITLE_HEIGHT}px;
    }
    .createdAt {
      width: 70px;
      height: ${CREATED_AT_HEIGHT}px;
    }
  }
  .badge-wrapper {
    width: 67px;
    height: 26px;
  }
`;
