import KidsRecordList from './KidsRecordList';
import useFamilyKidQuery from '@lib/hooks/queries/useFamilyKidQuery';

const KidsRecord = () => {
  const { data: kidData, status: kidStatus } = useFamilyKidQuery({
    suspense: true,
  });
  return (
    <>
      {kidData!.length > 0 && <h2>자녀기록</h2>}
      <KidsRecordList kidData={kidData!} />
    </>
  );
};

export default KidsRecord;
