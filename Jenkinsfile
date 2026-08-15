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
                    script {
                        def newVersion = bumpAndPushTag()
                        echo "New version: ${newVersion}"
                    }
                }
            }
        }
    }
}