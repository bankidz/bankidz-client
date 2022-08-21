import { useAppSelector } from '@store/app/hooks';
import { TOverView } from '@store/slices/overViewSlice';
import styled from 'styled-components';

type OverViewDataProps = {
  isKid: boolean;
  kid?: TOverView;
  forParent?: {
    username: string;
    acceptRate: number;
    acceptRequest: number;
    achieveRate: number;
  };
};

// 추후 리팩토링 예정...
function OverViewData({ isKid, kid, forParent }: OverViewDataProps) {
  const kidContent = kid
    ? [
        <>
          <p>{kid.achievedChallenge}</p>
          <p>완주한 돈길</p>
        </>,
        <>
          <p>{kid.totalChallenge}</p>
          <p>총 돈길</p>
        </>,
        <>
          <p>
            {kid!.totalChallenge === 0
              ? 0
              : Math.ceil((kid!.achievedChallenge / kid!.totalChallenge) * 100)}
            %
          </p>
          <p>평균 완주율</p>
        </>,
      ]
    : [];
  const parentContent = forParent
    ? [
        <>
          <p>{forParent.acceptRate}%</p>
          <p>돈길 수락률</p>
        </>,
        <>
          <p>{forParent.acceptRequest}</p>
          <p>아이의 총 돈길</p>
        </>,
        <>
          <p>{forParent.achieveRate}%</p>
          <p>아이의 완주율</p>
        </>,
      ]
    : [];
  return (
    <Wrapper>
      <Item>{isKid ? kidContent[0] : parentContent[0]}</Item>
      <Divider />
      <Item>{isKid ? kidContent[1] : parentContent[1]}</Item>
      <Divider />
      <Item>{isKid ? kidContent[2] : parentContent[2]}</Item>
    </Wrapper>
  );
}

export default OverViewData;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2px 1fr 2px 1fr;
`;

const Divider = styled.div`
  width: 2px;
  height: 45px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
`;

const Item = styled.div`
  width: 100%;
  height: 45px;
  text-align: center;
  & > p:first-child {
    ${({ theme }) => theme.typo.fixed.GraphNum_T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 8px;
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;
