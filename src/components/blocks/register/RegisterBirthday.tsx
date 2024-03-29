import styled, { css } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { darken } from 'polished';
import getRefinedDate from '../../../lib/utils/get/getRefinedDate';
import { useAppDispatch } from '@store/app/hooks';
import { setBirthday } from '@store/slices/authSlice';
import InputForm from '@components/atoms/forms/InputForm';
import Button from '@components/atoms/buttons/Button';

// yyyy/mm/dd || yyyy/m/d
// allowing any combination of one or two digits for the day and month
const MONTH_REGEX = /^(0[1-9]|[1-9]|1[0-2])$/; // 1 ~ 12
const DAY_REGEX = /^(0[1-9]|[1-9]|[1-2][0-9]|3[01])$/; // 1 ~ 31

function RegisterBirthday() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [isValidYear, setIsValidYear] = useState(false);
  const [isValidMonth, setIsValidMonth] = useState(false);
  const [isValidDay, setIsValidDay] = useState(false);
  const [isYearFocused, setIsYearFocused] = useState(false);
  const [isMonthFocused, setIsMonthFocused] = useState(false);
  const [isDayFocused, setIsDayFocused] = useState(false);

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setYear(e.target.value.slice(0, 4));
    },
    [],
  );
  const handleMonthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMonth(e.target.value.slice(0, 2));
    },
    [],
  );
  const handleDayChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDay(e.target.value.slice(0, 2));
    },
    [],
  );

  // 형식에 맞는 input이 입력되면 바로 focus 이동
  const monthInputRef = useRef<HTMLInputElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const parsedIntYear = parseInt(year);
    if (1923 <= parsedIntYear && parsedIntYear <= 2021) {
      setIsValidYear(true);
      monthInputRef.current!.focus();
    } else {
      setIsValidYear(false);
    }
  }, [year, isValidYear]);
  useEffect(() => {
    setIsValidMonth(MONTH_REGEX.test(month));
    if (
      MONTH_REGEX.test(month) &&
      ((month.length === 2 && parseInt(month) === 1) || parseInt(month) >= 2)
    ) {
      dayInputRef.current!.focus();
    }
  }, [month, isValidMonth]);
  useEffect(() => {
    setIsValidDay(DAY_REGEX.test(day));
    if (
      DAY_REGEX.test(day) &&
      ((day.length === 2 && 1 <= parseInt(day) && parseInt(day) <= 9) ||
        parseInt(day) >= 4)
    ) {
      dayInputRef.current!.blur();
    }
  }, [day]);

  const toggleYearErrorMessage = isYearFocused && year && !isValidYear;
  const toggleMonthErrorMessage = isMonthFocused && month && !isValidMonth;
  const toggleDayErrorMessage = isDayFocused && day && !isValidDay;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedIntYear = parseInt(year);
    let temp1 = false;
    if (1923 <= parsedIntYear && parsedIntYear <= 2021) {
      temp1 = true;
    }
    const temp2 = MONTH_REGEX.test(month);
    const temp3 = DAY_REGEX.test(day);
    if (!temp1 || !temp2 || !temp3) {
      console.error('부적절한 접근입니다.');
      return;
    }
    dispatch(setBirthday(getRefinedDate(year, month, day)));
    navigate('/auth/register/2');
  };

  return (
    <Wrapper>
      <span>생년월일을 입력해요</span>
      <InputFormWrapper onSubmit={handleSubmit}>
        <InputForm
          placeholder="2000"
          onChange={handleYearChange}
          value={year}
          // @ts-expect-error
          error={year && !isValidYear}
          autoFocus
          type="number"
          required
          onFocus={() => setIsYearFocused(true)}
          onBlur={() => setIsYearFocused(false)}
          autoComplete="off"
          postfix="년"
          pattern="\d*"
        />
        <InputForm
          placeholder="01"
          onChange={handleMonthChange}
          value={month}
          // @ts-expect-error
          error={month && !isValidMonth}
          type="number"
          required
          onFocus={() => setIsMonthFocused(true)}
          onBlur={() => setIsMonthFocused(false)}
          autoComplete="off"
          postfix="월"
          ref={monthInputRef}
          pattern="\d*"
        />
        <InputForm
          placeholder="01"
          onChange={handleDayChange}
          value={day}
          // @ts-expect-error
          error={day && !isValidDay}
          type="number"
          required
          onFocus={() => setIsDayFocused(true)}
          onBlur={() => setIsDayFocused(false)}
          autoComplete="off"
          postfix="일"
          ref={dayInputRef}
          pattern="\d*"
        />
        <DummyButton type="submit" />
      </InputFormWrapper>

      {isYearFocused && (
        <ErrorMessage className={toggleYearErrorMessage ? 'active' : undefined}>
          연도 형식이 올바르지 않아요
        </ErrorMessage>
      )}
      {isMonthFocused && (
        <ErrorMessage
          className={toggleMonthErrorMessage ? 'active' : undefined}
        >
          월 형식이 올바르지 않아요
        </ErrorMessage>
      )}
      {isDayFocused && (
        <ErrorMessage className={toggleDayErrorMessage ? 'active' : undefined}>
          일 형식이 올바르지 않아요
        </ErrorMessage>
      )}

      <LaterButton
        onClick={() => {
          navigate('/auth/register/2');
        }}
      >
        다음에 할래요
      </LaterButton>
      <ButtonWrapper>
        <Button
          label="다음"
          // @ts-expect-error
          onClick={handleSubmit}
          property="default"
          type="submit"
          state={isValidYear && isValidMonth && isValidDay}
        />
      </ButtonWrapper>
    </Wrapper>
  );
}

export default RegisterBirthday;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  span {
    margin-left: 8px;
    ${({ theme }) => theme.typo.input.Title_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  form {
    margin-top: 96px;
  }
`;

const InputFormWrapper = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 128fr 90fr 90fr;
  grid-gap: 8px;
`;

const ErrorMessage = styled.div`
  position: absolute;
  margin-top: 12px;
  ${({ theme }) => theme.typo.input.TextMessage_S_12_M}
  color: ${({ theme }) => theme.palette.greyScale.grey100};
  &.active {
    transition: ${({ theme }) => theme.transition.inputFocus};
    color: ${({ theme }) => theme.palette.sementic.red300};
  }
`;

// 다수의 input을 submit 하기 위한 dummy button
const DummyButton = styled.button`
  position: absolute;
  left: -9999px;
`;

const LaterButton = styled.button`
  width: 118px;
  height: 46px;
  ${({ theme }) => theme.typo.button.UnderlinedText_14_EB};
  color: ${({ theme }) => theme.palette.greyScale.grey500};

  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.palette.greyScale.grey500};
  text-align: center;

  ${({ theme }) =>
    css`
      &:active {
        color: ${darken(0.1, theme.palette.greyScale.grey500)};
        text-decoration-color: ${darken(0.1, theme.palette.greyScale.grey500)};
      }
    `}

  position: absolute;
  left: 50%;
  top: 288px;
  transform: translate3d(-50%, -50%, 0);
`;

const ButtonWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  margin-bottom: 18px;
  padding-left: 18px;
  padding-right: 18px;
`;

// https://velog.io/@iamhayoung/HTML-JavaScript-%ED%95%98%EB%82%98%EC%9D%98-form-%ED%83%9C%EA%B7%B8-%EB%82%B4%EC%9D%98-%EC%97%AC%EB%9F%AC-%EA%B0%9C%EC%9D%98-input%EC%9D%84-submit%ED%95%98%EA%B8%B0-Feat.-Implicit-submission
// https://regexland.com/regex-dates/
// https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s04.html
// https://whackur.tistory.com/148
// https://velog.io/@leyuri/TIL-input-%EC%97%90%EC%84%9C-%EC%9E%85%EB%A0%A5-%EA%B8%80%EC%9E%90%EC%88%98-%EC%A0%9C%ED%95%9C%ED%95%98%EB%8A%94-2%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95
// https://bobbyhadz.com/blog/react-input-character-limit
// https://www.daleseo.com/react-forward-ref/
