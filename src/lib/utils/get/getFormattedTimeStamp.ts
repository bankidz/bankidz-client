import dayjs from 'dayjs';

type TFormat = 'YYYY.MM.DD';

/**
 * @param format 필요 시 format을 추가해주세요.
 * @return 형식에 맞게 변환된 timeStamp를 반환합니다.
 */
function getFormattedTimeStamp(timeStamp: string, format: TFormat) {
  const createdDate = dayjs(timeStamp, 'YYYY-MM-DD HH:mm:ss');
  return createdDate.format(format);
}

export default getFormattedTimeStamp;
