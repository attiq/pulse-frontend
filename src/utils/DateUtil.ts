import dayjs from 'dayjs';

export const format = (date1: string | undefined, formatStr?: string) => {
  if (date1) {
    formatStr = formatStr ?? 'MMM DD, YYYY';
    return dayjs(date1).format(formatStr);
  }
};
