import styled from 'styled-components';
import SkeletonElement from '../SkeletonElement';

function PendingDongilItem() {
  return (
    <Wrapper>
      <div className="text-wrapper">
        <span className="title">
          <SkeletonElement borderRadius={7} />
        </span>
        <span className="createdAt">
          <SkeletonElement borderRadius={7} />
        </span>
      </div>
      <div className="badge-wrapper">
        <SkeletonElement borderRadius={8} />
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
      height: 14px;
    }
    .createdAt {
      width: 70px;
      height: 12px;
    }
  }
  .badge-wrapper {
    width: 67px;
    height: 26px;
  }
`;
