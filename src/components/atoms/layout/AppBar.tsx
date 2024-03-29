import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '@assets/icons/arrow-left.svg';
import { TLevel } from '@lib/types/TLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';

interface AppBarProps {
  label?: string;
  level?: TLevel | null;
  to?: string;
  customEvent?: () => void;
}

/**
 * @param label 이전 페이지명
 * @param level 레벨
 * @param to 이전 페이지 링크
 */
function AppBar({ label, level, to, customEvent }: AppBarProps) {
  const navigate = useNavigate();
  const onClickAppBar = () => {
    if (customEvent) {
      customEvent();
    } else {
      to
        ? navigate(to, {
            state: { direction: 'navigate-pop' },
          })
        : navigate(-1);
    }
  };

  const colorByLevel = level !== undefined && getColorByLevel(level!);
  const textColor = (level?: TLevel | null) => {
    if (level === null || level === undefined) {
      return '#2E3234'; // black
    } else {
      return '#fff';
    }
  };
  return (
    <Wrapper colorByLevel={colorByLevel ? colorByLevel : null}>
      <div onClick={onClickAppBar}>
        <Arrow fill={textColor(level)} />
      </div>
      <p style={{ color: `${textColor(level)}` }}>{label}</p>
    </Wrapper>
  );
}

export default AppBar;

const Wrapper = styled.div<{ colorByLevel: string | null }>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 48px;
  padding: 0px 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;

  background-color: ${({ theme, colorByLevel }) =>
    colorByLevel ? colorByLevel : theme.palette.greyScale.grey100};

  z-index: 3;

  & > :first-child {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -16px;
  }

  p {
    ${({ theme }) => theme.typo.fixed.Navbar_T_17_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;
