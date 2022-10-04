/**
 * @return 'yyyymmdd' 형식으로 가공된 date를 반홥합니다. (attach zero padding)
 */
function getRefinedDate(year: string, month: string, day: string) {
  if (month.length === 1) {
    month = '0' + month;
  }
  if (day.length === 1) {
    day = '0' + day;
  }
  return year + month + day;
}

export default getRefinedDate;
