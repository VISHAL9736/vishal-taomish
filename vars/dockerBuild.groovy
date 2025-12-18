def call(String dir, String imageName, String tag) {
    sh "cd ${dir} && docker build -t ${imageName}:${tag} ."
}