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
  dispatchWeeks,
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
import getChallengeStep4Weeks from '@lib/utils/getChallengeStep4Weeks';

export type TStep4Form = {
  weekPrice: number;
  interestRate: 10 | 20 | 30 | null;
};
export type TSetStep4Form = {
  form?: TStep4Form;
  setForm?: Dispatch<SetStateAction<TStep4Form>>;
};

type TContractInfo = {
  weekCost: number;
  contractEndWeek: string;
  overPrice: number;
};

function Step4({ currentStep }: { currentStep: number }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);
  const [form, setForm] = useState<TStep4Form>(
    useAppSelector(selectStep4InitData),
  );
  const [contractInfo, setContractInfo] = useState<TContractInfo>({
    weekCost: 0,
    contractEndWeek: '0월 0주',
    overPrice: 0,
  });
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const weekPriceSheetRef = useRef<HTMLDivElement>(null);
  const interestRateSheetRef = useRef<HTMLDivElement>(null);
  const weekPriceInputRef = useRef<HTMLDivElement>(null);
  const interestRateInputRef = useRef<HTMLDivElement>(null);

  const { minPrice, maxPrice, middlePrice } = getChallengeStep4Prices(
    totalPrice,
    form.interestRate,
  );
  const [openWeekPrice, onOpenWeekPrice, onDismissWeekPrice] =
    useBottomSheet(false);
  const [openInterestRate, onOpenInterestRate, onDismissInterestRate] =
    useBottomSheet(false);
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
    dispatch(dispatchWeeks(contractInfo.weekCost));
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
    console.log(form, middlePrice, minPrice, maxPrice);
    form.interestRate && form.weekPrice > 0 && setDisabledNext(false);
  }, [form]);

  // form 변경될때마다 필요 주 수 계산
  useEffect(() => {
    if (form.interestRate && form.weekPrice) {
      const { weekCost, totalPriceWithInterest } = getChallengeStep4Weeks(
        totalPrice,
        form.weekPrice,
        form.interestRate,
      );
      setContractInfo({
        weekCost: weekCost,
        contractEndWeek: '0월 0주', //TODO
        overPrice: totalPriceWithInterest - totalPrice,
      });
    }
  }, [form]);

  // 이자부스터 값이 변경될때마다 매주 저금액 초기화
  useEffect(() => {
    setForm({ ...form, weekPrice: 0 });
  }, [form.interestRate]);

  return (
    <Wrapper>
      <InputSection>
        <p>
          이자 부스터
          <span onClick={handleClickAlert}>
            <Alert />
          </span>
        </p>
        <div onClick={onOpenInterestRate} ref={interestRateInputRef}>
          <InputForm
            placeholder={commaThreeDigits(middlePrice * 0.2) + ' 원'}
            value={
              form.interestRate
                ? form.weekPrice
                  ? commaThreeDigits(
                      form.weekPrice * form.interestRate * 0.01,
                    ) + ' 원'
                  : commaThreeDigits(middlePrice * form.interestRate * 0.01) +
                    ' 원'
                : ''
            }
            readonly={true}
            onFocus={onOpenInterestRate}
            sheetOpen={openInterestRate}
            bigFontSize={true}
            error={false}
            autoFocus={true}
          />
        </div>
      </InputSection>
      <InputSection>
        <p>저금액</p>
        <div
          onClick={() => {
            form.interestRate ? onOpenWeekPrice() : null;
          }}
          ref={weekPriceInputRef}
        >
          <InputForm
            placeholder={commaThreeDigits(middlePrice) + ' 원'}
            value={
              form.weekPrice === 0
                ? ''
                : commaThreeDigits(form.weekPrice) + ' 원'
            }
            readonly={true}
            onFocus={() => {
              form.interestRate ? onOpenWeekPrice() : null;
            }}
            sheetOpen={openWeekPrice}
            bigFontSize={true}
            error={false}
            disabled={form.interestRate ? false : true}
          />
        </div>
      </InputSection>

      <StyledDivider />
      <Summary weekCost={contractInfo.weekCost}>
        <p>
          <span>
            {contractInfo.weekCost === 0 ? '00' : contractInfo.weekCost}주{' '}
          </span>
          후, <span>{contractInfo.contractEndWeek}</span>에 완주예정
        </p>
        <p>
          {contractInfo.overPrice !== 0 &&
            `${contractInfo.overPrice}원을 더 모을 수 있어요`}
        </p>
      </Summary>
      <SheetButton
        onClickNext={onClickNextButton}
        disabledNext={disabledNext}
        label={'다음'}
        outerSheet={true}
      />

      {/* 바텀시트 영역 */}
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
            step={totalPrice > 500000 ? 1000 : 500}
          />
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

const Summary = styled.div<{ weekCost: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  & > p:first-child {
    ${({ theme }) => theme.typo.text.T_21_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
    & > span {
      color: ${({ theme, weekCost }) =>
        weekCost === 0
          ? theme.palette.greyScale.grey400
          : theme.palette.greyScale.black};
    }
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.text.S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey600};
  }
`;
