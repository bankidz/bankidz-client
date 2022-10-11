import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import WithdrawReason from '@components/manage/withdraw/WithdrawReason';

function WithdrawReasonPage() {
  return (
    <ForegroundTemplate label="탈퇴하기" to="/mypage/manage/withdraw">
      <WithdrawReason />
    </ForegroundTemplate>
  );
}

export default WithdrawReasonPage;
