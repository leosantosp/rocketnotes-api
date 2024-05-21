/* A responsabilidade de conhecer as rotas do usuário é desse arquivo */

//Só que o app ele não conhece, então vou importar o Router dentro do próprio express e vou criar uma constane de usersRoutes = ROuter() e inicializo ele

const { Router } = require('express');
const NotesController = require('../controllers/NotesController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated); // Middleware de autenticação, utilizará em todas as rotas de notes

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

// Só que agora eu preciso de alguma forma preciso expor essas minhas rotas pro meu server.js, pois eu tirei as rotas de lá. ENtão preciso expor elas desta forma
module.exports = notesRoutes; 
//Estou exportando para quem quiser usar esse arquivo, poder utilizar