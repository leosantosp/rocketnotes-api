import axios from "axios";

// Exportação da api, onde vou acionar o método 'create' de dentro do axios e dentro dele eu repasso um objeto
// que irá conter as nossas configurações
export const api = axios.create({
    baseURL: "http://localhost:3333" // A parte do endereço da API que se repete em todas as rotas - Endereço do nosso servidor
});