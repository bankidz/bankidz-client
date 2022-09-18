import { IFamilyDTO } from '@lib/apis/family/familyDTO';
import familyAPI from '@lib/apis/family/familyAPI';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

const useJoinFamilyMutation = (
  options?: UseMutationOptions<IFamilyDTO, AxiosError, any, void>,
) => {
  return useMutation(familyAPI.joinFamily, options);
};

export default useJoinFamilyMutation;
