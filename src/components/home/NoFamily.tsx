import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { ReactComponent as Banki } from '@assets/illusts/banki/banki_sad.svg';
import MarginTemplate from '@components/layout/MarginTemplate';
import OutlinedButton from '@components/common/buttons/OutlinedButton';
import { ReactComponent as BANKIDZ } from '@assets/icons/BANKIDZ.svg';
import { theme } from '@lib/styles/theme';

function NoFamily() {
  const isKid = useAppSelector(selectIsKid);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <MarginTemplate>
        <div className="logo-wrapper">
          <BANKIDZ fill={theme.palette.main.yellow400} />
        </div>
        <div className="header-text">
          {isKid
            ? '부모님과 돈길 걷기\n함께해요'
            : '우리 아이와\n돈길 걷기 함께해요'}
        </div>

        <Container>
          <Banki />
          <p>
            {isKid
              ? '아직 함께하는 부모님이 없어요'
              : '아직 함께하는 자녀가 없어요'}
          </p>
          <OutlinedButton
            label={'가족 추가하기'}
            onClick={() => navigate('mypage')}
          />
        </Container>
      </MarginTemplate>
    </Wrapper>
  );
}

export default NoFamily;

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: hidden;

  .logo-wrapper {
    margin-top: 17.73px;
    width: 100.24px;
    height: 15.82px;
  }
  .header-text {
    margin-top: 30.44px;
    width: 308px;
    height: 58px;
    white-space: pre-line;

    color: ${({ theme }) => theme.palette.greyScale.black};
    ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
    line-height: 150%;
  }
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: calc(50% - 32px);
  transform: translate3d(-50%, -50%, 0);
  display: grid;
  grid-template-rows: 185px auto;

  & > *:not(:first-child) {
    margin: 0 auto;
    margin-top: 16px;
  }
  svg {
    padding-top: 38.93px;
    padding-bottom: 23.84px;
  }
  > p {
    text-align: center;
    ${({ theme }) => theme.typo.fixed.EmptyText_S_16_M};
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    width: 210px;
  }
`;
