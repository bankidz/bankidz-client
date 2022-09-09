import { TDateFormat } from '@lib/types/TDateFormat';
import getContractEndDate from './getContractEndDate';
import getFormattedTimeStamp from './getFormattedTimeStamp';

/**
 * @param dateFormat 변환하고자 하는 형식을 지정합니다. 필요 시 format을 추가해주세요.
 * @returns 형식에 맞게 변환된 계약종료일을 반환합니다.
 */
function getCompletionDate(
  createdAt: string,
  weeks: number,
  dateFormat: TDateFormat,
) {
  const contractEndDate = getContractEndDate(createdAt, weeks);
  const formattedContractEndDate = getFormattedTimeStamp(
    contractEndDate,
    dateFormat,
  );
  return formattedContractEndDate;
}

export default getCompletionDate;
