import MarginTemplate from '@components/layout/MarginTemplate';
import styled from 'styled-components';
import { ReactComponent as Banki } from '@assets/illusts/banki/banki_sad.svg';
import OutlinedButton from '@components/common/buttons/OutlinedButton';
import { useNavigate } from 'react-router-dom';
import useFamilyApi from '@lib/api/family/useFamilyApi';
import { FAMILY } from '@lib/constants/QUERY_KEY';
import { useQuery } from 'react-query';

function WalkError() {
  const { getFamily } = useFamilyApi();
  const { data, status } = useQuery(FAMILY, getFamily);
  const hasParent = status === 'success' && data?.familyUserList.length > 0;
  const navigate = useNavigate();
  const onButtonClick = () => {
    if (hasParent) {
      navigate('/create/1');
    } else {
      //임시
      navigate('/mypage');
    }
  };
  return (
    <Wrapper>
      <MarginTemplate>
        <h1>돈길 걷기</h1>
        <Container>
          {status === 'success' && (
            <>
              <Banki />
              <div>
                {hasParent ? (
                  <div>
                    <p style={{ marginBottom: '10px' }}>
                      걷고 있는 돈길이 없어요
                    </p>
                    <p>새로운 돈길을 만들어봐요!</p>
                  </div>
                ) : (
                  <p>아직 함께하는 부모님이 없어요</p>
                )}
              </div>
              <OutlinedButton
                label={hasParent ? '새로운 돈길 계약하기' : '가족 추가하기'}
                onClick={hasParent ? onButtonClick : onButtonClick}
              />
            </>
          )}
        </Container>
      </MarginTemplate>
    </Wrapper>
  );
}

export default WalkError;

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  height: calc(var(--vh, 1vh) * 100);
  h1 {
    ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    padding-top: 16px;
  }
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: calc(50% - 32px);
  width: 100%;
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
  div {
    p {
      text-align: center;
      ${({ theme }) => theme.typo.fixed.EmptyText_S_16_M}
      color: ${({ theme }) => theme.palette.greyScale.grey600};
    }
  }
`;
