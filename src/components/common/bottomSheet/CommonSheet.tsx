import { useState, useEffect } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import styled from 'styled-components';

interface CommonSheetProps {
  children: JSX.Element;
  overlay: boolean;
}

function CommonSheet({ children, overlay }: CommonSheetProps) {
  const [open, setOpen] = useState(true);

  overlay
    ? document.documentElement.style.setProperty(
        '--rsbs-backdrop-bg',
        `rgba(0,0,0,0.7)`,
      )
    : document.documentElement.style.setProperty('--rsbs-backdrop-bg', `none`);

  useEffect(() => {
    setOpen(true);
  }, []);

  function onDismiss() {
    setOpen(false);
  }

  return (
    <Wrapper>
      <BottomSheet
        open={true}
        onDismiss={onDismiss}
        snapPoints={({ minHeight }) => minHeight}
      >
        {children}
      </BottomSheet>
    </Wrapper>
  );
}

export default CommonSheet;

const Wrapper = styled.div``;
