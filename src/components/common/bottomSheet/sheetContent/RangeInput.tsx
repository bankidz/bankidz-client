import { TSetStep4Form } from '@components/kid/create/content/Step4';
import styled, { css } from 'styled-components';
import { ReactComponent as WalkingBanki } from '@assets/illust/banki/banki_walking.svg';
import commaThreeDigits from '@lib/utils/getCommaThreeDigits';
import { useEffect, useState } from 'react';

interface RangeInputProps extends TSetStep4Form {
  totalPrice: number;
  min: number;
  max: number;
}

function RangeInput({ totalPrice, min, max, form, setForm }: RangeInputProps) {
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
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          step={500}
        />
        <Selector percent={percent}>
          <WalkingBanki />
        </Selector>
        <ProgressBar percent={percent} />
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
const Selector = styled.div<{ percent: number }>`
  height: 40px;
  width: 44px;
  position: absolute;
  bottom: -8px;
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
  height: 16px;
  border-radius: 8px;
  bottom: 2px;
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
