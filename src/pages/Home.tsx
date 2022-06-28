import Button from '../components/common/Button';
import { Counter } from '../components/counter/Counter';

function Home() {
  return (
    <>
      <div>Home</div>
      <Counter />
      <Button cyan to="settings">
        Sample
      </Button>
    </>
  );
}

export default Home;
