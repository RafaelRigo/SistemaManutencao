const paginaPrincipal = () => {
    const resumo = document.getElementById('resumo');
    const tabela = document.getElementById('func');
    fetch('http://localhost:3050/funcionarios')
        .then(res => res.json())
        .then(data => {
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

            for (let i = 0; i < data.length; i++) {
                const dat = `${datas[i].getDate()}/${datas[i].getMonth() + 1}/${datas[i].getFullYear()}`
                html += `<tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].nome}</td>
                            <td>${data[i].salario}</td>
                            <td>${dat}</td>
                        </tr>`
            }

            tabela.innerHTML = html
        });
}