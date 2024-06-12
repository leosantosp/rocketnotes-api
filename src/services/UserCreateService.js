const { hash } = require('bcryptjs');
const AppError = require('../utils/AppError');

class UserCreateService {
    constructor(userRepository){ // O que vc colocar dentro do parenteses, precisa ser informado no momento de instanciar a classe
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }){

        // const userRepository = new UserRepository();

        const checkUserExists = await this.userRepository.findByEmail(email);

        if(checkUserExists){
            throw new AppError('Este e-mail já está em uso', 402);
        }

        const hashedPassword = await hash(password, 8);

        

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

        return userCreated;
    }

}

module.exports = UserCreateService;