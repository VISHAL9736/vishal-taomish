def call(String imageName, String tag) {
    sh "${env.DOCKER} push ${imageName}:${tag}"
}
