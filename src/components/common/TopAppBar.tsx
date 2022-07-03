import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../assets/icons/arrow-left.svg';
interface TopAppBarProps {
  /**
   * 이전 페이지명
   */
  previous: string;
}

function TopAppBar({ previous }: TopAppBarProps) {
  const navigate = useNavigate();

  const onClickTopAppBar = () => {
    navigate(-1);
  };

  return (
    <Wrapper onClick={onClickTopAppBar}>
      <Arrow />
      <p>{previous}</p>
    </Wrapper>
  );
}

export default TopAppBar;

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  padding: 0px 18px;

  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    font-weight: bold;
    font-size: 15px;
    margin-left: 18px;
  }
`;
