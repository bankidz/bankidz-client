import { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { calcRatio, theme } from '@lib/styles/theme';
import CheckButton from '../../buttons/CheckButton';
import { TItemName } from '@lib/types/TItemName';
import PerforatedLineTop from './PerforatedLineTop';
import PerforatedLineBottom from './PerforatedLineBottom';
import Button from '@components/common/buttons/Button';
import '../styles.css';
import getDashedBorder from './getDivider';
import getFirstRow from './getFirstRow';
import getSecondRow from './getSecondRow';
import { TInterestRate } from '@lib/types/IInterestRate';
import getThirdRow from './getThirdRow';
import '../styles.css';

type TVariant = 'contract' | 'proposing' | 'rejected' | 'proposed';

interface QuaternaryModalProps {
  /**
   * 용도를 선택합니다.
   * contract: 자녀 - 새로 돈길 계약하기 / proposing: 자녀 - 대기중인 돈길 (제안중)
   * rejected: 자녀 - 대기중인 돈길 (거절됨) / proposed: 부모 - 제안받은 돈길
   * */
  variant: TVariant;
  /**
   * submit (모달 하단 버튼 클릭) 시 처리될 지스니스 로직을 처리하는 함수 입니다.
   * 모달 하단 버튼이 1개인 경우 onSubmit만 사용합니다.
   * 모달 하단 버튼이 2개인 경우 왼쪽 버튼은 onSubmit을, 오른쪽 버튼은 onExtraSubmit을 사용합니다.
   * */
  onSubmit?: any;
  onExtraSubmit?: any;
  createdAt: string;
  interestRate: TInterestRate;
  isMom: boolean;
  itemName: TItemName;
  title: string;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
  fileName?: string;
  /** (데모데이) 계약하자마자 뜨는 모달에서는 리스폰스에서 받아오는게 아닌 datauri를 바로 렌더링합니다 */
  isSubmit?: boolean;
}

// 모달 내부에 표시될 UI 작성
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
  fileName,
  isSubmit = false,
}: QuaternaryModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  function handleSubmit() {
    setIsOpen(false);
  }

  const reactModalParams = {
    isOpen: isOpen,
    onRequestClose: handleSubmit,
    shouldCloseOnOverlayClick: true,
    closeTimeoutMS: 999,
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
        height: '544px',
        position: 'absolute',
        top: 'calc(var(--vh, 1vh) * 50)',
        transform: 'translate3d(0, -50%, 0)',
        left: '18px',
        right: '18px',
        background: 'rgba(36, 39, 41, 0)',
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

  function handleCheckButtonClick() {
    onSubmit();
  }
  function handleRejectButtonClick() {
    onSubmit();
  }
  function handleAcceptButtonClick() {
    onExtraSubmit();
  }

  const dashedBorder = getDashedBorder();
  const firstRow = getFirstRow(isMom, itemName);
  const secondRow = getSecondRow(totalPrice, weekPrice, interestRate);
  const thirdRow = getThirdRow(weeks, createdAt);

  return (
    // @ts-expect-error
    <StyledReactModal {...reactModalParams}>
      <Content>
        <PerforatedLineTop fill={theme.palette.greyScale.white} />
        <Top>
          {variant === 'contract' && (
            <span className="header">계약서 전송 성공!</span>
          )}
          <span className="body">{title}</span>
        </Top>
        {dashedBorder}

        <Bottom>
          {firstRow}
          {secondRow}
          {thirdRow}
          <SignatureWrapper>
            {/* <img
              src={
                isSubmit
                  ? fileName
                  : `https://bankidz-bucket.s3.ap-northeast-2.amazonaws.com/${fileName}`
              }
            /> */}
          </SignatureWrapper>
        </Bottom>
        <PerforatedLineBottom fill={theme.palette.greyScale.white} />
        <ButtonOverlay onClick={handleSubmit} />
        <ButtonWrapper>
          {variant === 'contract' ? (
            <CheckButton onClick={handleCheckButtonClick} />
          ) : (
            <DoubleButtonWrapper>
              <Button
                property="delete"
                label="거절하기"
                onClick={() => handleRejectButtonClick()}
              />
              <Button
                property="default"
                label="수락하기"
                onClick={() => handleAcceptButtonClick()}
              />
            </DoubleButtonWrapper>
          )}
        </ButtonWrapper>
      </Content>
    </StyledReactModal>
  );
}

export default ReceiptModal;

const StyledReactModal = styled(ReactModal)`
  @keyframes slide {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50%);
    }
  }
  animation: slide ${({ theme }) => theme.animation.modalOpen};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Top = styled.div`
  margin: -2px 0; // overlaps 2px
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 100px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: ${({ theme }) => theme.radius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.radius.medium};

  .header {
    ${({ theme }) => theme.typo.text.S_14_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-bottom: 12px;
  }
  .body {
    ${({ theme }) => theme.typo.popup.T_24_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
  }
`;

const Bottom = styled.div`
  margin-bottom: -2px; // overlaps 2px
  background: ${({ theme }) => theme.palette.greyScale.white};
  width: 100%;
  height: 360px;

  border-top-left-radius: ${({ theme }) => theme.radius.medium};
  border-top-right-radius: ${({ theme }) => theme.radius.medium};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  position: relative;
`;

const SignatureWrapper = styled.div`
  z-index: 710;
  position: absolute;
  right: 16px;
  bottom: 0;

  width: ${calcRatio(146, 324)};
  // TODO: 도영이는 뒤에 글씨 가리는게 별로라고 생각해서 기디 회의 후에 서명 크기 재조정 필요할것 같습니다.
  height: 173px;
  background: rgba(233, 187, 234, 0.7);
  & > img {
    max-width: 100%;
    margin-top: auto;
    margin-bottom: 16px;
    height: 120px;
  }
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonOverlay = styled.button`
  background: pink;
  width: 100%;
  height: 64px;
  cursor: default;
`;

const ButtonWrapper = styled.div`
  margin-top: 490px; // arbitrary
  position: absolute;
  z-index: 701;
  /* width: 100%; */
  display: flex;
  justify-content: center;
`;

const DoubleButtonWrapper = styled.div`
  width: 100%;
  height: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
`;

// http://jsfiddle.net/dineshranawat/Ls95n95L/
// http://www.liangshunet.com/en/202004/998851523.htm
