import styled from 'styled-components';
import SelectItemNameButton from '../SelectItemNameButton';
import { useAppDispatch } from '@store/app/hooks';
import { TItemName } from '@lib/types/TItemName';
import { setItemName } from '@store/slices/createChallengeSlice';
import { CreateStepProps } from '@components/pages/Home/Create';

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

function Step2({ onNextButtonClick }: CreateStepProps) {
  const dispatch = useAppDispatch();

  const onClickItemNameButton = (itemName: string) => {
    dispatch(setItemName(itemName));
    onNextButtonClick();
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
