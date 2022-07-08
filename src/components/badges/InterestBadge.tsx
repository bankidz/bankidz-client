import styled from 'styled-components';

interface InterestBadgeProps {
  /** 이자율(number)을 입력합니다. */
  interestRate: number;
}

function InterestBadge({ interestRate }: InterestBadgeProps) {
  const label = '이자율 ' + interestRate.toString() + '%';
  return (
    <ComponentWrapper>
      <StyledSpan>{label}</StyledSpan>
    </ComponentWrapper>
  );
}

export default InterestBadge;

const ComponentWrapper = styled.div`
  height: 27px;
`;

const StyledSpan = styled.span`
  width: 90px;
  height: 27px;

  background: ${({ theme }) => theme.palette.yellow[2]};
  border-radius: 12px;

  line-height: 27px;
  vertical-align: center;
  display: inline-block;
  text-align: center;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;
