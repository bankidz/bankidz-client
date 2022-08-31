import styled from 'styled-components';
import { ReactComponent as Complete } from '@assets/icons/complete.svg';
import { ReactComponent as Feedback } from '@assets/icons/feedback.svg';
import { ReactComponent as Group } from '@assets/icons/group.svg';
import Button from '@components/common/buttons/Button';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

interface CompleteProps {
  type: 'delete' | 'cancel' | 'giveUp' | 'feedback' | 'approve';
  title?: string;
  onMainActionClick?: () => void;
}

const content = {
  delete: {
    icon: <Complete />,
    main: '삭제되었어요',
  },
  cancel: {
    icon: <Complete />,
    main: `'포기하기'가 취소되었어요`,
  },
  giveUp: {
    icon: <Complete />,
    main: null,
  },
  approve: {
    icon: <Complete />,
    main: '자녀의 돈길이 수락되었어요',
  },
  feedback: {
    icon: <Feedback />,
    main: '자녀에게 피드백이 전송되었어요',
  },
  createGroup: {
    icon: <Group />,
    main: '가족그룹이 만들어졌습니다',
  },
  moveGroup: {
    icon: <Feedback />,
    main: (
      <>
        <p>새로운 가족그룹으로</p>
        <p>이동했어요</p>
      </>
    ),
  },
  leaveGroup: {
    icon: <Complete />,
    main: '기존 가족그룹에서 나갔어요',
  },
};

function Completed({ type, title, onMainActionClick }: CompleteProps) {
  const { setCloseBottomSheet } = useGlobalBottomSheet();
  return (
    // TODO: fragment
    <Wrapper>
      <Container>
        {content[type].icon}
        <div>
          {type === 'giveUp' ? `'${title}'가 취소되었어요` : content[type].main}
        </div>
      </Container>
      <Button
        label="확인"
        property="default"
        onClick={onMainActionClick ? onMainActionClick : setCloseBottomSheet}
      />
    </Wrapper>
  );
}

export default Completed;

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 25px 16px 32px 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & div {
    ${({ theme }) => theme.typo.bottomSheet.T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    text-align: center;

    p:first-child {
      margin-bottom: 10px;
    }
  }
`;
