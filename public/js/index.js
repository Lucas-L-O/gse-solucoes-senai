const INATIVIDADE_TIMER = 600000;

let inatividadeTimer;

function checkLoginStatus() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const usernameDisplay = document.getElementById("username-display");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (username && password) {
        usernameDisplay.textContent = `Olá, ${username}!`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        usernameDisplay.textContent = '';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none'
    }
}

// Função de logout
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    checkLoginStatus();
}

function resetInatividadeTimer() {
    clearTimeout(inatividadeTimer);
    // console.log("Usuário deslogado por inatividade")
    inatividadeTimer = setTimeout(logout, INATIVIDADE_TIMER);
}

document.addEventListener("mousemove", resetInatividadeTimer);
document.addEventListener("keypress", resetInatividadeTimer);

document.addEventListener("DOMContentLoaded", function() {
    checkLoginStatus();
    resetInatividadeTimer();
});


// DUPLICA O CONTEUDO DO CARROSEL
const catalogosGrid = document.querySelector('.catalogos-grid');
const catalogos = document.querySelectorAll('.catalogo');

catalogos.forEach((catalogo) => {
    const clone = catalogo.cloneNode(true);
    catalogosGrid.appendChild(clone);
});

// MODAL DAS IMAGENS DO CARROSEL
const catalogImages = document.querySelectorAll('.catalogo img');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
let currentIndex = 0;

// Função para abrir a modal e definir a imagem atual
function openModal(index) {
    modal.style.display = 'flex';
    currentIndex = index;
    modalImage.src = catalogImages[currentIndex].src;
}

function closeModal() {
    modal.style.display = 'none';
}

function changeImage(direction) {
    currentIndex = (currentIndex + direction + catalogImages.length) % catalogImages.length;
    modalImage.src = catalogImages[currentIndex].src;
}

catalogImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// AJUSTA ALTURA DO IFRAME
function ajustarAlturaIframe() {
    const iframe = document.querySelector('#contato iframe');

    iframe.onload = () => {
        const conteudoIframe = iframe.contentWindow.document.body.scrollHeight;
        iframe.style.height = conteudoIframe + 'px';
    };
}

// SETA PARA VOLTAR AO TOPO DA PÁGINA
const arrow = document.getElementById('scrollToTop')

function toggleArrowVisibility() {
    if (window.scrollY > 300) {
        arrow.classList.add('visible');
    } else {
        arrow.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', toggleArrowVisibility);
arrow.addEventListener('click', scrollToTop);