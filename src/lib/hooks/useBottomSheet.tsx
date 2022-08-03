import { useState } from 'react';

function useBottomSheet(initial: boolean) {
  const [open, setOpen] = useState(initial);

  function onOpen() {
    setOpen(true);
  }
  function onDismiss() {
    setOpen(false);
  }

  return [open, onOpen, onDismiss] as const;
}

export default useBottomSheet;
