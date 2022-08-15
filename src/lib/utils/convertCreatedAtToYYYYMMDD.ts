import dayjs from 'dayjs';

function convertCreatedAtToYYYYMMDD(createdAt: string) {
  const createdDate = dayjs(createdAt, 'YYYY-MM-DD HH:mm:ss');
  return createdDate.format('YYYY.MM.DD');
}

export default convertCreatedAtToYYYYMMDD;
