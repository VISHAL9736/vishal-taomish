@Library('jenkins-shared-library') _

pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'vishal0786'
        BACKEND_IMAGE = 'todo-backend'
        FRONTEND_IMAGE = 'todo-frontend'
        MAVEN = '/Users/vishal/apache-maven-3.9.11/bin/mvn'
        DOCKER = '/usr/local/bin/docker'
        NODE_HOME = '/Users/vishal/.nvm/versions/node/v22.19.0'
        PATH = "/Users/vishal/.nvm/versions/node/v22.19.0/bin:/usr/local/bin:${env.PATH}"
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
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_TOKEN'
                )]) {
                    sh "${DOCKER} login -u $DOCKER_USER -p $DOCKER_TOKEN"
                }
            }
        }

        stage('Docker Build') {
            steps {
                dockerBuild(
                    'backend',
                    "${DOCKER_REGISTRY}/${BACKEND_IMAGE}",
                    BUILD_NUMBER
                )

                dockerBuild(
                    'frontend',
                    "${DOCKER_REGISTRY}/${FRONTEND_IMAGE}",
                    BUILD_NUMBER
                )
            }
        }

        stage('Docker Push') {
            steps {
                dockerPush(
                    "${DOCKER_REGISTRY}/${BACKEND_IMAGE}",
                    BUILD_NUMBER
                )

                dockerPush(
                    "${DOCKER_REGISTRY}/${FRONTEND_IMAGE}",
                    BUILD_NUMBER
                )
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
