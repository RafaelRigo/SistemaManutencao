const paginaPrincipal = () => {
    const resumo = document.getElementById('resumo');
    const tabela = document.getElementById('func');
    const filtro = document.getElementById('filtro')
    fetch('http://localhost:3050/funcionario')
        .then(res => res.json())
        .then(data => {
            let dados = data
            html = '';
            html += `<p>Quantidade de funcionários: ${data.length}</p>`;
            console.log(data)
            
            const datas = []
            for (let i = 0; i < data.length; i++) {
                const dat = data[i].dataCadastro.split('-')
                const y = dat[0]
                const m = dat[1] - 1
                const d = dat[2]
                datas[i] = new Date(y, m, d)
            }

            const ultimaData = new Date(Math.max(...datas))

            html += `<p>Último cadastro: ${ultimaData == undefined ? "não houve cadastros" : `${ultimaData.getDate()}/${ultimaData.getMonth() + 1}/${ultimaData.getFullYear()}`}</p>`;
            resumo.innerHTML = html;

            html = `<tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Salário</th>
                        <th>Data do Cadastro</th>
                    </tr>`;

            let min = Number.MAX_SAFE_INTEGER;
            let aux = 0;
            switch (filtro.value) {
                case 'id':
                    for (let i = 0; i < dados.length-1; i++) {
                        min = i;
                        for (let j = i + 1; j < dados.length; j++) {
                            if (dados[j].id < dados[min].id) {
                                min = j;
                            }
                        }
                        if (i != min) {
                            aux = dados[i];
                            dados[i] = dados[min];
                            dados[min] = aux;
                        }
                    }
                    break;
                case 'nome':
                    for (let i = 0; i < dados.length-1; i++) {
                        min = i;
                        for (let j = i + 1; j < dados.length; j++) {
                            if (dados[j].nome.localeCompare(dados[min].nome)) {
                                min = j;
                            }
                        }
                        if (i != min) {
                            aux = dados[i];
                            dados[i] = dados[min];
                            dados[min] = aux;
                        }
                    }
                    break;
                case 'salario':
                    for (let i = 0; i < dados.length-1; i++) {
                        min = i;
                        for (let j = i + 1; j < dados.length; j++) {
                            if (dados[j].salario < dados[min].salario) {
                                min = j;
                            }
                        }
                        if (dados[i] != dados[min]) {
                            aux = dados[i];
                            dados[i] = dados[min];
                            dados[min] = aux;
                        }
                    }
                    break;
            }

            for (let i = 0; i < data.length; i++) {
                const dat = `${datas[i].getDate()}/${datas[i].getMonth() + 1}/${datas[i].getFullYear()}`
                html += `<tr>
                            <td>${dados[i].id}</td>
                            <td>${dados[i].nome}</td>
                            <td>${dados[i].salario}</td>
                            <td>${dat}</td>
                        </tr>`
            }

            tabela.innerHTML = html
        });
}

const pesquisar = () => {
    const busca = document.getElementById('buscar').value.trim().toLowerCase()
    document.querySelectorAll('tr').forEach(tr => {
        let existe = false;
        tr.querySelectorAll('td').forEach(td => {
            if (td.textContent.toLowerCase().includes(busca) || busca == '') {
                tr.style.display = 'table-row';
                existe = true
            } else if (!existe) {
                tr.style.display = 'none';
            }
        })
    })
}

const fazerCadastro = () => {
    const nome = document.getElementById('nome').value;
    const salario = document.getElementById('salario').value;
    fetch('http://localhost:3050/funcionario', {
        method: "POST",
        body: JSON.stringify({nome, salario}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((res) => {
        if (res.ok)
            alert(`Funcionário ${nome} cadastrado com salário de ${salario}`)
    })
}