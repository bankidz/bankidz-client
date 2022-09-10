import ToggleButton from '@components/common/buttons/ToggleButton';
import { useState } from 'react';
import styled, { css } from 'styled-components';

const useToggle = (initial: boolean) => {
  const [toggle, setToggle] = useState<boolean>(initial);
  const clickToggle = (fetchFc: () => void) => {
    setToggle((prev) => !prev);
    fetchFc();
  };

  return [toggle, setToggle, clickToggle] as const;
};

export default useToggle;
