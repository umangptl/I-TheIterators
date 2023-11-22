pipeline {
    agent any

    tools {
        maven "Mven"
    }

    stages {
        stage('Build') {
            steps {
                bat "mvn -f SkillMatch/pom.xml clean install package"
            }

            post {
                // If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
                success {
                    junit '**/target/surefire-reports/TEST-*.xml'
                    archiveArtifacts 'target/*.jar'
                }
            }
        }
    }
}
