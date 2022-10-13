// const database = require('../models')
// const Sequelize = require('sequelize');
const { PessoasServices } = require('../services/');
const pessoasServices = new PessoasServices();

class PessoaController {

    static async pegaTodasAsPessoasAtivas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params;
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(id));
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async criarPessoa(req, res) {
        const novaPesssoa = req.body;
        try {
            const novaPessoaCriada = await pessoasServices.criarRegistro(novaPesssoa);
            return res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await pessoasServices.atualizaRegistro(novasInfos, { id: Number(id)  });
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(Number(id));
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async removerPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.apagaRegistro(Number(id));
            return res.status(200).json({message: `O id ${id} foi deletado.`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restaurarPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.restauraRegistro(id);
            return res.status(200).json({message: `O id ${id} foi restuarado.`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            const umaPessoa = await database.Matriculas.findOne({ 
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                } 
            });
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criarMatricula(req, res) {
        const { estudanteId } = req.params;
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)};
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(novaMatriculaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const novasInfos = req.body;
        try {
            await database.Matriculas.update(novasInfos, { 
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }});
            const matriculaAtualizada = await database.Matriculas.findOne( { where: {
                id: Number(matriculaId),
            }});
            return res.status(200).json(matriculaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async removerMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.destroy({ 
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }});
            return res.status(200).json({message: `O id ${matriculaId} foi deletado.`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
          await database.Matriculas.restore({
            where: {
              id: Number(matriculaId),
              estudante_id: Number(estudanteId)
            }
          })
          return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }
    
    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            const umaPessoa = await database.Pessoas.findOne({ 
                where: {
                    id: Number(estudanteId),
                } 
            });

            const matriculas = await umaPessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    
    static async pegaMatriculasPorTurma(req, res) {
      const { turmaId } = req.params;
      try {
          const todasAsMatriculas = await database.Matriculas.findAndCountAll({
            where: {
              turma_id: Number(turmaId),
              status: 'confirmado'
            },
            limit: 20,
            order: [['estudante_id', 'ASC']]
          })
          return res.status(200).json(todasAsMatriculas);
      } catch (error) {
          return res.status(500).json(error.message);
      }
    }

    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2;
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
              where: {
                status: 'confirmado'
              },
              attributes: ['turma_id'],
              group: ['turma_id'],
              having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
      }

      static async cancelaPessoa(req, res) {
        const { estudanteId} = req.params
        try {
            await pessoasServices.cancelaPessoasEMatriculas(Number(estudanteId));
            return res.status(200).json({message: `matriculas ref. ao estudante ${estudanteId} canceladas.`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
      }
}

module.exports = PessoaController;