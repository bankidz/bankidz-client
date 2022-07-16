import ContractSheet from '@components/common/bottomSheet/ContractSheet';
import SelectInterest from '@components/common/bottomSheet/sheetContent/SelectInterest';
import InputForm from '@components/common/button/InputForm';
import SheetButton from '@components/common/button/SheetButton';
import useBottomSheet from '@hooks/useBottomSheet';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  dispatchInterestRate,
  dispatchWeekPrice,
  selectStep4InitData,
} from '@store/slices/challengePayloadSlice';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export type TStep4Form = {
  weekPrice: number;
  interestRate: 10 | 20 | 30 | null;
};

function Step4({ currentStep }: { currentStep: number }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<TStep4Form>(
    useAppSelector(selectStep4InitData),
  );

  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [openWeekPrice, onOpenWeekPrice, onDismissWeekPrice] = useBottomSheet();
  const [openInterestRate, onOpenInterestRate, onDismissInterestRate] =
    useBottomSheet();
  const weekPriceSheetRef = useRef<HTMLDivElement>(null);
  const interestRateSheetRef = useRef<HTMLDivElement>(null);
  const weekPriceInputRef = useRef<HTMLDivElement>(null);
  const interestRateInputRef = useRef<HTMLDivElement>(null);

  const onClickNextButton = () => {
    dispatch(dispatchWeekPrice(form.weekPrice));
    dispatch(dispatchInterestRate(form.interestRate));
    navigate(`/create/${currentStep + 1}`, { state: { from: currentStep } });
  };

  // 관련된 이외 부분 터치 시 바텀시트 내려가도록 이벤트 등록
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        weekPriceSheetRef.current &&
        weekPriceInputRef.current &&
        !weekPriceSheetRef.current.contains(e.target as Node) &&
        !weekPriceInputRef.current.contains(e.target as Node)
      ) {
        onDismissWeekPrice();
      }
      if (
        interestRateSheetRef.current &&
        interestRateInputRef.current &&
        !interestRateSheetRef.current.contains(e.target as Node) &&
        !interestRateInputRef.current.contains(e.target as Node)
      ) {
        onDismissInterestRate();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [weekPriceInputRef, interestRateInputRef]);

  return (
    <Wrapper>
      <InputSection>
        <p>저금액</p>
        <div onClick={onOpenWeekPrice} ref={weekPriceInputRef}>
          <InputForm
            placeholder="중간금액..."
            value={form.weekPrice === 0 ? '' : form.weekPrice}
            readonly={true}
            onFocus={onOpenWeekPrice}
            sheetOpen={openWeekPrice}
            error={false}
          />
        </div>
      </InputSection>
      <InputSection>
        <p>이자 부스터</p>
        <div onClick={onOpenInterestRate} ref={interestRateInputRef}>
          <InputForm
            placeholder="20% 금액..."
            value={form.interestRate ? form.interestRate : ''}
            readonly={true}
            onFocus={onOpenInterestRate}
            sheetOpen={openInterestRate}
            error={false}
          />
        </div>
      </InputSection>
      <SheetButton
        onClickNext={onClickNextButton}
        disabledNext={disabledNext}
        label={'다음'}
        outerSheet={true}
      />

      <ContractSheet
        open={openWeekPrice}
        onDismiss={onDismissWeekPrice}
        label={'다음'}
        onClickNext={onClickNextButton}
        sheetRef={weekPriceSheetRef}
        disabledNext={disabledNext}
      >
        <div ref={weekPriceSheetRef}>{'저금액'}</div>
      </ContractSheet>
      <ContractSheet
        open={openInterestRate}
        onDismiss={onDismissInterestRate}
        label={'다음'}
        onClickNext={onClickNextButton}
        sheetRef={interestRateSheetRef}
        disabledNext={disabledNext}
      >
        <div ref={interestRateSheetRef}>
          <SelectInterest form={form} setForm={setForm} />
        </div>
      </ContractSheet>
    </Wrapper>
  );
}

export default Step4;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputSection = styled.div`
  display: grid;
  grid-template-columns: 146fr 170fr;
  & > p {
    ${({ theme }) => theme.typo.text.T_18_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    display: flex;
    align-items: center;
  }
`;
