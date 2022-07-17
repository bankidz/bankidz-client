import { TSetStep4Form } from '@components/kid/create/content/Step4';
import styled, { css } from 'styled-components';
import { ReactComponent as WalkingBanki } from '@assets/illust/banki/banki_walking.svg';
import commaThreeDigits from '@lib/utils/commaThreeDigits';
import { useEffect, useState } from 'react';

interface RangeInputProps extends TSetStep4Form {
  totalPrice: number;
  min: number;
  max: number;
}

type TRangeInputSelectorProps = {
  value: number;
  min: number;
  max: number;
};

const valueToPercent = ({ value, min, max }: TRangeInputSelectorProps) => {
  const percent = ((value - min) * 100) / (max - min);
  return percent;
};

function RangeInput({ totalPrice, min, max, form, setForm }: RangeInputProps) {
  const [value, setValue] = useState<number>(
    form?.weekPrice ? form.weekPrice : 0,
  );

  useEffect(() => {
    form && setForm && setForm({ ...form, weekPrice: value });
  }, [value]);

  return (
    <Wrapper>
      <RangeInputForm>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          step={500}
        />
        <Selector value={value} min={min} max={max}>
          <WalkingBanki />
        </Selector>
        <ProgressBar value={value} min={min} max={max} />
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
  & > input {
    width: 100%;
    -webkit-appearance: none;
    background-color: ${({ theme }) => theme.palette.greyScale.grey200};
    outline: none;
    margin: 0px;
    height: 16px;
    border-radius: 8px;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 44px;
      height: 40px;
      z-index: 4;
      position: relative;
      transform: translateY(-2px);
    }
  }
`;
const Selector = styled.div<TRangeInputSelectorProps>`
  height: 40px;
  width: 44px;
  position: absolute;
  bottom: -8px;
  z-index: 3;
  ${({ value, min, max }) => {
    const percent = valueToPercent({ value, min, max });
    return css`
      left: calc(${percent}% - (0.44 * ${percent}px));
    `;
  }}
`;
const ProgressBar = styled.div<TRangeInputSelectorProps>`
  position: absolute;
  height: 16px;
  border-radius: 8px;
  bottom: 2px;
  background-color: ${({ theme }) => theme.palette.main.yellow300};
  left: 0px;
  z-index: 2;
  ${({ value, min, max }) => {
    const percent = valueToPercent({ value, min, max });
    return css`
      width: calc(${percent}% - (0.44 * ${percent}px) + 22px);
    `;
  }}
`;
