# Order Management System API

Backend service for the Order Management System built with NestJS and Prisma.

## Project Structure

```
api/
├── prisma/              # Database schema and migrations
├── src/
│   ├── core/           # Core business logic
│   │   ├── Order/      # Order module
│   │   │   ├── domain/         # Business rules and entities
│   │   │   └── infrastructure/ # External implementations
│   │   ├── User/       # User module
│   │   └── Auth/       # Authentication module
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

# RabbitMQ
RABBITMQ_URL=amqp://localhost:5672

# JWT
JWT_SECRET=your-secret-key

# Database
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/order-management-system-db?schema=public
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=order-management-system-db

# Auth
JWT_SECRET=conejorojo
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

### Authentication
- `POST /v1/auth/signup` - Register a new user
  ```typescript
  interface SignupDto {
    email: string;
    name: string;
    password: string;
  }
  ```

- `POST /v1/auth/login` - Login with credentials
  ```typescript
  interface LoginDto {
    email: string;
    password: string;
  }
  ```

### Orders
- `GET /v1/orders` - List all orders for the authenticated user

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

### Models
```prisma
enum OrderStatus {
  COMPLETED
  PENDING
  ERROR
}

model Orders {
  id         String      @id @default(uuid())
  products   String[]    // Array of UUIDs
  quantity   Int
  total      Float
  date       DateTime
  status     OrderStatus
  userId     String
  user       Users       @relation(fields: [userId], references: [id])
  created_at DateTime    @default(now())
  updated_at DateTime    @updatedAt
}

model Users {
  id         String   @id @default(uuid())
  email      String   @unique
  name       String
  password   String
  orders     Orders[]
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

## Features

- **Authentication**: JWT-based authentication system
- **User Management**: Create and manage user accounts
- **Order Management**: Create and retrieve orders
- **Event-driven Architecture**: Using EventEmitter for internal events
- **Microservices Communication**: RabbitMQ integration for service-to-service communication
- **Password Encryption**: Secure password storage using bcrypt

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