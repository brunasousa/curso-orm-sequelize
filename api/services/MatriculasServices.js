const Servicos = require('./Servicos');

class MatriculasServices extends Servicos{
    constructor() {
        super('Matriculas');
    }
}

module.exports = MatriculasServices;