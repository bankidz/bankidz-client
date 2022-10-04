import styled, { css } from 'styled-components';
import renderRoleIllust from '@lib/utils/render/renderRoleIllust';
import OverViewContent from './OverViewContent';
import { useQueryClient } from 'react-query';
import getPercentValue from '@lib/utils/get/getPercentValue';
import { IMyPageDTO } from '@lib/apis/user/userDTO';
import { IKidListDTO } from '@lib/apis/family/familyDTO';
import queryKeys from '@lib/constants/queryKeys';

export type OverViewProps = {
  userData: IMyPageDTO;
};

function OverView({ userData }: OverViewProps) {
  const { user, kid, parent } = userData;
  const queryClient = useQueryClient();
  const kidData = queryClient.getQueryData(
    queryKeys.FAMILY_KID,
  ) as IKidListDTO[];

  const getOverViewData = (isKid: boolean) => {
    let overViewData;
    if (isKid) {
      overViewData = [
        { name: '완주한 돈길', value: kid?.achievedChallenge },
        { name: '총 돈길', value: kid?.totalChallenge },
        {
          name: '평균 완주율',
          value: `${getPercentValue(
            kid!.achievedChallenge,
            kid!.totalChallenge,
          )}%`,
        },
      ];
    } else {
      overViewData = [
        { name: '자녀의 수', value: kidData?.length },
        {
          name: '총 돈길 수락률',
          value: `${getPercentValue(
            parent!.acceptedRequest,
            parent!.totalRequest,
          )}%`,
        },
      ];
    }

    return overViewData;
  };

  return (
    <Wrapper>
      <Banki isKid={user.isKid} isFemale={user.isFemale!}>
        {renderRoleIllust(user.isKid, user.isFemale)}
      </Banki>
      <p>
        {user.username} {user.isKid && '뱅키'}
      </p>
      <OverViewContent data={getOverViewData(user.isKid)} />
    </Wrapper>
  );
}

export default OverView;

const Wrapper = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  height: 168px;
  margin-top: 122px;
  position: relative;

  & > p {
    ${({ theme }) => theme.typo.text.T_18_EB}
    color: ${({ theme }) => theme.palette.main.yellow400};
    text-align: center;
    padding-top: 53px;
    margin-bottom: 24px;
  }
`;

const Banki = styled.div<{ isKid: boolean; isFemale: boolean }>`
  width: 128px;
  position: absolute;
  transform: translate3d(-50%, -66px, 0);
  left: 50%;

  // 아빠
  ${({ isKid, isFemale }) =>
    isKid === false &&
    isFemale === false &&
    css`
      padding: 23px 15.87px 0px 25px;
    `}
  // 엄마
      ${({ isKid, isFemale }) =>
    isKid === false &&
    isFemale === true &&
    css`
      padding: 23px 14.44px 0px 16px;
    `}
      // 아들
      ${({ isKid, isFemale }) =>
    isKid === true &&
    isFemale === false &&
    css`
      padding: 21px 14.9px 2px 25px;
    `}
      // 딸
      ${({ isKid, isFemale }) =>
    isKid === true &&
    isFemale === true &&
    css`
      padding: 23px 12.9px 0px 14px;
    `}
`;
