import { useState } from 'react';

function useBottomSheet() {
  const [open, setOpen] = useState(false);

  function onOpen() {
    setOpen(true);
  }
  function onDismiss() {
    setOpen(false);
  }

  return [open, onOpen, onDismiss] as const;
}

export default useBottomSheet;
