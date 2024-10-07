import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'relatorio.dart';
import 'cadastro.dart';
import 'remocao.dart';
import 'atualizacao.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MyAppState(),
      child: MaterialApp(
        title: 'Namer App',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF333333)),
        ),
        home: MyHomePage(),
      ),
    );
  }
}

class MyAppState extends ChangeNotifier {
  @override
  void notifyListeners() {
    super.notifyListeners();
  }
}

class MyHomePage extends StatefulWidget {
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  var selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget page;
    switch (selectedIndex) {
      case 0:
      page = Relatorio();
        break;
      default:
        throw Exception('Invalid index: $selectedIndex');
    }
    return LayoutBuilder(
      builder: (context, constraints) {
        return Scaffold(
          body: Row(
            children: [
              SafeArea(
                child: NavigationRail(
                  extended: constraints.maxWidth >= 600,
                  minExtendedWidth: 200,
                  selectedIndex: selectedIndex,
                  onDestinationSelected: (value) {
                    setState(() {
                      selectedIndex = value;
                    });
                  },
                  destinations: [
                    NavigationRailDestination(
                      icon: Icon(Icons.report),
                      selectedIcon: Icon(Icons.report),
                      label: Text('Relatório'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.add),
                      selectedIcon: Icon(Icons.add),
                      label: Text('Cadastro'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.remove),
                      selectedIcon: Icon(Icons.remove),
                      label: Text('Remoção'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.update),
                      selectedIcon: Icon(Icons.update),
                      label: Text('Atualização'),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Container(
                  padding: EdgeInsets.all(16),
                  color: Theme.of(context).colorScheme.primaryContainer,
                  child: page,
                )
              )
            ],
          )
        );
      }
    );
  }
}