import getWeekNumberByMonth from '@lib/utils/get/getWeekNumberByMonth';
import styled, { css } from 'styled-components';
import SkeletonRectangle from './SkeletonRectangle';

type TVariant = 'KidHome' | 'ParentHome';

interface SummaryProps {
  /**
   * 본 컴포넌트가 사용되는 Page를 선택합니다.
   * 'KidHome', 'ParentHome' 중 하나를 선택합니다.
   */
  variant: TVariant;
}

function SkeletonSummary({ variant }: SummaryProps) {
  let content;
  if (variant === 'KidHome') {
    content = (
      <>
        <TitleWrapper variant={variant}>
          <div className="top">
            <SkeletonRectangle borderRadius={7} />
          </div>
        </TitleWrapper>
        <InfoWrapper>
          <TextWrapper>
            <div className="top">
              <SkeletonRectangle borderRadius={8} />
            </div>
            <div className="bottom">
              <SkeletonRectangle borderRadius={6} />
            </div>
          </TextWrapper>
          <Divider />
          <TextWrapper>
            <div className="top">
              <SkeletonRectangle borderRadius={8} />
            </div>
            <div className="bottom">
              <SkeletonRectangle borderRadius={6} />
            </div>
          </TextWrapper>
        </InfoWrapper>
      </>
    );
  } else if (variant === 'ParentHome') {
    content = (
      <>
        <TitleWrapper variant={variant}>
          <div className="top">
            <SkeletonRectangle borderRadius={7} />
          </div>
          <div className="bottom">
            <SkeletonRectangle borderRadius={8} />
          </div>
        </TitleWrapper>
        <InfoWrapper>
          <TextWrapper>
            <div className="top">
              <SkeletonRectangle borderRadius={8} />
            </div>
            <div className="bottom">
              <SkeletonRectangle borderRadius={6} />
            </div>
          </TextWrapper>
          <Divider />
          <TextWrapper>
            <div className="top">
              <SkeletonRectangle borderRadius={8} />
            </div>
            <div className="bottom">
              <SkeletonRectangle borderRadius={6} />
            </div>
          </TextWrapper>
        </InfoWrapper>
      </>
    );
  }
  return <Wrapper variant={variant}>{content}</Wrapper>;
}

export default SkeletonSummary;

const Wrapper = styled.div<{ variant: TVariant }>`
  ${({ variant }) =>
    variant === 'KidHome' &&
    css`
      height: 120px;
    `}
  ${({ variant }) =>
    variant === 'ParentHome' &&
    css`
      height: 160px;
    `}

  width: 100%;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.large};
  border: 2px solid ${({ theme }) => theme.palette.greyScale.grey100};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 16px;
  padding-bottom: 16px;
`;

const TitleWrapper = styled.div<{
  variant: TVariant;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .top {
    height: 14px;
    width: 74px;
    ${({ variant }) =>
      variant === 'KidHome' &&
      css`
        margin-bottom: 12px;
      `}
    ${({ variant }) =>
      variant === 'ParentHome' &&
      css`
        margin-bottom: 10px;
      `}
  }
  .bottom {
    width: 276px;
    height: 22px;
    margin-bottom: 13px;
  }
`;

const InfoWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;

  width: 100%;
  grid-template-columns: 1fr 2px 1fr;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .top {
    width: 138px;
    height: 21px;
  }
  .bottom {
    width: 47px;
    height: 12px;
  }
`;

const Divider = styled.div`
  width: 2px;
  height: 53px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
`;
