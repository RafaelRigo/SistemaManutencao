import 'dart:ffi';

class Funcionario {
  final int id;
  final String nome;
  final double salario;
  final String dataCadastro;

  const Funcionario({
    required this.id,
    required this.nome,
    required this.salario,
    required this.dataCadastro,
  });

  factory Funcionario.fromJson(Map<String, dynamic> json) {
    return Funcionario(
      id: json['id'],
      nome: json['nome'],
      salario: json['salario'].toDouble(),
      dataCadastro: json['dataCadastro'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nome': nome,
      'salario': salario,
      'data_cadastro': dataCadastro,
    };
  }
}