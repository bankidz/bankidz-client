import styled, { css } from 'styled-components';
import Slider from 'rc-slider';
import { useMutation, useQueryClient } from 'react-query';
import { ReactComponent as BankiInterest10 } from '@assets/illusts/banki/banki_walk_10.svg';
import { ReactComponent as BankiInterest20 } from '@assets/illusts/banki/banki_walk_20.svg';
import { ReactComponent as BankiInterest30 } from '@assets/illusts/banki/banki_walk_30.svg';
import { ReactComponent as Flag } from '@assets/illusts/walk/flag.svg';
import { ReactComponent as Stamp } from '@assets/illusts/walk/achieved-stamp.svg';
import 'rc-slider/assets/index.css';
import { TInterestRate } from '@lib/types/IInterestRate';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useAppDispatch } from '@store/app/hooks';
import { setDongilPatched } from '@store/slices/walkingDongilsSlice';

interface SwipeToWalkProps {
  interestRate: TInterestRate;
  weekPrice: number;
  value: number;
  setValue: (id: number, newValue: number) => void;
  id: number;
  isAchieved: boolean;
  setIsAchieved: (id: number, newValue: boolean) => void;
}

function SwipeToWalk({
  interestRate,
  weekPrice,
  value,
  setValue,
  id,
  isAchieved,
  setIsAchieved,
}: SwipeToWalkProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const BankiByInterest = {
    10: <BankiInterest10 />,
    20: <BankiInterest20 />,
    30: <BankiInterest30 />,
  };

  const onWalkCompleted = () => {
    setIsAchieved(id, true);
    dispatch(setDongilPatched());
    queryClient.invalidateQueries([queryKeys.CHALLENGE, 'walking']);
  };

  const { mutate: mutateWalkDongil } = useMutation(
    challengeAPI.patchChallengeProgress,
    { onSuccess: onWalkCompleted },
  );

  const onAfterChange = async (v: number) => {
    if (v < 90) {
      setValue(id, 0);
    } else {
      setValue(id, 100);
      mutateWalkDongil(id);
    }
  };

  return (
    <Wrapper>
      <RangeInputForm>
        <StyledSlider
          min={0}
          max={100}
          value={value}
          onChange={(v) => setValue(id, v as number)}
          railStyle={RcSliderRailStyle}
          trackStyle={RcSliderTrackStyle}
          handleStyle={RcSliderHandleStyle}
          onAfterChange={(v) => onAfterChange(v as number)}
          disabled={value === 100 ? true : false}
        />
        <Selector value={value}>{BankiByInterest[interestRate]}</Selector>
        <ProgressBar value={value} />
        <Track />
        <p>
          {value < 20 && (
            <>
              <span>{weekPrice.toLocaleString('ko-KR')}</span>원 모았으면 걷기
            </>
          )}
        </p>
        {value < 90 && <Flag className="flag" />}
        {isAchieved && <Stamp className="stamp" />}
      </RangeInputForm>
    </Wrapper>
  );
}

export default SwipeToWalk;

const Wrapper = styled.div`
  width: 100%;
  padding: 65px 18px 65px 18px;
  box-sizing: border-box;
`;

const RangeInputForm = styled.div`
  position: relative;
  /* 얼마 모았으면 걷기 */
  & > p {
    position: absolute;
    right: 0px;
    text-align: right;
    ${({ theme }) => theme.typo.text.T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-top: 12px;
    & > span {
      color: ${({ theme }) => theme.palette.greyScale.grey700};
    }
  }
  /* 깃발 */
  .flag {
    position: absolute;
    top: -22px;
    right: 0px;
  }
  /*완주 성공 */
  .stamp {
    position: absolute;
    left: -1px;
    top: -65px;
    z-index: 2;
  }
`;

const StyledSlider = styled(Slider)`
  width: calc(100% - 44px);
  margin: 0 auto;
  padding: 0px;
  height: 16px;
`;

const RcSliderRailStyle = {
  display: 'none',
  height: '16px',
  borderRadius: '8px',
};
const RcSliderTrackStyle = {
  display: 'none',
  height: '16px',
  borderRadius: '8px',
};
const RcSliderHandleStyle = {
  top: '-28px',
  border: 'none',
  width: '72px',
  height: '72px',
  zIndex: '4',
  boxShadow: 'none',
  opacity: 0,
  borderRadius: '0px',
};

const Selector = styled.div<{ value: number }>`
  position: absolute;
  top: -28px;
  height: 72px;
  width: 72px;
  z-index: 3;
  ${({ value }) => {
    return value > 0
      ? css`
          left: calc(${value}% - (0.54 * ${value}px) - 10px);
        `
      : css`
          left: -10px;
        `;
  }};
`;
const ProgressBar = styled.div<{ value: number }>`
  position: absolute;
  top: 0px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.main.yellow300};
  left: 0px;
  z-index: 2;
  ${({ value }) => {
    return value > 0
      ? css`
          width: calc(${value}% - (0.44 * ${value}px) + 22px);
        `
      : css`
          width: 0px;
        `;
  }};
`;
const Track = styled.div`
  position: absolute;
  top: 0px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.greyScale.grey200};
  width: 100%;
`;
