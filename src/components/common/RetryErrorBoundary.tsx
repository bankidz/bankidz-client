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

function RetryErrorBoundary({ background, children }: RetryErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
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
                  color={theme.palette.greyScale.black}
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
  background: palegreen;
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
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  margin-bottom: 12px;
`;

// https://react-query.tanstack.com/reference/useQueryErrorResetBoundary
