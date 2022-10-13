const database = require('../models');

class Servicos {
    
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo;
    }

    async criarRegistro(obj) {
        return database[this.nomeDoModelo].create(novaPesssoa)
    }

    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll();
    }

    async pegaUmRegistro(id) {
        return  database[this.nomeDoModelo].findOne({ where: {id: id} })
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoModelo].update(
            dadosAtualizados, 
            {where: {id: id}},
            transacao
        );
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoModelo].update(
            dadosAtualizados, 
            {where: {...where}},
            transacao
        );
    }

    async apagaRegistro(id) {
        return database[this.nomeDoModelo].destroy({ where: {id: id} })
    }

    async restauraRegistro(id) {
        return database[this.nomeDoModelo].restore({ where: {id: id} })
    }
}

module.exports = Servicos;