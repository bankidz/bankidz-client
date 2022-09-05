import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ReactComponent as Arrow } from '@assets/icons/arrow-left.svg';
import { isUndefined } from 'util';
import { text } from 'stream/consumers';
import { TLevel } from '@lib/types/TLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';

interface AppBarProps {
  // TODO: 한줄 주석
  /** 이전 페이지명 */
  label?: string;
  /**
   * 레벨
   */
  level?: TLevel | null;
}

function AppBar({ label, level }: AppBarProps) {
  const navigate = useNavigate();
  const onClickAppBar = () => {
    navigate(-1);
  };

  // TODO: undefined
  const colorByLevel = level !== undefined && getColorByLevel(level!);
  // TODO: null type
  const textColor = (level?: TLevel | null) => {
    if (level === null || level === undefined) {
      return '#2E3234'; // TODO: 요런건 주석 남기기
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
    //TODO : 보류
    // TODO: 디자인 시스템
    ${({ theme }) => theme.typo.fixed.Navbar_T_17_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;
