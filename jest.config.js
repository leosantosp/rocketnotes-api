module.exports = {
  bail: true, // Ele faz o seguinte, ele vem desligado por padrão, se um teste falhar, ele para de executar os testes ali. Se o bail tiver false, se no 2° falhar, ele segue a execução
  coverageProvider: "v8",

  /* 
    Passamos um vetor e usamos uma expressão regular para dizer qual o padrão dos arquivos de teste
    Na hora que o teste for executar, ele irá ignorar os outros arquivos e irá direto nos arquivos de teste. 
    No caso abaixo, eles estão em qualquer pasta, podem ter qualquer nome, mas a extensão dele, terá ".spec.js"

    Não tem necessidade dos testes utilizar o 'node_modules', para isso, utilizamos a variável global <rootDir> que pega a raíz do projeto
    Partindo da raíz, olhe apenas a pasta 'src' onde temos os arquivos desenvolvidos. 
  */
  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ],
};