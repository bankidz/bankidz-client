import { useEffect, useRef } from 'react';

function useBottomSheetOutSideRef(handler: () => void) {
  const sheetDivRef = useRef<HTMLDivElement>(null);
  const inputDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        sheetDivRef.current &&
        inputDivRef.current &&
        !inputDivRef.current.contains(e.target as Node) &&
        !sheetDivRef.current.contains(e.target as Node)
      ) {
        handler();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputDivRef]);

  return [sheetDivRef, inputDivRef];
}

export default useBottomSheetOutSideRef;
