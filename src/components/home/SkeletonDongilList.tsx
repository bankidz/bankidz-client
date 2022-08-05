import styled, { css } from 'styled-components';

type TUsage = 'walking' | 'pending' | 'proposed' | 'thisWeekS';

function SkeletonDongilList({ usage }: { usage: TUsage }) {
  return (
    <Wrapper usage={usage}>
      <Item usage={usage} />
      <Item usage={usage} />
      <Item usage={usage} />
    </Wrapper>
  );
}

export default SkeletonDongilList;

const Wrapper = styled.div<{ usage: TUsage }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Item = styled.div<{ usage: TUsage }>`
  width: 100%;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};

  ${({ usage }) =>
    (usage === 'walking' || usage === 'thisWeekS') &&
    css`
      height: 54px;
      margin-bottom: 8px;
    `}
  ${({ usage }) =>
    usage === 'pending' &&
    css`
      height: 68px;
      margin-bottom: 8px;
    `}
      ${({ usage }) =>
    usage === 'proposed' &&
    css`
      height: 54px;
      margin-bottom: 8px;
    `}
`;
