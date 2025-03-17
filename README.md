# Birthday Discount Campaign

## Project Overview

This project is a Birthday Discount Campaign system built with **NestJS** and **Prisma**. It sends personalized discount emails to users before their birthday and displays recommended products in the app.

---

## Technologies Used

- **NestJS** - Backend framework
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **Redis** - Queue management for background jobs
- **BullMQ** - Job queue for email processing
- **Nodemailer** - Email sending service

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone [repository-url](https://github.com/AmirDiafi/email-campaign.git)
cd birthday-discount-campaign
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/birthdaydb"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-email-password"
JWT_SECRET="your-secret-key"
REDIS_URL="redis://localhost:6379"
```

### 4. Setup Database

(Make sure you have Postgres Installed on your command)

```bash
pnpm prisma migrate dev --name init
pnpm prisma db seed
pnpm prisma studio # Optional: View data in Prisma Studio
```

### 5. Run Redis Server

```bash
redis-server
```

### 6. Start the Application

- **Development Mode:**

  ```bash
  pnpm start:dev
  ```

- **Production Mode:**

  ```bash
  pnpm build
  pnpm start:prod
  ```

---

## Project Structure

```bash
/project
  ├── main.ts
  ├── app.module.ts
  ├── app.service.ts
  ├── app.controller.ts
  ├── prisma
  │   ├── schema.prisma
  │   ├── seed.ts
  ├── src
  │   ├── emails
  │   │   ├── emails.module.ts
  │   │   ├── emails.service.ts
  │   │   ├── emails.processor.ts
  │   │   ├── emails.controller.ts
  │   │   ├── emails.scheduler.ts
  │   ├── users
  │   │   ├── users.module.ts
  │   │   ├── users.service.ts
  │   │   ├── users.controller.ts
  │   ├── products
  │   │   ├── products.module.ts
  │   │   ├── products.service.ts
  │   │   ├── products.controller.ts
  │   ├── jobs
  │   │   ├── jobs.module.ts
  │   │   ├── jobs.service.ts
  │   │   ├── email.processor.ts
  │   ├── prisma
  │   │   ├── prisma.module.ts
  │   │   ├── prisma.service.ts
  │   │   ├── prisma.processor.ts
  ├── test
```

---

## Key Features

### 1. User Management

- Create and manage users
- Store email and birthdate

### 2. Product Management

- Store products with descriptions and prices
- Track user product preferences

### 3. Email Notification System

- Send personalized emails with discount codes to users within 7 days of their birthday.
- Use a cron job running at midnight to identify users with upcoming birthdays within the next 7 days.
- Process and schedule email deliveries using BullMQ and Redis for efficient handling of tasks.

### 4. Birthday Recommendations

- Display recommended products in the app during the user's birthday week.

---

## API Endpoints

### Users

- `GET /users`  
  Returns a list of all users (not ready yet).
- `POST /users/create`  
  Creates a new user including recommended products.

### Products

- `GET /products`  
  Returns a list of all products (not ready yet).
- `POST /products`  
  Creates a new product (not ready yet).

### Campaign Jobs

- `POST /jobs/send-birthday-emails`  
  Triggers the email campaign (made for testing trigger).

---

## Testing

```bash
pnpm test
pnpm test:watch
```

---
