import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/app/hooks';
import styled from 'styled-components';
import { dispatchItemName } from '../../../../store/slices/challengePayloadSlice';
import SelectItemNameButton from '../SelectItemNameButton';
import a1 from '../../../../assets/icons/itemName/a1.svg';
import a2 from '../../../../assets/icons/itemName/a2.svg';
import a3 from '../../../../assets/icons/itemName/a3.svg';
import b1 from '../../../../assets/icons/itemName/b1.svg';
import b2 from '../../../../assets/icons/itemName/b2.svg';
import b3 from '../../../../assets/icons/itemName/b3.svg';
import c1 from '../../../../assets/icons/itemName/c1.svg';
import c2 from '../../../../assets/icons/itemName/c2.svg';
import c3 from '../../../../assets/icons/itemName/c3.svg';

const itemNames = [
  { name: '학용품', image: <img src={a1} /> },
  { name: '생활용품', image: <img src={a2} /> },
  { name: '전자제품', image: <img src={a3} /> },
  { name: '식품', image: <img src={b1} /> },
  { name: '문화생활', image: <img src={b2} /> },
  { name: '패션뷰티', image: <img src={b3} /> },
  { name: '선물', image: <img src={c1} /> },
  { name: '비상금', image: <img src={c2} /> },
  { name: '기타', image: <img src={c3} /> },
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
`;
