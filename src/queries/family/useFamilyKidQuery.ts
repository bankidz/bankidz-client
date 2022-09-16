import { IFamilyDTO, IKidListDTO } from '@queries/family/api/familyDTO';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import familyAPI from './api/familyAPI';

const useFamilyKidQuery = (
  options?: UseQueryOptions<IKidListDTO[], AxiosError, IKidListDTO[], string>,
) => {
  return useQuery(queryKeys.FAMILY_KID, familyAPI.getKid, options);
};
export default useFamilyKidQuery;
