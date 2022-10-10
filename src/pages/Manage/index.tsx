import { Location, Route, Routes } from 'react-router-dom';
import Alerts from './Alerts';
import Faq from './Faq';
import Features from './Features';
import Guides from './Guides';
import Notices from './Notices';
import NoticeView from './NoticeView';
import Privacy from './Privacy';
import Manage from './Manage';
import Terms from './Tems';
import WithdrawCallbackPage from './Withdraw/WithdrawCallbackPage';
import WithdrawPage from './Withdraw/WithdrawPage';
import WithdrawReasonPage from './Withdraw/WithdrawReasonPage';

const ManageRouter = ({ location }: { location: Location }) => {
  return (
    <Routes location={location}>
      <Route path="/" element={<Manage />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/notices/:id" element={<NoticeView />} />
      <Route path="/features" element={<Features />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/withdraw" element={<WithdrawPage />} />
      <Route path="/withdraw/reason" element={<WithdrawReasonPage />} />
      <Route path="/withdraw/callback" element={<WithdrawCallbackPage />} />
    </Routes>
  );
};

export default ManageRouter;
