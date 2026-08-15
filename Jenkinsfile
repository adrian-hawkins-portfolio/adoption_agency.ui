@Library('jenkins-shared-library') _

pipeline {
    agent {
        kubernetes {
            label 'docker-agent'
        }
    }

    stages {

        stage('Checkout') {
            steps {
                container('jnlp') {
                    checkout scm
                }
            }
        }

        stage('Configure git identity') {
            steps {
                container('jnlp') {
                    sh '''
                        git config user.name "jenkins-bot"
                        git config user.email "jenkins-bot@yourcompany.com"
                    '''
                }
            }
        }

        stage('Bump and Tag') {
            steps {
                container('jnlp') {
                    withCredentials([usernamePassword(
                        credentialsId: 'github-push-creds',
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_TOKEN'
                    )]) {
                        // sh '''
                        //     git remote set-url origin https://${GIT_USER}:${GIT_TOKEN}@github.com/your-org/your-repo.git
                        // '''
                        script {
                            def newVersion = bumpAndPushTag()
                            echo "New version: ${newVersion}"
                        }
                    }
                }
            }
        }
    }
}