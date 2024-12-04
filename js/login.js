const validUsername = 'Materiais';
const validPassword = '#123456';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        if (username === validUsername && password === validPassword) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            console.log('Usuário logado com sucesso');

            window.location.href = 'index.html';
        } else {
            alert('Usuário ou senha incorretos');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
