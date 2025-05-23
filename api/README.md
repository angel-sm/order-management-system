# Order Management System API

Backend service for the Order Management System built with NestJS and Prisma.

## Project Structure

```
api/
├── prisma/              # Database schema and migrations
├── src/
│   ├── core/           # Core business logic
│   │   └── Order/      # Order module
│   │       ├── domain/         # Business rules and entities
│   │       └── infrastructure/ # External implementations
│   ├── shared/         # Shared utilities and services
│   └── main.ts         # Application entry point
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Run seeds migrations
npx prisma db seed
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

### Orders
- `POST /v1/orders` - Create a new order
  ```typescript
  interface OrderInput {
    products: string[];  // Array of product UUIDs
    total: string;
    date: Date;
    status: 'COMPLETED' | 'PENDING' | 'ERROR';
  }
  ```

## Database Schema

### Order Model
```prisma
enum OrderStatus {
  prepared
  pending
  error
}

model Order {
  id        String      @id @default(uuid())
  products  String[]    // Array of UUIDs
  quantity  Int
  total     Float
  date      DateTime
  status    OrderStatus
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}
```