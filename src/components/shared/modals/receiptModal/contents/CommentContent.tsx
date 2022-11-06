import styled from 'styled-components';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

type CommentContentProps = Pick<IChallengeDTO, 'comment'>;

function CommentContent({ comment }: CommentContentProps) {
  return (
    <Wrapper>
      <div className="border">
        <div className="header">부모님의 한줄평</div>
        <div className="body">{comment?.content}</div>
      </div>
    </Wrapper>
  );
}

export default CommentContent;

const Wrapper = styled.div`
  padding-left: 17px;
  padding-right: 17px;

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

  .border {
    width: 100%;
    height: 100%;
    z-index: 999;
    border-top: ${({ theme }) => theme.border.receipt};
  }
  .header {
    width: 80px;
    height: 12px;
    ${({ theme }) => theme.typo.text.S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-left: 7px;
    margin-top: 18px;
  }
  .body {
    width: 276px;
    height: 14px;
    ${({ theme }) => theme.typo.text.T_16_EB}
    color: ${({ theme }) => theme.palette.sementic.red300};
    margin-left: 7px;
    margin-top: 18px;
    margin-bottom: 32px;
  }
`;
