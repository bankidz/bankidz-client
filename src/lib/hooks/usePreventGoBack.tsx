import { useEffect } from 'react';

function setState() {
  history.pushState(null, '', location.href);
}

function usePreventGoBack() {
  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', setState);
    return () => {
      window.removeEventListener('popstate', setState);
    };
  }, []);
}

export default usePreventGoBack;
