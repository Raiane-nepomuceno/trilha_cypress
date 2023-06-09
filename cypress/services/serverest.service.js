const URL_USUARIOS = '/usuarios';
const URL_LOGIN = '/login';
const URL_PRODUTOS = '/produtos';
const URL_CARRINHOS = '/carrinhos';

export default class Serverest{
    //ações realizadas na API
    //buscar,cadastrar e realizar login de usuaários

static buscarUsuarios(){
    return cy.rest('GET', URL_USUARIOS);
}
static buscarUsuarioParaLogin(){
    cy.request(URL_USUARIOS).then(res =>{
        cy.wrap({
            email: res.body.usuarios[0].email,
            password: res.body.usuarios[0].password,
        }).as('usuarioLogin')
    })
}
static logar(usuario){
    return cy.rest('POST', URL_LOGIN, usuario)
}
static salvarBearer(resposta){
    Cypress.env('bearer',resposta.body.authorization.slice(7));
    cy.log('>>>'+ Cypress.env('bearer'));
}
//Produtos//
static buscarProdutos(){
    return cy.rest('GET', URL_PRODUTOS);

}
static cadastrarProdutoComSucesso(){
    cy.log('BEARER >> '+Cypress.env('bearer'))
    return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome":"Fone Marrom",
                "preco":"30",
                "descricao":"Fone",
                "quantidade":"100",
            },
            failOnStatusCode: true,
            auth:{
                bearer: Cypress.env("bearer")
            }
    })
}
}