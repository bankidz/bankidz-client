import { useState } from 'react';
import styled from 'styled-components';

function InterestHistorySection() {
  const [selectedDongil, setSelectedDongil] = useState<'walking' | 'payed'>(
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
          {selectedDongil === 'walking' && <UsernameUnderline />}
        </button>
        <button
          onClick={() => setSelectedDongil('payed')}
          className={selectedDongil === 'payed' ? 'active' : undefined}
        >
          지급 완료한 돈길
          {selectedDongil === 'payed' && <UsernameUnderline />}
        </button>
        <Divider />
      </menu>
    </Wrapper>
  );
}

export default InterestHistorySection;

const Wrapper = styled.div`
  h1 {
    margin-top: 80px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }

  menu {
    margin-top: 40px;
    display: flex;
    position: relative;
    z-index: 999;

    button {
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

const UsernameUnderline = styled.div`
  width: 162px;
  height: 1px;
  background: ${({ theme }) => theme.palette.greyScale.black};
  margin-top: 12px;

  z-index: 999;
`;

const Divider = styled.div`
  z-index: 0;
  position: absolute;
  left: 50%;
  /* top: 100%; */
  top: 26.5px;
  transform: translate3d(-50%, -50%, 0);

  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.palette.greyScale.grey200};
`;
