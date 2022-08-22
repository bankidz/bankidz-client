import { useEffect } from 'react';

function preventGoBack() {
  const setState = () => {
    history.pushState(null, '', location.href);
  };
  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', setState);
    return () => {
      window.removeEventListener('popstate', setState);
    };
  }, []);
}

export default preventGoBack;
