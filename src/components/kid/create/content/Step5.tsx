import ContractSheet from '@components/common/bottomSheet/ContractSheet';
import Signature from '@components/common/bottomSheet/sheetContent/Signature';
import Modals, { modals } from '@components/common/modal/Modals';
import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import useBottomSheet from '@hooks/useBottomSheet';
import useModals from '@hooks/useModals';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  dispatchResetChallengePayload,
  postChallenge,
  selectPostChallengeResponse,
} from '@store/slices/challengePayloadSlice';
import { useEffect, useState } from 'react';

function Step5({ currentStep }: { currentStep: number }) {
  const dispatch = useAppDispatch();
  const { responseData, status } = useAppSelector(selectPostChallengeResponse);
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [sign, setSign] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [open, onOpen, onDismiss] = useBottomSheet(true);
  const { openModal, closeModal } = useModals();

  // 다음으로 버튼 클릭
  const onClickNextButton = () => {
    dispatch(postChallenge(axiosPrivate));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(dispatchResetChallengePayload());
      onDismiss();
    }
  }, [status]);

  useEffect(() => {
    !open &&
      openModal(modals.quaternaryModal, {
        onSubmit: () => {
          console.log('비즈니스 로직 처리...');
        },
      });
  }, [open]);

  return (
    <>
      <Modals />
      <ContractSheet
        open={open}
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
