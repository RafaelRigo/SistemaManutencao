import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'func.dart';
import 'main.dart';

Future<List<Funcionario>> fetchFuncionarios() async {
  final response = await http.get(Uri.parse('http://localhost:3050/funcionario'));

  if (response.statusCode == 200) {
    List<Funcionario> funcionarios = [];
    final res = json.decode(response.body);
    funcionarios.addAll(List<Funcionario>.from(
      (res).map((i) => Funcionario.fromJson(i))
    ));
    return funcionarios;
  } else {
    throw Exception('Falha em carregar funcionarios');
  }
}

class Relatorio extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();

    final theme = Theme.of(context);

    final  funcionarios = fetchFuncionarios();

    for

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Relatório', style: theme.textTheme.headlineLarge),
          SizedBox(height: 20)

        ],
      ),
    );
  }
}