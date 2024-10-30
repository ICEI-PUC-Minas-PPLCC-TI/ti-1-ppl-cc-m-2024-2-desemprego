const apiUrl = 'http://localhost:3000/usuarios';
let editingId = null;

function displayMessage(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = mensagem;
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 5000);
}

function readContato(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => processaDados(data))
        .catch(error => {
            console.error('Erro ao ler contatos via API JSONServer:', error);
            displayMessage("Erro ao ler contatos");
        });
}

function createContato(contato, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
    .then(response => response.json())
    .then(() => {
        displayMessage("Contato inserido com sucesso");
        if (refreshFunction) refreshFunction();
    })
    .catch(error => {
        console.error('Erro ao inserir contato via API JSONServer:', error);
        displayMessage("Erro ao inserir contato");
    });
}

function updateContato(id, contato, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
    .then(response => response.json())
    .then(() => {
        displayMessage("Contato alterado com sucesso");
        if (refreshFunction) refreshFunction();
    })
    .catch(error => {
        console.error('Erro ao atualizar contato via API JSONServer:', error);
        displayMessage("Erro ao atualizar contato");
    });
}

function deleteContato(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
        displayMessage("Contato removido com sucesso");
        if (refreshFunction) refreshFunction();
    })
    .catch(error => {
        console.error('Erro ao remover contato via API JSONServer:', error);
        displayMessage("Erro ao remover contato");
    });
}

function exibeContatos() {
    const tableContatos = document.getElementById("table-contatos");
    tableContatos.innerHTML = "";

    readContato(dados => {
        dados.forEach(contato => {
            tableContatos.innerHTML += `
                <tr>
                    <td>${contato.id}</td>
                    <td>${contato.nome}</td>
                    <td>${contato.nascimento}</td>
                    <td>${contato.email}</td>
                    <td>${contato.cidade}</td>
                    <td>${contato.categoria}</td>
                    <td>${contato.website}</td>
                    <td>${contato.tags ? contato.tags.join(", ") : ""}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="prepareEdit(${contato.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="confirmDelete(${contato.id})">Excluir</button>
                    </td>
                </tr>`;
        });
    });
}

function prepareEdit(id) {
    editingId = id;

    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(contato => {
            document.getElementById('inputNome').value = contato.nome;
            document.getElementById('inputNascimento').value = contato.nascimento;
            document.getElementById('inputEmail').value = contato.email;
            document.getElementById('inputCidade').value = contato.cidade;
            document.getElementById('inputCategoria').value = contato.categoria;
            document.getElementById('inputSite').value = contato.website;

            const checkboxes = document.querySelectorAll('.tag-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = contato.tags.includes(checkbox.value);
            });

            document.getElementById('btnInsert').style.display = 'none';
            document.getElementById('btnUpdate').style.display = 'inline-block';
            document.getElementById('btnDelete').style.display = 'inline-block';
        })
        .catch(error => {
            console.error('Erro ao buscar contato para edição:', error);
            displayMessage("Erro ao buscar contato");
        });
}

function init() {
    const formContato = document.getElementById('form-contato');

    document.getElementById("btnInsert").addEventListener('click', () => {
        const tagsSelecionadas = Array.from(document.querySelectorAll('.tag-checkbox:checked')).map(checkbox => checkbox.value);
        
        const contato = {
            nome: document.getElementById('inputNome').value,
            nascimento: document.getElementById('inputNascimento').value,
            email: document.getElementById('inputEmail').value,
            cidade: document.getElementById('inputCidade').value,
            categoria: document.getElementById('inputCategoria').value,
            website: document.getElementById('inputSite').value,
            tags: tagsSelecionadas
        };
        
        createContato(contato, exibeContatos);
        formContato.reset();
    });

    document.getElementById("btnUpdate").addEventListener('click', () => {
        const tagsSelecionadas = Array.from(document.querySelectorAll('.tag-checkbox:checked')).map(checkbox => checkbox.value);
        
        const contato = {
            nome: document.getElementById('inputNome').value,
            nascimento: document.getElementById('inputNascimento').value,
            email: document.getElementById('inputEmail').value,
            cidade: document.getElementById('inputCidade').value,
            categoria: document.getElementById('inputCategoria').value,
            website: document.getElementById('inputSite').value,
            tags: tagsSelecionadas
        };
        
        updateContato(editingId, contato, exibeContatos);
        formContato.reset();
        editingId = null;
        document.getElementById('btnInsert').style.display = 'inline-block';
        document.getElementById('btnUpdate').style.display = 'none';
        document.getElementById('btnDelete').style.display = 'none';
    });

    document.getElementById("btnClear").addEventListener('click', () => {
        formContato.reset();
        editingId = null;
        document.getElementById('btnInsert').style.display = 'inline-block';
        document.getElementById('btnUpdate').style.display = 'none';
        document.getElementById('btnDelete').style.display = 'none';
    });

    exibeContatos();
}

document.getElementById('tag-toggle').addEventListener('click', () => {
    const tagList = document.getElementById('tag-list');
    tagList.style.display = tagList.style.display === 'none' ? 'block' : 'none';
});
