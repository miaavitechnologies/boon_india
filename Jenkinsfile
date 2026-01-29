pipeline {
  agent any

  environment {
    CI = 'true'
    NODE_VERSION = 'lts/*'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Setup Node.js') {
      steps {
        sh '''
          node --version || (echo "Node.js not found, installing..." && nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION})
        '''
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm run ci'
      }
    }
  }

  post {
    always {
      publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright HTML Report',
        keepAll: true
      ])
      archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
    }
    failure {
      archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
      archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
    }
    success {
      echo 'All tests passed successfully!'
    }
  }
}
