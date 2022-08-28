import useFamilyApi from '@lib/api/family/useFamilyApi';
import { KID } from '@lib/constants/queryKeyes';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import KidsRecordItem from './KidsRecordItem';

// TODO: any
function KidsRecordList() {
  const { getKid } = useFamilyApi();
  const { data, status } = useQuery(KID, getKid);
  return (
    <Wrapper>
      {status === 'success' &&
        data.map((kid) => <KidsRecordItem kid={kid} key={kid.username} />)}
    </Wrapper>
  );
}

export default KidsRecordList;

const Wrapper = styled.div`
  & > div:not(:last-child) {
    margin-bottom: 16px;
  }
`;
