const paginaPrincipal = () => {
    const resumo = document.getElementById('resumo');
    const tabela = document.getElementById('func');
    fetch('localhost:3050/funcionarios')
        .then(res => res.json())
        .then(funcionarios => {
            html = '';
            html += `<p>Quantidade de funcionários: ${funcionarios.length}</p>`;
            
            let ultimaData;
            for (let i = 0; i < funcionarios.length; i++) {
                const estaData = new Date(funcionarios[i].data);
                if (!ultimaData || estaData > ultimaData) {
                    ultimaData = estaData;
                }
            }
            html += `<p>Último cadastro: ${ultimaData}</p>`;
            resumo.innerHTML = html;

            html = '';
        });
}