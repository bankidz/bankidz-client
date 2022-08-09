// 서버에서 요구하는 spec으로 birthday 가공 (attach zero padding)
function refineBirthday(year: string, month: string, day: string) {
  if (month.length === 1) {
    month = '0' + month;
  }
  if (day.length === 1) {
    day = '0' + day;
  }
  return year + month + day;
}

export default refineBirthday;
