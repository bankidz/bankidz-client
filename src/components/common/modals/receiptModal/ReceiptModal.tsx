import { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { modals } from '../Modals';
import { slideAnimation } from '../slideAnimation';
import CommentContent from './contents/CommentContent';
import '../styles.css';
import getHeightByVariant from './getHeightByVariant';
import PerforatedLineTop from './perforatedLines/PerforatedLineTop';
import PerforatedLineBottom from './perforatedLines/PerforatedLineBottom';
import TopContent from './contents/TopContent';
import BottomContent from './contents/BottomContent';
import SubmitButton from './SubmitButton';
import { TReceiptModalVariant } from './TReceiptModalVariant';
import { MODAL_CLOSE_TRANSITION_TIME } from '@lib/constants/MODAL';
import useModals from '@lib/hooks/useModals';
import { theme } from '@lib/styles/theme';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

interface ReceiptModalProps
  extends Pick<
      IChallengeDTO,
      | 'createdAt'
      | 'interestRate'
      | 'itemName'
      | 'title'
      | 'totalPrice'
      | 'weekPrice'
      | 'weeks'
      | 'fileName'
    >,
    Pick<Partial<IChallengeDTO>, 'comment'> {
  variant: TReceiptModalVariant;
  onSubmit: any;
  onExtraSubmit?: any;
  isMom: boolean;
  shouldCloseOnOverlayClick?: boolean;
}

/**
 * @param variant 용도를 선택합니다.
 * contract: 자녀 - 새로 돈길 계약하기 / proposing: 자녀 - 대기중인 돈길 (제안중)
 * rejected: 자녀 - 대기중인 돈길 (거절됨) / proposed: 부모 - 제안받은 돈길
 * @param onSubmit @param onExtraSubmit submit (모달 하단 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
 * 모달 하단 버튼이 1개인 경우 onSubmit만 사용합니다.
 * 모달 하단 버튼이 2개인 경우 왼쪽 버튼은 onSubmit을, 오른쪽 버튼은 onExtraSubmit을 사용합니다.
 */
function ReceiptModal({
  variant,
  onSubmit,
  onExtraSubmit,
  createdAt,
  interestRate,
  isMom,
  itemName,
  title,
  totalPrice,
  weekPrice,
  weeks,
  comment,
  shouldCloseOnOverlayClick = false,
  fileName,
}: ReceiptModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { closeModal } = useModals();
  const reactModalParams = {
    isOpen: isOpen,
    onRequestClose: () => {
      setIsOpen(false);
      setTimeout(() => {
        closeModal(modals.receiptModal);
      }, MODAL_CLOSE_TRANSITION_TIME);
    },
    shouldCloseOnOverlayClick: shouldCloseOnOverlayClick,
    closeTimeoutMS: MODAL_CLOSE_TRANSITION_TIME,
    style: {
      overlay: {
        zIndex: '700',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(36, 39, 41, 0.7)',
      },
      content: {
        height: `${getHeightByVariant(variant)}px`,
        position: 'absolute',
        top: 'calc(var(--vh, 1vh) * 50)',
        transform: 'translate3d(0, -50%, 0)',
        left: '18px',
        right: '18px',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
        border: 'none',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    },
  };

  // PerforatedLineTop의 height: 15px
  // PerforatedShape의 height: 10px, width: 20px
  // PerforatedLine과 접하는 컴포넌트의 경우 height를 10px 줄임
  // 컴포넌트 접합부 갈라짐으로 인해 2px 겹치도록 margin 조정함
  // 이로인한 오차는 모달 content의 height를 조절함으로서 보정함
  // 그 외에는 모두 디자인 원안을 준수함

  return (
    // @ts-expect-error
    <StyledReactModal {...reactModalParams}>
      <Content>
        <PerforatedLineTop fill={theme.palette.greyScale.white} />
        <TopContent variant={variant} title={title} />
        <BottomContent
          variant={variant}
          isMom={isMom}
          itemName={itemName}
          totalPrice={totalPrice}
          weekPrice={weekPrice}
          interestRate={interestRate}
          weeks={weeks}
          createdAt={createdAt}
          fileName={fileName}
        />
        {variant === 'rejected' && <CommentContent comment={comment!} />}
        <PerforatedLineBottom fill={theme.palette.greyScale.white} />
        <SubmitButton
          variant={variant}
          setIsOpen={setIsOpen}
          onSubmit={onSubmit}
          onExtraSubmit={onExtraSubmit}
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        />
      </Content>
    </StyledReactModal>
  );
}

export default ReceiptModal;

const StyledReactModal = styled(ReactModal)`
  ${slideAnimation}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

// http://jsfiddle.net/dineshranawat/Ls95n95L/
// http://www.liangshunet.com/en/202004/998851523.htm
