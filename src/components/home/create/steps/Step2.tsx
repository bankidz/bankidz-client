import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/app/hooks';
import styled from 'styled-components';
import { dispatchItemName } from '@store/slices/createChallenge';
import SelectItemNameButton from '../SelectItemNameButton';
import { TItemName } from '@lib/types/kid';

const itemNames: TItemName[] = [
  '학용품',
  '생활용품',
  '전자제품',
  '식품',
  '문화생활',
  '패션뷰티',
  '선물',
  '비상금',
  '기타',
];

function Step2({ currentStep }: { currentStep: number }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const onClickItemNameButton = (itemName: string) => {
    dispatch(dispatchItemName(itemName));
    navigate(`/create/${currentStep + 1}`, { state: { from: currentStep } });
  };

  return (
    <Wrapper>
      {itemNames.map((v, i) => (
        <SelectItemNameButton
          itemName={v}
          key={i}
          onClick={() => onClickItemNameButton(v)}
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
