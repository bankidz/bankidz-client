import moment from 'moment';

export function getContractEndDate(createdAt: string, weeks: number) {
  const createdDate = new Date(createdAt);
  const endDate = new Date(createdDate);
  const timeStamp = endDate.setDate(createdDate.getDate() + 7 * weeks - 1);
  const dateObject = new Date(timeStamp);
  return dateObject;
  // return moment(endDate).format('YY.MM.DD');
}
