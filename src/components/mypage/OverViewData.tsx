import { useAppSelector } from '@store/app/hooks';
import { selectKidOverView } from '@store/slices/kidOverViewSlice';
import styled from 'styled-components';

type OverViewDataProps = {
  isKid: boolean;
  achievedChallenge: number;
  totalChallenge: number;
};

function OverViewData({
  isKid,
  achievedChallenge,
  totalChallenge,
}: OverViewDataProps) {
  const kid = [
    <>
      <p>{achievedChallenge}</p>
      <p>완주한 돈길</p>
    </>,
    <>
      <p>{totalChallenge}</p>
      <p>총 돈길</p>
    </>,
    <>
      <p>{Math.ceil((achievedChallenge / totalChallenge) * 100)}%</p>
      <p>평균 완주율</p>
    </>,
  ];
  const parent = [<></>, <></>, <></>];
  return (
    <Wrapper>
      <Item>{isKid ? kid[0] : parent[0]}</Item>
      <Divider />
      <Item>{isKid ? kid[1] : parent[1]}</Item>
      <Divider />
      <Item>{isKid ? kid[2] : parent[2]}</Item>
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
