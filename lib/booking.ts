import { format, isWeekend, startOfDay } from 'date-fns';
import { bookings } from '@/lib/mock-data';
import { TimeSlot } from '@/lib/types';

const baseSlots = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:30',
  '16:00',
  '17:00'
];

export function getTimeSlots(date: Date): TimeSlot[] {
  const key = format(date, 'yyyy-MM-dd');
  const bookedTimes = new Set(
    bookings.filter((booking) => booking.date === key).map((booking) => booking.time)
  );

  return baseSlots.map((time) => ({
    time,
    available: !bookedTimes.has(time)
  }));
}

export function isDateDisabled(date: Date): boolean {
  const dayStart = startOfDay(date).getTime();
  const today = startOfDay(new Date()).getTime();

  return dayStart < today || isWeekend(date);
}
