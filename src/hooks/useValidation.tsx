import { useState } from 'react';

export type TValidationResult = {
  error: boolean;
  message: string;
};
type TValidationCheck = [
  TValidationResult,
  (
    formType: TFormType,
    value: string | number,
    existChallengeNames?: string[] | undefined,
  ) => void,
];
// 유효성 검사 로직 추가할때마다 타입도 같이 추가
type TFormType = 'contractName' | 'contractAmount';

const initialState = {
  error: false,
  message: '',
};

const kid_create_content_step3_validateResult = {
  contractName: {
    default: { error: false, message: '특수문자 제외 15자 이하로 부탁해요!' },
    outOfForm: { error: true, message: '특수문자 제외 15자 이하로 부탁해요!' },
    duplicate: {
      error: true,
      message: '기존 돈길과 동일한 이름이에요. 새롭게 지어줄래요?',
    },
    pass: { error: false, message: '완전 좋은 이름인데요!' },
  },
  contractAmount: {
    default: {
      error: false,
      message: '최소 1500원에서 최대 50만원까지 설정할 수 있어요!',
    },
    under: { error: true, message: '1,500원 이상으로 부탁해요!' },
    over: { error: true, message: '50만원 이하로 부탁해요!' },
    pass: { error: false, message: '적절한 금액이에요!' },
  },
};

function useValidation(): TValidationCheck {
  const [validateResult, setValidateResult] =
    useState<TValidationResult>(initialState);

  const checkValidate = (
    formType: TFormType,
    value: string | number,
    existChallengeNames?: string[],
  ) => {
    if (formType === 'contractName' && typeof value === 'string') {
      if (!value) {
        setValidateResult(
          kid_create_content_step3_validateResult.contractName.default,
        );
      } else if (
        value.length > 15 ||
        value.match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g)
      )
        setValidateResult(
          kid_create_content_step3_validateResult.contractName.outOfForm,
        );
      else if (
        existChallengeNames &&
        existChallengeNames.filter(
          (existChallengeName) => existChallengeName === value,
        ).length > 0
      )
        setValidateResult(
          kid_create_content_step3_validateResult.contractName.duplicate,
        );
      else
        setValidateResult(
          kid_create_content_step3_validateResult.contractName.pass,
        );
    }
    if (formType === 'contractAmount') {
      if (!value)
        setValidateResult(
          kid_create_content_step3_validateResult.contractAmount.default,
        );
      else if (value < 1500)
        setValidateResult(
          kid_create_content_step3_validateResult.contractAmount.under,
        );
      else if (value > 500000)
        setValidateResult(
          kid_create_content_step3_validateResult.contractAmount.over,
        );
      else
        setValidateResult(
          kid_create_content_step3_validateResult.contractAmount.pass,
        );
    }
  };

  return [validateResult, checkValidate];
}

export default useValidation;
