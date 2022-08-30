import styled from 'styled-components';
import SecondaryRectangleElement from '../elements/SecondaryRectangleElement';

const TITLE_HEIGHT = 14;
const TOTAL_PRICE_HEIGHT = 13;
const BADGE_HEIGHT = 26;

function ProposedDongilItem() {
  return (
    <Wrapper>
      <div className="text-wrapper">
        <span className="title">
          <SecondaryRectangleElement height={TITLE_HEIGHT} />
        </span>
        <span className="totalPrice">
          <SecondaryRectangleElement height={TOTAL_PRICE_HEIGHT} />
        </span>
      </div>
      <div className="badge">
        <SecondaryRectangleElement height={BADGE_HEIGHT} />
      </div>
    </Wrapper>
  );
}

export default ProposedDongilItem;

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};

  margin-bottom: 8px;
  padding: 20px 16px 18px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .text-wrapper {
    height: 37px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    .title {
      width: 160px;
      height: ${TITLE_HEIGHT}px;
    }
    .totalPrice {
      width: 70px;
      height: ${TOTAL_PRICE_HEIGHT}px;
    }
  }

  .badge {
    width: 112px;
    height: ${BADGE_HEIGHT}px;
  }
`;
