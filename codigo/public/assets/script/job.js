document.addEventListener("DOMContentLoaded", function() {
    const savedJobData = JSON.parse(localStorage.getItem('jobData'));

    if (savedJobData) {
        document.getElementById('titulo').value = savedJobData.titulo;
        document.getElementById('descricao').value = savedJobData.descricao;
        document.getElementById('localizacao').value = savedJobData.localizacao;
        document.getElementById('tipo-contato').value = savedJobData.tipoContato;
        document.getElementById('salario').value = savedJobData.salario;
        document.getElementById('categoria').value = savedJobData.categoria;
    }
});

document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const jobData = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        localizacao: document.getElementById('localizacao').value,
        tipoContato: document.getElementById('tipo-contato').value,
        salario: document.getElementById('salario').value,
        categoria: document.getElementById('categoria').value
    };

    localStorage.setItem('jobData', JSON.stringify(jobData));
    alert('Dados salvos com sucesso!');
});

document.querySelector('.delete-button').addEventListener('click', function() {
    if (confirm("Tem a certeza de que deseja excluir os dados?")) {
        localStorage.removeItem('jobData');
        document.getElementById('jobForm').reset();
        alert("Dados excluídos com sucesso!");
    }
});
