/* A responsabilidade de conhecer as rotas do usuário é desse arquivo */

//Só que o app ele não conhece, então vou importar o Router dentro do próprio express e vou criar uma constane de usersRoutes = ROuter() e inicializo ele

const { Router } = require('express');
const UsersController = require('../controllers/UsersController');
const UserAvatarController = require('../controllers/UserAvatarController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const usersRoutes = Router();

const upload = multer(uploadConfig.MULTER);

// Create não irá precisar, pois neste momento ele está criando a conta, nem conta ele tem, então não tem o que autenticar
usersRoutes.post("/", usersController.create); 

//Atualizar o perfil, ele precisa estar autenticado
// "path", "middleware", "function"
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/:id", ensureAuthenticated, usersController.delete);

                                                            // nome do campo que receberá esse arquivo
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

// Só que agora eu preciso de alguma forma preciso expor essas minhas rotas pro meu server.js, pois eu tirei as rotas de lá. ENtão preciso expor elas desta forma
module.exports = usersRoutes; 
//Estou exportando para quem quiser usar esse arquivo, poder utilizar



