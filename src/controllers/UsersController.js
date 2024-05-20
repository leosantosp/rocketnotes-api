const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');


class UsersController {
    
    async create(request, response){
        const { name, password, email } = request.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(checkUserExists){
            throw new AppError('Este e-mail já está em uso', 402);
        }

        const hashedPassword = await hash(password, 8);

        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [name, email, hashedPassword]
        );

        return response.status(201).json();


        // if(!name){
        //     throw new AppError("Nome é obrigatório");
        // }

        // response.status(201).json({name, password, email});
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        if(!user){
            throw new AppError('Usuário não encontrado', 404);
        }

        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso.");
        }

        user.name = name ?? user.name; //Se existir conteúdo dentro de nome, altere, se não, mantenha
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para redefinir sua senha");
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET 
            name = ?, 
            email = ?, 
            password = ?, 
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, id]);

        return response.json();

    }

    async delete(request, response){
        const { password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const userExists = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        if(!userExists){
            throw new AppError("Usuário não encontrado", 404);
        }

        const passwordValid = await compare(password, userExists.password);

        if(!passwordValid){
            throw new AppError("Senha não corresponde a senha do usuário. Exclusão não foi realizada");
        }

        await database.run("DELETE FROM users WHERE id = (?)", [id]);

        return response.json("Usuário excluído com sucesso");

    }

}

module.exports = UsersController;