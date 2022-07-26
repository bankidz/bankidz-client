import { useAppSelector } from '@store/app/hooks';
import { selectWalkingMoneyRoads } from '@store/slices/walkingMoneyRoadsSlice';
import { useParams } from 'react-router-dom';

function KidPendingMoneyRoad() {
  const { challengeId } = useParams(); // 배열에서 특정 챌린지를 가져온다!
  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  // const filteredWalkingMoneyRoad = walkingMoneyRoads?.find(
  //   (walkingMoneyRoad) => walkingMoneyRoad.id! === parseInt(id),
  // );
  return <>모달</>;
}

export default KidPendingMoneyRoad;
