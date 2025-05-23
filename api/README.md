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
- Docker and Docker Compose (for containerized setup)

## Installation

### Local Setup

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

### Docker Setup

1. Build and start the containers:
```bash
docker-compose up -d
```

2. The application will be available at `http://localhost:3000`

To stop the containers:
```bash
docker-compose down
```

To view logs:
```bash
docker-compose logs -f api
```

## Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# Redis
REDIS_URL=redis://redis:6379

# Database
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/order-management-system-db?schema=public
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=order-management-system-db
```

## Running the Application

### Local Development
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### Docker Commands
```bash
# Rebuild containers
docker-compose build

# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## API Endpoints

### Orders
- `GET /v1/orders` - List all orders

- `GET /v1/orders/order/:id` - Find order by id

- `POST /v1/orders` - Create a new order
  ```typescript
  interface OrderInput {
    products: string[];  // Array of product UUIDs
    quantity: number;
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

## Docker Configuration

The project includes three main services:

1. **API Service**
   - NestJS application
   - Runs on port 3000
   - Auto-reloads in development
   - Connects to Redis and PostgreSQL

2. **Redis Service**
   - Redis cache server
   - Runs on port 6379
   - Persists data in a Docker volume

3. **Database Service**
   - PostgreSQL 15 database
   - Runs on port 5432
   - Persists data in a Docker volume

### Docker Compose Services
```yaml
services:
  api:
    build: 
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REDIS_URL=redis://redis:6379
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/order-management-system-db?schema=public

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=order-management-system-db
    ports:
      - "5432:5432"
```