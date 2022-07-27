import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectInterestButton from '@components/home/kid/create/SelectInterestButton';
import { TSetStep4Form } from '@components/home/kid/create/steps/Step4';

const notifications = {
  null: {
    title: '선택한 이자부스터만큼 마지막 주에 지원받아요',
    description: (
      <>
        <p>돈길 걷기에 성공한 주 수만큼 이자가 쌓이고,</p>
        <p>마지막 주에 부모님으로부터 쌓인 이자를 한 번에 받아요</p>
      </>
    ),
  },
  10: {
    title: '안정 상품을 선택하셨네요!',
    description: <p>이자율이 비교적 낮아요. 그렇지만 특별한 위험은 없어요.</p>,
  },
  20: {
    title: '보통 상품을 선택하셨네요!',
    description: (
      <>
        <p>저금하지 않은 주가 세 번이나 되면 챌린지가 사라져요.</p>
        <p>이자율은 높지만 그만큼 위험이 따른다는 것, 알아두세요!</p>
      </>
    ),
  },
  30: {
    title: '위험 상품을 선택하셨네요!',
    description: (
      <>
        <p>일주일이라도 저금하지 않으면 챌린지가 사라져요. </p>
        <p>이자율은 높지만 그만큼 위험이 따른다는 것, 알아두세요!</p>
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
