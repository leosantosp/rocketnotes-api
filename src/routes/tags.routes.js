/* A responsabilidade de conhecer as rotas do usuário é desse arquivo */

//Só que o app ele não conhece, então vou importar o Router dentro do próprio express e vou criar uma constane de usersRoutes = ROuter() e inicializo ele

const { Router } = require('express');
const TagsController = require('../controllers/TagsController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');


const tagsRoutes = Router();
const tagsController = new TagsController();


tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

// Só que agora eu preciso de alguma forma preciso expor essas minhas rotas pro meu server.js, pois eu tirei as rotas de lá. ENtão preciso expor elas desta forma
module.exports = tagsRoutes; 
//Estou exportando para quem quiser usar esse arquivo, poder utilizar