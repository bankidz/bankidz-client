import styled from 'styled-components';
import 'swiper/components/navigation/navigation.min.css';
import { ReactNode } from 'react';
import { calcRatio } from '@lib/styles/theme';

interface InstructionCardProps {
  headerText: string;
  bodyText: string;
  children: ReactNode;
}

function InstructionCard({
  headerText,
  bodyText,
  children,
}: InstructionCardProps) {
  return (
    <>
      <YellowBox>{children}</YellowBox>
      <WhiteBox>
        <div className="text-positioner">
          <span className="header">{headerText}</span>
          <p className="body">{bodyText}</p>
        </div>
      </WhiteBox>
    </>
  );
}

export default InstructionCard;

const YellowBox = styled.div`
  height: 230px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* background: pink; */
    width: ${calcRatio(96, 324)};
  }
`;

const WhiteBox = styled.div`
  height: 274px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .text-positioner {
    margin-top: 24px;
    gap: 24px;
    padding: 0px;

    width: 292px;
    height: 198px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .header {
      ${({ theme }) => theme.typo.popup.T_24_EB}
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
    .body {
      display: flex;
      align-items: center;
      text-align: center;
      white-space: pre-line;

      ${({ theme }) => theme.typo.popup.S_15_R}
      color: ${({ theme }) => theme.palette.greyScale.black};
      line-height: 150%;
    }
  }
`;
