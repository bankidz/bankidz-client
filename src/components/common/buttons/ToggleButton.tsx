import styled, { css } from 'styled-components';

interface ToggleButtonProps {
  toggle: boolean;
  onToggleClick: () => void;
}

const ToggleButton = ({ toggle, onToggleClick }: ToggleButtonProps) => {
  return (
    <ToggleBtn onClick={onToggleClick} toggle={toggle}>
      <Circle toggle={toggle} />
    </ToggleBtn>
  );
};

export default ToggleButton;
const ToggleBtn = styled.button<{ toggle: boolean }>`
  width: 51px;
  height: 31px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme, toggle }) =>
    !toggle ? theme.palette.greyScale.grey200 : theme.palette.main.yellow300};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
`;
const Circle = styled.div<{ toggle: boolean }>`
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  width: 27px;
  height: 27px;
  border-radius: 50%;
  position: absolute;
  left: 2px;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(20px, 0);
      transition: all 0.2s ease-in-out;
    `}

  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
`;
