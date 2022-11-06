import ForegroundTemplate from '@components/shared/layout/ForegroundTemplate';
import WithdrawReason from '@components/blocks/manage/withdraw/WithdrawReason';

function WithdrawReasonPage() {
  return (
    <ForegroundTemplate label="탈퇴하기" to="/mypage/manage/withdraw">
      <WithdrawReason />
    </ForegroundTemplate>
  );
}

export default WithdrawReasonPage;
