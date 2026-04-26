import { format } from 'date-fns';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { bookings } from '@/lib/mock-data';

const statusVariant = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'destructive'
} as const;

export default function AdminPage() {
  const total = bookings.length;
  const confirmed = bookings.filter((booking) => booking.status === 'confirmed').length;
  const pending = bookings.filter((booking) => booking.status === 'pending').length;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container space-y-6 py-8 sm:py-12">
        <h1 className="text-3xl font-bold">Admin dashboard</h1>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader><CardTitle className="text-sm">Total bookings</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{total}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Confirmed</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{confirmed}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Pending</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{pending}</CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="py-3">Booking ID</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-3 font-medium">{booking.id}</td>
                        <td>
                          <p>{booking.customerName}</p>
                          <p className="text-xs text-muted-foreground">{booking.email}</p>
                        </td>
                        <td>{booking.serviceName}</td>
                        <td>{format(new Date(booking.date), 'PPP')}</td>
                        <td>{booking.time}</td>
                        <td>
                          <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
