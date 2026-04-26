export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  featured?: boolean;
};

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  customerName: string;
  email: string;
  phone: string;
  note?: string;
  status: BookingStatus;
  createdAt: string;
};

export type TimeSlot = {
  time: string;
  available: boolean;
};
