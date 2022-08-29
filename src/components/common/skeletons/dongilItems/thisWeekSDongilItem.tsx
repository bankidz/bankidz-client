import styled from 'styled-components';
import SkeletonElement from '../SkeletonElement';

function ThisWeekSDongilItem() {
  return (
    <Wrapper>
      <div className="content-wrapper">
        <div className="illust">
          <SkeletonElement borderRadius={8} />
        </div>
        <div className="title">
          <SkeletonElement borderRadius={7} />
        </div>
      </div>
    </Wrapper>
  );
}

export default ThisWeekSDongilItem;

const Wrapper = styled.div`
  width: 100%;
  height: 54px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};
  margin-bottom: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .content-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .illust {
      width: 30px;
      height: 30px;
      margin-left: 16px;
    }
    .title {
      margin-left: 12px;
      width: 198px;
      height: 14px;
    }
  }
`;
