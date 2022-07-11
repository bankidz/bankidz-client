import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '@assets/icon/arrow-left.svg';
interface TopAppBarProps {
  /**
   * 이전 페이지명
   */
  label: string;
}

function TopAppBar({ label }: TopAppBarProps) {
  const navigate = useNavigate();

  const onClickTopAppBar = () => {
    navigate(-1);
  };

  return (
    <Wrapper onClick={onClickTopAppBar}>
      <Arrow />
      <p>{label}</p>
    </Wrapper>
  );
}

export default TopAppBar;

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  padding: 0px 18px;
  margin-bottom: 16px;

  display: flex;
  align-items: center;
  cursor: pointer;

  & > :first-child {
    margin-right: 12.42px;
  }

  p {
    //TODO : 보류
    font-family: 'TmoneyRoundWind';
    font-size: 17px;
    line-height: 100%;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.black};
  }
`;
