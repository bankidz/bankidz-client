import { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { theme } from '@lib/styles/theme';

interface RetryErrorBoundaryProps {
  background: ReactNode;
  children: ReactNode;
}

/**
 * 오류 발생 시 각 UI별로 재시도 버튼을 제공하는 컴포넌트 입니다.
 * 치명적인 오류 발생 시 상위 ErrorBoundary로 위임 합니다.
 */
function RetryErrorBoundary({ background, children }: RetryErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  const handleError = (error: any) => {
    if (error?.response?.status === 500) {
      throw error; // 상위 ErrorBoundary로 위임
    }
  };

  return (
    <ErrorBoundary
      onError={handleError}
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <Wrapper>
          {background}
          <FallbackBlock>
            <RetryButton onClick={() => resetErrorBoundary()}>
              <div className="retry-icon">
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  size="2x"
                  color={theme.palette.greyScale.grey600}
                />
              </div>
            </RetryButton>
            <p> 데이터를 불러오는데 실패했어요. </p>
          </FallbackBlock>
        </Wrapper>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export default RetryErrorBoundary;

const Wrapper = styled.div`
  position: relative;
`;

const FallbackBlock = styled.div`
  ${({ theme }) => theme.typo.fixed.EmptyText_S_16_M};
  color: ${({ theme }) => theme.palette.greyScale.black};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const RetryButton = styled.button`
  .retry-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  margin-bottom: 18px;
`;

// https://react-query.tanstack.com/reference/useQueryErrorResetBoundary
