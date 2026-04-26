import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfirmationPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = searchParams;

  const service = typeof params.service === 'string' ? params.service : 'Service';
  const date = typeof params.date === 'string' ? params.date : 'Selected date';
  const time = typeof params.time === 'string' ? params.time : 'Selected time';
  const name = typeof params.name === 'string' ? params.name : 'Customer';

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container py-10">
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              Booking confirmed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm sm:text-base">
            <p>Thanks, <span className="font-semibold">{name}</span>! Your appointment has been confirmed.</p>
            <div className="rounded-lg bg-muted p-4">
              <p><span className="font-medium">Service:</span> {service}</p>
              <p><span className="font-medium">Date:</span> {date}</p>
              <p><span className="font-medium">Time:</span> {time}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild>
                <Link href="/booking">Book another</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
