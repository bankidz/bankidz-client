import { useEffect, useState, useRef } from 'react';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import ContractSheet from '@components/common/bottomSheets/ContractSheet';
import SelectMoney from '@components/common/bottomSheets/sheetContents/SelectMoney';
import styled from 'styled-components';
import useValidation, { TValidationResult } from '@lib/hooks/useValidation';
import { useNavigate } from 'react-router-dom';
import useStackAmount from '@lib/hooks/useStackAmount';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  dispatchTitle,
  dispatchTotalPrice,
  selectStep3InitData,
} from '@store/slices/challengePayloadSlice';
import SheetButton from '@components/common/buttons/SheetButton';
import getCommaThreeDigits from '@lib/utils/kid/getCommaThreeDigits';
import InputForm from '@components/common/InputForm';

type TStep3Form = {
  contractName: string;
  contractAmount: number;
};

function Step3({ currentStep }: { currentStep: number }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<TStep3Form>(
    useAppSelector(selectStep3InitData),
  );

  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [validateName, checkValidateName] = useValidation();
  const [validateAmount, checkValidateAmount] = useValidation();
  const [open, onOpen, onDismiss] = useBottomSheet(false);
  const [amountStack, pushAmount, popAmount, resetAmount] = useStackAmount();
  const moneyRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  //TODO : api fetching
  const testDuplicate = ['중복된 이름'];

  const onClickNextButton = () => {
    dispatch(dispatchTitle(form.contractName));
    dispatch(dispatchTotalPrice(form.contractAmount));
    navigate(`/create/${currentStep + 1}`, { state: { from: currentStep } });
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

  // stack에 있는 숫자들 더해서 form state에 저장
  useEffect(() => {
    const amount = amountStack.reduce((acc, cur) => {
      return (acc += cur);
    }, 0);
    setForm({ ...form, contractAmount: amount });
  }, [amountStack]);

  // 첫 렌더링시에 스토어에 있는 값 가져와서 초기화??? (for 뒤로가기해서 온 경우)
  // 코어타임때 물어보기
  /*  useEffect(() => {
    pushAmount(form.contractAmount);
  }, []); */

  //form 값이 바뀔때마다 유효성검사 실행
  useEffect(() => {
    checkValidateName('contractName', form.contractName, testDuplicate);
    checkValidateAmount('contractAmount', form.contractAmount);
  }, [form]);

  // 다음으로 버튼 활성화,비활성화 처리
  useEffect(() => {
    validateName.message === '완전 좋은 이름인데요!' &&
    validateAmount.message === '적절한 금액이에요!'
      ? setDisabledNext(false)
      : setDisabledNext(true);
  }, [validateAmount, validateName]);

  return (
    <Wrapper>
      <InputSection validate={validateName}>
        <InputForm
          placeholder="돈길 이름을 입력하세요"
          value={form.contractName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, contractName: e.target.value });
          }}
          onBlur={() => {
            checkValidateName('contractName', form.contractName, testDuplicate);
          }}
          error={validateName.error}
        />
        <p>{validateName.message}</p>
      </InputSection>

      <InputSection validate={validateAmount}>
        <div onClick={onOpen} ref={moneyRef}>
          <InputForm
            placeholder="부모님과 함께 모을 금액"
            value={
              form.contractAmount === 0
                ? ''
                : getCommaThreeDigits(form.contractAmount)
            }
            error={validateAmount.error}
            readonly={true}
            onFocus={onOpen}
            onBlur={() => {
              checkValidateAmount('contractAmount', form.contractAmount);
            }}
            sheetOpen={open}
          />
        </div>
        <p>{validateAmount.message}</p>
      </InputSection>
      <SheetButton
        onClickNext={onClickNextButton}
        disabledNext={disabledNext}
        label={'다음'}
        outerSheet={true}
      />

      <ContractSheet
        open={open}
        onDismiss={onDismiss}
        label={'다음'}
        onClickNext={onClickNextButton}
        sheetRef={sheetRef}
        disabledNext={disabledNext}
      >
        <div ref={sheetRef}>
          <SelectMoney
            pushAmount={pushAmount}
            popAmount={popAmount}
            resetAmount={resetAmount}
          />
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
