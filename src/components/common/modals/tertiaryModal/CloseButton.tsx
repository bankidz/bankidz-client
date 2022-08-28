import CloseButton from '@components/common/buttons/CloseButton';
import { SetStateAction } from 'react';
import styled from 'styled-components';
import { OVERLAY_TRANSITION_TIME } from '../backgroundTransitionTime';

interface CloseButtonProps {
  shouldCloseOnOverlayClick: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  onSubmit: any;
}

function CloseButtonSection({
  shouldCloseOnOverlayClick,
  setIsOpen,
  onSubmit,
}: CloseButtonProps) {
  function handleSubmit() {
    setIsOpen(false);
    setTimeout(() => {
      onSubmit();
    }, OVERLAY_TRANSITION_TIME);
  }

  return (
    <>
      <CloseButtonOverlay
        onClick={() => shouldCloseOnOverlayClick && setIsOpen(false)}
      />
      <CloseButtonWrapper>
        <CloseButton onClick={handleSubmit} />
      </CloseButtonWrapper>
    </>
  );
}

export default CloseButtonSection;

const CloseButtonOverlay = styled.button`
  width: 100%;
  height: 64px;
  cursor: default;
`;

const CloseButtonWrapper = styled.div`
  margin-top: 520px;
  position: absolute;
  z-index: 701;
`;
