import styled from 'styled-components';
import { ReactComponent as BankiSad } from '@assets/illusts/banki/banki_sad.svg';
import { TDongilVariant } from '@lib/types/TDongilVariant';

interface EmptyDongilProps {
  variant: Extract<TDongilVariant, 'pending' | 'proposed' | 'thisWeekS'>;
}

/**
 * @param variant 용도(메세지의 주어)를 선택합니다.
 */
function EmptyDongil({ variant }: EmptyDongilProps) {
  let subject;
  if (variant === 'pending') {
    subject = '대기중인';
  } else if (variant === 'proposed') {
    subject = '제안받은';
  } else if (variant === 'thisWeekS') {
    subject = '걷고있는';
  }

  return (
    <Wrapper>
      <button>
        <BankiSad />
      </button>
      <span>{`${subject} 돈길이 없어요`}</span>
    </Wrapper>
  );
}

export default EmptyDongil;

const Wrapper = styled.div`
  width: 100%;
  height: 162px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background: ${({ theme }) => theme.palette.greyScale.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 48px;
    height: 48px;
  }

  span {
    margin-top: 16px;
    ${({ theme }) => theme.typo.fixed.EmptyText_S_16_M};
    color: ${({ theme }) => theme.palette.greyScale.grey600};
  }
`;
