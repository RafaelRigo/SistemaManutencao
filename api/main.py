import json
from func import Funcionario
from vetfunc import VetorFuncionario
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

vetor = VetorFuncionario()
arq = 'api/dados.json'

@app.route('/funcionario', methods=['GET'])
def listar():
    vetor.lerDeArquivo(arq)
    lista = [None] * vetor.qtsFunc
    qts = 0
    for i in range(vetor.qtsFunc):
        lista[qts] = vetor.funcionarios[i].toDict()
        qts += 1
    return jsonify(lista)

@app.route('/funcionario/<int:id>', methods=['GET'])
def buscar(id):
    vetor.lerDeArquivo(arq)
    if vetor.existeFuncionario(id):
        return jsonify(vetor.funcionarios[vetor.onde].toDict())
    return 'Funcionário não encontrado', 404

@app.route('/funcionario', methods=['POST'])
def inserir():
    vetor.lerDeArquivo(arq)
    dados = request.json
    dados['id'] = vetor.funcionarios[vetor.qtsFunc-1].id + 1
    dados['dataCadastro'] = datetime.today().isoformat().split("T")[0]
    print(dados['dataCadastro'])
    f = Funcionario()
    f.fromDict(dados)
    if vetor.existeFuncionario(f.id):
        return 'Funcionário já existe', 400
    vetor.adicionarFuncionario(f)
    vetor.salvarEmArquivo(arq)
    return jsonify(f.toDict()), 201

@app.route('/funcionario/<int:id>', methods=['PUT'])
def alterar(id):
    vetor.lerDeArquivo(arq)
    dados = request.json
    f = Funcionario()
    f.fromDict(dados)
    if not vetor.existeFuncionario(id):
        return 'Funcionário não encontrado', 404
    vetor.funcionarios[vetor.onde] = f
    vetor.salvarEmArquivo(arq)
    return jsonify(f.toDict())

@app.route('/funcionario/<int:id>', methods=['DELETE'])
def remover(id):
    vetor.lerDeArquivo(arq)
    if not vetor.existeFuncionario(id):
        return 'Funcionário não encontrado', 404
    vetor.removerFuncionario(id)
    vetor.salvarEmArquivo(arq)
    return '', 204

if __name__ == '__main__':
    app.run(port=3050)
    vetor.lerDeArquivo(arq)