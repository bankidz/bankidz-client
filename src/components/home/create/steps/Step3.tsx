import { useEffect, useState } from 'react';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import SelectMoney from '@components/common/bottomSheets/contractSheet/SelectMoney';
import styled from 'styled-components';
import useValidation, { TValidationResult } from '@lib/hooks/useValidation';
import useStackAmount from '@components/home/create/utils/useStackAmount';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  selectStep3InitData,
  setTitle,
  setTotalPrice,
} from '@store/slices/createChallengeSlice';
import SheetButton from '@components/common/buttons/SheetButton';
import InputForm from '@components/common/forms/InputForm';
import useBottomSheetOutSideRef from '@lib/hooks/useBottomSheetOutSideRef';
import ContractSheet from '@components/common/bottomSheets/contractSheet/ContractSheet';
import { useQueryClient } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import { CreateStepProps } from 'src/pages/Home/Create';

interface TStep3Form {
  contractName: string;
  contractAmount: number;
}

function Step3({ onNextButtonClick }: CreateStepProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<TStep3Form>(
    useAppSelector(selectStep3InitData),
  );
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [validateName, checkValidateName] = useValidation();
  const [validateAmount, checkValidateAmount] = useValidation();
  const [open, onOpen, onDismiss] = useBottomSheet(false);
  const [amountStack, pushAmount, popAmount, resetAmount] = useStackAmount();
  const [sheetDivRef, inputDivRef] = useBottomSheetOutSideRef(onDismiss);
  const queryClient = useQueryClient();

  const walkingDongils = queryClient.getQueryData([
    queryKeys.CHALLENGE,
    'walking',
  ]) as IChallengeDTO[];

  const existingDongilName = walkingDongils.map((dongil) => dongil.title);

  const onClickNextButton = () => {
    dispatch(setTitle(form.contractName));
    dispatch(setTotalPrice(form.contractAmount));
    onDismiss();
    onNextButtonClick();
  };

  // stack에 있는 숫자들 더해서 form state에 저장
  useEffect(() => {
    const amount = amountStack.reduce((acc, cur) => {
      return (acc += cur);
    }, 0);
    setForm({ ...form, contractAmount: amount });
  }, [amountStack]);

  //form 값이 바뀔때마다 유효성검사 실행
  useEffect(() => {
    checkValidateName('contractName', form.contractName, existingDongilName);
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
            checkValidateName(
              'contractName',
              form.contractName,
              existingDongilName,
            );
          }}
          error={validateName.error}
        />
        <p>{validateName.message}</p>
      </InputSection>

      <InputSection validate={validateAmount}>
        <div onClick={onOpen} ref={inputDivRef}>
          <InputForm
            placeholder="부모님과 함께 모을 금액"
            value={
              form.contractAmount === 0
                ? ''
                : form.contractAmount.toLocaleString('ko-KR')
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
        sheetRef={sheetDivRef}
        disabledNext={disabledNext}
      >
        <div ref={sheetDivRef}>
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
