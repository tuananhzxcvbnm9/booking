# BookFlow — Production-ready Booking Appointment App

Ứng dụng đặt lịch hẹn xây dựng bằng **Next.js + TypeScript + Tailwind CSS + shadcn/ui**, theo luồng booking 3 bước rõ ràng và dễ mở rộng lên production.

## Tech stack

- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui-style components (Button, Card, Badge, Input, Calendar...)
- React Hook Form + Zod validation
- Sonner toast notifications

## Tính năng chính

- Landing page giới thiệu dịch vụ hiện đại, mobile-first.
- Booking flow 3 bước:
  1. Chọn dịch vụ
  2. Chọn ngày/khung giờ (available/unavailable)
  3. Nhập thông tin và xác nhận
- Confirmation page sau khi đặt lịch.
- Admin dashboard xem danh sách booking + thống kê cơ bản.
- Mock data cho services & bookings.
- UI responsive tốt trên mobile và desktop.
- Empty states trong dashboard, loading state khi submit booking.

## Chạy local

### 1) Cài dependencies

```bash
npm install
```

### 2) Chạy development

```bash
npm run dev
```

Mở: `http://localhost:3000`

### 3) Kiểm tra production quality

```bash
npm run typecheck
npm run lint
npm run build
```

## Cấu trúc thư mục

```txt
app/
  page.tsx                  # Landing
  booking/page.tsx          # Booking wizard
  booking/confirmation      # Confirmation page
  admin/page.tsx            # Admin dashboard
components/
  booking/booking-wizard.tsx
  layout/site-header.tsx
  layout/site-footer.tsx
  ui/*                      # shadcn-style UI components
lib/
  mock-data.ts              # Mock services/bookings
  booking.ts                # Time slot logic
  types.ts
```

## Kế hoạch tích hợp database thật (future)

Hiện app dùng mock data in-memory. Để đưa lên production với DB thật:

1. **Chọn ORM + DB**
   - Khuyến nghị: Prisma + PostgreSQL.
2. **Tạo schema**
   - `Service`, `Booking`, `AvailabilityRule`, `BlockedSlot`.
3. **Thêm API layer**
   - Route Handlers (`app/api/*`) cho CRUD services/bookings.
4. **Validation ở server**
   - Dùng chung Zod schema cho client + server.
5. **Race condition / double-booking**
   - Dùng transaction + unique constraint `(date, time, provider_id)`.
6. **Auth cho admin**
   - NextAuth hoặc provider SSO.
7. **Observability**
   - Logging, monitoring, alerting cho booking failures.
8. **Notifications**
   - Email/SMS confirmation qua queue (e.g. Resend/Twilio + worker).

## Biến môi trường đề xuất

Tạo `.env`:

```env
DATABASE_URL="postgresql://user:password@host:5432/booking"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> Không hardcode secrets trong source code.

## Notes

- Thời gian slot hiện được sinh từ `lib/booking.ts` và đánh dấu unavailable dựa trên mock bookings.
- Có thể dễ dàng thay bằng dữ liệu realtime từ API/database.
