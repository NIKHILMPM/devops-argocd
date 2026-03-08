@Library('my-shared-lib') _

pipeline {
    agent any

    stages {

        
        stage('Trigger Check') {
            steps {
                echo "Pipeline triggered for build #${env.BUILD_NUMBER}"
            }
        }

        stage('Checkout Dev Branch') {
            steps {
                git branch: 'dev',
                    url: 'https://github.com/NIKHILMPM/devops-argocd.git'
            }
        }

        stage('Detect Changed Services') {
            steps {
                script {

                    def imageDirName = sh(
                        script: "git diff HEAD~1 --name-only | cut -d/ -f1 | sort -u",
                        returnStdout: true
                    ).trim()

                    echo "Changed services:"
                    echo "${imageDirName}"

                    def allServices = ["frontend", "api-gateway", "orderms", "userms"]

                    if (env.BUILD_NUMBER == "1") {

                        echo "First build - building all services"

                        allServices.each { service ->
                            buildPushAndUpdateManifest(
                                "github-creds",
                                "dockerhub-creds",
                                "ramachandrampm",
                                service,
                                env.BUILD_NUMBER,
                                "dev"  
                            )
                        }

                    } else {

                        if (!imageDirName) {
                            echo "No service changes detected."
                            return
                        }

                        def changedServices = imageDirName.split("\n")

                        changedServices.each { service ->
                            if (allServices.contains(service)) {

                                echo "Building changed service: ${service}"

                                buildPushAndUpdateManifest(
                                    "github-creds",
                                    "dockerhub-creds",
                                    "ramachandrampm",
                                    service,
                                    env.BUILD_NUMBER,
                                    "dev"  
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
