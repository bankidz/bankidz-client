import styled from 'styled-components';
import { ReactComponent as CheckIcon } from '@assets/icons/approveCheck.svg';
import { ReactComponent as Group } from '@assets/icons/group.svg';
import { ReactComponent as Warning } from '@assets/icons/warning.svg';
import Button from '@components/common/buttons/Button';

interface CheckProps {
  type:
    | 'approve'
    | 'moveGroup'
    | 'moveGroupCheck'
    | 'joinGroup'
    | 'unregistered';
  onMainActionClick: () => void;
  onDismiss: () => void;
}

const content = {
  approve: {
    icon: <CheckIcon />,
    main: <p>자녀의 돈길을 수락할까요?</p>,
    sub: null,
    label: '수락하기',
  },
  moveGroup: {
    icon: <Group />,
    main: (
      <>
        <p>새로운 가족그룹으로</p>
        <p className="secondRow">이동할까요?</p>
      </>
    ),
    sub: <p>이미 다른 가족그룹에 들어가있어요.</p>,
    label: '이동하기',
  },
  moveGroupCheck: {
    icon: <Group />,
    main: (
      <>
        <p>정말 새로운 가족그룹으로</p>
        <p className="secondRow">이동할까요?</p>
      </>
    ),
    sub: <p>이전 진행한 돈길은 모두 삭제됩니다.</p>,
    label: '이동하기',
  },
  joinGroup: {
    icon: <Group />,
    main: <p>해당 가족그룹에 참여할래요?</p>,
    sub: <p>나중에 그룹 변경 시, 진행한 돈길은 모두 삭제돼요.</p>,
    label: '참여하기',
  },
  unregistered: {
    icon: <Warning />,
    main: <p>아직 가입이 안된 회원이에요.</p>,
    sub: <p>가입 완료 후 링크에 재접속해주세요.</p>,
    label: '가입하기',
  },
};

function Check({ type, onMainActionClick, onDismiss }: CheckProps) {
  return (
    <Wrapper>
      <Container>
        {content[type].icon}
        <div className="main">{content[type].main}</div>
        <div className="sub">{content[type].sub}</div>
      </Container>
      <ButtonContainer>
        <Button label="취소" property="sub" onClick={onDismiss} />
        <Button
          label={content[type].label}
          property="default"
          onClick={onMainActionClick}
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default Check;

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 25px 16px 32px 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > .main {
    ${({ theme }) => theme.typo.bottomSheet.T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    text-align: center;
    .secondRow {
      margin-top: 10px;
    }
  }
  & > .sub {
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    margin-right: auto;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 8px;
`;
