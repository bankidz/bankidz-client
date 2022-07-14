import React, { useEffect, useState, useRef } from 'react';
import InputForm from '@components/common/Button/InputForm';
import useBottomSheet from '@hooks/useBottomSheet';
import ContractSheet from '@components/common/BottomSheet/ContractSheet';
import SelectMoney from '@components/common/BottomSheet/sheetContent/SelectMoney';
import styled from 'styled-components';
import useValidation from '@hooks/useValidation';

const validateNotificationWords = {
  contractName: {
    default: '특수문자 제외 15자 이하로 부탁해요!',
    pass: '완전 좋은 이름인데요!',
    outOfForm: '특수문자 제외 15자 이하로 부탁해요!',
    duplicate: '기존 돈길과 동일한 이름이에요. 새롭게 지어줄래요?',
  },
  contractAmount: {
    default: '최소 1500원에서 최대 50만원까지 설정할 수 있어요!',
    pass: '적절한 금액이에요!',
    under: '1,500원 이상으로 부탁해요!',
    over: '50만원 이하로 부탁해요!',
  },
};

function Step3() {
  const [form, setForm] = useState({ contractName: '', contractAmount: '' });
  const [nowFocus, setNowFocus] = useState<
    'contractName' | 'contractAmount' | null
  >(null);
  const [validateName, checkValidateName] = useValidation();
  const [validateAmount, checkValidateAmount] = useValidation();

  const [open, onOpen, onDismiss] = useBottomSheet();
  const testDuplicate = ['중복된 이름'];
  const moneyRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // 관련된 이외 부분 터치 시 바텀시트 내려가도록 이벤트 등록
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        sheetRef.current &&
        moneyRef.current &&
        !moneyRef.current.contains(e.target as Node) &&
        !sheetRef.current.contains(e.target as Node)
      ) {
        onDismiss();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moneyRef, open]);

  useEffect(() => {
    console.log(validateName);
    console.log(validateAmount);
  }, [validateName, validateAmount]);

  /*   //form 값이 바뀔때마다 유효성검사 실행
  useEffect(() => {
    nowFocus && validateCheck(nowFocus);
  }, [form]); */

  return (
    <Wrapper>
      <InputSection>
        <InputForm
          placeholder="돈길 이름을 입력하세요"
          value={form.contractName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, contractName: e.target.value });
            checkValidateName('contractName', form.contractName, testDuplicate);
          }}
          onBlur={() => {}}
          error={validateName.error}
        />
        {/* TODO : 여기 색깔 바꾸기 */}
        <p>{validateName.message}</p>
      </InputSection>

      <InputSection>
        <div onClick={onOpen} ref={moneyRef}>
          <InputForm
            placeholder="부모님과 함께 모을 금액"
            value={form.contractAmount}
            error={validateAmount.error}
            readonly={true}
            onChange={(e) => {
              setForm({ ...form, contractAmount: e.target.value });
              checkValidateAmount('contractAmount', form.contractAmount);
            }}
            onBlur={() => {}}
          />
        </div>
        <p>{validateAmount.message}</p>
      </InputSection>
      <ContractSheet open={open} onDismiss={onDismiss} label={'다음'}>
        <div ref={sheetRef}>
          <SelectMoney />
        </div>
      </ContractSheet>
    </Wrapper>
  );
}

export default Step3;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputSection = styled.div`
  & > p {
    ${({ theme }) => theme.typo.input.TextMessage_S_12_M}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin: 12px 16px 0px 16px;
  }
`;
