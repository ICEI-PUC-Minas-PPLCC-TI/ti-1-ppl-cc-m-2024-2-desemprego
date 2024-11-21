const apiUrl = 'http://localhost:3000/vagas';

function buscarVagas(filtros) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const vagasFiltradas = data.filter(vaga => {
                const atendeLocal = !filtros.local || vaga.local.toLowerCase().includes(filtros.local.toLowerCase());
                const atendeTags = filtros.tags.length === 0 || vaga.tags.some(tag => filtros.tags.includes(tag));
                return atendeLocal && atendeTags;
            });

            exibirVagas(vagasFiltradas);
        })
        .catch(error => {
            console.error('Erro ao buscar vagas:', error);
            alert('Erro ao carregar vagas.');
        });
}

function exibirVagas(vagas) {
    const listaVagas = document.getElementById('lista-vagas');
    listaVagas.innerHTML = '';

    if (vagas.length === 0) {
        listaVagas.innerHTML = '<tr><td colspan="6" class="text-center">Nenhuma vaga encontrada.</td></tr>';
        return;
    }

    vagas.forEach(vaga => {
        listaVagas.innerHTML += `
            <tr>
                <td>${vaga.id}</td>
                <td>${vaga.titulo}</td>
                <td>${vaga.descricao}</td>
                <td>${vaga.requisitos}</td>
                <td>${vaga.local}</td>
                <td>${vaga.tags.join(', ')}</td>
            </tr>
        `;
    });
}

document.getElementById('btnFiltrar').addEventListener('click', () => {
    const filtros = {
        local: document.getElementById('inputLocal').value.trim(),
        tags: Array.from(document.querySelectorAll('.tag-checkbox:checked')).map(checkbox => checkbox.value),
    };
    buscarVagas(filtros);
});

document.addEventListener('DOMContentLoaded', () => {
    buscarVagas({ local: '', tags: [] });
});
