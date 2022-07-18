import ContractSheet from '@components/common/bottomSheet/ContractSheet';
import Signature from '@components/common/bottomSheet/sheetContent/Signature';
import { useAppDispatch } from '@store/app/hooks';
import { useState } from 'react';

function Step5({ currentStep }: { currentStep: number }) {
  const dispatch = useAppDispatch();
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [sign, setSign] = useState();
  // 다음으로 버튼 클릭
  const onClickNextButton = () => {
    console.log(sign);
  };
  return (
    <>
      <ContractSheet
        open={true}
        label={'다음'}
        onDismiss={() => {}}
        onClickNext={onClickNextButton}
        disabledNext={disabledNext}
      >
        <Signature setDisabledNext={setDisabledNext} setSign={setSign} />
      </ContractSheet>
    </>
  );
}

export default Step5;
