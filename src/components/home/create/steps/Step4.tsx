import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import SelectInterest from '@components/common/bottomSheets/contractSheet/SelectInterest';
import SheetButton from '@components/common/buttons/SheetButton';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  selectStep4InitData,
  selectTotalPrice,
  setInterestPrice,
  setInterestRate,
  setWeekPrice,
  setWeeks,
} from '@store/slices/createChallengeSlice';
import { ReactComponent as Alert } from '@assets/icons/alert.svg';
import RangeInput from '@components/common/bottomSheets/contractSheet/RangeInput';
import useModals from '@lib/hooks/useModals';
import Modals, { modals } from '@components/common/modals/Modals';
import getChallengeStep4Prices from '@components/home/create/utils/getChallengeStep4Prices';
import InputForm from '@components/common/forms/InputForm';
import useBottomSheetOutSideRef from '@lib/hooks/useBottomSheetOutSideRef';
import getWeekNumberByMonth from '@lib/utils/get/getWeekNumberByMonth';
import ContractSheet from '@components/common/bottomSheets/contractSheet/ContractSheet';
import { TInterestRate } from '@lib/types/IInterestRate';
import { CreateStepProps } from 'src/pages/Home/Create';
import getChallengeStep4Weeks from '@components/home/create/utils/getChallengeStep4Weeks';

export type TStep4Form = {
  weekPrice: number;
  interestRate: TInterestRate | null;
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

function Step4({ onNextButtonClick }: CreateStepProps) {
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
  const [openWeekPrice, onOpenWeekPrice, onDismissWeekPrice] =
    useBottomSheet(false);
  const [openInterestRate, onOpenInterestRate, onDismissInterestRate] =
    useBottomSheet(false);
  const [weekPriceSheetDivRef, weekPriceInputDivRef] =
    useBottomSheetOutSideRef(onDismissWeekPrice);
  const [interestRateSheetDivRef, interestRateInputDivRef] =
    useBottomSheetOutSideRef(onDismissInterestRate);

  const { minPrice, maxPrice, middlePrice } = getChallengeStep4Prices(
    totalPrice,
    form.interestRate,
  );

  const { openModal } = useModals();

  const handleClickAlert = () => {
    openModal(modals.tertiaryModal, {
      shouldCloseOnOverlayClick: true,
    });
  };

  // 다음으로 버튼 클릭
  const onClickNextButton = () => {
    dispatch(setWeekPrice(form.weekPrice));
    dispatch(setInterestRate(form.interestRate));
    dispatch(setWeeks(contractInfo.weekCost));
    dispatch(setInterestPrice(totalPrice * form.interestRate! * 0.01));

    onDismissInterestRate();
    onDismissWeekPrice();
    onNextButtonClick();
  };

  // 다음으로 버튼 활성화,비활성화 처리
  useEffect(() => {
    if (form.interestRate && form.weekPrice > 0) {
      setDisabledNext(false);
    }
    if (!form.interestRate || form.weekPrice <= 0) {
      setDisabledNext(true);
    }
  }, [form]);

  // form 변경될때마다 필요 주 수 계산
  useEffect(() => {
    if (form.interestRate && form.weekPrice) {
      const { weekCost, totalPriceWithInterest } = getChallengeStep4Weeks(
        totalPrice,
        form.weekPrice,
        form.interestRate,
      );
      const endDate = dayjs().add(7 * weekCost, 'days');
      const { month, weekNo } = getWeekNumberByMonth(endDate.toDate());
      setContractInfo({
        weekCost: weekCost,
        contractEndWeek: `${month}월 ${weekNo}주`,
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
        <div onClick={onOpenInterestRate} ref={interestRateInputDivRef}>
          <InputForm
            placeholder={(totalPrice * 0.2).toLocaleString('ko-KR') + ' 원'}
            value={
              form.interestRate
                ? (totalPrice * form.interestRate * 0.01).toLocaleString(
                    'ko-KR',
                  ) + ' 원'
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
        <p>매주 저금액</p>
        <div
          onClick={() => {
            form.interestRate ? onOpenWeekPrice() : null;
          }}
          ref={weekPriceInputDivRef}
        >
          <InputForm
            placeholder={middlePrice.toLocaleString('ko-KR') + ' 원'}
            value={
              form.weekPrice === 0
                ? ''
                : form.weekPrice.toLocaleString('ko-KR') + ' 원'
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
      <Divider />
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
        sheetRef={interestRateSheetDivRef}
        disabledNext={disabledNext}
      >
        <div ref={interestRateSheetDivRef}>
          <SelectInterest form={form} setForm={setForm} />
        </div>
      </ContractSheet>
      <ContractSheet
        open={openWeekPrice}
        onDismiss={onDismissWeekPrice}
        label={'다음'}
        onClickNext={onClickNextButton}
        sheetRef={weekPriceSheetDivRef}
        disabledNext={disabledNext}
      >
        <div ref={weekPriceSheetDivRef}>
          <RangeInput
            totalPrice={totalPrice}
            min={minPrice}
            max={maxPrice}
            form={form}
            setForm={setForm}
            step={500}
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

const Divider = styled.div`
  border-top: ${({ theme }) => theme.border.receipt};
  margin: 8px 0px;
`;
