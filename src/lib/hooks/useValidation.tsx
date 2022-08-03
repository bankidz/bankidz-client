import { useState } from 'react';

export type TValidationResult = {
  error: boolean;
  message: string;
};
/* type TValidationCheck = [
  TValidationResult,
  (
    formType: TFormType,
    value: string | number,
    existChallengeNames?: string[] | undefined,
  ) => void,
]; */
// 유효성 검사 로직 추가할때마다 타입도 같이 추가
type TFormType = 'contractName' | 'contractAmount' | 'comment';

const initialState = {
  error: false,
  message: '',
};

const validateResultContent = {
  contractName: {
    default: { error: false, message: '공백 포함 12자 이하로 부탁해요!' },
    outOfForm: { error: true, message: '공백 포함 12자 이하로 부탁해요!' },
    duplicate: {
      error: true,
      message: '기존 돈길과 동일한 이름이에요. 새롭게 지어줄래요?',
    },
    pass: { error: false, message: '완전 좋은 이름인데요!' },
  },
  contractAmount: {
    default: {
      error: false,
      message: '최소 1500원에서 최대 30만원까지 설정할 수 있어요!',
    },
    under: { error: true, message: '1,500원 이상으로 부탁해요!' },
    over: { error: true, message: '30만원 이하로 부탁해요!' },
    pass: { error: false, message: '적절한 금액이에요!' },
  },
  comment: {
    default: {
      error: false,
      message: '공백 포함 15자 이하로 부탁해요!',
    },
    outOfForm: { error: true, message: '공백 포함 15자 이하로 부탁해요!' },
    pass: { error: false, message: '좋은 피드백을 작성하셨네요!' },
  },
};

function useValidation() {
  const [validateResult, setValidateResult] =
    useState<TValidationResult>(initialState);

  const checkValidate = (
    formType: TFormType,
    value: string | number,
    existChallengeNames?: string[],
  ) => {
    if (formType === 'contractName' && typeof value === 'string') {
      if (!value) {
        setValidateResult(validateResultContent.contractName.default);
      } else if (value.length > 12)
        setValidateResult(validateResultContent.contractName.outOfForm);
      else if (
        existChallengeNames &&
        existChallengeNames.filter(
          (existChallengeName) => existChallengeName === value,
        ).length > 0
      )
        setValidateResult(validateResultContent.contractName.duplicate);
      else setValidateResult(validateResultContent.contractName.pass);
    }
    if (formType === 'contractAmount') {
      if (!value)
        setValidateResult(validateResultContent.contractAmount.default);
      else if (value < 1500)
        setValidateResult(validateResultContent.contractAmount.under);
      else if (value > 300000)
        setValidateResult(validateResultContent.contractAmount.over);
      else setValidateResult(validateResultContent.contractAmount.pass);
    }
    if (formType === 'comment' && typeof value === 'string') {
      if (!value) setValidateResult(validateResultContent.comment.default);
      else if (value.length > 15)
        setValidateResult(validateResultContent.comment.outOfForm);
      else setValidateResult(validateResultContent.comment.pass);
    }
  };

  return [validateResult, checkValidate] as const;
}

export default useValidation;
