const apiUrl = 'http://localhost:3000/vagas';
let vagas = []; // Array para armazenar os dados carregados

function displayMessage(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = mensagem;
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 5000);
}

// Carregar dados do JSON Server
function carregarVagas() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            vagas = data;
            exibirVagas(vagas);
            atualizarGrafico(vagas);
        })
        .catch(error => {
            console.error('Erro ao carregar vagas:', error);
            displayMessage("Erro ao carregar vagas.");
        });
}

// Exibir vagas na lista
function exibirVagas(vagas) {
    const lista = document.getElementById('listaVagas');
    lista.innerHTML = '';

    vagas.forEach(vaga => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <strong>${vaga.titulo}</strong>
            <br>
            <span>${vaga.local}</span> - <span>${vaga.categoria}</span>
        `;
        lista.appendChild(li);
    });
}

// Atualizar gráfico com a distribuição por local
function atualizarGrafico(vagas) {
    const ctx = document.getElementById('graficoVagas').getContext('2d');
    const locais = [...new Set(vagas.map(vaga => vaga.local))]; // Locais únicos
    const contagem = locais.map(local => vagas.filter(vaga => vaga.local === local).length);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: locais,
            datasets: [{
                label: 'Número de Vagas',
                data: contagem,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Filtrar vagas por categoria
function filtrarVagas() {
    const categoria = document.getElementById('filterCategoria').value;
    const vagasFiltradas = categoria ? vagas.filter(vaga => vaga.categoria === categoria) : vagas;
    exibirVagas(vagasFiltradas);
    atualizarGrafico(vagasFiltradas);
}

// Inicializar a aplicação
function init() {
    carregarVagas();
}
