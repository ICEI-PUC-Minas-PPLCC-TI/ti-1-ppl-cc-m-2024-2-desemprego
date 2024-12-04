// URL da API que retorna os usuários
const API_URL = '/usuarios';

// Função para carregar os usuários da API
function carregarUsuarios(callback) {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error('Erro ao carregar os dados dos usuários', error);
    });
}

// Função para registrar um novo usuário
function cadastrarUsuario(nome, email, nascimento, cidade, categoria) {
  const novoUsuario = {
    nome: nome,
    email: email,
    nascimento: nascimento,
    cidade: cidade,
    categoria: categoria,
    tags: [] // Tags podem ser adicionadas conforme necessidade
  };

  // Envia os dados para a API para criar um novo usuário
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(novoUsuario),
  })
    .then(response => response.json())
    .then(data => {
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'index.html'; // Redireciona para a página de login
    })
    .catch(error => {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao realizar o cadastro. Tente novamente.');
    });
}

// Evento para processar o formulário de cadastro
document.getElementById('cadastro-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const nascimento = document.getElementById('nascimento').value;
  const cidade = document.getElementById('cidade').value;
  const categoria = document.getElementById('categoria').value;

  // Chama a função para cadastrar o usuário
  cadastrarUsuario(nome, email, nascimento, cidade, categoria);
});
