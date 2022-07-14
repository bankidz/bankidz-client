import styled from 'styled-components';
import ReactModal from 'react-modal';
import { calcRatio } from '@lib/styles/theme';
import CheckButton from '../../Button/CheckButton';
import PerforatedLineBottom from './PerforatedLineBottom';
import PerforatedLineTop from './PerforatedLineTop';
import moment from 'moment';
import { ReactComponent as HorizontalDashedBorder } from '@assets/border/horizontal-dashed-border.svg';
import { ReactComponent as VerticalDashedBorder } from '@assets/border/vertical-dashed-border.svg';
import { ReactComponent as BankiDad } from '@assets/illust/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illust/banki/banki_mom.svg';
import { TCategory } from '@lib/types/kid';
import { ReactComponent as A1 } from '@assets/illust/contractItemNames/contractReceipt/a1.svg';
import { ReactComponent as A2 } from '@assets/illust/contractItemNames/contractReceipt/a2.svg';
import { ReactComponent as A3 } from '@assets/illust/contractItemNames/contractReceipt/a3.svg';
import { ReactComponent as B1 } from '@assets/illust/contractItemNames/contractReceipt/b1.svg';
import { ReactComponent as B2 } from '@assets/illust/contractItemNames/contractReceipt/b2.svg';
import { ReactComponent as B3 } from '@assets/illust/contractItemNames/contractReceipt/b3.svg';
import { ReactComponent as C1 } from '@assets/illust/contractItemNames/contractReceipt/c1.svg';
import { ReactComponent as C2 } from '@assets/illust/contractItemNames/contractReceipt/c2.svg';
import { ReactComponent as C3 } from '@assets/illust/contractItemNames/contractReceipt/c3.svg';

interface PrimaryModalProps {
  /** submit 시 처리될 지스니스 로직을 처리하는 함수 입니다. */
  onSubmit?: any;
}

// 모달 내부에 표시될 UI 작성
function PrimaryModal({ onSubmit }: PrimaryModalProps) {
  function handleSubmit() {
    onSubmit();
  }
  const reactModalParams = {
    isOpen: true,
    style: {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(36, 39, 41, 0.7)',
      },
      content: {
        height: '554px',
        position: 'absolute',
        top: `${calcRatio(103, 760)}`,
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

  const isMom = 'false';
  const title = '완구퍼펙트걸 되기';
  const interestRate = '10';
  const totalPrice = '30000';
  const weekPrice = '1500';
  const weeks = '10';
  const createdAt = '2022-07-12 03:08:07';
  const category = '학용품';

  function renderContractItem(category: TCategory) {
    if (category === '학용품') {
      return <A1 />;
    } else if (category === '생활용품') {
      return <A2 />;
    } else if (category === '전자제품') {
      return <A3 />;
    } else if (category === '식품') {
      return <B1 />;
    } else if (category === '문화생활') {
      return <B2 />;
    } else if (category === '패션뷰티') {
      return <B3 />;
    } else if (category === '선물') {
      return <C1 />;
    } else if (category === '비상금') {
      return <C2 />;
    } else if (category === '기타') {
      return <C3 />;
    }
  }

  function getContractEndDate(createdAt: string, weeks: string) {
    const createdDate = new Date(createdAt);
    const endDate = new Date(createdDate);
    endDate.setDate(createdDate.getDate() + 7 * parseInt(weeks) - 1);
    return moment(endDate).format('YY.MM.DD');
  }

  return (
    // @ts-expect-error
    <ReactModal {...reactModalParams}>
      <Content>
        <PerforatedLineTop />
        <Top>
          <span className="sub">계약서 전송 성공!</span>
          <span className="main">{title}</span>
          <div className="dashed-space"></div>
          <div className="dashed-space-linear"></div>
        </Top>
        <div className="vertical-dashed-border-wrapper">
          <VerticalDashedBorder />
        </div>
        <div className="first-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder />
        </div>
        <div className="second-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder />
        </div>
        <div className="third-horizontal-dashed-border-wrapper">
          <HorizontalDashedBorder />
        </div>
        <Bottom>
          <div className="first-row">
            <div className="계약대상">
              <div className="banki-illust">
                {/* @ts-expect-error */}
                {isMom === 'true' ? <BankiMom /> : <BankiDad />}
              </div>
              <div className="text-wrapper">
                <div className="title">계약대상</div>
                <div className="content">
                  {/* @ts-expect-error */}
                  {isMom === 'true' ? '엄마' : '아빠'}
                </div>
              </div>
            </div>
            <div className="목표아이템">
              <div className="category-illust">
                {renderContractItem(category)}
              </div>
              <div className="text-wrapper">
                <div className="title">목표 아이템</div>
                <div className="content">{category}</div>
              </div>
            </div>
          </div>
          <div className="second-row">
            <div className="목표저금액">
              <div className="title">목표 저금액</div>
              <div className="content">{totalPrice}</div>
            </div>
            <div className="매주저금액">
              <div className="title">매주 저금액</div>
              <div className="content">{weekPrice}</div>
            </div>
            <div className="이자부스터">
              <div className="title">이자부스터</div>
              <div className="content">{interestRate}%</div>
            </div>
          </div>
          <div className="third-row">
            <div className="총소요기간">
              <div className="title">총 소요기간</div>
              <div className="content">{weeks}주</div>
            </div>
            <div className="계약종료일">
              <div className="text-wrapper">
                <div className="title">계약종료일</div>
                <div className="content">
                  {getContractEndDate(createdAt, weeks)}
                </div>
              </div>
            </div>
          </div>
          <SignatureWrapper>대충 서명</SignatureWrapper>
        </Bottom>
        <PerforatedLineBottom />
        <CheckButtonPositioner>
          <CheckButton onClick={handleSubmit} />
        </CheckButtonPositioner>
      </Content>
    </ReactModal>
  );
}

export default PrimaryModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  // background border (vertical, horizontal)
  position: relative;
  .vertical-dashed-border-wrapper {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 167px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 2px;
    height: 100px;
  }
  .first-horizontal-dashed-border-wrapper {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 115px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3px;
  }
  .second-horizontal-dashed-border-wrapper {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 216px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3px;
  }
  .third-horizontal-dashed-border-wrapper {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 286px;
    transform: translate3d(-50%, -50%, 0);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3px;
  }
`;

const Top = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  height: 100px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: ${({ theme }) => theme.radius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.radius.medium};

  .sub {
    ${({ theme }) => theme.typo.text.S_14_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
  .main {
    margin-top: 12px;
    ${({ theme }) => theme.typo.popup.T_24_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
  }
`;

const Bottom = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.white};
  width: 100%;
  height: 360px;

  border-top-left-radius: ${({ theme }) => theme.radius.medium};
  border-top-right-radius: ${({ theme }) => theme.radius.medium};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;

  .first-row {
    width: 100%;
    height: 102px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .계약대상 {
      display: flex;
      justify-content: space-between;
      width: 50%;
      height: 100%;
      .banki-illust {
        width: 60.98px;
        margin-left: ${calcRatio(21, 162)};
      }
      .text-wrapper {
        width: 47px;
        height: 100%;
        margin-right: ${calcRatio(20, 162)};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          ${({ theme }) => theme.typo.text.S_12_M};
          color: ${({ theme }) => theme.palette.greyScale.grey500};
          margin-bottom: 8px;
        }
        .content {
          ${({ theme }) => theme.typo.button.InnerText_T_15_EB};
          color: ${({ theme }) => theme.palette.greyScale.grey700};
        }
      }
    }

    .목표아이템 {
      display: flex;
      justify-content: space-between;
      width: 50%;
      height: 100%;
      .category-illust {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        margin-left: ${calcRatio(9, 162)};
      }
      .text-wrapper {
        width: 58px;
        height: 100%;
        margin-right: ${calcRatio(16, 162)};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          ${({ theme }) => theme.typo.text.S_12_M};
          color: ${({ theme }) => theme.palette.greyScale.grey500};
          margin-bottom: 8px;
        }
        .content {
          ${({ theme }) => theme.typo.button.InnerText_T_15_EB};
          color: ${({ theme }) => theme.palette.greyScale.grey700};
        }
      }
    }
  }

  .second-row {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      width: 33.3%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: ${calcRatio(24, 324)};
      .title {
        width: 100%;
        height: 12px;
        ${({ theme }) => theme.typo.text.S_12_M};
        color: ${({ theme }) => theme.palette.greyScale.grey500};
        margin-bottom: 8px;
        padding: 0;
      }
      .content {
        width: 100%;
        height: 16px;
        ${({ theme }) => theme.typo.text.T_16_EB};
        color: ${({ theme }) => theme.palette.greyScale.grey700};
        padding: 0;
      }
    }
  }

  .third-row {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .총소요기간 {
      width: 33.3%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: ${calcRatio(24, 324)};
      .title {
        height: 12px;
        ${({ theme }) => theme.typo.text.S_12_M};
        color: ${({ theme }) => theme.palette.greyScale.grey500};
        margin-bottom: 8px;
        padding: 0;
      }
      .content {
        height: 16px;
        ${({ theme }) => theme.typo.text.T_21_EB};
        color: ${({ theme }) => theme.palette.main.yellow400};
        padding: 0;
      }
    }

    .계약종료일 {
      width: 66.6%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: ${calcRatio(24, 324)};
      .text-wrapper {
        .title {
          height: 12px;
          ${({ theme }) => theme.typo.text.S_12_M};
          color: ${({ theme }) => theme.palette.greyScale.grey500};
          margin-bottom: 8px;
        }
        .content {
          height: 16px;
          ${({ theme }) => theme.typo.text.T_21_EB};
          color: ${({ theme }) => theme.palette.main.yellow400};
        }
      }
    }
  }
  position: relative;
`;

const SignatureWrapper = styled.div`
  z-index: 999;
  position: absolute;
  right: 2px;
  bottom: 0;

  width: ${calcRatio(146, 324)};
  height: 173px; // TODO: delete height (temporary)
  background: rgba(36, 39, 41, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckButtonPositioner = styled.div`
  margin-top: 16px;
`;

// http://jsfiddle.net/dineshranawat/Ls95n95L/
// http://www.liangshunet.com/en/202004/998851523.htm
