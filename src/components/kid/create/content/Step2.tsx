import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/app/hooks';
import styled from 'styled-components';
import { dispatchItemName } from '@store/slices/challengePayloadSlice';
import SelectItemNameButton from '../SelectItemNameButton';
import { ReactComponent as A1 } from '@assets/illust/contractItemNames/contractSelect/a1.svg';
import { ReactComponent as A2 } from '@assets/illust/contractItemNames/contractSelect/a2.svg';
import { ReactComponent as A3 } from '@assets/illust/contractItemNames/contractSelect/a3.svg';
import { ReactComponent as B1 } from '@assets/illust/contractItemNames/contractSelect/b1.svg';
import { ReactComponent as B2 } from '@assets/illust/contractItemNames/contractSelect/b2.svg';
import { ReactComponent as B3 } from '@assets/illust/contractItemNames/contractSelect/b3.svg';
import { ReactComponent as C1 } from '@assets/illust/contractItemNames/contractSelect/c1.svg';
import { ReactComponent as C2 } from '@assets/illust/contractItemNames/contractSelect/c2.svg';
import { ReactComponent as C3 } from '@assets/illust/contractItemNames/contractSelect/c3.svg';

const itemNames = [
  { name: '학용품', image: <A1 /> },
  { name: '생활용품', image: <A2 /> },
  { name: '전자제품', image: <A3 /> },
  { name: '식품', image: <B1 /> },
  { name: '문화생활', image: <B2 /> },
  { name: '패션뷰티', image: <B3 /> },
  { name: '선물', image: <C1 /> },
  { name: '비상금', image: <C2 /> },
  { name: '기타', image: <C3 /> },
];

function Step2({ currentStep }: { currentStep: number }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const onClickItemNameButton = (itemName: string) => {
    console.log(itemName);
    dispatch(dispatchItemName(itemName));
    navigate(`/create/${currentStep + 1}`, { state: { from: currentStep } });
  };

  return (
    <Wrapper>
      {itemNames.map((v) => (
        <SelectItemNameButton
          name={v.name}
          image={v.image}
          key={v.name}
          onClick={() => onClickItemNameButton(v.name)}
        />
      ))}
    </Wrapper>
  );
}

export default Step2;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  margin: 0px 8px;
`;
