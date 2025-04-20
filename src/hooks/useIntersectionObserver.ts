import { useEffect, useRef } from 'react';

export default function useIntersectionObserver(observeCondition: boolean, callbackFn: () => void) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && observeCondition) {
          callbackFn();
        }
      },
      { threshold: 0.1 },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [observeCondition, callbackFn]);

  return { bottomRef };
}
