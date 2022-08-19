import styled from 'styled-components';
import KidsRecordItem from './KidsRecordItem';

// TODO: any
function KidsRecordList({ kidsRecordData }: { kidsRecordData: any }) {
  return (
    <Wrapper>
      {kidsRecordData.map((kid: any) => (
        <KidsRecordItem kid={kid} />
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
