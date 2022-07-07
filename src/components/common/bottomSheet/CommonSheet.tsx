import { useState, useEffect } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import styled from 'styled-components';

interface CommonSheetProps {
  children: JSX.Element;
  open: boolean;
  onDismiss: () => void;
  overlay: boolean;
  blocking?: boolean;
}

function CommonSheet({
  children,
  open,
  onDismiss,
  overlay,
  blocking,
}: CommonSheetProps) {
  overlay
    ? document.documentElement.style.setProperty(
        '--rsbs-backdrop-bg',
        `rgba(0,0,0,0.7)`,
      )
    : document.documentElement.style.setProperty('--rsbs-backdrop-bg', `none`);

  return (
    /* 이 컴포넌트의 onDismiss는 바텀시트의 바깥 빈 공간을 터치했을때 닫는 기능에 쓰입니다. */
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ minHeight }) => minHeight}
      blocking={blocking}
    >
      <SheetContainer>{children}</SheetContainer>
    </BottomSheet>
  );
}

export default CommonSheet;

const SheetContainer = styled.div`
  margin: 0px 18px 14px 18px;
`;
