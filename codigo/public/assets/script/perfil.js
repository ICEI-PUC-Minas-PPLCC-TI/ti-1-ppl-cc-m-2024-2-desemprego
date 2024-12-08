const apiUrl = 'http://localhost:3000/usuarios';
let editingId = null;

// Função para exibir mensagens ao usuário
const displayMessage = (mensagem, type = 'warning') => {
    const msg = document.getElementById('msg');
    msg.textContent = mensagem;
    msg.className = `alert alert-${type}`;
    msg.style.display = 'block';
    setTimeout(() => (msg.style.display = 'none'), 5000);
};

// Função para fazer requisições
const requestApi = async (url, method = 'GET', data = null) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (data) options.body = JSON.stringify(data);
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(`Erro na requisição ${method} para ${url}:`, error);
        throw error;
    }
};

// Função para obter valores do formulário
const getFormValues = () => {
    const tags = Array.from(document.querySelectorAll('.tag-checkbox:checked')).map(checkbox => checkbox.value);
    return {
        nome: document.getElementById('inputNome').value,
        nascimento: document.getElementById('inputNascimento').value,
        email: document.getElementById('inputEmail').value,
        cidade: document.getElementById('inputCidade').value,
        categoria: document.getElementById('inputCategoria').value,
        senha: document.getElementById('inputSenha').value,
        tags,
    };
};

// Função para preencher o formulário
const fillForm = (contato = {}) => {
    document.getElementById('inputNome').value = contato.nome || '';
    document.getElementById('inputNascimento').value = contato.nascimento || '';
    document.getElementById('inputEmail').value = contato.email || '';
    document.getElementById('inputCidade').value = contato.cidade || '';
    document.getElementById('inputCategoria').value = contato.categoria || '';
    document.getElementById('inputSenha').value = contato.senha || '';
    document.querySelectorAll('.tag-checkbox').forEach(checkbox => {
        checkbox.checked = contato.tags?.includes(checkbox.value) || false;
    });
};

// Função para exibir contatos na tabela
const exibeContatos = async () => {
    const tableBody = document.getElementById('table-contatos');
    tableBody.innerHTML = '';
    try {
        const contatos = await requestApi(apiUrl);
        contatos.forEach(contato => {
            tableBody.innerHTML += `
                <tr>

                    <td>${contato.nome}</td>
                    <td>${contato.nascimento}</td>
                    <td>${contato.email}</td>
                    <td>${contato.cidade}</td>
                    <td>${contato.categoria}</td>
                    <td>${contato.tags?.join(', ') || ''}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="prepareEdit(${contato.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="confirmDelete(${contato.id})">Excluir</button>
                    </td>
                </tr>`;
        });
    } catch {
        displayMessage('Erro ao carregar perfis', 'danger');
    }
};

// Função para confirmar e deletar contato
const confirmDelete = id => {
    if (confirm('Tem certeza que deseja excluir?')) {
        requestApi(`${apiUrl}/${id}`, 'DELETE')
            .then(() => {
                displayMessage('Exclusão bem sucedida', 'success');
                exibeContatos();
            })
            .catch(() => displayMessage('Erro ao excluir perfil', 'danger'));
    }
};

// Função para preparar edição
const prepareEdit = async id => {
    try {
        const contato = await requestApi(`${apiUrl}/${id}`);
        editingId = id;
        fillForm(contato);
        document.getElementById('btnInsert').style.display = 'none';
        document.getElementById('btnUpdate').style.display = 'inline-block';
        document.getElementById('btnDelete').style.display = 'inline-block';
    } catch {
        displayMessage('Erro ao carregar', 'danger');
    }
};

// Inicializar eventos
const init = () => {
    document.getElementById('btnInsert').addEventListener('click', async () => {
        if (confirm('Deseja criar este contato?')) {
            const contato = getFormValues();
            try {
                await requestApi(apiUrl, 'POST', contato);
                displayMessage('Perfil adicionado com sucesso', 'success');
                exibeContatos();
                fillForm();
            } catch {
                displayMessage('Erro ao criar perfil', 'danger');
            }
        }
    });

    document.getElementById('btnUpdate').addEventListener('click', async () => {
        if (confirm('Deseja atualizar este perfil?')) {
            const contato = getFormValues();
            try {
                await requestApi(`${apiUrl}/${editingId}`, 'PUT', contato);
                displayMessage('Perfil atualizado com sucesso', 'success');
                exibeContatos();
                fillForm();
                editingId = null;
                document.getElementById('btnInsert').style.display = 'inline-block';
                document.getElementById('btnUpdate').style.display = 'none';
                document.getElementById('btnDelete').style.display = 'none';
            } catch {
                displayMessage('Erro ao atualizar perfil', 'danger');
            }
        }
    });

    document.getElementById('btnClear').addEventListener('click', () => {
        fillForm();
        editingId = null;
        document.getElementById('btnInsert').style.display = 'inline-block';
        document.getElementById('btnUpdate').style.display = 'none';
        document.getElementById('btnDelete').style.display = 'none';
    });

    document.getElementById('tag-toggle').addEventListener('click', () => {
        const tagList = document.getElementById('tag-list');
        tagList.style.display = tagList.style.display === 'none' ? 'block' : 'none';
    });

    exibeContatos();
};

// Chamar init ao carregar a página
window.onload = init;
