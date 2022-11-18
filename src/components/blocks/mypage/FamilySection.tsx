import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { darken } from 'polished';
import FamilyList from './FamilyList';
import useFamilyQuery from '@lib/hooks/queries/useFamilyQuery';
import familyAPI from '@lib/apis/family/familyAPI';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import queryKeys from '@lib/constants/queryKeys';

const FamilySection = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: familyData, status: familyStatus } = useFamilyQuery({
    suspense: true,
  });

  const { setOpenBottomSheet } = useGlobalBottomSheet();

  const { mutate: mutateCreateFamily } = useMutation(familyAPI.createFamily, {
    onSuccess: () => {
      openCreateGroupCompletedSheet();
      queryClient.invalidateQueries(queryKeys.FAMILY);
    },
  });

  const openCreateGroupCompletedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      contentProps: {
        type: 'createGroup',
      },
    });
  };

  return (
    <>
      <h2>가족 관리</h2>
      {familyData!.id ? (
        <FamilyList family={familyData!.familyUserList} />
      ) : (
        <>
          <CreateDongil onClick={() => mutateCreateFamily()}>
            <p>가족그룹 만들기</p>
            <p>그룹을 만들고 가족을 초대해봐요</p>
          </CreateDongil>
          <CreateDongil onClick={() => navigate('/mypage/enter')}>
            <p>그룹코드 입력하기</p>
            <p>다른 가족에게 전달받은 코드를 입력해요</p>
          </CreateDongil>
        </>
      )}
    </>
  );
};

export default FamilySection;

const CreateDongil = styled.div`
  margin-bottom: 8px;

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
