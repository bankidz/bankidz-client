import { IFamilyDTO } from '@queries/family/api/familyDTO';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import familyAPI from './api/familyAPI';

const useFamilyQuery = (
  options?: UseQueryOptions<IFamilyDTO, AxiosError, IFamilyDTO, string>,
) => {
  return useQuery(queryKeys.FAMILY, familyAPI.getFamily, options);
};
export default useFamilyQuery;
