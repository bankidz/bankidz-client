import ContractSheet from '@components/common/bottomSheets/contractSheet/ContractSheet';
import Signature from '@components/common/bottomSheets/contractSheet/Signature';
import Modals, { modals } from '@components/common/modals/Modals';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import useModals from '@lib/hooks/useModals';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  dispatchResetChallengePayload,
  postChallenge,
  selectCreateChallenge,
  selectPostChallengeResponse,
} from '@store/slices/createChallengeSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Step5({ currentStep }: { currentStep: number }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //const { responseData, status } = useAppSelector(selectPostChallengeResponse);
  const { interestRate, isMom, itemName, title, totalPrice, weekPrice, weeks } =
    useAppSelector(selectCreateChallenge);
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [sign, setSign] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [open, onOpen, onDismiss] = useBottomSheet(true);
  const { openModal, closeModal } = useModals();

  // 다음으로 버튼 클릭
  const onClickNextButton = () => {
    // 데모데이 시연용으로 주석처리
    // dispatch(postChallenge(axiosPrivate));
    dispatch(dispatchResetChallengePayload());
    onDismiss(); // 바텀시트 내려가고 모달 뜨는게 좀 부자연수러움
    openModal(modals.receiptModal, {
      variant: 'contract',
      onSubmit: () => {
        navigate('/', { replace: true });
      },
      // TODO: day.js
      createdAt: moment().format('YYYY/MM/DD hh:mm:ss'),
      interestRate,
      isMom,
      itemName,
      title,
      totalPrice,
      weekPrice,
      weeks,
      isKid: true,
      fileName: sign,
      isSubmit: true,
    });
  };

  // 데모데이 시연용으로 주석처리
  /*   useEffect(() => {
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
  }, [status]); */

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
