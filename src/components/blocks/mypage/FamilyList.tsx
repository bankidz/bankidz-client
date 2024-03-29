import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { darken } from 'polished';
import dayjs from 'dayjs';
import FamilyItem from './FamilyItem';
import { ReactComponent as Share } from '@assets/icons/shareMypage.svg';
import { ReactComponent as Leave } from '@assets/icons/leaveGroupMypage.svg';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { cipher } from '@lib/utils/crypt';
import { IMyPageDTO } from '@lib/apis/user/userDTO';
import { IFamilyDTO, IFamilyUserDTO } from '@lib/apis/family/familyDTO';
import queryKeys from '@lib/constants/queryKeys';
import familyAPI from '@lib/apis/family/familyAPI';
import copyToClipboard from '@lib/utils/copyToClipboard';
import messageToRNWebView from '@lib/utils/messageToRNWebView';

function FamilyList({ family }: { family: IFamilyUserDTO[] }) {
  const { setOpenBottomSheet, openSheetBySequence } = useGlobalBottomSheet();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(queryKeys.USER) as IMyPageDTO;
  const familyData = queryClient.getQueryData(queryKeys.FAMILY) as IFamilyDTO;

  const { mutate: mutateLeaveFamily } = useMutation(familyAPI.leaveFamily, {
    onSuccess: () => {
      openLeaveGroupCompletedSheet();
      queryClient.invalidateQueries(queryKeys.FAMILY);
      queryClient.invalidateQueries(queryKeys.FAMILY_KID);
    },
  });

  const me = {
    username: userData?.user.username,
    isFemale: userData?.user.isFemale,
    isKid: userData?.user.isKid,
  };

  // 1. 그룹나가기 버튼 클릭
  const openLeaveGroupWarningSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Warning',
      contentProps: {
        type: 'leaveGroup',
        onMainActionClick: openLeaveGroupCheckWarningSheet,
      },
    });
  };

  // 2. 정말로 가족그룹을 나갈건가요?
  const openLeaveGroupCheckWarningSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Warning',
        contentProps: {
          type: 'leaveGroupCheck',
          onMainActionClick: onLeaveGroupButtonClick,
        },
      });
    openSheetBySequence(openSheet);
  };

  const onLeaveGroupButtonClick = async () => {
    const code = familyData.code;
    mutateLeaveFamily({ code });
  };

  // 3. 기존 가족그룹에서 나갔어요
  const openLeaveGroupCompletedSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Completed',

        contentProps: {
          type: 'leaveGroup',
        },
      });
    openSheetBySequence(openSheet);
  };

  // 그룹링크 공유하기 버튼 클릭
  const onShareButtonClick = () => {
    const data = {
      code: familyData.code,
      expiredDate: dayjs().add(2, 'days'),
    };
    // const DOMAIN = `${process.env.REACT_APP_DOMAIN}`;

    const encrypted = cipher(JSON.stringify(data));
    //copyToClipboard(encrypted);
    //toast.success('클립보드에 복사되었어요');

    // const link = `${DOMAIN}/link/${encrypted}`;
    messageToRNWebView(encrypted);
  };

  return (
    <Wrapper>
      <List>
        {userData && <FamilyItem user={me} me={true} />}
        {family.map((member) => (
          <FamilyItem user={member} key={member.username} />
        ))}
      </List>
      <ButtonSet>
        <button onClick={openLeaveGroupWarningSheet}>
          <Leave />
          <p className="leave">그룹 나가기</p>
        </button>
        <span className="divider" />
        <button onClick={onShareButtonClick}>
          <Share />
          <p className="share">그룹코드 공유하기</p>
        </button>
      </ButtonSet>
    </Wrapper>
  );
}

export default FamilyList;
const Wrapper = styled.div`
  & > button {
    margin: 0 auto;
    margin-top: 20px;
  }
`;

const List = styled.div`
  & > div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.greyScale.grey200};
  }
  & > div:first-child {
    padding-top: 0px;
  }
`;

const ButtonSet = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    p {
      ${({ theme }) => theme.typo.button.Text_T_14_EB}
      margin-bottom: -2px;
    }
    svg {
      margin-right: 4px;
    }

    .leave {
      color: ${({ theme }) => theme.palette.greyScale.grey500};
    }
    .share {
      color: ${({ theme }) => theme.palette.main.yellow400};
    }

    :active {
      .leave {
        color: ${darken(0.1, '#A6A9AD')}; //grey500
      }
      .share {
        color: ${darken(0.1, '#ffc52f')}; //yelow400
      }
    }
  }

  .divider {
    height: 18px;
    width: 2px;
    border-radius: 1px;
    background-color: ${({ theme }) => theme.palette.greyScale.grey300};
    margin: 0 8px;
  }
`;
