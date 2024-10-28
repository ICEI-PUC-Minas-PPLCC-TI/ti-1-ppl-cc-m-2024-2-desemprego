function exibeContatos() {
    tableContatos = document.getElementById("table-contatos");

    // Remove todas as linhas do corpo da tabela
    tableContatos.innerHTML = "";

    readContato(dados => {
        // Popula a tabela com os registros do banco de dados
        for (i = 0; i < dados.length; i++) {
            let contato = dados[i];
            tableContatos.innerHTML += `<tr>
                                            <td scope="row">${contato.id}</td>
                                            <td>${contato.nome}</td>
                                            <td>${contato.nascimento}</td> <!-- Modificado aqui -->
                                            <td>${contato.email}</td>
                                            <td>${contato.cidade}</td>
                                            <td>${contato.categoria}</td>
                                            <td>${contato.website}</td>
                                        </tr>`;
        }
    });
}

function init() {
    // Define uma variável para o formulário de contato
    formContato = document.getElementById("form-contato");

    // Adiciona funções para tratar os eventos
    btnInsert = document.getElementById("btnInsert");
    btnInsert.addEventListener('click', function () {
        // Verifica se o formulário está preenchido corretamente
        if (!formContato.checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoNome = document.getElementById('inputNome').value;
        let campoNascimento = document.getElementById('inputNascimento').value; // Modificado aqui
        let campoEmail = document.getElementById('inputEmail').value;
        let campoCidade = document.getElementById('inputCidade').value;
        let campoCategoria = document.getElementById('inputCategoria').value;
        let campoSite = document.getElementById('inputSite').value;

        // Cria um objeto com os dados do contato
        let contato = {
            nome: campoNome,
            nascimento: campoNascimento, // Modificado aqui
            email: campoEmail,
            cidade: campoCidade,
            categoria: campoCategoria,
            website: campoSite
        };

        // Cria o contato no banco de dados
        createContato(contato, exibeContatos);

        // Limpa o formulario
        formContato.reset();
    });

    // Trata o click do botão Alterar
    btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.addEventListener('click', function () {
        // Obtem os valores dos campos do formulário
        let campoId = document.getElementById("inputId").value;
        if (campoId == "") {
            displayMessage("Selecione antes um contato para ser alterado.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoNome = document.getElementById('inputNome').value;
        let campoNascimento = document.getElementById('inputNascimento').value; // Modificado aqui
        let campoEmail = document.getElementById('inputEmail').value;
        let campoCidade = document.getElementById('inputCidade').value;
        let campoCategoria = document.getElementById('inputCategoria').value;
        let campoSite = document.getElementById('inputSite').value;

        // Cria um objeto com os dados do contato
        let contato = {
            nome: campoNome,
            nascimento: campoNascimento, // Modificado aqui
            email: campoEmail,
            cidade: campoCidade,
            categoria: campoCategoria,
            website: campoSite
        };

        // Altera o contato no banco de dados
        updateContato(parseInt(campoId), contato, exibeContatos);

        // Limpa o formulario
        formContato.reset();
    });

    // Trata o click do botão Excluir
    btnDelete = document.getElementById('btnDelete');
    btnDelete.addEventListener('click', function () {
        let campoId = document.getElementById('inputId').value;
        if (campoId == "") {
            displayMessage("Selecione um contato a ser excluído.");
            return;
        }

        // Exclui o contato no banco de dados
        deleteContato(parseInt(campoId), exibeContatos);

        // Limpa o formulario
        formContato.reset();
    });

    // Trata o click do botão Listar Contatos
    btnClear = document.getElementById('btnClear');
    btnClear.addEventListener('click', function () {
        formContato.reset();
    });

    // Oculta a mensagem de aviso após alguns 5 segundos
    msg = document.getElementById('msg');
    msg.addEventListener("DOMSubtreeModified", function (e) {
        if (e.target.innerHTML == "") return;
        setTimeout(function () {
            alert = msg.getElementsByClassName("alert");
            alert[0].remove();
        }, 5000);
    });

    // Preenche o formulário quando o usuario clicar em uma linha da tabela
    gridContatos = document.getElementById("grid-contatos");
    gridContatos.addEventListener('click', function (e) {
        if (e.target.tagName == "TD") {

            // Obtem as colunas da linha selecionada na tabela
            let linhaContato = e.target.parentNode;
            colunas = linhaContato.querySelectorAll("td");

            // Preenche os campos do formulário com os dados da linha selecionada na tabela
            document.getElementById('inputId').value = colunas[0].innerText;
            document.getElementById('inputNome').value = colunas[1].innerText;
            document.getElementById('inputNascimento').value = colunas[2].innerText; // Modificado aqui
            document.getElementById('inputEmail').value = colunas[3].innerText;
            document.getElementById('inputCidade').value = colunas[4].innerText;
            document.getElementById('inputCategoria').value = colunas[5].innerText;
            document.getElementById('inputSite').value = colunas[6].innerText;
        }
    });

    exibeContatos();
}
document.addEventListener('DOMContentLoaded', function() {
const tagToggle = document.getElementById('tag-toggle');
const tagList = document.getElementById('tag-list');

tagToggle.addEventListener('click', function() {
tagList.classList.toggle('show');
});

// Função para capturar as tags selecionadas
function getSelectedTags() {
const checkboxes = tagList.querySelectorAll('input[type="checkbox"]');
const selectedTags = [];
checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
        selectedTags.push(checkbox.value);
    }
});
return selectedTags;
}

// Exemplo de como utilizar as tags selecionadas na inserção de contatos
btnInsert.addEventListener('click', function() {
// ... seu código existente ...

// Obtem os valores dos campos do formulário
let campoTags = getSelectedTags(); // Captura as tags selecionadas

// Cria um objeto com os dados do contato
let contato = {
    nome: campoNome,
    nascimento: campoNascimento,
    email: campoEmail,
    cidade: campoCidade,
    categoria: campoCategoria,
    website: campoSite,
    tags: campoTags // Adiciona as tags ao objeto contato
};

// Cria o contato no banco de dados
createContato(contato, exibeContatos);

// Limpa o formulario
formContato.reset();
// Limpa as tags selecionadas
checkboxes.forEach(checkbox => {
    checkbox.checked = false;
});
});
});
