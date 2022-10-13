const Servicos = require('./Servicos');
const database = require('../models');

class PessoasServices extends Servicos{
    constructor() {
        super('Pessoas');
        this.matriculasServices = new Servicos('Matriculas')
    }

    async pegaRegistrosAtivos (where = {}) {
        return database[this.nomeDoModelo].findAll({ where: {...where}});
    }

    async pegaTodosOsRegistros (where = {}) {
        return database[this.nomeDoModelo].scope('todos').findAll({ where: {...where}});
    }

    async cancelaPessoasEMatriculas(estudanteId) {
        return database.sequelize.transaction( async transacao => {
            await super.atualizaRegistro(
                { ativo: false }, 
                estudanteId, 
                { transaction: transacao })
            
            await this.matriculasServices.atualizaRegistros (
                { status: 'cancelado'}, 
                { estudante_id: Number(estudanteId) }, 
                { transaction: transacao }
            )
        });
    }
}

module.exports = PessoasServices;