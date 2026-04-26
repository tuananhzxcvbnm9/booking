import Link from 'next/link';
import { ArrowRight, CalendarDays, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="container py-12 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              <Badge className="w-fit" variant="secondary">
                Trusted by 2,000+ customers
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Book appointments in minutes, not hours.</h1>
              <p className="text-muted-foreground sm:text-lg">
                BookFlow delivers a premium booking flow with smart time slots, clear confirmations, and operational visibility for your team.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/booking">
                    Get started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/admin">View dashboard</Link>
                </Button>
              </div>
            </div>
            <Card className="border-primary/20 bg-gradient-to-br from-white to-primary/5">
              <CardHeader>
                <CardTitle>Why teams choose BookFlow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm sm:text-base">
                <p className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Beautiful mobile-first UX</p>
                <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" /> Structured 3-step booking journey</p>
                <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Ready for real database integration</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container pb-16">
          <h2 className="mb-4 text-2xl font-semibold">Popular services</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="transition hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <p className="mt-3 text-sm font-medium">{service.duration} mins · ${service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
