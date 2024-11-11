// Seleciona o contêiner dos produtos
const catalogosGrid = document.querySelector('.catalogos-grid');

// Clona o conteúdo da div com todos os produtos
const catalogos = document.querySelectorAll('.catalogo');

catalogos.forEach((catalogo) => {
    const clone = catalogo.cloneNode(true);
    catalogosGrid.appendChild(clone);
});


// Seleciona as imagens e o elemento da modal
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

// Fecha a modal
function closeModal() {
    modal.style.display = 'none';
}

// Muda a imagem na modal
function changeImage(direction) {
    currentIndex = (currentIndex + direction + catalogImages.length) % catalogImages.length;
    modalImage.src = catalogImages[currentIndex].src;
}

// Adiciona evento de clique em cada imagem
catalogImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

// Fecha a modal ao clicar fora da imagem
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

function ajustarAlturaIframe() {
    const iframe = document.querySelector('#contato iframe');
    
    iframe.onload = () => {
       const conteudoIframe = iframe.contentWindow.document.body.scrollHeight;
       iframe.style.height = conteudoIframe + 'px';
    };
 }

 const arrow = document.getElementById('scrollToTop')

 // Função para mostrar ou esconder a seta
function toggleArrowVisibility() {
    if (window.scrollY > 300) { // A partir de 300px de rolagem
        arrow.classList.add('visible');
    } else {
        arrow.classList.remove('visible');
    }
}

// Função para rolar a página para o topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Adiciona eventos de rolagem e clique
window.addEventListener('scroll', toggleArrowVisibility);
arrow.addEventListener('click', scrollToTop);
