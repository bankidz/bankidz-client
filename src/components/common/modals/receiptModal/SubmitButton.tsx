import Button from '@components/common/buttons/Button';
import CheckButton from '@components/common/buttons/CheckButton';
import React, { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import { TReceiptModalVariant } from './TReceiptModalVariant';

interface SubmitButtonProps {
  variant: TReceiptModalVariant;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
  handleExtraSubmit: () => void;
  shouldCloseOnOverlayClick: boolean;
}

function SubmitButton({
  variant,
  setIsOpen,
  handleSubmit,
  handleExtraSubmit,
  shouldCloseOnOverlayClick,
}: SubmitButtonProps) {
  const map = new Map<TReceiptModalVariant, React.ReactElement>();
  map.set(
    'contract',
    <>
      <ButtonOverlay
        onClick={() => shouldCloseOnOverlayClick && setIsOpen(false)}
      />
      <ButtonWrapper variant={variant}>
        <CheckButton onClick={handleSubmit} />
      </ButtonWrapper>
    </>,
  );
  map.set(
    'proposing',
    <>
      <ButtonOverlay
        onClick={() => shouldCloseOnOverlayClick && setIsOpen(false)}
      />
      <ButtonWrapper variant={variant}>
        <CheckButton onClick={handleSubmit} />
      </ButtonWrapper>
    </>,
  );
  map.set(
    'rejected',
    <>
      <ButtonOverlay
        onClick={() => shouldCloseOnOverlayClick && setIsOpen(false)}
      />
      <ButtonWrapper variant={variant}>
        <Button
          onClick={handleSubmit}
          property="default"
          label="삭제하기"
          fixed
        />
      </ButtonWrapper>
    </>,
  );
  map.set(
    'proposed',
    <>
      <DoubleButtonWrapper>
        <Button property="delete" label="거절하기" onClick={handleSubmit} />
        <Button
          property="default"
          label="수락하기"
          onClick={handleExtraSubmit}
        />
      </DoubleButtonWrapper>
    </>,
  );

  return <>{map.get(variant)}</>;
}

export default SubmitButton;

const ButtonOverlay = styled.button`
  width: 100%;
  height: 64px;
  cursor: default;
`;

const ButtonWrapper = styled.div<{ variant: string }>`
  /* ButtonOverlay 하단에 접하도록 임의로 조절함 */
  ${({ variant }) =>
    variant === 'contract' &&
    css`
      margin-top: 487px;
    `}
  ${({ variant }) =>
    variant === 'proposing' &&
    css`
      margin-top: 515px;
    `}
  ${({ variant }) =>
    variant === 'rejected' &&
    css`
      margin-top: 597px;
    `}
  position: absolute;
  z-index: 701;
  display: flex;
  justify-content: center;
`;

const DoubleButtonWrapper = styled.div`
  margin-top: 16px; // arbitrary
  width: 100%;
  height: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
`;
