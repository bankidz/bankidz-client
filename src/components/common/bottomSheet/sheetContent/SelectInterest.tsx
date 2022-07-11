import { useState } from 'react';
import styled from 'styled-components';
import SelectInterestButton from '@components/kid/create/SelectInterestButton';

function SelectInterest() {
  return (
    <Wrapper>
      <ButtonContainer>
        <SelectInterestButton isSelected={true} risk={1} />
        <SelectInterestButton isSelected={false} risk={2} />
        <SelectInterestButton isSelected={false} risk={3} />
      </ButtonContainer>
      <Sub>
        <p>고위험 상품을 선택하셨네요!</p>
        <p>
          일주일이라도 저금하지 않으면 챌린지가 사라져요. <br />
          이자율은 높지만 그만큼 위험이 따른다는 것, 알아두세요!
        </p>
      </Sub>
    </Wrapper>
  );
}

export default SelectInterest;

const Wrapper = styled.div`
  margin: 17px 16px 32px 16px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 14px;
`;

const Sub = styled.div`
  margin-top: 21px;
  width: 100%;
  height: 68px;
  & > p:first-child {
    ${({ theme }) => theme.typo.bottomSheet.T_14_EB};
    color: ${({ theme }) => theme.palette.red[3]};
  }
  & > p:nth-child(2) {
    margin-top: 10.5px;
    ${({ theme }) => theme.typo.bottomSheet.S_12_R};
    line-height: 150%;
    color: ${({ theme }) => theme.palette.gray[5]};
  }
`;
