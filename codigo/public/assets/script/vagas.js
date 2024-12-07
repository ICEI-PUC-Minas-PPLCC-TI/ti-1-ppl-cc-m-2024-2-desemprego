const apiUrl = 'http://localhost:3000/vagas';
let vagas = []; // Armazena as vagas carregadas
let graficoVagas = null; // Referência ao gráfico

// Exibe mensagens de feedback
function displayMessage(mensagem) {
    const msg = document.getElementById('msg');
    msg.textContent = mensagem;
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 5000);
}

// Carregar vagas do servidor
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
            displayMessage('Erro ao carregar vagas.');
        });
}

// Exibe a lista de vagas
function exibirVagas(vagas) {
    const lista = document.getElementById('listaVagas');
    lista.innerHTML = '';

    if (vagas.length === 0) {
        lista.innerHTML = '<li class="list-group-item text-muted">Nenhuma vaga encontrada.</li>';
        return;
    }

    vagas.forEach(vaga => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <strong>${vaga.titulo || 'Título não informado'}</strong>
            <br>
            <span>${vaga.local || 'Local não informado'}</span> - <span>${vaga.categoria || 'Categoria não informada'}</span>
        `;
        lista.appendChild(li);
    });
}

// Atualiza o gráfico
function atualizarGrafico(vagas) {
    const ctx = document.getElementById('graficoVagas').getContext('2d');
    const locais = [...new Set(vagas.map(vaga => vaga.local))]; // Locais únicos
    const contagem = locais.map(local => vagas.filter(vaga => vaga.local === local).length);

    // Destroi o gráfico anterior, se existir
    if (graficoVagas) graficoVagas.destroy();

    // Cria novo gráfico
    graficoVagas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: locais,
            datasets: [{
                label: 'Número de Vagas',
                data: contagem,
                backgroundColor: 'rgba(75, 192, 75, 1)', // Verde translúcido
                borderColor: 'rgba(50, 150, 50, 1)', // Verde sólido
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#333', // Cor mais escura para legendas
                        font: {
                            size: 14, // Ajuste do tamanho da fonte
                            weight: 'bold' // Fonte em negrito
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Distribuição de Vagas por Local',
                    color: '#111', // Título mais escuro
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#222', // Cor mais escura para os textos do eixo X
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    ticks: {
                        color: '#222', // Cor mais escura para os textos do eixo Y
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Número de Vagas',
                        color: '#111', // Título do eixo mais escuro
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}


// Filtra vagas pela categoria selecionada
function filtrarVagas() {
    const categoria = document.getElementById('filterCategoria').value;
    const vagasFiltradas = categoria ? vagas.filter(vaga => vaga.categoria === categoria) : vagas;
    exibirVagas(vagasFiltradas);
    atualizarGrafico(vagasFiltradas);
}

// Inicializa a página
function init() {
    carregarVagas();
}

// Inicia o script ao carregar a página
window.onload = init;
