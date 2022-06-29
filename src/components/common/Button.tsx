import styled, { css } from 'styled-components';

interface ButtonProps {
  /**
   * etc : 카카오로그인 / primary-secondary : 한칸 두칸
   */
  property: 'etc' | 'primary' | 'secondary';
  /**
   * 버튼 내용
   */
  label: string;
  /**
   * 버튼 활성화 상태
   */
  state?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

function Button({ property, label, state, onClick }: ButtonProps) {
  return (
    <Wrapper
      property={property}
      state={true}
      onClick={onClick}
      disabled={!state}
    >
      {label}
    </Wrapper>
  );
}

export default Button;

const Wrapper = styled.button<{
  property: 'etc' | 'primary' | 'secondary';
  state: boolean;
}>`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  ${({ property }) =>
    property == 'etc'
      ? css`
          color: ${({ theme }) => theme.palette.black};
          background-color: ${({ theme }) => theme.palette.yellow[3]};
        `
      : css`
          color: ${({ theme }) => theme.palette.white};
          background-color: ${({ theme }) => theme.palette.yellow[0]};
        `};

  :disabled {
    background-color: ${({ theme }) => theme.palette.gray[2]};
    color: ${({ theme }) => theme.palette.gray[5]};
  }
`;
