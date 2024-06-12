const UserCreateService = require('./UserCreateService');

// O it é uma função que recebe dois parametros (descrição do teste, funcao que vai executar o teste)
it("user should be create", () => {
    // Primeiro teste é verificar se o usuário é criado com sucesso
    const user = {
        name: "User Test",
        email: "user@teste.com",
        password: "123"
    };
    
    //Executar testes de forma independente do banco de dados
    const userCreateService = new UserCreateService();
    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");


});