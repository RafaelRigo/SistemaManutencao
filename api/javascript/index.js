const Funcionario = require('./func');
const VetorFuncionario = require('./vetfunc');

const port = 3050;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let vetor = new VetorFuncionario();
let arq = '../dados.json';

app.get('/funcionario', (_req, res) => {
    vetor.lerDeArquivo(arq);
    let lista = Array.apply(null, Array(vetor.qtsFunc)).map(function () {});
    let qts = 0;
    for (let i = 0; i < vetor._qtsFunc; i++) {
        lista[i] = vetor._funcionarios[i].toJSON();
        qts++;
    }
    res.send(JSON.stringify(lista));
});

app.get('/funcionario/:id', (req, res) => {
    vetor.lerDeArquivo(arq);
    let id = parseInt(req.params.id);
    if (vetor.existeFuncionario(id)) {
        res.send(JSON.stringify(vetor._funcionarios[vetor._onde].toJSON()));
    } else {
        res.status(404).send('Funcionário não encontrado');
    }
});

app.post('/funcionario', (req, res) => {
    vetor.lerDeArquivo(arq);
    let f = new Funcionario();
    f.fromJSON(req.body);
    f.id = vetor.funcionarios[vetor._qtsFunc - 1].id + 1;
    f.dataCadastro = new Date();
    if (vetor.existeFuncionario(f.id)) {
        res.status(400).send('Funcionário já existe');
    } else {
        vetor.adicionarFuncionario(f);
        vetor.salvarEmArquivo(arq);
        res.status(201).send('Funcionário cadastrado com sucesso');
    }
});

app.put('/funcionario/:id', (req, res) => {
    vetor.lerDeArquivo(arq);
    let id = req.params.id;
    if (vetor.existeFuncionario(id)) {
        vetor._funcionarios[vetor._onde].fromJSON(req.body);
        vetor.salvarEmArquivo(arq);
        res.send('Funcionário atualizado com sucesso');
    } else {
        res.status(404).send('Funcionário não encontrado');
    }
});

app.delete('/funcionario/:id', (req, res) => {
    vetor.lerDeArquivo(arq);
    let id = req.params.id;
    if (vetor.existeFuncionario(id)) {
        vetor.removerFuncionario(vetor.funcionarios[vetor._onde].id);
        vetor.salvarEmArquivo(arq);
        res.status(204).send('Funcionário removido com sucesso');
    } else {
        res.status(404).send('Funcionário não encontrado');
    }
});

app.listen(port, () => {
    vetor.lerDeArquivo(arq);
    console.log(`Servidor rodando na porta ${port}`);
});