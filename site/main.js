const paginaPrincipal = () => {
    const resumo = document.getElementById('resumo');
    const tabela = document.getElementById('func');
    fetch('http://localhost:3050/funcionarios')
        .then(res => res.json())
        .then(data => {
            html = '';
            html += `<p>Quantidade de funcionários: ${data.length}</p>`;
            
            let ultimaData;
            for (let i = 0; i < data.length; i++) {
                const estaData = new Date(data[i].dataCadastro);
                if (!ultimaData || estaData > ultimaData) {
                    ultimaData = estaData;
                }
            }
            html += `<p>Último cadastro: ${ultimaData == undefined ? "não houve cadastros" : ultimaData}</p>`;
            resumo.innerHTML = html;

            html = '';
        });
}