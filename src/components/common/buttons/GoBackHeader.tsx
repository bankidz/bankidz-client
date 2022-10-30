import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '@assets/icons/arrow-left-big.svg';

function GoBackHeader({ to }: { to?: string }) {
  const navigate = useNavigate();
  const onGoBackButtonClick = () => {
    to ? navigate(to, { state: { direction: 'navigate-pop' } }) : navigate(-1);
  };
  return (
    <Wrapper>
      <Arrow onClick={onGoBackButtonClick} />
    </Wrapper>
  );
}

export default GoBackHeader;

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  box-sizing: border-box;
`;
