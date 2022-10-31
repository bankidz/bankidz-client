import dayjs from 'dayjs';
import { TDateFormat } from '@lib/types/TDateFormat';

/**
 * @param input string | Date type으로 변환하고자 하는 입력을 주입합니다.
 * @param dateFormat 변환하고자 하는 형식을 지정합니다. 필요 시 format을 추가해주세요.
 * @return 형식에 맞게 변환된 날짜 형식을 반환합니다.
 */
function getFormattedTimeStamp(input: string | Date, dateFormat: TDateFormat) {
  const createdDate = dayjs(input);
  return createdDate.format(dateFormat);
}

export default getFormattedTimeStamp;
