import { useParams } from 'react-router-dom';

function CreateKid() {
  const { step } = useParams();
  console.log(step);
  return <>자녀-돈길만들기</>;
}

export default CreateKid;
