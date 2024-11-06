require('dotenv').config();
const port = process.env.PORT;
const stringConnect = process.env.CONNECTION_STRING;

const mssql = require('mssql');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

async function conectaBD() {
    try {
        await mssql.connect(stringConnect);
        const result = await mssql.query('SELECT * FROM sismanu.funcionario');
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

conectaBD();

async function execQuery(query) {
    try {
        const request = new mssql.Request();
        const { recordset } = await request.query(query);
        return recordset;
    } catch (err) {
        console.error(err);
    }
}

app.get('/sismanu.funcionario', async (_req, res) => {
    const result = await execQuery('SELECT * FROM sismanu.funcionario');
    res.send(result);
});

app.get('/sismanu.funcionario/:id', async (req, res) => {
    const id = req.params.id;
    const result = await execQuery(`SELECT * FROM sismanu.funcionario WHERE id = ${id}`);
    res.send(result);
});

app.post('/sismanu.funcionario', async (req, res) => {
    const { nome, salario } = req.body;
    const result = await execQuery(`INSERT INTO sismanu.funcionario (nome, salario) VALUES ('${nome}', ${salario}, GETDATE())`);
    res.send(result);
});

app.put('/sismanu.funcionario/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, salario } = req.body;
    const result = await execQuery(`UPDATE sismanu.funcionario SET nome = '${nome}', salario = ${salario} WHERE id = ${id}`);
    res.send(result);
});

app.delete('/sismanu.funcionario/:id', async (req, res) => {
    const id = req.params.id;
    const result = await execQuery(`DELETE FROM sismanu.funcionario WHERE id = ${id}`);
    res.send(result);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});