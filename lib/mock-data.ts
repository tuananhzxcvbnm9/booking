import { addDays, format, startOfToday } from 'date-fns';
import { Booking, Service } from '@/lib/types';

export const services: Service[] = [
  {
    id: 'svc-consult',
    name: 'Business Consultation',
    duration: 60,
    price: 120,
    description: '1:1 strategy session to identify growth opportunities.',
    featured: true
  },
  {
    id: 'svc-design',
    name: 'Design Review',
    duration: 45,
    price: 90,
    description: 'Comprehensive UX/UI review with actionable improvements.'
  },
  {
    id: 'svc-coaching',
    name: 'Career Coaching',
    duration: 30,
    price: 70,
    description: 'Career planning session focused on your next milestone.'
  }
];

const today = startOfToday();

export const bookings: Booking[] = [
  {
    id: 'BK-2026-1001',
    serviceId: 'svc-consult',
    serviceName: 'Business Consultation',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    time: '10:00',
    customerName: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 202-555-0143',
    status: 'confirmed',
    createdAt: format(today, "yyyy-MM-dd'T'HH:mm:ss")
  },
  {
    id: 'BK-2026-1002',
    serviceId: 'svc-design',
    serviceName: 'Design Review',
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    time: '14:30',
    customerName: 'Mia Carter',
    email: 'mia@example.com',
    phone: '+1 202-555-0174',
    status: 'pending',
    createdAt: format(addDays(today, -1), "yyyy-MM-dd'T'HH:mm:ss")
  },
  {
    id: 'BK-2026-1003',
    serviceId: 'svc-coaching',
    serviceName: 'Career Coaching',
    date: format(addDays(today, 3), 'yyyy-MM-dd'),
    time: '09:00',
    customerName: 'Noah White',
    email: 'noah@example.com',
    phone: '+1 202-555-0180',
    status: 'confirmed',
    createdAt: format(addDays(today, -2), "yyyy-MM-dd'T'HH:mm:ss")
  }
];
