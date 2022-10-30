import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { IMyPageDTO, IUserDTO } from '@lib/apis/user/userDTO';
import MarginTemplate from '@components/layout/MarginTemplate';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import queryKeys from '@lib/constants/queryKeys';

interface WithdrawTemplateProps {
  children: React.ReactNode;
}

function WithdrawTemplate({ children }: WithdrawTemplateProps) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(queryKeys.USER) as IMyPageDTO;
  const isKid = useAppSelector(selectIsKid);

  return (
    <Wrapper>
      <h1>탈퇴하기</h1>
      <MarginTemplate>
        <header>
          <h1>{`${user.user.username}님, 정말 뱅키즈를\n탈퇴하시겠어요?`}</h1>
          {isKid ? (
            <p>{`뱅키즈를 이용하면 부모님과 함께\n목표에 한 발짝 다가갈 수 있어요`}</p>
          ) : (
            <p>{`뱅키즈를 이용하면 자녀의 올바른 금융 습관을\n형성할 수 있어요`}</p>
          )}
        </header>
        {children}
      </MarginTemplate>
    </Wrapper>
  );
}

export default WithdrawTemplate;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};

  white-space: pre-wrap;

  > h1 {
    ${({ theme }) => theme.typo.fixed.TabName_T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    width: 87px;
    height: 21px;
    margin-top: 16px;
    margin-left: 16px;
  }
  header h1 {
    ${({ theme }) => theme.typo.fixed.TabName_T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    line-height: 150%;
    margin-top: 51px;
  }
  header p {
    ${({ theme }) => theme.typo.text.S_14_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    line-height: 150%;
    width: 308px;
    height: 42px;
    margin-top: 16px;
  }
`;
