import Modals, { modals } from '@components/common/modal/Modals';
import useModals from '@hooks/useModals';
import { EMoneyRoadStatus } from '@lib/types/common';
import { useAppSelector } from '@store/app/hooks';
import { selectPendingMoneyRoads } from '@store/slices/pendingMoneyRoadsSlice';
import { useNavigate, useParams } from 'react-router-dom';

function KidPendingMoneyRoad() {
  const { challengeId } = useParams();
  const walkingMoneyRoads = useAppSelector(selectPendingMoneyRoads);
  const targetWalkingMoneyRoad = walkingMoneyRoads?.find(
    (walkingMoneyRoad) => walkingMoneyRoad.id === parseInt(challengeId!),
  );

  const { openModal } = useModals();
  const navigate = useNavigate();
  const {
    createdAt,
    interestRate,
    isMom,
    itemName,
    title,
    totalPrice,
    weekPrice,
    weeks,
    comment,
  } = targetWalkingMoneyRoad!;

  function openSenaryModal() {
    openModal(modals.senaryModal, {
      onSubmit: () => {
        navigate(-1);
      },
      createdAt: createdAt,
      interestRate: interestRate,
      isMom: isMom,
      itemName: itemName,
      title: title,
      totalPrice: totalPrice,
      weekPrice: weekPrice,
      weeks: weeks,
      comment: comment,
    });
  }

  function openQuinaryModal() {
    openModal(modals.quinaryModal, {
      onSubmit: () => {
        navigate(-1);
      },
      createdAt: createdAt,
      interestRate: interestRate,
      isMom: isMom,
      itemName: itemName,
      title: title,
      totalPrice: totalPrice,
      weekPrice: weekPrice,
      weeks: weeks,
      comment: comment,
    });
  }

  function handleClick() {
    console.log('click!');
    console.log(targetWalkingMoneyRoad?.status);
    if (targetWalkingMoneyRoad?.status === EMoneyRoadStatus.PENDING) {
      openQuinaryModal();
    } else if (targetWalkingMoneyRoad?.status === EMoneyRoadStatus.REJECTED) {
      openSenaryModal();
    }
  }

  return (
    <>
      <button onClick={handleClick}>Open Modal</button>
      <Modals />
    </>
  );
}

export default KidPendingMoneyRoad;
