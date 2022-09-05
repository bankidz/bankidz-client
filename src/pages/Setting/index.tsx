import Notice from '@components/setting/notices/Notice';
import { Route, Routes } from 'react-router-dom';
import Alerts from './Alerts';
import Faq from './Faq';
import Features from './Features';
import Guides from './Guides';
import Inquiry from './Inquiry';
import Notices from './Notices';
import NoticeView from './NoticeView';
import Privacy from './Privacy';
import Setting from './Setting';
import Terms from './Tems';
import Withdraw from './Withdraw';

const SettingRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Setting />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/notices/:id" element={<NoticeView />} />
      <Route path="/features" element={<Features />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/inquiry" element={<Inquiry />} />
      <Route path="/withdraw" element={<Withdraw />} />
    </Routes>
  );
};

export default SettingRouter;
