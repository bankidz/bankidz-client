import { useState, useEffect } from 'react';

function HomeKid() {
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {height}
      <input type="date" />
    </>
  );
}

export default HomeKid;
