import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/app/hooks';
import styled from 'styled-components';
import { dispatchItemName } from '@store/slices/challengePayloadSlice';
import SelectItemNameButton from '../SelectItemNameButton';
import { ReactComponent as A1 } from '@assets/illust/ContractItemNames/a1.svg';
import { ReactComponent as A2 } from '@assets/illust/ContractItemNames/a2.svg';
import { ReactComponent as A3 } from '@assets/illust/ContractItemNames/a3.svg';
import { ReactComponent as B1 } from '@assets/illust/ContractItemNames/b1.svg';
import { ReactComponent as B2 } from '@assets/illust/ContractItemNames/b2.svg';
import { ReactComponent as B3 } from '@assets/illust/ContractItemNames/b3.svg';
import { ReactComponent as C1 } from '@assets/illust/ContractItemNames/c1.svg';
import { ReactComponent as C2 } from '@assets/illust/ContractItemNames/c2.svg';
import { ReactComponent as C3 } from '@assets/illust/ContractItemNames/c3.svg';

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

function Step2() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickItemNameButton = (itemName: string) => {
    console.log(itemName);
    dispatch(dispatchItemName(itemName));
    navigate(`/create/3`, { state: { from: 2 } });
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
