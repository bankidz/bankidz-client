import moment from 'moment';

// convert createdAt to YYYY.MM.DD
export function getDate(createdAt: string) {
  const createdDate = new Date(createdAt);
  return moment(createdDate).format('YYYY.MM.DD');
}
