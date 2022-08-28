import { IGetKidResDataItem } from '@lib/api/family/family.type';
import getCommaThreeDigits from '@lib/utils/get/getCommaThreeDigits';
import getPercentValue from '@lib/utils/get/getPercenValue';
import styled from 'styled-components';
import OverViewData from './OverViewContent';

// TODO: any
function KidsRecordItem({ kid }: { kid: IGetKidResDataItem }) {
  const overViewData = [
    { name: '총 저금액', value: `${getCommaThreeDigits(kid.savings)}원` },
    {
      name: '아이의 총 돈길',
      value: kid.totalChallenge,
    },
    {
      name: '아이의 완주율',
      value: `${getPercentValue(kid.achievedChallenge, kid.totalChallenge)}%`,
    },
  ];
  return (
    <Wrapper>
      <p>{kid.username} 뱅키</p>
      <OverViewData data={overViewData} />
    </Wrapper>
  );
}

export default KidsRecordItem;

const Wrapper = styled.div`
  height: 135px;
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  padding-top: 32px;
  padding-bottom: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > p {
    ${({ theme }) => theme.typo.text.T_14_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;
