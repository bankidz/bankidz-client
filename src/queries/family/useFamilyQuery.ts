import { IFamilyDTO } from '@lib/apis/family/family.dto';
import familyApi from '@lib/apis/family/familyApi';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useFamilyQuery = (
  options?: UseQueryOptions<IFamilyDTO, AxiosError, IFamilyDTO, string>,
) => {
  return useQuery(queryKeys.FAMILY, familyApi.getFamily, options);
};
export default useFamilyQuery;
