import styled from 'styled-components';
import SkeletonElement from './SkeletonElement';

function SkeletonInterestToPayList() {
  return (
    <Wrapper>
      <Block>
        <div className="text-wrapper">
          <span className="date">
            <SkeletonElement borderRadius={6} />
          </span>
          <h1>
            <SkeletonElement borderRadius={8} />
          </h1>
          <div className="amount-wrapper">
            <SkeletonElement borderRadius={8} />
          </div>
        </div>
        <DoubleButtonWrapper>
          <SkeletonElement borderRadius={12} />
          <SkeletonElement borderRadius={12} />
        </DoubleButtonWrapper>
      </Block>
    </Wrapper>
  );
}

export default SkeletonInterestToPayList;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const Block = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 16px;

  width: 100%;
  height: 179px;
  border-radius: ${({ theme }) => theme.radius.large};
  background: ${({ theme }) => theme.palette.greyScale.white};

  .date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 12px;
    margin-top: 8px;
  }
  h1 {
    width: 100%;
    height: 22px;
    margin-top: 4px;
  }
  .amount-wrapper {
    width: 100%;
    height: 21px;
    margin-top: 24px;
  }
  & + & {
    margin-top: 16px;
  }
`;

const DoubleButtonWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;
