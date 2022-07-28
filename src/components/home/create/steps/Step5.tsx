import ContractSheet from '@components/common/bottomSheets/ContractSheet';
import Signature from '@components/common/bottomSheets/sheetContents/Signature';
import Modals, { modals } from '@components/common/modals/Modals';
import useAxiosPrivate from '@hooks/auth/useAxiosPrivate';
import useBottomSheet from '@hooks/useBottomSheet';
import useModals from '@hooks/useModals';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  dispatchResetChallengePayload,
  postChallenge,
  selectPostChallengeResponse,
} from '@store/slices/challengePayloadSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Step5({ currentStep }: { currentStep: number }) {
  const navigate = useNavigate();
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
      // 스토어 초기화
      dispatch(dispatchResetChallengePayload());
      onDismiss(); // 바텀시트 내려가고 모달 뜨는게 좀 부자연수러움
      openModal(modals.quaternaryModal, {
        onSubmit: () => {
          closeModal(modals.quaternaryModal);
          navigate('/', { replace: true });
        },
      });
    } else if (status === 'failed') {
      console.log('err');
    }
  }, [status]);

  return (
    <>
      <Modals />
      <ContractSheet
        open={open}
        label={'다음'}
        onClickNext={onClickNextButton}
        disabledNext={disabledNext}
      >
        <Signature setDisabledNext={setDisabledNext} setSign={setSign} />
      </ContractSheet>
    </>
  );
}

export default Step5;
