const apiUrl = 'http://localhost:3000/vagas';
let chart;

// Função de inicialização
function init() {
    carregarVagas();
    montarGrafico();
    document.getElementById('form-vaga').addEventListener('submit', criarVaga);
}

// Carrega vagas do servidor
function carregarVagas() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(vagas => {
            const listaVagas = document.getElementById('lista-vagas');
            listaVagas.innerHTML = vagas.map(vaga => `
                <li class="list-group-item">
                    <strong>${vaga.titulo}</strong> - ${vaga.local}
                    <br>
                    <small>Tags: ${vaga.tags.join(', ')}</small>
                </li>`).join('');
        });
}

// Cria uma nova vaga
function criarVaga(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const local = document.getElementById('local').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

    const vaga = { titulo, local, tags };
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vaga)
    }).then(() => {
        carregarVagas();
        montarGrafico();
    });
}

// Monta gráfico com Chart.js
function montarGrafico() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(vagas => {
            const locais = vagas.map(v => v.local);
            const contagem = locais.reduce((acc, local) => {
                acc[local] = (acc[local] || 0) + 1;
                return acc;
            }, {});

            if (chart) chart.destroy();
            chart = new Chart(document.getElementById('grafico'), {
                type: 'bar',
                data: {
                    labels: Object.keys(contagem),
                    datasets: [{
                        label: 'Vagas por Local',
                        data: Object.values(contagem),
                        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
                    }]
                }
            });
        });
}
