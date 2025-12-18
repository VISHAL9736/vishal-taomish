pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'vishal0786'
        BACKEND_IMAGE = 'todo-backend'
        FRONTEND_IMAGE = 'todo-frontend'
        MAVEN = '/Users/vishal/apache-maven-3.9.11/bin/mvn'
        DOCKER = '/usr/local/bin/docker'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh "${MAVEN} clean compile"
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh "${MAVEN} test"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build Backend') {
            steps {
                script {
                    dockerBuild('backend', "${DOCKER_REGISTRY}/${BACKEND_IMAGE}", env.BUILD_NUMBER)
                }
            }
        }

        stage('Docker Build Frontend') {
            steps {
                script {
                    dockerBuild('frontend', "${DOCKER_REGISTRY}/${FRONTEND_IMAGE}", env.BUILD_NUMBER)
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    dockerPush("${DOCKER_REGISTRY}/${BACKEND_IMAGE}", env.BUILD_NUMBER)
                    dockerPush("${DOCKER_REGISTRY}/${FRONTEND_IMAGE}", env.BUILD_NUMBER)
                }
            }
        }
    }

    post {
        always {
            sh "${DOCKER} system prune -f"
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
