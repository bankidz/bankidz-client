import styled from 'styled-components';
import ContentLoader from 'react-content-loader';
import SkeletonElement from './SkeletonElement';

const SkeletonOverview = ({ isKid }: { isKid: boolean }) => {
  const arrayForRender = Array(isKid ? 2 : 3).fill(0);

  return (
    <Wrapper>
      <div>
        <ContentLoader width="128px" height="103px">
          <rect rx={8} ry={8} width="128px" height="103px" />
        </ContentLoader>
      </div>

      <OverViewContent>
        <div className="top">
          <SkeletonElement borderRadius={8} />
        </div>
        <div className="bottom">
          {arrayForRender.map((v, i) => (
            <Item key={i}>
              <div>
                <SkeletonElement borderRadius={8} />
              </div>
              <div>
                <SkeletonElement borderRadius={6} />
              </div>
            </Item>
          ))}
        </div>
      </OverViewContent>
    </Wrapper>
  );
};

export default SkeletonOverview;

const Wrapper = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  height: 168px;
  margin-top: 122px;
  position: relative;

  & > div:first-child {
    position: absolute;
    transform: translate3d(-50%, -66px, 0);
    left: 50%;
    margin: 0 auto;
  }
`;
const OverViewContent = styled.div`
  padding-top: 53px;
  .top {
    padding: 0 24px;
    height: 18px;
  }

  .bottom {
    display: flex;
    margin-top: 24px;
  }
`;

const Item = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  & > div {
    margin: 0 auto;
  }

  & > div:first-child {
    width: 74px;
    height: 21px;
  }
  & > div:last-child {
    width: 58px;
    height: 12px;
    margin-top: 8px;
  }

  &:not(:last-child) {
    border-right: 2px solid ${({ theme }) => theme.palette.greyScale.grey100};
  }
`;
