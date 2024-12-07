const API_URL = 'http://localhost:3000/vagas';

document.addEventListener("DOMContentLoaded", function () {
    const savedJobData = JSON.parse(localStorage.getItem('jobData'));

    if (savedJobData) {
        document.getElementById('titulo').value = savedJobData.titulo;
        document.getElementById('descricao').value = savedJobData.descricao;
        document.getElementById('local').value = savedJobData.local;
        document.getElementById('salario').value = savedJobData.salario;
        document.getElementById('categoria').value = savedJobData.categoria;
    }
});

document.getElementById('jobForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const jobData = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        local: document.getElementById('local').value,
        salario: document.getElementById('salario').value,
        categoria: document.getElementById('categoria').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
        });

        if (response.ok) {
            alert('Vaga publicada com sucesso!');
            document.getElementById('jobForm').reset();
        } else {
            alert('Erro ao publicar a vaga. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao conectar ao servidor.');
    }
});

document.querySelector('.delete-button').addEventListener('click', function () {
    if (confirm("Tem a certeza de que deseja excluir os dados?")) {
        localStorage.removeItem('jobData');
        document.getElementById('jobForm').reset();
        alert("Dados excluídos com sucesso!");
    }
});
