import { useState } from 'react';
import styled from 'styled-components';
import PaidDongilList from './PaidDongilList';
import WalkingDongilList from './WalkingDongilList';

function InterestHistorySection() {
  const [selectedDongil, setSelectedDongil] = useState<'walking' | 'paid'>(
    'walking',
  );

  return (
    <Wrapper>
      <h1>이자내역</h1>
      <menu>
        <button
          onClick={() => setSelectedDongil('walking')}
          className={selectedDongil === 'walking' ? 'active' : undefined}
        >
          이자내역
          <Underline isActive={selectedDongil === 'walking'} />
        </button>
        <button
          onClick={() => setSelectedDongil('paid')}
          className={selectedDongil === 'paid' ? 'active' : undefined}
        >
          지급 완료한 돈길
          <Underline isActive={selectedDongil === 'paid'} />
        </button>
      </menu>
      {selectedDongil === 'walking' && <WalkingDongilList />}
      {selectedDongil === 'paid' && <PaidDongilList />}
    </Wrapper>
  );
}

export default InterestHistorySection;

const Wrapper = styled.div`
  > h1 {
    margin-top: 80px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }

  > menu {
    margin-top: 40px;
    display: flex;
    justify-content: space-evenly;
    position: relative;

    > button {
      ${({ theme }) => theme.typo.text.T_14_EB};
      color: ${({ theme }) => theme.palette.greyScale.grey500};
      width: 162px;
      height: 14px;

      &.active {
        color: ${({ theme }) => theme.palette.greyScale.black};
        transition: ${({ theme }) => theme.transition.inputFocus};
      }
    }
  }
`;

const Underline = styled.div<{ isActive: boolean }>`
  width: 162px;
  height: 1px;
  background: ${({ isActive, theme }) =>
    isActive ? theme.palette.greyScale.black : theme.palette.greyScale.grey200};
  margin-top: 12px;
`;
