import json
from func import Funcionario

class VetorFuncionario:
    def __init__(self):
        self._funcionarios = [None] * 10
        self._qtsFunc = 0
        self._onde = 0
    
    def lerDeArquivo(self, nomeArquivo):
        try:
            arquivo = open(nomeArquivo, 'r', encoding='utf-8')
            dados = json.load(arquivo)
            self._funcionarios = [None] * 10
            self._qtsFunc = 0
            self._onde = 0
            for i in range(len(dados)):
                f = Funcionario()
                f.fromDict(dados[i])
                self._funcionarios[self._qtsFunc] = f
                self._qtsFunc += 1
            arquivo.close()
        except FileNotFoundError:
            print('Arquivo não encontrado')
        except Exception as erro:
            print(f'Ocorreu um erro: {erro}')
    
    def salvarEmArquivo(self, nomeArquivo):
        try:
            arquivo = open(nomeArquivo, 'w', encoding='utf-8')
            lista = [None] * len(self._funcionarios)
            qts = 0
            for i in range(self._qtsFunc):
                lista[qts] = self._funcionarios[i].toDict()
                qts += 1
            json.dump(lista, arquivo)
            arquivo.close()
        except Exception as erro:
            print(f'Ocorreu um erro: {erro}')
    
    def expandirVetor(self):
        novo = [None] * (len(self._funcionarios) * 2)
        for i in range(self._qtsFunc):
            novo[i] = self._funcionarios[i]
        self._funcionarios = novo

    def existeFuncionario(self, id):
        inicio = 0
        fim = self._qtsFunc - 1
        while inicio <= fim:
            self._onde = (inicio + fim) // 2
            if self._funcionarios[self._onde].id == id:
                return True
            if self._funcionarios[self._onde].id < id:
                inicio = self._onde + 1
            else:
                fim = self._onde - 1
        
    def adicionarFuncionario(self, func):
        if (not self.existeFuncionario(func.id)):
            if self._qtsFunc == len(self._funcionarios):
                self.expandirVetor()
            self._funcionarios[self._qtsFunc] = func
            self._qtsFunc += 1
    
    def removerFuncionario(self, id):
        if self.existeFuncionario(id):
            for i in range(self._onde, self._qtsFunc - 1):
                self._funcionarios[i] = self._funcionarios[i + 1]
            self._qtsFunc -= 1
    
    def buscarFuncionario(self, id):
        if self.existeFuncionario(id):
            return self._funcionarios[self._onde]
        return None

    @property
    def funcionarios(self):
        return self._funcionarios
    
    @funcionarios.setter
    def funcionarios(self, funcionarios):
        self._funcionarios = funcionarios

    @property
    def qtsFunc(self):
        return self._qtsFunc
    
    @qtsFunc.setter
    def qtsFunc(self, qtsFunc):
        self._qtsFunc = qtsFunc

    @property
    def onde(self):
        return self._onde
    
    @onde.setter
    def onde(self, onde):
        self._onde = onde