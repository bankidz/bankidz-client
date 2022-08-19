// 'yyyymmdd' 형식으로 date 가공 (attach zero padding)
function refineDate(year: string, month: string, day: string) {
  if (month.length === 1) {
    month = '0' + month;
  }
  if (day.length === 1) {
    day = '0' + day;
  }
  return year + month + day;
}

export default refineDate;
