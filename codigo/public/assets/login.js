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

// Função de login
function loginUser(email, categoria) {
  carregarUsuarios((usuarios) => {
    const usuario = usuarios.find(user => user.email === email && user.categoria === categoria);
    if (usuario) {
      // Armazena o usuário no sessionStorage
      sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuario));
      window.location.href = './index.html'; // Redireciona para a página inicial após o login
    } else {
      document.getElementById('error-message').innerText = 'Email ou categoria inválidos';
      document.getElementById('error-message').style.display = 'block';
    }
  });
}

// Evento para processar o formulário de login
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário
  
  const email = document.getElementById('email').value;
  const categoria = document.getElementById('categoria').value;

  // Chama a função de login
  loginUser(email, categoria);
});
