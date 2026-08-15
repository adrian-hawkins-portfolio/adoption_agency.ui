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
                        git config user.email "jenkins-bot@ci.com"
                    '''
                }
            }
        }

        stage('Bump and Tag') {
            steps {
                container('jnlp') {
                    withCredentials([usernamePassword(
                        credentialsId: 'github-push-token',
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_TOKEN'
                    )]) {
                        sh '''
                            REPO_URL=$(git remote get-url origin | sed "s#https://#https://${GIT_USER}:${GIT_TOKEN}@#")
                            git remote set-url origin "$REPO_URL"
                        '''
                        script {
                            def newVersion = bumpAndTag()
                            echo "New version: ${newVersion}"
                        }
                    }
                }
            }
        }
    }
}