import styled from 'styled-components';

const SkeletonElement = ({ type }: { type: any }) => {
  const classes = `skeleton ${type}`;
  return <div className={classes}></div>;
};

export default SkeletonElement;

// const Wrapper = styled.div<{ variant: TVariant }>`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const Item = styled.div<{ variant: TVariant }>`
//   width: 100%;
//   background: ${({ theme }) => theme.palette.greyScale.white};
//   border-radius: ${({ theme }) => theme.radius.medium};

//   ${({ variant }) =>
//     (variant === 'walking' || variant === 'thisWeekS') &&
//     css`
//       height: 54px;
//       margin-bottom: 8px;
//     `}
//   ${({ variant }) =>
//     variant === 'pending' &&
//     css`
//       height: 68px;
//       margin-bottom: 8px;
//     `}
//       ${({ variant }) =>
//     variant === 'proposed' &&
//     css`
//       height: 54px;
//       margin-bottom: 8px;
//     `}
// `;
