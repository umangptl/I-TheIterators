pipeline {
    agent any

    tools {
        maven "Mven"
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
    }
}
