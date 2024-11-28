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