const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');
const UserCreateService = require('./UserCreateService');
const AppError = require('../utils/AppError');



describe("UserCreateService", () => {

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

    it("user not should be created with exists email", async () => {
        const user1 = {
            name: "User Test 1",
            email: "user@test.com",
            password: "123"
        };

        const user2 = {
            name: "User Test 2",
            email: "user@test.com",
            password: "456"
        };

        const userRepository = new UserRepositoryInMemory();
        const userCreateService = new UserCreateService(userRepository);

        await userCreateService.execute(user1);
                                                    // Espera que seja rejeitado com essa mensagem de erro
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso", 402));

        // Outra estratégia
        /*
            expect(async () => {
                await userCreateService.execute(user2)
            }).rejects.toEqual(new AppError("Este e-mail já está em uso", 402)); 
        */
    })

});