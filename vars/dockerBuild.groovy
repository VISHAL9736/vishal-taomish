def call(String dir, String imageName, String tag) {
    sh "${env.DOCKER} build -t ${imageName}:${tag} ${dir}"
}
