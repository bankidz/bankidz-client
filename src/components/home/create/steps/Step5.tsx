import ContractSheet from '@components/common/bottomSheets/contractSheet/ContractSheet';
import Signature from '@components/common/bottomSheets/contractSheet/Signature';
import Modals, { modals } from '@components/common/modals/Modals';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import useModals from '@lib/hooks/useModals';
import convertDataURLtoFile from '@lib/utils/convertDataURLtoFile';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  dispatchFileName,
  dispatchResetChallengePayload,
  postChallenge,
  selectCreateChallenge,
  selectPostChallengeResponse,
} from '@store/slices/createChallengeSlice';
import { fetchPendingDongils } from '@store/slices/pendingDongilsSlice';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IPreSignedUrl {
  imageName: string;
  preSignedUrl: string;
}

function Step5({ currentStep }: { currentStep: number }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //const { responseData, status } = useAppSelector(selectPostChallengeResponse);
  const { interestRate, isMom, itemName, title, totalPrice, weekPrice, weeks } =
    useAppSelector(selectCreateChallenge);
  const { responseData, status } = useAppSelector(selectPostChallengeResponse);
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [sign, setSign] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [open, onOpen, onDismiss] = useBottomSheet(true);
  const { openModal, closeModal } = useModals();
  const [preSignedUrl, setPreSignedUrl] = useState<IPreSignedUrl>({
    imageName: '',
    preSignedUrl: '',
  });

  useEffect(() => {
    const getPresignedUrl = async (preSignedUrl: string, file: any) => {
      try {
        const response = await axiosPrivate.get('/s3/url');
        console.log(response.data);
        setPreSignedUrl(response.data.data);
        dispatch(dispatchFileName(response.data.data.imageName));
      } catch (err) {
        console.error(err);
      }
    };

    getPresignedUrl(preSignedUrl.preSignedUrl, sign);
  }, []);

  // 다음으로 버튼 클릭
  const onClickNextButton = () => {
    // s3 업로드 로직
    const uploadS3 = async (sign: any) => {
      const file = convertDataURLtoFile(sign, preSignedUrl.imageName);
      let formData = new FormData();
      formData.append('file', file);

      const response = await axios.put(preSignedUrl.preSignedUrl, file, {
        headers: { 'Content-Type': 'image/png' },
      });
      console.log(response);
    };
    uploadS3(sign);
    dispatch(postChallenge(axiosPrivate));
  };

  // 데모데이 시연용으로 주석처리
  useEffect(() => {
    if (status === 'succeeded') {
      // 스토어 초기화
      dispatch(dispatchResetChallengePayload());
      onDismiss(); // 바텀시트 내려가고 모달 뜨는게 좀 부자연수러움
      openModal(modals.receiptModal, {
        variant: 'contract',
        onSubmit: () => {
          navigate('/', { replace: true });
        },
        // 성우의 제안: day.js로 날짜관련 함수 통일
        createdAt: moment().format('YYYY/MM/DD hh:mm:ss'),
        interestRate,
        isMom,
        itemName,
        title,
        totalPrice,
        weekPrice,
        weeks,
        isKid: true,
        isSubmit: true,
        fileName: preSignedUrl.imageName,
      });
      dispatch(fetchPendingDongils({ axiosPrivate }));
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
