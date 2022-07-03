import { Routes, Route } from 'react-router-dom';
import MypageKid from './MypageKid';
import MypageParent from './MypageParent';
import Info from './Info';
import Code from './Code';
import { AppProps } from '../../App';

function MypageRouter({ isKid }: AppProps) {
  return (
    <Routes>
      <Route path="/" element={isKid ? <MypageKid /> : <MypageParent />} />
      <Route path="/info" element={<Info />} />
      <Route path="/code" element={<Code />} />
    </Routes>
  );
}

export default MypageRouter;
