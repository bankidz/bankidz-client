import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { setBirthday } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/buttons/Button';
import InputForm from '@components/common/InputForm';
import MarginTemplate from '@components/layout/MarginTemplate';

// yyyy/mm/dd || yyyy/m/d
// allowing any combination of one or two digits for the day and month
const YEAR_REGEX = /^(19[2-9][3-9]|20[0-1][0-9]|202[0-2])$/; // 1923 ~ 2022
const MONTH_REGEX = /^(0[1-9]|[1-9]|1[0-2])$/; // 1 ~ 12
const DAY_REGEX = /^(0[1-9]|[1-9]|[1-2][0-9]|3[01])$/; // 1 ~ 31

function RegisterBirthday() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [isValidYear, setIsValidYear] = useState(false);
  const [isValidMonth, setIsValidMonth] = useState(false);
  const [isValidDay, setIsValidDay] = useState(false);
  const [yearFocus, setYearFocus] = useState(false);
  const [monthFocus, setMonthFocus] = useState(false);
  const [dayFocus, setDayFocus] = useState(false);

  function handleYearChange(e: React.ChangeEvent<HTMLInputElement>) {
    setYear(e.target.value.slice(0, 4));
  }
  function handleMonthChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMonth(e.target.value.slice(0, 2));
  }
  function handleDayChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDay(e.target.value.slice(0, 2));
  }

  const monthInputRef = useRef<HTMLInputElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);

  // 형식에 맞는 input이 입려되면 바로 focus 이동
  useEffect(() => {
    setIsValidYear(YEAR_REGEX.test(year));
    if (YEAR_REGEX.test(year) === true) {
      monthInputRef.current!.focus();
    }
  }, [year, isValidYear]);
  useEffect(() => {
    setIsValidMonth(MONTH_REGEX.test(month));
    if (MONTH_REGEX.test(month) === true && parseInt(month) >= 2) {
      dayInputRef.current!.focus();
    }
  }, [month, isValidMonth]);
  useEffect(() => {
    setIsValidDay(DAY_REGEX.test(day));
    // TODO: for demo day
    if (DAY_REGEX.test(day) === true && parseInt(day) >= 4) {
      dayInputRef.current!.blur();
    }
  }, [day]);

  // 서버에서 요구하는 spec으로 birthday 가공
  function preprocess(year: string, month: string, day: string) {
    if (month.length === 1) {
      month = '0' + month; // attach zero padding
    }
    if (day.length === 1) {
      day = '0' + day; // attach zero padding
    }
    return year + month + day;
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const temp1 = YEAR_REGEX.test(year);
    const temp2 = MONTH_REGEX.test(month);
    const temp3 = DAY_REGEX.test(day);
    if (!temp1 || !temp2 || !temp3) {
      console.error('부적절한 접근입니다.');
      return;
    }
    setYear('');
    setMonth('');
    setDay('');
    dispatch(setBirthday({ birthday: preprocess(year, month, day) }));
    navigate('/register/2');
  }

  const toggleYearErrorMessage = yearFocus && year && !isValidYear;
  const toggleMonthErrorMessage = monthFocus && month && !isValidMonth;
  const toggleDayErrorMessage = dayFocus && day && !isValidDay;

  // TODO: for demo day
  function handleNextButtonClick() {
    navigate('/register/2');
  }
  return (
    <Wrapper>
      <header>생년월일을 입력해요</header>
      <form onSubmit={handleSubmit}>
        <InputFormWrapper>
          <InputForm
            placeholder="2000"
            onChange={handleYearChange}
            value={year}
            // @ts-expect-error
            error={year && !isValidYear}
            autoFocus
            type="number"
            required
            onFocus={() => setYearFocus(true)}
            onBlur={() => setYearFocus(false)}
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
            onFocus={() => setMonthFocus(true)}
            onBlur={() => setMonthFocus(false)}
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
            onFocus={() => setDayFocus(true)}
            onBlur={() => setDayFocus(false)}
            autoComplete="off"
            postfix="일"
            ref={dayInputRef}
            pattern="\d*"
          />
        </InputFormWrapper>
        <DummyButton type="submit" />
      </form>
      {yearFocus === true && (
        <ErrorMessage className={toggleYearErrorMessage ? 'active' : undefined}>
          연도 형식이 올바르지 않아요
        </ErrorMessage>
      )}
      {monthFocus === true && (
        <ErrorMessage
          className={toggleMonthErrorMessage ? 'active' : undefined}
        >
          월 형식이 올바르지 않아요
        </ErrorMessage>
      )}
      {dayFocus === true && (
        <ErrorMessage className={toggleDayErrorMessage ? 'active' : undefined}>
          일 형식이 올바르지 않아요
        </ErrorMessage>
      )}
      <ButtonWrapper>
        <Button
          onClick={handleNextButtonClick}
          label="다음"
          property="default"
          state={
            isValidYear === true && isValidMonth === true && isValidDay === true
          }
          // @ts-expect-error
          type="submit"
        />
      </ButtonWrapper>
    </Wrapper>
  );
}

export default RegisterBirthday;

const Wrapper = styled.div`
  header {
    margin-top: 16px;
    margin-left: 26px;
    ${({ theme }) => theme.typo.input.Title_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  form {
    margin-top: 96px;
  }
`;

const InputFormWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 128fr 90fr 90fr;
  grid-gap: 8px;
`;

const ErrorMessage = styled.div`
  position: absolute;
  margin-top: 12px;
  width: 100%;
  ${({ theme }) => theme.typo.input.TextMessage_S_12_M}
  color: ${({ theme }) => theme.palette.greyScale.grey100};
  &.active {
    transition: ${({ theme }) => theme.transition.onFocus};
    color: ${({ theme }) => theme.palette.sementic.red300};
  }
`;

// 다수의 input을 submit 하기 위한 dummy button
// https://velog.io/@iamhayoung/HTML-JavaScript-%ED%95%98%EB%82%98%EC%9D%98-form-%ED%83%9C%EA%B7%B8-%EB%82%B4%EC%9D%98-%EC%97%AC%EB%9F%AC-%EA%B0%9C%EC%9D%98-input%EC%9D%84-submit%ED%95%98%EA%B8%B0-Feat.-Implicit-submission
const DummyButton = styled.button`
  position: absolute;
  left: -9999px;
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

// https://regexland.com/regex-dates/
// https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s04.html
// https://whackur.tistory.com/148

// https://velog.io/@leyuri/TIL-input-%EC%97%90%EC%84%9C-%EC%9E%85%EB%A0%A5-%EA%B8%80%EC%9E%90%EC%88%98-%EC%A0%9C%ED%95%9C%ED%95%98%EB%8A%94-2%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95
// https://bobbyhadz.com/blog/react-input-character-limit
// https://www.daleseo.com/react-forward-ref/
