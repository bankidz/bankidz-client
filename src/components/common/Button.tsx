import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${({ theme }) => theme.palette.gray[7]};
  &:hover {
    background: ${({ theme }) => theme.palette.gray[6]};
  }

  ${({ fullWidth }: any) =>
    fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${({ cyan }: any) =>
    cyan &&
    css`
      background: ${({ theme }) => theme.palette.cyan[5]};
      &:hover {
        background: ${({ theme }) => theme.palette.cyan[4]};
      }
    `}

    &:disabled {
    background: ${({ theme }) => theme.palette.gray[3]};
    color: ${({ theme }) => theme.palette.gray[5]};
    cursor: not-allowed;
  }
`;

function Button(props: any) {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
}
export default Button;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;
