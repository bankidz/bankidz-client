import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import InterestBadge from '@components/shared/badges/InterestBadge';
import { modals } from '@components/shared/modals/Modals';
import WalkingItemNameButton from '@components/blocks/walk/WalkingItemNameButton';
import { calcRatio } from '@lib/styles/theme';
import { useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import { selectIsWalkingDongilsPatched } from '@store/slices/walkingDongilsSlice';
import { ReactComponent as Polygon } from '@assets/icons/walking-selector-polygon.svg';
import { ReactComponent as D1 } from '@assets/illusts/walk/d-1.svg';
import { ReactComponent as D2 } from '@assets/illusts/walk/d-2.svg';
import { ReactComponent as DDay } from '@assets/illusts/walk/d-day.svg';
import SwipeToWalk from '@components/blocks/walk/SwipeToWalk';
import useWalkDongil from '@components/blocks/walk/useWalkDongil';
import useModals from '@lib/hooks/useModals';
import LargeSpacer from '@components/shared/layout/LargeSpacer';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import renderItemIllustForWalkDefault from '@lib/utils/render/renderItemIllustForWalkDefault';
import { IUserDTO } from '@lib/apis/user/userDTO';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

type TWalkDefaultProps = {
  walkingDongils: IChallengeDTO[];
  userData: IUserDTO;
};

function WalkDefault({ walkingDongils, userData }: TWalkDefaultProps) {
  const level = useAppSelector(selectLevel);
  const patched = useAppSelector(selectIsWalkingDongilsPatched);
  const colorByLevel = getColorByLevel(level!);
  const { getWeeklySuccess } = useWalkDongil(walkingDongils);
  const dDayLeft = 7 - dayjs().day();
  const [selected, setSelected] = useState<IChallengeDTO>(walkingDongils[0]);
  const { openModal } = useModals();
  const { getValue, setValue, getIsAchieved, setIsAchieved } =
    useWalkDongil(walkingDongils);

  const onWalkingItemNameButtonClick = (v: IChallengeDTO) => {
    setSelected(v);
  };

  // 이번주 저금 완료했을 때 모달 띄우기
  useEffect(() => {
    if (getWeeklySuccess() && patched) {
      openModal(modals.primaryModal, {
        isKid: userData.isKid,
        isFemale: userData.isFemale,
        headerText: `${userData.username} 뱅키 이번주 저금 성공`,
        bodyText: '뱅키즈와 함께 돈길만 걸어요',
        shouldCloseOnOverlayClick: true,
      });
    }
  }, [walkingDongils, patched]);

  return (
    <Wrapper>
      <Header colorByLevel={colorByLevel}>
        <Title dDayLeft={dDayLeft}>
          <p>돈길 걷기</p>

          <div>
            <p>이번주 리셋까지</p>
            {dDayLeft > 2 && dDayLeft < 7 && <p>D-{dDayLeft}</p>}
            {dDayLeft === 2 && <D2 />}
            {dDayLeft === 1 && <D1 />}
            {dDayLeft === 7 && <DDay />}
          </div>
        </Title>
        <DongilList>
          {walkingDongils.map((v) => (
            <div onClick={() => onWalkingItemNameButtonClick(v)} key={v.id}>
              <WalkingItemNameButton
                itemName={v.itemName}
                isSelected={selected?.id === v.id}
                isNoticed={!getIsAchieved(v.id)}
              />
              {selected?.id === v.id && <Polygon />}
            </div>
          ))}
        </DongilList>
      </Header>
      <ContentWrapper>
        <Content>
          <IllustWrapper>
            {renderItemIllustForWalkDefault(selected.itemName)}
          </IllustWrapper>
          <InterestBadge interestRate={selected.interestRate} />
          <p>{selected.title}</p>
          <SwipeToWalk
            interestRate={selected.interestRate}
            weekPrice={selected.weekPrice}
            value={getValue(selected.id)}
            setValue={setValue}
            id={selected.id}
            isAchieved={getIsAchieved(selected.id)}
            setIsAchieved={setIsAchieved}
          />
          <LargeSpacer isWhite={true} />
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
}

export default WalkDefault;

const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  height: calc(var(--vh, 1vh) * 100);
`;
const Header = styled.div<{ colorByLevel: string }>`
  z-index: -1;
  width: 100%;
  height: 185px;
  background-color: ${({ colorByLevel }) => colorByLevel};
  &:after {
    width: ${calcRatio(530, 360)};
    margin: 0 auto;
    height: 153px;
    background-color: ${({ theme }) => theme.palette.greyScale.white};
    border-radius: 50%;
    position: absolute;
    top: 165px;
    left: calc(-${calcRatio(530, 360)} / 2 + 50%);
    content: '';
  }
`;

const Title = styled.div<{ dDayLeft: number }>`
  padding-top: 16px;
  margin: 0px 16px;

  display: flex;
  justify-content: space-between;
  & > p {
    ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.white};
  }
  & > div {
    text-align: right;

    & > p:first-child {
      ${({ theme }) => theme.typo.text.S_12_M}
      color: ${({ theme }) => theme.palette.greyScale.white};
      padding-top: 2px;
    }
    & > p:last-child {
      ${({ theme }) => theme.typo.text.T_21_EB}
      margin-top: 8px;
      ${({ theme, dDayLeft }) =>
        dDayLeft > 2 &&
        css`
          color: ${theme.palette.greyScale.white};
        `};
    }
    & > svg {
      margin-top: 8px;
    }
  }
`;

const DongilList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 23px;

  height: 56px;

  & > div {
    position: relative;
    &:not(:last-child) {
      margin-right: 12px;
    }
    & > svg {
      position: absolute;
      bottom: -40.5px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
  }
`;

const IllustWrapper = styled.div`
  //background-color: red;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 517px);
  max-height: 199px;
  padding-top: min(31px, calc((var(--vh, 1vh) * 100 - 517px) * 0.15));
  padding-bottom: min(32px, calc((var(--vh, 1vh) * 100 - 517px) * 0.15));
  & > svg {
    margin: 0 auto;
  }
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 185px);
`;
const Content = styled.div`
  width: 100%;
  overflow-y: scroll;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  & > svg {
    z-index: 2;
    width: 100%;
    height: 100%;
  }
  & > p {
    ${({ theme }) => theme.typo.text.T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-top: 16px;
    margin-bottom: 27px;
  }
`;
