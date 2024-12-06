const API_URL = 'http://localhost:3000/usuarios';

function cadastrarUsuario(nome, email, senha, nascimento, cidade, categoria) {
  const novoUsuario = {
    nome: nome,
    email: email,
    senha: senha,
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
  const senha = document.getElementById('senha').value;
  const nascimento = document.getElementById('nascimento').value;
  const cidade = document.getElementById('cidade').value;
  const categoria = document.getElementById('categoria').value;

  cadastrarUsuario(nome, email, senha, nascimento, cidade, categoria);
});
