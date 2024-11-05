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

