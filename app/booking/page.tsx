import { BookingWizard } from '@/components/booking/booking-wizard';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container py-8 sm:py-12">
        <BookingWizard />
      </main>
      <SiteFooter />
    </div>
  );
}
