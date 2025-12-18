pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'vishal0786'
        BACKEND_IMAGE = 'todo-backend'
        FRONTEND_IMAGE = 'todo-frontend'
        MAVEN = '/Users/vishal/apache-maven-3.9.11/bin/mvn'
        DOCKER = '/usr/local/bin/docker'
        NODE = '/Users/vishal/.nvm/versions/node/v22.19.0/bin/node'
        NPM = '/Users/vishal/.nvm/versions/node/v22.19.0/bin/npm'
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
                    // Use NODE to run npm to ensure node is found
                    sh "${NODE} ${NPM} install"
                    sh "${NODE} ${NPM} run build"
                }
            }
        }

        stage('Docker Build Backend') {
            steps {
                sh "${DOCKER} build -t ${DOCKER_REGISTRY}/${BACKEND_IMAGE}:${BUILD_NUMBER} backend"
            }
        }

        stage('Docker Build Frontend') {
            steps {
                sh "${DOCKER} build -t ${DOCKER_REGISTRY}/${FRONTEND_IMAGE}:${BUILD_NUMBER} frontend"
            }
        }

        stage('Docker Push') {
            steps {
                sh "${DOCKER} push ${DOCKER_REGISTRY}/${BACKEND_IMAGE}:${BUILD_NUMBER}"
                sh "${DOCKER} push ${DOCKER_REGISTRY}/${FRONTEND_IMAGE}:${BUILD_NUMBER}"
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
