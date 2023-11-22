pipeline {
    agent any

    tools {
        maven "Mven"
        nodejs "Node"
    }

    stages {
        stage('Build') {
            steps {
                bat "mvn -f SkillMatch/pom.xml clean install -DSkipTests"
            }
        }
        stage('Tests') {
            steps {
                bat "mvn -f SkillMatch/pom.xml test"
            }
        }
        stage('Package') {
            steps {
                bat "mvn -f SkillMatch/pom.xml package"
            }

            post {
                success {
                    junit '**/target/surefire-reports/TEST-*.xml'
                    archiveArtifacts 'SkillMatch/target/*.jar'
                }
            }
        }
        stage('Node Install') {
            steps {
                dir('skillmatch_frontend') {
                    bat 'npm install'
                }
            }
        }
        stage('React Build') {
            steps {
                dir('skillmatch_frontend') {
                    bat 'npm run build'
                }
            }
        }
    }
}
