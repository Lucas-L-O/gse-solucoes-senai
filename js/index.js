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


const itemsPerPage = 10; // Número de produtos por página
let currentPage = 1;
// Lista dos produtos
const produtos = [
    { img: "img/produtos/caixa-dagua.png", name: "Caixa D'Água", price: 150.00 },
    { img: "img/produtos/bombadagua.png", name: "Bomba D'Água", price: 220.00 },
    { img: "img/produtos/cano-pvc.png", name: "Cano PVC", price: 12.50 },
    { img: "img/produtos/boia.png", name: "Boia", price: 35.00 },
    { img: "img/produtos/caixa-dagua-tamanhos.png", name: "Caixa D'Água vários tamanhos", price: 300.00 },
    { img: "img/produtos/caixa-ferramentas.png", name: "Caixa de Ferramentas", price: 85.00 },
    { img: "img/produtos/ducha-higienica.png", name: "Ducha Higiênica", price: 45.00 },
    { img: "img/produtos/espuma.png", name: "Espuma", price: 10.00 },
    { img: "img/produtos/interruptor-verde.png", name: "Interruptor Verde", price: 15.00 },
    { img: "img/produtos/interruptor.png", name: "Interruptor", price: 12.00 },
    { img: "img/produtos/lampada.png", name: "Lâmpada", price: 20.00 },
    { img: "img/produtos/luminaria.png", name: "Luminária", price: 50.00 },
    { img: "img/produtos/mangueira.png", name: "Mangueira", price: 60.00 },
    { img: "img/produtos/mascara.png", name: "Máscara", price: 8.00 },
    { img: "img/produtos/rebitadeira.png", name: "Rebitadeira", price: 120.00 },
    { img: "img/produtos/sensor-movimento.png", name: "Sensor de Movimento", price: 90.00 },
    { img: "img/produtos/tampa-de-vaso.png", name: "Tampa de Vaso", price: 25.00 },
    { img: "img/produtos/tinta-spray.png", name: "Tinta Spray", price: 35.00 },
    { img: "img/produtos/tinta.jpeg", name: "Tinta", price: 45.00 },
    { img: "img/produtos/tinta1.png", name: "Tinta Tipo 1", price: 50.00 },
    { img: "img/produtos/tinta2.png", name: "Tinta Tipo 2", price: 55.00 },
    { img: "img/produtos/tinta3.png", name: "Tinta Tipo 3", price: 60.00 },
    { img: "img/produtos/tinta4.png", name: "Tinta Tipo 4", price: 65.00 },
    { img: "img/produtos/trena.png", name: "Trena", price: 30.00 },
    { img: "img/produtos/vedalit.png", name: "Vedalit", price: 18.00 },
];


function searchProducts() {
    // Obtenha o valor do campo de busca e normalize para minúsculas
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    // Obtenha todos os elementos de produto
    const products = document.getElementsByClassName("produto");
    
 
    // Itere sobre todos os produtos
    Array.from(products).forEach((product) => {
        // Obtenha o nome do produto e normalize para minúsculas
        const productName = removeAccentuation(product.querySelector("h4").textContent.toLowerCase());
        
        // Verifique se o nome do produto contém o termo de busca
        if (productName.includes(searchTerm)) {
            product.style.display = "block"; // Mostre o produto se houver uma correspondência
        } else {
            product.style.display = "none"; // Oculte o produto caso contrário
        }
    });
}

function removeAccentuation(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


// Função para exibir os produtos
function displayProducts(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const productsToDisplay = produtos.slice(startIndex, endIndex);

    const produtosGrid = document.getElementById('produtos-grid');
    produtosGrid.innerHTML = '';

    productsToDisplay.forEach(produto => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('produto');
        productDiv.innerHTML = `
            <img src="${produto.img}" alt="${produto.name}">
            <h4>${produto.name}</h4>
            <p>R$ ${produto.price.toFixed(2)}</p>
        `;
        produtosGrid.appendChild(productDiv);
    });
}

// Função para gerar os botões de paginação
function generatePagination() {
    const totalPages = Math.ceil(produtos.length / itemsPerPage);
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.classList.add('button')
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            displayProducts(currentPage);
        };
        paginationDiv.appendChild(button);
    }
}

// Inicializar a página
function init() {
    displayProducts(currentPage);
    generatePagination();
}

// Chama a função para inicializar
init();