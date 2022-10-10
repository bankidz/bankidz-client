import ContractSheet from '@components/common/bottomSheets/contractSheet/ContractSheet';
import Signature from '@components/common/bottomSheets/contractSheet/Signature';
import Modals, { modals } from '@components/common/modals/Modals';
import { axiosPrivate } from '@lib/apis/axios';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import useModals from '@lib/hooks/useModals';
import convertDataURLtoFile from '@lib/utils/convertDataURLtoFile';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  setFileName,
  resetChallengePayload,
  selectCreateChallenge,
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

function Step5() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createChallengePayload = useAppSelector(selectCreateChallenge);
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [sign, setSign] = useState();
  const [open, onOpen, onDismiss] = useBottomSheet(true);
  const { openModal } = useModals();
  const [preSignedUrl, setPreSignedUrl] = useState<IPreSignedUrl>({
    imageName: '',
    preSignedUrl: '',
  });
  const queryClient = useQueryClient();

  // 돈길 생성하면 모달 띄우고 초기화
  const onSuccessPostChallenge = () => {
    dispatch(resetChallengePayload());
    onDismiss();
    openModal(modals.receiptModal, {
      variant: 'contract',
      onSubmit: () => {
        navigate('/', { replace: true });
      },
      ...createChallengePayload,
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
    const getPresignedUrl = async () => {
      try {
        const response = await axiosPrivate.get('/s3/url');
        dispatch(setFileName(response.data.imageName));
        setPreSignedUrl(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getPresignedUrl();
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
    };
    uploadS3(sign);
    mutatePostChallenge(createChallengePayload);
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
