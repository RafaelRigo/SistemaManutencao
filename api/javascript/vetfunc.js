const Funcionario = require('./func.js');
const fs = require('fs');

class VetorFuncionario {
    constructor() {
        this._funcionarios = Array.apply(null, Array(10)).map(function () {});
        this._qtsFunc = 0;
        this._onde = 0;
    }

    lerDeArquivo(nomeArquivo) {
        try {
            fs.readFile(nomeArquivo, 'utf-8', (err, data) => {
                let dados = JSON.parse(data);
                this._funcionarios = Array.apply(null, Array(10)).map(function () {});
                this._qtsFunc = 0;
                this._onde = 0;
                for (let i = 0; i < dados.length; i++) {
                    if (this._qtsFunc == this._funcionarios.length) {
                        this.expandirVetor();
                    }
                    let f = new Funcionario();
                    f.fromJSON(dados[i]);
                    this._funcionarios[this._qtsFunc] = f;
                    this._qtsFunc++;
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    salvarEmArquivo(nomeArquivo) {
        try {
            let lista = Array.apply(null, Array(this._qtsFunc)).map(function () {});
            for (let i = 0; i < this._qtsFunc; i++) {
                lista[i] = this._funcionarios[i].toJSON();
            }
            console.log(lista);
            fs.writeFileSync(nomeArquivo, JSON.stringify(lista, null, 4), 'utf-8');
        } catch (e) {
            console.log(e);
        }
    }

    expandirVetor() {
        let novo = Array.apply(null, Array(this._funcionarios.length * 2)).map(function () {});
        for (let i = 0; i < this._funcionarios.length; i++) {
            novo[i] = this._funcionarios[i];
        }
        this._funcionarios = novo;
    }

    existeFuncionario(id) {
        let inicio = 0;
        let fim = this._qtsFunc - 1;
        while (inicio <= fim) {
            this._onde = Math.floor((inicio + fim) / 2);
            if (this._funcionarios[this._onde].id == id) {
                return true;
            }
            if (this._funcionarios[this._onde].id < id) {
                inicio = this._onde + 1;
            } else {
                fim = this._onde - 1;
            }
        }
        return false;
    }

    adicionarFuncionario(func) {
        if (!this.existeFuncionario(func.id)) {
            if (this._qtsFunc == this._funcionarios.length) {
                this.expandirVetor();
            }
            this._funcionarios[this._qtsFunc] = func;
            this._qtsFunc++;
        }
    }

    removerFuncionario(id) {
        if (this.existeFuncionario(id)) {
            console.log(this._funcionarios[this._onde]);
            for (let i = this._onde; i < this._qtsFunc - 1; i++) {
                this._funcionarios[i] = this._funcionarios[i + 1];
            }
            this._qtsFunc--;
        }
    }

    buscarFuncionario(id) {
        if (this.existeFuncionario(id)) {
            return this._funcionarios[this._onde];
        }
        return null;
    }

    get funcionarios() {
        return this._funcionarios;
    }

    set funcionarios(funcionarios) {
        this._funcionarios = funcionarios;
    }

    get qtsFunc() {
        return this._qtsFunc;
    }

    set qtsFunc(qtsFunc) {
        this._qtsFunc = qtsFunc;
    }

    get onde() {
        return this._onde;
    }

    set onde(onde) {
        this._onde = onde;
    }
}

module.exports = VetorFuncionario;