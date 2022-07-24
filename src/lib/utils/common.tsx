import moment from 'moment';

export function getContractEndDate(createdAt: string, weeks: number) {
  const createdDate = new Date(createdAt);
  const endDate = new Date(createdDate);
  endDate.setDate(createdDate.getDate() + 7 * weeks - 1);
  return moment(endDate).format('YY.MM.DD');
}

// convert createdAt to YYYY.MM.DD
export function getDate(createdAt: string) {
  const createdDate = new Date(createdAt);
  return moment(createdDate).format('YYYY.MM.DD');
}
