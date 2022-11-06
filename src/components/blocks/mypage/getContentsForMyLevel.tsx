import { ReactComponent as Next_2 } from '@assets/illusts/mypage/next_2.svg';
import { ReactComponent as Next_3 } from '@assets/illusts/mypage/next_3.svg';
import { ReactComponent as Next_4 } from '@assets/illusts/mypage/next_4.svg';
import { ReactComponent as Next_5 } from '@assets/illusts/mypage/next_5.svg';
import { ReactComponent as Prev_1 } from '@assets/illusts/mypage/previous_1.svg';
import { ReactComponent as Prev_2 } from '@assets/illusts/mypage/previous_2.svg';
import { ReactComponent as Prev_3 } from '@assets/illusts/mypage/previous_3.svg';
import { ReactComponent as Prev_4 } from '@assets/illusts/mypage/previous_4.svg';
import { ReactComponent as Prev_5 } from '@assets/illusts/mypage/previous_5.svg';

function getContentsForMyLevel(achievedChallenge: number) {
  switch (true) {
    case achievedChallenge < 1:
      return {
        previousIllust: <Prev_1 />,
        nextIllust: <Next_2 />,
        goal: 1,
        require: 1,
      };
    case achievedChallenge < 5:
      return {
        previousIllust: <Prev_2 />,
        nextIllust: <Next_3 />,
        goal: 5,
        require: 4,
      };
    case achievedChallenge < 10:
      return {
        previousIllust: <Prev_3 />,
        nextIllust: <Next_4 />,
        goal: 10,
        require: 5,
      };
    case achievedChallenge < 20:
      return {
        previousIllust: <Prev_4 />,
        nextIllust: <Next_5 />,
        goal: 20,
        require: 10,
      };
    default:
      return {
        previousIllust: <Prev_5 />,
        nextIllust: <Next_5 />,
        goal: 999,
        require: 999,
      };
  }
}

export default getContentsForMyLevel;
