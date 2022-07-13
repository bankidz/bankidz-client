import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { kidMock } from '@lib/mocks/kid';
import { TFamilyState } from '@lib/types/kid';
import { useAppDispatch } from '@store/app/hooks';
import { dispatchParent } from '@store/slices/challengePayloadSlice';
import ProfileButton from '@components/onboarding/ProfileButton';

function Step1() {
  const [parents, setParents] = useState<TFamilyState[]>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getFamily } = kidMock();

  const onClickProfileButton = (isFemale: boolean) => {
    dispatch(dispatchParent(isFemale));
    navigate(`/create/2`, { state: { from: 1 } });
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await getFamily();
        const parent = response.filter((v) => !v.isKid);
        setParents(parent);
      } catch (e) {
        console.log('서버통신오류');
      }
    }
    fetchData();
  }, []);

  return (
    <Wrapper>
      {parents?.map((v, i) => (
        <ProfileButton
          isKid={v.isKid}
          isFemale={v.isFemale}
          onClick={() => onClickProfileButton(v.isFemale)}
          key={i}
        />
      ))}
    </Wrapper>
  );
}

export default Step1;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;