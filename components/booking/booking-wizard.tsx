'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ArrowRight, CalendarClock, CheckCircle2, LoaderCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getTimeSlots, isDateDisabled } from '@/lib/booking';
import { services } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(8, 'Please enter a valid phone number.'),
  note: z.string().max(300, 'Note must be under 300 characters.').optional()
});

type FormData = z.infer<typeof schema>;

const steps = ['Select service', 'Pick date & time', 'Your details'] as const;

export function BookingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slots = useMemo(() => (selectedDate ? getTimeSlots(selectedDate) : []), [selectedDate]);
  const selectedService = services.find((service) => service.id === selectedServiceId);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      note: ''
    }
  });

  const onSubmit = async (formData: FormData) => {
    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error('Please complete all booking steps.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const payload = new URLSearchParams({
      service: selectedService.name,
      date: format(selectedDate, 'PPP'),
      time: selectedTime,
      name: formData.fullName
    });

    toast.success('Appointment booked successfully!');
    router.push(`/booking/confirmation?${payload.toString()}`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Book your appointment</CardTitle>
          <CardDescription>Simple 3-step flow designed for mobile and desktop.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            {steps.map((label, index) => {
              const active = step === index + 1;
              const done = step > index + 1;

              return (
                <div key={label} className={cn('rounded-lg border p-3 text-center text-xs sm:text-sm', active && 'border-primary bg-primary/5')}>
                  <p className="font-semibold">Step {index + 1}</p>
                  <p className="text-muted-foreground">{done ? 'Completed' : label}</p>
                </div>
              );
            })}
          </div>

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Choose the service that fits your needs.</p>
              <div className="grid gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedServiceId(service.id)}
                    className={cn(
                      'rounded-lg border p-4 text-left transition hover:border-primary',
                      selectedServiceId === service.id && 'border-primary bg-primary/5'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <Badge variant="secondary">${service.price}</Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Duration: {service.duration} mins</p>
                  </button>
                ))}
              </div>
              <Button disabled={!selectedServiceId} onClick={() => setStep(2)}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Pick a date and available slot.</p>
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={isDateDisabled} />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-sm',
                      slot.available ? 'hover:border-primary' : 'cursor-not-allowed opacity-50',
                      selectedTime === slot.time && 'border-primary bg-primary/5'
                    )}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" placeholder="John Doe" {...register('fullName')} />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" placeholder="+1 202-555-0123" {...register('phone')} />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">Note (optional)</Label>
                <Textarea id="note" placeholder="Any special requests" {...register('note')} />
                {errors.note && <p className="text-sm text-red-500">{errors.note.message}</p>}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                  Confirm booking
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-base">Booking summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {selectedService ? (
            <>
              <p className="font-medium">{selectedService.name}</p>
              <p className="text-muted-foreground">{selectedService.duration} mins · ${selectedService.price}</p>
            </>
          ) : (
            <p className="text-muted-foreground">No service selected yet.</p>
          )}

          <div className="mt-3 rounded-md bg-muted p-3">
            <p className="flex items-center gap-2 text-muted-foreground">
              <CalendarClock className="h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
            </p>
            <p className="mt-1 font-medium">{selectedTime || 'Pick a time slot'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
