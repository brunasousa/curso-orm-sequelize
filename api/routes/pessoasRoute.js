const {Router} = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/ativas', PessoaController.pegaTodasAsPessoasAtivas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula);
router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas);
router.get('/pessoas/matricula/:turmaId/confirmados', PessoaController.pegaMatriculasPorTurma);
router.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas);
router.post('/pessoas', PessoaController.criarPessoa);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
router.post('/pessoas/:estudanteId/matricula', PessoaController.criarMatricula);
router.post('/pessoas/:id/restaura', PessoaController.restaurarPessoa);
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatricula);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.removerMatricula);
router.delete('/pessoas/:id', PessoaController.removerPessoa);

module.exports = router;