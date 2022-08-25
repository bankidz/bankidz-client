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
  width: 100%;
  height: 48px;
  padding: 0px 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;

  /* TODO: 한줄 조건에 따른 CSS */
  ${({ colorByLevel }) =>
    colorByLevel &&
    css`
      background-color: ${colorByLevel};
    `}

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
    font-family: 'TmoneyRoundWind';
    font-size: 17px;
    line-height: 100%;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;
