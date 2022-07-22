import { TSetStep4Form } from '@components/kid/create/content/Step4';
import styled, { css } from 'styled-components';
import { ReactComponent as WalkingBanki } from '@assets/illust/banki/banki_walking.svg';
import commaThreeDigits from '@lib/utils/getCommaThreeDigits';
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface RangeInputProps extends TSetStep4Form {
  totalPrice: number;
  min: number;
  max: number;
  step: 500 | 1000;
}

function RangeInput({
  totalPrice,
  min,
  max,
  form,
  setForm,
  step,
}: RangeInputProps) {
  const [value, setValue] = useState<number>(
    form?.weekPrice ? form.weekPrice : 0,
  );

  useEffect(() => {
    form && setForm && setForm({ ...form, weekPrice: value });
  }, [value]);

  const percent = ((value - min) * 100) / (max - min);

  return (
    <Wrapper>
      <RangeInputForm>
        <StyledSlider
          min={min}
          max={max}
          value={value}
          onChange={(v) => setValue(v as number)}
          step={step}
          railStyle={RcSliderRailStyle}
          trackStyle={RcSliderTrackStyle}
          handleStyle={RcSliderHandleStyle}
        />
        <Selector percent={percent}>
          <WalkingBanki />
        </Selector>
        <ProgressBar percent={percent} />
        <Track />
      </RangeInputForm>

      <div>
        <p>{commaThreeDigits(min)}</p>
        <p>{commaThreeDigits(max)}</p>
      </div>
    </Wrapper>
  );
}

export default RangeInput;

const Wrapper = styled.div`
  margin: 25px 16px 16px;
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    & > p {
      ${({ theme }) => theme.typo.text.T_12_EB}
      color: ${({ theme }) => theme.palette.greyScale.grey500}
    }
  }
`;

const RangeInputForm = styled.div`
  position: relative;
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
  top: '-11px',
  border: 'none',
  width: '44px',
  height: '40px',
  zIndex: '4',
  boxShadow: 'none',
  opacity: 0,
  borderRadius: '0px',
};

const Selector = styled.div<{ percent: number }>`
  position: absolute;
  top: -16px;
  height: 40px;
  width: 44px;
  z-index: 3;
  ${({ percent }) => {
    return percent > 0
      ? css`
          left: calc(${percent}% - (0.44 * ${percent}px));
        `
      : css`
          left: 0px;
        `;
  }};
`;
const ProgressBar = styled.div<{ percent: number }>`
  position: absolute;
  top: 0px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.main.yellow300};
  left: 0px;
  z-index: 2;
  ${({ percent }) => {
    return percent > 0
      ? css`
          width: calc(${percent}% - (0.44 * ${percent}px) + 22px);
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