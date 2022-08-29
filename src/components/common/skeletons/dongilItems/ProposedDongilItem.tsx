import styled from 'styled-components';
import SkeletonElement from '../SkeletonElement';

function ProposedDongilItem() {
  return (
    <Wrapper>
      <div className="text-wrapper">
        <span className="title">
          <SkeletonElement borderRadius={7} />
        </span>
        <span className="totalPrice">
          <SkeletonElement borderRadius={7} />
        </span>
      </div>
      <div className="badge-wrapper">
        <SkeletonElement borderRadius={13} />
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
      height: 14px;
    }
    .totalPrice {
      width: 70px;
      height: 13px;
    }
  }

  .badge-wrapper {
    width: 112px;
    height: 26px;
  }
`;
