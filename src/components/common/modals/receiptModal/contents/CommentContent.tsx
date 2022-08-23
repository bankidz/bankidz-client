import { IDongil } from '@lib/types/IDongil';
import styled from 'styled-components';

interface CommentContentProps extends Pick<IDongil, 'comment'> {}

function CommentContent({ comment }: CommentContentProps) {
  return (
    <Wrapper>
      <div className="header">부모님의 한줄평</div>
      <div className="body">{comment?.content}</div>
    </Wrapper>
  );
}

export default CommentContent;

const Wrapper = styled.div`
  border-top-left-radius: ${({ theme }) => theme.radius.medium};
  border-top-right-radius: ${({ theme }) => theme.radius.medium};
  width: 100%;
  height: 86px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  margin: -2px 0; // overlaps 2px

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .header {
    width: 80px;
    height: 12px;
    ${({ theme }) => theme.typo.text.S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-left: 24px;
    margin-top: 18px;
  }
  .body {
    width: 276px;
    height: 14px;
    ${({ theme }) => theme.typo.text.T_16_EB}
    color: ${({ theme }) => theme.palette.sementic.red300};
    margin-left: 24px;
    margin-top: 18px;
    margin-bottom: 32px;
  }
`;
