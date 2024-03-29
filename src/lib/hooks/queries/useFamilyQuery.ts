import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { IFamilyDTO } from '@lib/apis/family/familyDTO';
import familyAPI from '@lib/apis/family/familyAPI';
import queryKeys from '@lib/constants/queryKeys';

const useFamilyQuery = (
  options?: UseQueryOptions<IFamilyDTO, AxiosError, IFamilyDTO, string>,
) => {
  return useQuery(queryKeys.FAMILY, familyAPI.getFamily, options);
};
export default useFamilyQuery;
