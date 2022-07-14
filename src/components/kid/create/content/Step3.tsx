import React, { useEffect, useState, useRef } from 'react';
import InputForm from '@components/common/Button/InputForm';
import useBottomSheet from '@hooks/useBottomSheet';
import ContractSheet from '@components/common/BottomSheet/ContractSheet';
import SelectMoney from '@components/common/BottomSheet/sheetContent/SelectMoney';
import styled from 'styled-components';
import useValidation, { TValidationResult } from '@hooks/useValidation';
import { useNavigate } from 'react-router-dom';

function Step3() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ contractName: '', contractAmount: '' });
  const [validateName, checkValidateName] = useValidation();
  const [validateAmount, checkValidateAmount] = useValidation();
  const [open, onOpen, onDismiss] = useBottomSheet();

  const testDuplicate = ['중복된 이름'];
  const moneyRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const onClickNextButton = () => {
    navigate(`/create/4`, { state: { from: 3 } });
  };

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

  //form 값이 바뀔때마다 유효성검사 실행
  useEffect(() => {
    checkValidateName('contractName', form.contractName, testDuplicate);
    checkValidateAmount('contractAmount', form.contractAmount);
  }, [form]);

  return (
    <Wrapper>
      <InputSection validate={validateName}>
        <InputForm
          placeholder="돈길 이름을 입력하세요"
          value={form.contractName}
          onChange={(e) => {
            setForm({ ...form, contractName: e.target.value });
          }}
          onBlur={() => {
            checkValidateName('contractName', form.contractName, testDuplicate);
          }}
          error={validateName.error}
        />
        {/* TODO : 여기 색깔 바꾸기 */}
        <p>{validateName.message}</p>
      </InputSection>

      <InputSection validate={validateAmount}>
        <div onClick={onOpen} ref={moneyRef}>
          <InputForm
            placeholder="부모님과 함께 모을 금액"
            value={form.contractAmount}
            error={validateAmount.error}
            readonly={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, contractAmount: e.target.value });
            }}
            onFocus={onOpen}
            onBlur={() => {
              checkValidateAmount('contractAmount', form.contractAmount);
            }}
          />
        </div>
        <p>{validateAmount.message}</p>
      </InputSection>

      <ContractSheet
        open={open}
        onDismiss={onDismiss}
        label={'다음'}
        onClickNext={onClickNextButton}
        sheetRef={sheetRef}
      >
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

const InputSection = styled.div<{ validate: TValidationResult }>`
  & > p {
    ${({ theme }) => theme.typo.input.TextMessage_S_12_M}
    color: ${({ theme, validate }) =>
      validate.error
        ? theme.palette.sementic.red300
        : validate.message === '완전 좋은 이름인데요!' ||
          validate.message === '적절한 금액이에요!'
        ? theme.palette.sementic.green300
        : theme.palette.greyScale.grey500};
    margin: 12px 16px 0px 16px;
  }
`;
