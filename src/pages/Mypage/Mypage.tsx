import LargeSpacer from '@components/layout/LargeSpacer';
import MarginTemplate from '@components/layout/MarginTemplate';
import FamilyList from '@components/mypage/FamilyList';
import KidsRecordList from '@components/mypage/KidsRecordList';
import MyLevel from '@components/mypage/MyLevel';
import OverView from '@components/mypage/OverView';
import useFamilyApi from '@lib/api/family/useFamilyApi';
import useUserApi from '@lib/api/user/useUserAPi';
import { FAMILY, KID, USER } from '@lib/constants/queryKeyes';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { darken } from 'polished';
import { useQueries, useQuery } from 'react-query';
import styled, { css } from 'styled-components';

function Mypage() {
  const { setOpenBottomSheet } = useGlobalBottomSheet();

  const { getFamily } = useFamilyApi();
  const { getUser } = useUserApi();
  const { getKid } = useFamilyApi();

  const [family, user] = useQueries([
    { queryKey: FAMILY, queryFn: getFamily },
    { queryKey: USER, queryFn: getUser },
  ]);

  const { data: familyData, status: familyStatus } = family;
  const { data: userData, status: userStatus } = user;
  const { data: kidData, status: kidStatus } = useQuery(KID, getKid, {
    enabled: userData?.user.isKid === false,
  });

  const openCreateDongilCompletedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      sheetProps: { open: true },
      contentProps: {
        type: 'createGroup',
      },
    });
  };

  return (
    <Wrapper>
      <Header>마이페이지</Header>
      <MarginTemplate>
        {userStatus === 'success' ? (
          <OverView userData={userData} />
        ) : (
          /* TODO */
          '스켈레톤'
        )}
        {userData?.user.isKid ? (
          <Section>
            <h2>MY 레벨</h2>
            <MyLevel achievedChallenge={userData.kid!.achievedChallenge} />
          </Section>
        ) : (
          <Section smallGap={true}>
            <h2>자녀기록</h2>
            {kidStatus === 'success' && <KidsRecordList kidData={kidData!} />}
          </Section>
        )}
        <Section>
          <h2>가족 관리</h2>
          {familyStatus === 'success' && (
            <>
              {familyData!.familyUserList.length > 0 ? (
                <FamilyList family={familyData!.familyUserList} />
              ) : (
                <CreateDongil onClick={openCreateDongilCompletedSheet}>
                  <p>가족그룹 만들기</p>
                  <p>그룹을 만들고 가족을 초대해봐요</p>
                </CreateDongil>
              )}
            </>
          )}
        </Section>
      </MarginTemplate>
      <LargeSpacer />
    </Wrapper>
  );
}

export default Mypage;

const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;

const Header = styled.div`
  ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
  color: ${({ theme }) => theme.palette.greyScale.black};
  height: 48px;
  padding: 0px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 3;
`;

const Section = styled.div<{ smallGap?: boolean }>`
  margin-top: 80px;
  ${({ smallGap }) =>
    smallGap &&
    css`
      margin-top: 48px;
    `}
  & > h2 {
    ${({ theme }) => theme.typo.text.T_16_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 24px;
  }
`;

const CreateDongil = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  padding: 16px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.small};
  &:active {
    background-color: ${darken(0.02, '#fff')};
  }
  & > p:first-child {
    ${({ theme }) => theme.typo.text.T_18_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 8px;
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.text.T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;
