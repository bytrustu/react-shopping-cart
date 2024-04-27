import { useEffect, useRef } from 'react';
import { LOCAL_STORAGE_SCROLL_KEY } from '@/constants';

export const useScrollPosition = (pageName: string) => {
  const lastCall = useRef(Date.now());

  useEffect(() => {
    const scrollPositionMap = new Map<string, number>(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCROLL_KEY) || '[]'),
    );

    window.scrollTo(0, scrollPositionMap.get(pageName) || 0);

    const handleScroll = () => {
      if (Date.now() - lastCall.current < 200) {
        return;
      }
      lastCall.current = Date.now();
      scrollPositionMap.set(pageName, window.scrollY);
      localStorage.setItem(LOCAL_STORAGE_SCROLL_KEY, JSON.stringify(Array.from(scrollPositionMap)));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageName]);
};
