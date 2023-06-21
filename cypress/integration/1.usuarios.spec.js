/// <reference types="cypress" />
import Serverest from "../services/serverest.service";
import ValidaServerest from "../services/validaServerest.service";
import Factory from "../fixtures/factory"

describe('Casos de teste sobre a rota /usuarios da API Serverst',() =>{
    it('Deve buscar todos os usuários cadastrados na serverest',() =>{
      Serverest.buscarUsuarios().then(res =>{
        ValidaServerest.validarBuscaDeUsuarios(res);
      }

    )
})
    it('Não deve postar um novo administrador existente',() => {
        cy.postarUsuarioSemSucesso().then(res => {
            expect(res).to.be.a('object');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.be.eq('Este email já está sendo usado');

         })
    })
    it('Deve realizar login com sucesso',() => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario =>{
            Serverest.logar(usuario).then(res => {    
                ValidaServerest.validaLoginComSucesso(res);
                Serverest.salvarBearer(res);

        })
     })
   })
  it.only('Deve buscar e salvar um usuario em um arquivo json',() =>{
    let inteiro = Factory.gerarInteiroAleatorio();
    Serverest.buscarUsuarios().then(res =>{
      cy.log(JSON.stringify(res.body.usuarios[inteiro]));
      cy.writeFile("./cypress/fixtures/usuarios.json",JSON.stringify(res.body.usuarios[1]))
      ValidaServerest.validarBuscaDeUsuarios(res);

  })
})
it.only('Deve buscar o usuário de um arquivo json',() => {
  cy.fixture("usuarios.json").then( json =>{
    let usuario = {
      email:json.email,
      password: json.password
    }
    Serverest.logar(usuario).then(res =>{
      ValidaServerest.validaLoginComSucesso(res)
;      Serverest.salvarBearer(res)
    }
    )
  })
})

})
