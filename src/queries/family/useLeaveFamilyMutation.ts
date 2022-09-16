import { IFamilyDTO } from '@queries/family/api/familyDTO';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import familyAPI from './api/familyAPI';

const useLeaveFamilyMutation = (
  options?: UseMutationOptions<IFamilyDTO, AxiosError, any, void>,
) => {
  return useMutation(familyAPI.leaveFamily, options);
};

export default useLeaveFamilyMutation;
