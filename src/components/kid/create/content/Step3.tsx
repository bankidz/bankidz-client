import React, { useEffect, useState, useRef } from 'react';
import InputForm from '@components/common/Button/InputForm';
import useBottomSheet from '@hooks/useBottomSheet';
import ContractSheet from '@components/common/BottomSheet/ContractSheet';
import SelectMoney from '@components/common/BottomSheet/sheetContent/SelectMoney';
import styled from 'styled-components';

const validateNotificationWords = {
  name: {
    default: '특수문자 제외 15자 이하로 부탁해요!',
    pass: '완전 좋은 이름인데요!',
    outOfForm: '특수문자 제외 15자 이하로 부탁해요!',
    duplicate: '기존 돈길과 동일한 이름이에요. 새롭게 지어줄래요?',
  },
  money: {
    default: '최소 1500원에서 최대 50만원까지 설정할 수 있어요!',
    pass: '적절한 금액이에요!',
    under: '1,500원 이상으로 부탁해요!',
    over: '50만원 이하로 부탁해요!',
  },
};

function Step3() {
  const [form, setForm] = useState({ name: '', money: '' });
  const [nowFocus, setNowFocus] = useState<'name' | 'money' | null>(null);
  const [validateNotification, setValidateNotification] = useState({
    name: validateNotificationWords.name.default,
    money: validateNotificationWords.money.default,
  });
  const [open, onOpen, onDismiss] = useBottomSheet();
  // test
  const validation = true;
  const testDuplicate = '중복된 이름';
  const moneyRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
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

  // 유효성 검사
  const validateCheck = (formType: 'name' | 'money') => {
    if (formType === 'name') {
      if (
        form.name.length > 15 ||
        form.name.match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g)
      )
        setValidateNotification({
          ...validateNotification,
          name: validateNotificationWords.name.outOfForm,
        });
      else if (form.name === testDuplicate)
        setValidateNotification({
          ...validateNotification,
          name: validateNotificationWords.name.duplicate,
        });
      else
        setValidateNotification({
          ...validateNotification,
          name: validateNotificationWords.name.default,
        });
    }
    if (formType === 'money') {
      if (form.money < '1500')
        setValidateNotification({
          ...validateNotification,
          money: validateNotificationWords.money.under,
        });
      else if (form.money > '500000')
        setValidateNotification({
          ...validateNotification,
          money: validateNotificationWords.money.over,
        });
      else
        setValidateNotification({
          ...validateNotification,
          name: validateNotificationWords.money.default,
        });
    }
  };

  //form 값이 바뀔때마다 유효성검사 실행
  useEffect(() => {
    nowFocus && validateCheck(nowFocus);
  }, [form]);

  return (
    <Wrapper>
      <InputSection>
        <InputForm
          placeholder="돈길 이름을 입력하세요"
          value={form.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, name: e.target.value });
          }}
          validation={validation}
        />
        <p>{validateNotification.name}</p>
      </InputSection>

      <InputSection>
        <div onClick={onOpen} ref={moneyRef}>
          <InputForm
            placeholder="부모님과 함께 모을 금액"
            value={form.money}
            validation={validation}
            readonly={true}
          />
        </div>
        <p>{validateNotification.money}</p>
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
    color: ${({ theme }) => theme.palette.sementic.green300};
    margin: 12px 16px 0px 16px;
  }
`;
