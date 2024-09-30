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

@app.route('/funcionarios', methods=['GET'])
def listar():
    vetor.lerDeArquivo(arq)
    lista = [None] * vetor.qtsFunc
    qts = 0
    for i in range(vetor.qtsFunc):
        lista[qts] = vetor.funcionarios[i].toDict()
        qts += 1
    return jsonify(lista)

@app.route('/funcionarios/<int:id>', methods=['GET'])
def buscar(id):
    vetor.lerDeArquivo(arq)
    if vetor.existeFuncionario(id):
        return jsonify(vetor.funcionarios[vetor.onde].toDict())
    return 'Funcionário não encontrado', 404

@app.route('/funcionarios', methods=['POST'])
def inserir():
    vetor.lerDeArquivo(arq)
    dados = request.json
    dados['dataCadastro'] = datetime.now().isoformat()
    f = Funcionario()
    f.fromDict(dados)
    if vetor.existeFuncionario(f.id):
        return 'Funcionário já existe', 400
    vetor.adicionarFuncionario(f)
    return jsonify(f.toDict()), 201

@app.route('/funcionarios/<int:id>', methods=['PUT'])
def alterar(id):
    vetor.lerDeArquivo(arq)
    dados = request.json
    f = Funcionario()
    f.fromDict(dados)
    if not vetor.existeFuncionario(id):
        return 'Funcionário não encontrado', 404
    vetor.funcionarios[vetor.onde] = f
    return jsonify(f.toDict())

@app.route('/funcionarios/<int:id>', methods=['DELETE'])
def remover(id):
    vetor.lerDeArquivo(arq)
    if not vetor.existeFuncionario(id):
        return 'Funcionário não encontrado', 404
    vetor.removerFuncionario(id)
    return '', 204

if __name__ == '__main__':
    app.run(port=3050)
    vetor.lerDeArquivo(arq)