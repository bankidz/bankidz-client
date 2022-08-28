import { IGetUserResData } from '@lib/api/user/user.type';
import { USER } from '@lib/constants/queryKeyes';
import { IFamilyState } from '@lib/types/IFamilyState';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import FamilyItem from './FamilyItem';
import { ReactComponent as Share } from '@assets/icons/shareMypage.svg';
import { ReactComponent as Leave } from '@assets/icons/leaveGroupMypage.svg';
import { darken } from 'polished';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

function FamilyList({ family }: { family: IFamilyState[] }) {
  const { setOpenBottomSheet, openSheetBySequence } = useGlobalBottomSheet();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(USER) as IGetUserResData;
  const me = {
    username: user.user.username,
    isFemale: user.user.isFemale,
    isKid: user.user.isKid,
  };

  // 1. 그룹나가기 버튼 클릭
  const openLeaveGroupWarningSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Warning',
      sheetProps: { open: true },
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
        sheetProps: { open: true },
        contentProps: {
          type: 'leaveGroupCheck',
          onMainActionClick: () => {},
        },
      });
    openSheetBySequence(openSheet);
  };

  return (
    <Wrapper>
      <List>
        <FamilyItem user={me} me={true} />
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
        <button>
          <Share />
          <p className="share">그룹링크 공유하기</p>
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
    ${({ theme }) => theme.typo.button.Text_T_14_EB}
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
