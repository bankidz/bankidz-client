import { useEffect } from 'react';
import kidStep1 from '@assets/images/guides/kid-step1.png';
import kidStep2 from '@assets/images/guides/kid-step2.png';
import kidStep3 from '@assets/images/guides/kid-step3.png';
import kidStep4 from '@assets/images/guides/kid-step4.png';
import parentStep1 from '@assets/images/guides/parent-step1.png';
import parentStep2 from '@assets/images/guides/parent-step2.png';
import parentStep3 from '@assets/images/guides/parent-step3.png';
import parentStep4 from '@assets/images/guides/parent-step4.png';

const useGuideImage = (isKid: boolean) => {
  const images: HTMLImageElement[] = [];

  const preload = (src: string[]) => {
    for (let i = 0; i < src.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments.src[i];
    }
  };

  useEffect(() => {
    if (isKid) {
      preload([
        '@assets/images/guides/kid-step1.png',
        '@assets/images/guides/kid-step2.png',
        '@assets/images/guides/kid-step3.png',
        '@assets/images/guides/kid-step4.png',
      ]);
    } else {
      preload([
        '@assets/images/guides/parent-step1.png',
        '@assets/images/guides/parent-step2.png',
        '@assets/images/guides/parent-step3.png',
        '@assets/images/guides/parent-step4.png',
      ]);
    }
  }, []);

  const renderImage = (isKid: boolean, step: 1 | 2 | 3 | 4) => {
    if (isKid) {
      switch (step) {
        case 1:
          return <img src={kidStep1} className={`${isKid}-${step}`} />;
        case 2:
          return <img src={kidStep2} className={`${isKid}-${step}`} />;
        case 3:
          return <img src={kidStep3} className={`${isKid}-${step}`} />;
        case 4:
          return <img src={kidStep4} className={`${isKid}-${step}`} />;
      }
    } else {
      switch (step) {
        case 1:
          return <img src={parentStep1} className={`${isKid}-${step}`} />;
        case 2:
          return <img src={parentStep2} className={`${isKid}-${step}`} />;
        case 3:
          return <img src={parentStep3} className={`${isKid}-${step}`} />;
        case 4:
          return <img src={parentStep4} className={`${isKid}-${step}`} />;
      }
    }
  };

  return { renderImage };
};

export default useGuideImage;
