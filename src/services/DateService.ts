import dayjs from 'dayjs';

dayjs.locale('pt-br');

export class DateService {
  formatDate(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY');
  }
}
