import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
  selectTotalPrice,
} from '@store/slices/challengePayloadSlice';
import { ReactComponent as Divider } from '@assets/border/create-challenge-dashed-divider.svg';
import { ReactComponent as Alert } from '@assets/icon/alert.svg';
import RangeInput from '@components/common/bottomSheet/sheetContent/RangeInput';
import commaThreeDigits from '@lib/utils/getCommaThreeDigits';
import useModals from '@hooks/useModals';
import Modals, { modals } from '@components/common/modal/Modals';
import getChallengeStep4Prices from '@lib/utils/getChallengeStep4Prices';

export type TStep4Form = {
  weekPrice: number;
  interestRate: 10 | 20 | 30 | null;
};
export type TSetStep4Form = {
  form?: TStep4Form;
  setForm?: Dispatch<SetStateAction<TStep4Form>>;
};

function Step4({ currentStep }: { currentStep: number }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);
  const [form, setForm] = useState<TStep4Form>(
    useAppSelector(selectStep4InitData),
  );
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const weekPriceSheetRef = useRef<HTMLDivElement>(null);
  const interestRateSheetRef = useRef<HTMLDivElement>(null);
  const weekPriceInputRef = useRef<HTMLDivElement>(null);
  const interestRateInputRef = useRef<HTMLDivElement>(null);

  const { minPrice, maxPrice, middlePrice } =
    getChallengeStep4Prices(totalPrice);
  const [openWeekPrice, onOpenWeekPrice, onDismissWeekPrice] = useBottomSheet();
  const [openInterestRate, onOpenInterestRate, onDismissInterestRate] =
    useBottomSheet();
  const { openModal } = useModals();

  // 모달 여는 함수
  const handleClickAlert = () => {
    openModal(modals.tertiaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
    });
  };

  // 다음으로 버튼 클릭
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

  // 다음으로 버튼 활성화,비활성화 처리
  useEffect(() => {
    form.interestRate && form.weekPrice > 0 && setDisabledNext(false);
  }, [form]);

  return (
    <Wrapper>
      <InputSection>
        <p>저금액</p>
        <div onClick={onOpenWeekPrice} ref={weekPriceInputRef}>
          <InputForm
            placeholder={commaThreeDigits(middlePrice) + ' 원'}
            value={
              form.weekPrice === 0
                ? ''
                : commaThreeDigits(form.weekPrice) + ' 원'
            }
            readonly={true}
            onFocus={onOpenWeekPrice}
            sheetOpen={openWeekPrice}
            error={false}
          />
        </div>
      </InputSection>
      <InputSection>
        <p>
          이자 부스터
          <span onClick={handleClickAlert}>
            <Alert />
          </span>
        </p>
        <div onClick={onOpenInterestRate} ref={interestRateInputRef}>
          <InputForm
            placeholder={
              form.weekPrice
                ? commaThreeDigits(form.weekPrice * 0.2) + ' 원'
                : commaThreeDigits(middlePrice * 0.2) + ' 원'
            }
            value={
              form.interestRate
                ? commaThreeDigits(form.weekPrice * form.interestRate * 0.01) +
                  ' 원'
                : ''
            }
            readonly={true}
            onFocus={onOpenInterestRate}
            sheetOpen={openInterestRate}
            error={false}
          />
        </div>
      </InputSection>
      <StyledDivider />
      <Summary>
        <p>
          <span>{10}</span>주 후, <span>{'9월 2주'}</span>에 완주예정
        </p>
        <p>마지막 주에는 {500}원만 모아요</p>
      </Summary>
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
        <div ref={weekPriceSheetRef}>
          <RangeInput
            totalPrice={totalPrice}
            min={minPrice}
            max={maxPrice}
            form={form}
            setForm={setForm}
          />
        </div>
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
      <Modals />
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
    & > span {
      display: flex;
      margin-left: -7px;
      cursor: pointer;
    }
  }
`;

const StyledDivider = styled(Divider)`
  margin: 8px 0;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  & > p:first-child {
    ${({ theme }) => theme.typo.text.T_21_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
    & > span {
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.text.S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey600};
  }
`;
