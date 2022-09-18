import { IFamilyDTO, IKidListDTO } from '@lib/apis/family/familyDTO';
import familyAPI from '@lib/apis/family/familyAPI';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useFamilyKidQuery = (
  options?: UseQueryOptions<IKidListDTO[], AxiosError, IKidListDTO[], string>,
) => {
  return useQuery(queryKeys.FAMILY_KID, familyAPI.getKid, options);
};
export default useFamilyKidQuery;
