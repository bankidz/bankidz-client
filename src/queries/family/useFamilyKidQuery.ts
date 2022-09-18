import { IKidListDTO } from '@lib/apis/family/family.dto';
import familyApi from '@lib/apis/family/familyApi';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useFamilyKidQuery = (
  options?: UseQueryOptions<IKidListDTO[], AxiosError, IKidListDTO[], string>,
) => {
  return useQuery(queryKeys.FAMILY_KID, familyApi.getFamilyKid, options);
};
export default useFamilyKidQuery;
