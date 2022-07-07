import { useState, useEffect } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import styled from 'styled-components';
import Margin from '../../layout/Margin';

interface CommonSheetProps {
  children: JSX.Element;
  overlay: boolean;
  blocking?: boolean;
  expandOnContentDrag?: boolean;
}

function CommonSheet({ children, overlay, blocking }: CommonSheetProps) {
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
        open={open}
        onDismiss={onDismiss}
        snapPoints={({ minHeight }) => minHeight}
        blocking={blocking}
        footer={<div></div>}
      >
        <Margin>{children}</Margin>
      </BottomSheet>
    </Wrapper>
  );
}

export default CommonSheet;

const Wrapper = styled.div``;
