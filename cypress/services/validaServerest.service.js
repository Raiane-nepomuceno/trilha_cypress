export default class ValidaServerest{
    //validações das ações que podem ser realizadas na API
    //validar: buscas,cadastros e login de usuaários
    
static validarBuscaDeUsuarios(resposta){
        expect(resposta).to.be.a('object');
        expect(resposta.body.quantidade).to.be.a('number');
        expect(resposta.body.quantidade).to.be.greaterThan(3);
}
static validaLoginComSucesso(resposta){
    expect(resposta).to.be.a('object');
    expect(resposta.body.message).to.be.a('string');
    expect(resposta.body).to.haveOwnProperty('authorization');

}
static validarBuscaDeProdutos(resposta){
    expect(resposta).to.be.a('object');
    expect(resposta.body.quantidade).to.be.a('number');
    expect(resposta.body.produtos[0]).to.haveOwnProperty('nome');
    expect(resposta.body.produtos[0]).to.haveOwnProperty('preco');
    expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao');

}
static validarCadastroProdutoComSucesso(resposta){
    expect(resposta).to.be.a('object');
    expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso');
    expect(resposta.body).to.haveOwnProperty('_id');

}
}