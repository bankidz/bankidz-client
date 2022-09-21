import ContractSheet from '@components/common/bottomSheets/contractSheet/ContractSheet';
import Signature from '@components/common/bottomSheets/contractSheet/Signature';
import Modals, { modals } from '@components/common/modals/Modals';
import { axiosPrivateTemp } from '@lib/apis/axios';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import useModals from '@lib/hooks/useModals';
import convertDataURLtoFile from '@lib/utils/convertDataURLtoFile';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  setFileName,
  resetChallengePayload,
  postChallenge,
  selectCreateChallenge,
  selectPostChallengeResponse,
} from '@store/slices/createChallengeSlice';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface IPreSignedUrl {
  imageName: string;
  preSignedUrl: string;
}

function Step5({ currentStep }: { currentStep: number }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const payload = useAppSelector(selectCreateChallenge);
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [sign, setSign] = useState();
  const [open, onOpen, onDismiss] = useBottomSheet(true);
  const { openModal, closeModal } = useModals();
  const [preSignedUrl, setPreSignedUrl] = useState<IPreSignedUrl>({
    imageName: '',
    preSignedUrl: '',
  });
  const queryClient = useQueryClient();

  // 돈길 생성하면 모달 띄우고 초기화
  const onSuccessPostChallenge = () => {
    dispatch(resetChallengePayload());
    onDismiss(); // 바텀시트 내려가고 모달 뜨는게 좀 부자연수러움
    openModal(modals.receiptModal, {
      variant: 'contract',
      onSubmit: () => {
        navigate('/', { replace: true });
      },
      ...payload,
      createdAt: dayjs().format('YYYY/MM/DD hh:mm:ss'),
      isKid: true,
      isSubmit: true,
    });
    queryClient.invalidateQueries([queryKeys.CHALLENGE, 'walking']);
  };

  const { mutate: mutatePostChallenge } = useMutation(
    challengeAPI.postChallenge,
    { onSuccess: onSuccessPostChallenge },
  );

  // 렌더링하자마자 presignedUrl 가져오기
  useEffect(() => {
    const getPresignedUrl = async (preSignedUrl: string, file: any) => {
      try {
        const response = await axiosPrivateTemp.get('/s3/url');
        dispatch(setFileName(response.data.imageName));
        setPreSignedUrl(response.data);
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
    mutatePostChallenge(payload);
  };

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
