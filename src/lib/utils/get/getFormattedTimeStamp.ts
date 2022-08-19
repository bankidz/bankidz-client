import dayjs from 'dayjs';

type TFormat = 'YYYY.MM.DD';

function getFormattedTimeStamp(timeStamp: string, format: TFormat) {
  const createdDate = dayjs(timeStamp, 'YYYY-MM-DD HH:mm:ss');
  return createdDate.format(format);
}

export default getFormattedTimeStamp;
