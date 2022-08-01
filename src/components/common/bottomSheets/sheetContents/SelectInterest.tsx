import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectInterestButton from '@components/home/create/SelectInterestButton';
import { TSetStep4Form } from '@components/home/create/steps/Step4';

const notifications = {
  null: {
    title: '완주 성공 후 이자부스터를 한 번에 받아요!',
    description: (
      <>
        <p>돈길 걷기에 성공한 주만큼 이자가 쌓이고, 완주 성공시</p>
        <p>쌓인 이자를 한 번에 받아요.</p>
      </>
    ),
  },
  10: {
    title: '안정 상품을 선택하셨네요!',
    description: (
      <>
        <p>특별히 챌린지 실패 위험이 없어요. 그러나, 매주 저금할수록</p>
        <p>이자 보상이 쌓이니 열심히 저금해봐요. </p>
      </>
    ),
  },
  20: {
    title: '보통 상품을 선택하셨네요!',
    description: (
      <>
        <p>세 번 넘게 저금하지 않으면 챌린지 실패입니다. 실패시에는 </p>
        <p>모든 이자 보상을 받을 수 없다는 것, 알아두세요!</p>
      </>
    ),
  },
  30: {
    title: '위험 상품을 선택하셨네요!',
    description: (
      <>
        <p>한 번 넘게 저금하지 않으면 챌린지 실패입니다. 실패시에는 </p>
        <p>모든 이자 보상을 받을 수 없다는 것, 알아두세요!</p>
      </>
    ),
  },
};

function SelectInterest({ form, setForm }: TSetStep4Form) {
  const [select, setSelect] = useState<10 | 20 | 30 | null>(
    form?.interestRate ? form.interestRate : null,
  );

  const onClickInterestButton = (risk: 10 | 20 | 30) => {
    setSelect(risk);
  };

  useEffect(() => {
    // 스토리에 인자로 form이랑 setForm을 넘기기가 번거로워서 옵셔널로 넣어서 이렇게 해둠..
    form && setForm && setForm({ ...form, interestRate: select });
  }, [select]);

  return (
    <Wrapper>
      <ButtonContainer>
        <SelectInterestButton
          isSelected={select === 10}
          risk={10}
          onClick={() => onClickInterestButton(10)}
        />
        <SelectInterestButton
          isSelected={select === 20}
          risk={20}
          onClick={() => onClickInterestButton(20)}
        />
        <SelectInterestButton
          isSelected={select === 30}
          risk={30}
          onClick={() => onClickInterestButton(30)}
        />
      </ButtonContainer>
      {select ? (
        <Sub select={select}>
          <p>{notifications[select].title}</p>
          {notifications[select].description}
        </Sub>
      ) : (
        <Sub select={select}>
          <p>{notifications['null'].title}</p>
          {notifications['null'].description}
        </Sub>
      )}
    </Wrapper>
  );
}

export default SelectInterest;

const Wrapper = styled.div`
  margin: 9px 16px 32px 16px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 14px;
`;

const Sub = styled.div<{ select: 10 | 20 | 30 | null }>`
  margin-top: 20px;
  width: 100%;
  height: 62px;
  & > p:first-child {
    ${({ theme }) => theme.typo.bottomSheet.T_14_EB};
    color: ${({ select, theme }) =>
      select
        ? select === 10
          ? theme.palette.sementic.green300
          : select === 20
          ? theme.palette.main.yellow400
          : theme.palette.sementic.red300
        : theme.palette.greyScale.black};
    margin-bottom: 14px;
  }
  & > p:not(:first-child) {
    ${({ theme }) => theme.typo.bottomSheet.S_12_R};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    white-space: pre-wrap;
  }
  & > p:last-child {
    margin-top: 6px;
  }
`;
