import styled from 'styled-components';
import KidsRecordItem from './KidsRecordItem';
import { IKidListDTO } from '@lib/apis/family/familyDTO';

function KidsRecordList({ kidData }: { kidData: IKidListDTO[] }) {
  return (
    <Wrapper>
      {kidData.map((kid) => (
        <KidsRecordItem kid={kid} key={kid.kidId} />
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
