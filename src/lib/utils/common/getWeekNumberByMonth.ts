function getWeekNumberByMonth(dateFormat: Date) {
  const inputDate = new Date(dateFormat);

  // 인풋의 년, 월
  let year = inputDate.getFullYear();
  let month = inputDate.getMonth() + 1;

  // 목요일 기준 주차 구하기
  const weekNumberByThurFnc = (paramDate: Date) => {
    const year = paramDate.getFullYear();
    const month = paramDate.getMonth();
    const date = paramDate.getDate();

    // 인풋한 달의 첫 날과 마지막 날의 요일
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
    const lastDayOfweek = lastDate.getDay();

    // 인풋한 달의 마지막 일
    const lastDay = lastDate.getDate();

    // 첫 날의 요일이 금, 토, 일요일 이라면 true
    const firstWeekCheck =
      firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
    // 마지막 날의 요일이 월, 화, 수라면 true
    const lastWeekCheck =
      lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;

    // 해당 달이 총 몇주까지 있는지
    const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);

    // 날짜 기준으로 몇주차 인지
    let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);
    let flag;
    // 인풋한 날짜가 첫 주에 있고 첫 날이 월, 화, 수로 시작한다면 'prev'(전달 마지막 주)
    if (weekNo === 1 && firstWeekCheck) flag = 'prev';
    // 인풋한 날짜가 마지막 주에 있고 마지막 날이 월, 화, 수로 끝난다면 'next'(다음달 첫 주)
    else if (weekNo === lastWeekNo && lastWeekCheck) flag = 'next';
    // 인풋한 날짜의 첫 주는 아니지만 첫날이 월, 화 수로 시작하면 -1;
    else if (firstWeekCheck) weekNo = weekNo - 1;

    return { weekNo, flag };
  };

  // 목요일 기준의 주차
  let { weekNo, flag } = weekNumberByThurFnc(inputDate);

  // 이전달의 마지막 주차일 떄
  if (flag === 'prev') {
    // 이전 달의 마지막날
    const afterDate = new Date(year, month - 1, 0);
    year = month === 1 ? year - 1 : year;
    month = month === 1 ? 12 : month - 1;
    const { weekNo } = weekNumberByThurFnc(afterDate);
  }
  // 다음달의 첫 주차일 때
  if (flag === 'next') {
    year = month === 12 ? year + 1 : year;
    month = month === 12 ? 1 : month + 1;
    weekNo = 1;
  }

  return { year, month, weekNo };
}
export default getWeekNumberByMonth;

// https://falsy.me/javascript-%EC%9E%85%EB%A0%A5%ED%95%9C-%EB%82%A0%EC%A7%9C%EC%9D%98-%ED%95%B4%EB%8B%B9-%EB%8B%AC-%EA%B8%B0%EC%A4%80-%EC%A3%BC%EC%B0%A8-%EA%B5%AC%ED%95%98%EA%B8%B0/
// ts로 수정
