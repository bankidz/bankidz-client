import { IGetKidResDataItem } from '@lib/api/family/family.type';
import useFamilyApi from '@lib/api/family/useFamilyApi';
import { IGetUserResData } from '@lib/api/user/user.type';
import { KID, USER } from '@lib/constants/queryKeyes';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import KidsRecordItem from './KidsRecordItem';

function KidsRecordList({ kidData }: { kidData: IGetKidResDataItem[] }) {
  return (
    <Wrapper>
      {kidData.map((kid) => (
        <KidsRecordItem kid={kid} key={kid.username} />
      ))}
    </Wrapper>
  );
}

export default KidsRecordList;

const Wrapper = styled.div`
  & > div:not(:last-child) {
    margin-bottom: 16px;
  }
`;
