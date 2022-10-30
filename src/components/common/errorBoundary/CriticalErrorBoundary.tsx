import { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { theme } from '@lib/styles/theme';
import { ReactComponent as Banki } from '@assets/illusts/banki/banki_sad.svg';

interface RetryErrorBoundaryProps {
  children: ReactNode;
}

/**
 * 본 컴포넌트는 하위 ErrorBoundary에서 적절히 처리가 불가능한 오류 발생 시 사용자에게 오류를 고지합니다.
 * 선언현 컴포넌트의 점진적 도입으로 인해 App.tsx에서 본 컴포넌트를 적용하는것이 아닌,
 * KidHome.tsx, ParentHome.tsx에서 본 컴포넌트를 적용합니다.
 */
function CriticalErrorBoundary({ children }: RetryErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <FallbackBlock>
          <div className="illust">
            <Banki />
          </div>

          <div className="text-wrapper">
            <h1> 데이터를 불러오는데 실패했어요 </h1>
            <p>{`오류가 지속되면 '마이페이지 > 문의하기'에서\n문의해주세요`}</p>
          </div>

          <RetryButton onClick={() => resetErrorBoundary()}>
            <div className="retry-icon">
              <FontAwesomeIcon
                icon={faArrowsRotate}
                size="3x"
                color={theme.palette.greyScale.grey600}
              />
            </div>
          </RetryButton>
        </FallbackBlock>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export default CriticalErrorBoundary;

const FallbackBlock = styled.div`
  margin-top: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.typo.fixed.EmptyText_S_16_M};
  color: ${({ theme }) => theme.palette.greyScale.grey600};
  white-space: pre-line;
  line-height: 150%;
  text-align: center;

  .illust {
    width: 150px;
  }

  .text-wrapper {
    margin: 20px 0;
  }
`;

const RetryButton = styled.button`
  .retry-icon {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  margin-bottom: 12px;
`;
