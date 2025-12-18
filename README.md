# Todo App

A simple 3-tier Todo application with React frontend, Spring Boot backend, and PostgreSQL database.

## Architecture

- **Frontend**: React app running on port 3000
- **Backend**: Spring Boot REST API running on port 8080
- **Database**: PostgreSQL running on port 5432

## Local Development

### Prerequisites

- Docker and Docker Compose
- Node.js and npm (for frontend development)
- Java 21 and Maven (for backend development)

### Running with Docker Compose

1. Clone or navigate to the project directory.

2. Run the application:
   ```bash
   docker-compose up --build
   ```

3. Access the app at http://localhost:3000

### Running Individually

#### Database
```bash
docker run --name postgres -e POSTGRES_DB=todo -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
```

#### Backend
```bash
cd backend
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm start
```

## Deployment to EKS

1. Build and push Docker images to your registry:
   ```bash
   # Backend
   cd backend
   docker build -t your-registry/backend:latest .
   docker push your-registry/backend:latest

   # Frontend
   cd frontend
   docker build -t your-registry/frontend:latest .
   docker push your-registry/frontend:latest
   ```

2. Update the image names in `k8s/backend.yml` and `k8s/frontend.yml`.

3. Apply Kubernetes manifests:
   ```bash
   kubectl apply -f k8s/postgres.yml
   kubectl apply -f k8s/backend.yml
   kubectl apply -f k8s/frontend.yml
   ```

4. Get the frontend service external IP:
   ```bash
   kubectl get services frontend
   ```

## API Endpoints

- GET /api/todos - Get all todos
- GET /api/todos/{id} - Get todo by ID
- POST /api/todos - Create new todo
- PUT /api/todos/{id} - Update todo
- DELETE /api/todos/{id} - Delete todo

## Features

- Create, read, update, delete todos
- Mark todos as completed
- Responsive React frontend
- RESTful API with Spring Boot