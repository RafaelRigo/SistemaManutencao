class Funcionario {
    constructor() {
        this._id = 0;
        this._nome = '';
        this._salario = 0;
        this._dataCadastro = '';
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            salario: this.salario,
            dataCadastro: this.dataCadastro
        };
    }

    fromJSON(json) {
        this._id = json.id;
        this._nome = json.nome;
        this._salario = json.salario;
        this._dataCadastro = json.dataCadastro;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }

    get salario() {
        return this._salario;
    }

    set salario(salario) {
        this._salario = salario;
    }

    get dataCadastro() {
        return this._dataCadastro;
    }

    set dataCadastro(dataCadastro) {
        this._dataCadastro = dataCadastro;
    }
}

module.exports = Funcionario;