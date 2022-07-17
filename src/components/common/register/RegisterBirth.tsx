import useInputs from '@hooks/useInputs';
import { useAppDispatch } from '@store/app/hooks';
import { setBirthday } from '@store/slices/authSlice';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputForm from '../button/InputForm';

// yyyy/mm/dd | yyyy/m/d
// allowing any combination of one or two digits for the day and month
const YEAR_REGEX = /^(19[0-9][0-9]|20[0-9][0-9])$/; // 1900 ~ 2099
const MONTH_REGEX = /^(0[0-9]|[0-9]|1[0-2])$/; // 1 ~ 12
const DAY_REGEX = /^(0[1-9]|[1-9]|[1-2][0-9]|3[01])$/; // 1 ~ 31

// TODO: profile button 옮기기
function Register() {
  const [{ year, month, day }, onChange, reset] = useInputs({
    year: '',
    month: '',
    day: '',
  });

  const [isValidYear, setIsValidYear] = useState(false);
  const [yearFocus, setYearFocus] = useState(false);
  const [isValidMonth, setIsValidMonth] = useState(false);
  const [monthFocus, setMonthFocus] = useState(false);
  const [isValidDay, setIsValidDay] = useState(false);
  const [dayFocus, setDayFocus] = useState(false);

  useEffect(() => {
    setIsValidYear(YEAR_REGEX.test(year));
  }, [year]);
  useEffect(() => {
    setIsValidMonth(MONTH_REGEX.test(month));
  }, [month]);
  useEffect(() => {
    setIsValidDay(DAY_REGEX.test(day));
  }, [day]);

  // 서버에서 요구하는 spec으로 birthday 가공
  function stringifyBirthday(year: string, month: string, day: string) {
    if (month.length === 1) {
      month = '0' + month; // attach zero padding
    }
    if (day.length === 1) {
      day = '0' + day; // attach zero padding
    }
    return year + month + day;
  }

  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const temp1 = YEAR_REGEX.test(year);
    const temp2 = MONTH_REGEX.test(month);
    const temp3 = DAY_REGEX.test(day);
    if (!temp1 || !temp2 || !temp3) {
      console.error('자바스크립트 해킹이 감지되었습니다.');
      return;
    }
    reset();
    const birthday = stringifyBirthday(year, month, day);
    console.log(birthday);
    dispatch(setBirthday({ birthday }));
  }

  const toggleYearErrorMessage = yearFocus && year && !isValidYear;
  const toggleMonthErrorMessage = monthFocus && month && !isValidMonth;
  const toggleDayErrorMessage = dayFocus && day && !isValidDay;

  return (
    <Wrapper>
      {/* <button onClick={print}>print</button> */}
      <span>생년월일을 입력해요</span>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputForm
            // TODO: 연, 월, 일 속성 지정
            // @ts-expect-error
            name="year"
            placeholder="2022년"
            onChange={onChange}
            value={year}
            error={false}
            autoFocus
            type="text"
            required
            onFocus={() => setYearFocus(true)}
            onBlur={() => setYearFocus(false)}
            autoComplete="off"
          />
          <InputForm
            // @ts-expect-error
            name="month"
            placeholder="09월"
            onChange={onChange}
            value={month}
            error={false}
            type="text"
            required
            onFocus={() => setMonthFocus(true)}
            onBlur={() => setMonthFocus(false)}
            autoComplete="off"
          />
          <InputForm
            // @ts-expect-error
            name="day"
            placeholder="01일"
            onChange={onChange}
            value={day}
            error={false}
            type="text"
            required
            onFocus={() => setDayFocus(true)}
            onBlur={() => setDayFocus(false)}
            autoComplete="off"
          />
        </InputWrapper>
        <DummyButton type="submit" />
      </form>
      {toggleYearErrorMessage && (
        <ErrorMessage>연도 형식이 올바르지 않아요</ErrorMessage>
      )}
      {toggleMonthErrorMessage && (
        <ErrorMessage>월 형식이 올바르지 않아요</ErrorMessage>
      )}
      {toggleDayErrorMessage && (
        <ErrorMessage>일 형식이 올바르지 않아요</ErrorMessage>
      )}
    </Wrapper>
  );
}

export default Register;

const Wrapper = styled.div`
  span {
    margin-top: 64px;
    margin-left: 10px;
    ${({ theme }) => theme.typo.input.Title_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }

  form {
    margin-top: 96px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 128fr 90fr 90fr;
  grid-gap: 8px;
`;

const ErrorMessage = styled.div`
  margin-top: 12px;
  width: 100%;
  ${({ theme }) => theme.typo.input.TextMessage_S_12_M}
  color: ${({ theme }) => theme.palette.sementic.red300};
`;

// 다수의 input을 submit 하기 위한 dummy button
// https://velog.io/@iamhayoung/HTML-JavaScript-%ED%95%98%EB%82%98%EC%9D%98-form-%ED%83%9C%EA%B7%B8-%EB%82%B4%EC%9D%98-%EC%97%AC%EB%9F%AC-%EA%B0%9C%EC%9D%98-input%EC%9D%84-submit%ED%95%98%EA%B8%B0-Feat.-Implicit-submission
const DummyButton = styled.button`
  position: absolute;
  left: -9999px;
`;

// https://regexland.com/regex-dates/
// https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s04.html
// https://whackur.tistory.com/148
