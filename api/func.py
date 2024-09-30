class Funcionario:
    def __init__(self, id = None, nome = None, salario = None, dataCadastro = None):
        self._id = id
        self._nome = nome
        self._salario = salario
        self._dataCadastro = dataCadastro

    def toDict(self):
        return {
            'id': self._id,
            'nome': self._nome,
            'salario': self._salario
        }

    def fromDict(self, dicionario):
        self._id = dicionario['id']
        self._nome = dicionario['nome']
        self._salario = dicionario['salario']
        self._dataCadastro = dicionario['dataCadastro']

    @property
    def id(self):
        return self._id
    
    @id.setter
    def id(self, id):
        self._id = id
    
    @property
    def nome(self):
        return self._nome
    
    @nome.setter
    def nome(self, nome):
        self._nome = nome

    @property
    def salario(self):
        return self._salario
    
    @salario.setter
    def salario(self, salario):
        self._salario = salario

    @property
    def dataCadastro(self):
        return self._dataCadastro
    
    @dataCadastro.setter
    def dataCadastro(self, dataCadastro):
        self._dataCadastro = dataCadastro
    