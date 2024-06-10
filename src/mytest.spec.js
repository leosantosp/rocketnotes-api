// O it é uma função que recebe dois parametros (descrição do teste, funcao que vai executar o teste)
it("result of the sum of 2 + 2 must be 4", () => {
    const a = 2;
    const b = 2;    
    const result = a + b;

    // Trabalhamos com testes, trabalhamos com expectativa. utilizamos o expect(qual é a variável que queremos analisar)
    expect(result).toEqual(4);
});