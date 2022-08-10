import Button from '@components/common/buttons/Button';
import CheckButton from '@components/common/buttons/CheckButton';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

function getSubmitButton(
  variant: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  handleSubmit: () => void,
  handleExtraSubmit: () => void,
) {
  return (
    <>
      {variant !== 'proposed' && (
        <ButtonOverlay onClick={() => setIsOpen(false)} />
      )}

      <ButtonWrapper>
        {(variant === 'contract' || variant === 'proposing') && (
          <CheckButton onClick={handleSubmit} />
        )}
      </ButtonWrapper>

      {variant === 'proposed' && (
        <DoubleButtonWrapper>
          <Button property="delete" label="거절하기" onClick={handleSubmit} />
          <Button
            property="default"
            label="수락하기"
            onClick={handleExtraSubmit}
          />
        </DoubleButtonWrapper>
      )}
    </>
  );
}

export default getSubmitButton;

const ButtonOverlay = styled.button`
  background: pink;
  width: 100%;
  height: 64px;
  cursor: default;
`;

const ButtonWrapper = styled.div`
  margin-top: 490px; // arbitrary
  position: absolute;
  z-index: 701;
  display: flex;
  justify-content: center;
`;

const DoubleButtonWrapper = styled.div`
  margin-top: 12px; // arbitrary
  width: 100%;
  height: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
`;
