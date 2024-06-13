const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');
const UserCreateService = require('./UserCreateService');

// O it é uma função que recebe dois parametros (descrição do teste, funcao que vai executar o teste)
it("user should be create", async () => {
    // Primeiro teste é verificar se o usuário é criado com sucesso
    const user = {
        name: "User Test",
        email: "user@teste.com",
        password: "123"
    };
    
    //Executar testes de forma independente do banco de dados
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepositoryInMemory);
    const userCreated = await userCreateService.execute(user);

    console.log(userCreated);

    expect(userCreated).toHaveProperty("id");


});