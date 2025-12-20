# Todo Application

A comprehensive 3-tier Todo application demonstrating modern full-stack development practices, containerization, CI/CD pipelines, and cloud deployment.

## 🏗️ Architecture

The application follows a microservices architecture with three main components:

- **Frontend**: React.js single-page application
- **Backend**: Spring Boot REST API with JPA/Hibernate
- **Database**: PostgreSQL relational database

### Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Frontend** | React.js | 18.x |
| **Backend** | Spring Boot | 3.2.0 |
| **Database** | PostgreSQL | 15 |
| **Build Tools** | Maven, npm | - |
| **Containerization** | Docker, Docker Compose | - |
| **Orchestration** | Kubernetes (EKS) | - |
| **CI/CD** | Jenkins | - |

## ✨ Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete todos
- ✅ **Task Management**: Mark todos as completed/incomplete
- ✅ **Responsive UI**: Modern React interface
- ✅ **RESTful API**: Well-documented endpoints
- ✅ **Database Integration**: JPA/Hibernate with PostgreSQL
- ✅ **Containerization**: Multi-stage Docker builds
- ✅ **CI/CD Pipeline**: Jenkins automation
- ✅ **Cloud Deployment**: Kubernetes manifests for EKS
- ✅ **Cross-Origin Support**: CORS configuration

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Docker & Docker Compose** (latest versions)
- **Node.js** (18.x or higher) & npm
- **Java** (21) & Maven (3.x)
- **Git** (for version control)
- **Jenkins** (for CI/CD - optional)
- **kubectl** & **minikube** (for Kubernetes deployment - optional)

## 🚀 Local Development

### Quick Start with Docker Compose

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd TO_DO
   ```

2. **Start all services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Database: localhost:5433 (PostgreSQL)

### Manual Setup (Individual Services)

#### 1. Database Setup
```bash
docker run --name postgres \
  -e POSTGRES_DB=todo \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5433:5432 \
  -d postgres:15
```

#### 2. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend will be available at: http://localhost:8080

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will be available at: http://localhost:3000

## 🔄 CI/CD with Jenkins

### Level 1: Basic Pipeline Setup

1. **Install Jenkins**:
   ```bash
   brew install jenkins
   brew services start jenkins
   ```

2. **Access Jenkins**: http://localhost:8080

3. **Create a new Pipeline Job**:
   - Name: `todo-cicd-pipeline`
   - Type: Pipeline
   - SCM: Git (Repository URL: `file:///Users/vishal/Desktop/TO_DO`)
   - Script Path: `Jenkinsfile`

### Level 2: Declarative Pipeline

The `Jenkinsfile` in the root directory contains a complete declarative pipeline with stages for:
- Code checkout
- Backend build & test
- Frontend build
- Docker image creation
- Image push (configurable)

### Level 3: Shared Library

Reusable pipeline functions are stored in `vars/`:
- `dockerBuild.groovy`: Docker image building
- `dockerPush.groovy`: Docker image pushing

**Configure Shared Library in Jenkins**:
- Manage Jenkins → Configure System → Global Pipeline Libraries
- Name: `todo-shared-lib`
- Repository: Your Git repository
- Include: `vars/*`

## ☸️ Kubernetes Deployment (EKS)

### Prerequisites
- AWS CLI configured
- kubectl installed
- EKS cluster running

### Deployment Steps

1. **Build and push images**:
   ```bash
   # Backend
   cd backend
   docker build -t your-registry/todo-backend:latest .
   docker push your-registry/todo-backend:latest

   # Frontend
   cd frontend
   docker build -t your-registry/todo-frontend:latest .
   docker push your-registry/todo-frontend:latest
   ```

2. **Update Kubernetes manifests**:
   - Edit `k8s/backend.yml` and `k8s/frontend.yml`
   - Replace `your-registry` with your actual registry

3. **Deploy to Kubernetes**:
   ```bash
   kubectl apply -f k8s/
   ```

4. **Get service URLs**:
   ```bash
   kubectl get services
   ```

### Local Kubernetes Testing (Minikube)

```bash
# Start minikube
minikube start

# Enable ingress
minikube addons enable ingress

# Deploy application
kubectl apply -f k8s/

# Get service URL
minikube service frontend
```

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api/todos
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/{id}` | Get todo by ID |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/{id}` | Update existing todo |
| DELETE | `/api/todos/{id}` | Delete todo |

### Request/Response Examples

**Create Todo**:
```json
POST /api/todos
{
  "title": "Learn Docker",
  "description": "Study containerization",
  "completed": false
}
```

**Response**:
```json
{
  "id": 1,
  "title": "Learn Docker",
  "description": "Study containerization",
  "completed": false
}
```

## 📁 Project Structure

```
TO_DO/
├── backend/                    # Spring Boot application
│   ├── src/
│   │   ├── main/java/com/todo/
│   │   │   ├── TodoApplication.java
│   │   │   ├── Todo.java
│   │   │   ├── TodoController.java
│   │   │   ├── TodoService.java
│   │   │   └── TodoRepository.java
│   │   └── main/resources/
│   │       └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoList.js
│   │   │   ├── TodoItem.js
│   │   │   └── AddTodo.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── k8s/                        # Kubernetes manifests
│   ├── backend.yml
│   └── frontend.yml
├── vars/                       # Jenkins shared library
│   ├── dockerBuild.groovy
│   └── dockerPush.groovy
├── docker-compose.yml          # Local development
├── Jenkinsfile                 # CI/CD pipeline
└── README.md                   # This file
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Integration Tests
```bash
docker-compose up --build
# Manual testing via UI or API calls
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines

- Follow Java naming conventions for backend
- Use functional components in React
- Write descriptive commit messages
- Test your changes before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Port conflicts**:
- PostgreSQL: Change port 5433 in docker-compose.yml
- Frontend: Change port 3000 in docker-compose.yml
- Backend: Change port 8080 in application.properties

**Database connection issues**:
- Ensure PostgreSQL container is running
- Check environment variables in docker-compose.yml
- Verify database credentials

**Jenkins pipeline failures**:
- Ensure Docker is accessible from Jenkins
- Check shared library configuration
- Verify file permissions

**Kubernetes deployment issues**:
- Check kubectl context: `kubectl config current-context`
- Verify image names in manifests
- Check pod logs: `kubectl logs <pod-name>`

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review existing GitHub issues
3. Create a new issue with detailed information

---

**Happy coding! 🎉**