import { useState, useEffect } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import styled from 'styled-components';

interface CommonSheetProps {
  children: JSX.Element;
  open: boolean;
  onDismiss: () => void;
  blocking?: boolean;
}

function CommonSheet({
  children,
  open,
  onDismiss,
  blocking = true,
}: CommonSheetProps) {
  document.documentElement.style.setProperty(
    '--rsbs-backdrop-bg',
    `rgba(0,0,0,0.7)`,
  );

  return (
    /* 이 컴포넌트의 onDismiss는 바텀시트의 바깥 빈 공간을 터치했을때 닫는 기능에 쓰입니다. */
    <StyledBottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ minHeight }) => minHeight}
      blocking={blocking}
    >
      <SheetContainer>{children}</SheetContainer>
    </StyledBottomSheet>
  );
}

export default CommonSheet;

const StyledBottomSheet = styled(BottomSheet)`
  /* 라이브러리 css 억지 커스텀 */
  div:first-child:before {
    width: 60px;
    height: 5px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  }
`;

const SheetContainer = styled.div`
  margin: 0px 18px 14px 18px;
`;
