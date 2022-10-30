import axios from 'axios';
import { useState } from 'react';
import { axiosPrivate } from '@lib/apis/axios';
import convertDataURLtoFile from '@lib/utils/convertDataURLtoFile';
import { useAppDispatch } from '@store/app/hooks';
import { setFileName } from '@store/slices/createChallengeSlice';

const usePresignedUrl = () => {
  const [url, setUrl] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const dispatch = useAppDispatch();

  const getPresignedUrl = async () => {
    try {
      const response = await axiosPrivate.get('/s3/url');
      dispatch(setFileName(response.data.imageName));
      setUrl(response.data.preSignedUrl);
      setImageName(response.data.imageName);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadS3 = async (sign: any) => {
    const file = convertDataURLtoFile(sign, imageName);
    const formData = new FormData();
    formData.append('file', file);

    await axios.put(url, file, {
      headers: { 'Content-Type': 'image/png' },
    });
  };

  return { getPresignedUrl, uploadS3 };
};

export default usePresignedUrl;
