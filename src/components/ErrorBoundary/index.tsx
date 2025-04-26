import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/Button';

export const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-[12px]">
          <div className="text-16 font-semibold text-black">
            에러가 발생했습니다. 다시 시도해주세요
          </div>
          <Button onClick={() => resetErrorBoundary()}>다시 시도</Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
