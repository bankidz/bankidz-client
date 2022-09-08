import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import { useParams } from 'react-router-dom';

const Notice = () => {
  const { id } = useParams();
  return (
    <ForegroundTemplate>
      <>
        <h1>{}</h1>
      </>
    </ForegroundTemplate>
  );
};

export default Notice;
