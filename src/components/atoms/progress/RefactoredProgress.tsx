import styled, { css } from 'styled-components';

interface RefectoredProgressProps {
  now: number;
  total: number;
}

function RefactoredProgress({ now, total }: RefectoredProgressProps) {
  const filledArr = [...Array(total)].map((v, i) => (i < now ? true : false));

  return (
    <Wrapper total={total}>
      {filledArr.map((isFilled) => (
        <Circle isFilled={isFilled} />
      ))}
    </Wrapper>
  );
}

export default RefactoredProgress;

const Wrapper = styled.div<{ total: number }>`
  display: grid;
  ${({ total }) => css`
    grid-template-columns: repeat(${total}, 1fr);
    width: calc(32px * ${total} - 16px);
  `}
  &
    > div:not(:last-of-type) {
    position: relative;
    margin-right: 16px;
  }

  & > div:not(:last-of-type):after {
    content: '';
    width: 16px;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.greyScale.grey300};
    position: absolute;
    left: 14px;
    top: 5px;
  }
`;

const Circle = styled.div<{ isFilled: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.palette.greyScale.grey300};
  box-sizing: border-box;

  ${({ isFilled }) =>
    isFilled &&
    css`
      background-color: ${({ theme }) => theme.palette.main.yellow200};
    `}
`;
