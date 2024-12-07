const API_URL = 'http://localhost:3000/usuarios';

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

function loginUser(email, senha) {
  carregarUsuarios((usuarios) => {
    const usuario = usuarios.find(user => user.email === email && user.senha === senha); // Comparar com a senha também
    if (usuario) {
      sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuario)); // Armazena o usuário logado
      window.location.href = './home.html'; // Redireciona para a home
    } else {
      const errorMessage = document.getElementById('error-message');
      errorMessage.innerText = 'Email ou senha inválidos';
      errorMessage.style.display = 'block';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    loginUser(email, senha); // Chama a função de login
  });
});
