import { useState } from 'react';

const useToggle = (initial: boolean) => {
  const [toggle, setToggle] = useState<boolean>(initial);
  const clickToggle = (fetchFc: any) => {
    setToggle((prev) => !prev);
    fetchFc();
  };

  return [toggle, setToggle, clickToggle] as const;
};

export default useToggle;
