import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import InstructionCard from './InstructionCard';
import { ReactComponent as ModalContentMoney } from '@assets/illusts/congrats/coins.svg';
import { ReactComponent as ModalContentSaving } from '@assets/illusts/congrats/congrats_banki_with_coins.svg';

interface StyledSwiperProps {
  currentCardIdx: number;
  setCurrentCardIdx: Dispatch<SetStateAction<number>>;
}

function StyledSwiperSection({
  currentCardIdx,
  setCurrentCardIdx,
}: StyledSwiperProps) {
  const [swiper, setSwiper] = useState(null);
  const swiperParams = {
    onSwiper: setSwiper,
    onSlideChange: (e: any) => setCurrentCardIdx(e.activeIndex),
    slidesPerView: 1,
  };

  return (
    // @ts-expect-error
    <StyledSwiper {...swiperParams} ref={setSwiper}>
      <SwiperSlide>
        <InstructionCard
          headerText="이자란?"
          bodyText={`우리가 맡긴 돈에\n추가로 은행이 주는 돈`}
          currentCardIdx={currentCardIdx}
        >
          <ModalContentMoney />
        </InstructionCard>
      </SwiperSlide>
      <SwiperSlide>
        <InstructionCard
          headerText="이자율이란?"
          bodyText={`돈을 맡기면 얼만큼 이자를\n받을 수 있는지 나타내는 말\n\n예를 들어 내가 100만원을 저금하고\n이자율이 20%라면,\n100 X 20% (0.02) = 20만원\n이자를 받을 수 있어요`}
          currentCardIdx={currentCardIdx}
        >
          <ModalContentMoney />
        </InstructionCard>
      </SwiperSlide>
      <SwiperSlide>
        <InstructionCard
          headerText="이자부스터란?"
          bodyText={`실제 은행의 이자율과 같은 말로\n뱅키즈 내에서 사용돼요!`}
          currentCardIdx={currentCardIdx}
        >
          <ModalContentSaving />
        </InstructionCard>
      </SwiperSlide>
    </StyledSwiper>
  );
}

export default StyledSwiperSection;

const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 90%;
  width: 100%;
  height: 504px;
`;
