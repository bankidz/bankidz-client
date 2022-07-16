import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectInterestButton from '@components/kid/create/SelectInterestButton';
import { TSetStep4Form } from '@components/kid/create/content/Step4';

const notifications = {
  10: {
    title: '안정 상품을 선택하셨네요!',
    description: '이자율이 비교적 낮아요. 그렇지만 특별한 위험은 없어요.',
  },
  20: {
    title: '보통 상품을 선택하셨네요!',
    description:
      '저금하지 않은 주가 세 번이나 되면 챌린지가 사라져요.\n이자율은 높지만 그만큼 위험이 따른다는 것, 알아두세요!',
  },
  30: {
    title: '위험 상품을 선택하셨네요!',
    description:
      '일주일이라도 저금하지 않으면 챌린지가 사라져요. \n이자율은 높지만 그만큼 위험이 따른다는 것, 알아두세요!',
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
      {select && (
        <Sub select={select}>
          <p>{notifications[select].title}</p>
          <p>{notifications[select].description}</p>
        </Sub>
      )}
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

const Sub = styled.div<{ select: 10 | 20 | 30 | null }>`
  margin-top: 21px;
  width: 100%;
  height: 62px;
  & > p:first-child {
    ${({ theme }) => theme.typo.bottomSheet.T_14_EB};
    color: ${({ select, theme }) =>
      select === 10
        ? theme.palette.sementic.green300
        : select === 20
        ? theme.palette.main.yellow400
        : theme.palette.sementic.red300};
  }
  & > p:nth-child(2) {
    margin-top: 11px;
    ${({ theme }) => theme.typo.bottomSheet.S_12_R};
    line-height: 150%;
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    white-space: pre-wrap;
  }
`;
