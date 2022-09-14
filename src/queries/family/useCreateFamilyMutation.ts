import { IFamilyDTO } from '@lib/apis/family/family.dto';
import familyApi from '@lib/apis/family/familyApi';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

const useCreateFamilyMutation = (
  options?: UseMutationOptions<IFamilyDTO, AxiosError, any, void>,
) => {
  return useMutation(familyApi.createFamily, options);
};

export default useCreateFamilyMutation;
