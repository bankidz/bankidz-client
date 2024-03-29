import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import familyAPI from '@lib/apis/family/familyAPI';
import { IFamilyDTO, IKidListDTO } from '@lib/apis/family/familyDTO';
import queryKeys from '@lib/constants/queryKeys';

const useFamilyKidQuery = (
  options?: UseQueryOptions<IKidListDTO[], AxiosError, IKidListDTO[], string>,
) => {
  return useQuery(queryKeys.FAMILY_KID, familyAPI.getKid, options);
};
export default useFamilyKidQuery;
