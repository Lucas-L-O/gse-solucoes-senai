const INATIVIDADE_TIMER = 600000;

let inatividadeTimer;

// Função que verifica o login e exibe a interface conforme o status
function checkLoginStatus() {
    const validUsername = 'Materiais';
    const validPassword = '#123456';
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const usernameDisplay = document.getElementById("username-display");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (username === validUsername && password === validPassword) {
        usernameDisplay.textContent = `Olá, ${username}!`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        usernameDisplay.textContent = '';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        window.location = 'login.html';
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
    inatividadeTimer = setTimeout(() => {
        logout();
    }, INATIVIDADE_TIMER);
}

// Função para abrir o formulário de adicionar produto na modal
function showAddProductForm() {
    const modal = document.getElementById("product-modal");
    modal.style.display = "block"; // Exibe a modal
    document.getElementById("form-title").textContent = "Adicionar Produto";
    document.getElementById("product-name").value = ""; // Limpa os campos
    document.getElementById("product-image").value = ""; // Limpa o campo de imagem
    document.getElementById("product-price").value = "";
    document.getElementById("image-preview").style.display = "none"; // Esconde a pré-visualização
    document.getElementById("submit-product-btn").setAttribute("onclick", "addProduct()"); // Define a função ao clicar
}

// Função para adicionar o produto ao localStorage
function addProduct() {
    const name = document.getElementById('product-name').value;
    const imageInput = document.getElementById('product-image');
    const image = imageInput.files[0] ? imageInput.files[0].name : '';
    const price = document.getElementById('product-price').value;

    if (name && image && price) {
        const product = { name, image, price };

        fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
        .then(() => {
            renderProductList();
            cancelEdit();
        })
        .catch(error => console.error('Error ao salvar o produto:', error));
    } else {
        alert("Preencha todos os campos!");
    }
}

// Função para exibir a lista de produtos
function renderProductList() {
    fetch('/api/products')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then((products) => {
            if (!Array.isArray(products)) {
                throw new Error('Resposta da API não é um array.');
            }

            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            products.forEach((product, index) => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                productItem.innerHTML = `
                    <img src="img/produtos/${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>R$ ${product.price}</p>
                    <button class="btnPrimary" onclick="editProduct('${product.id}')">Editar</button>
                    <button class="btnDanger" onclick="removeProduct('${product.id}')">Remover</button>
                `;

                productList.appendChild(productItem);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar produtos:', error);
        });
}


// Função para editar o produto
function editProduct(productId) {
    // Fazendo a requisição para o servidor para obter os produtos
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId); // Busca o produto pelo ID

            if (product) {
                // Preenche os campos da modal com os dados do produto
                document.getElementById("product-name").value = product.name;
                document.getElementById("product-image").value = ""; // Não altera o arquivo de imagem diretamente
                document.getElementById("product-price").value = product.price;

                const modal = document.getElementById("product-modal");
                modal.style.display = "block"; // Exibe a modal para edição
                document.getElementById("form-title").textContent = "Editar Produto";
                document.getElementById("submit-product-btn").setAttribute("onclick", `updateProduct(${productId})`);
            } else {
                alert("Produto não encontrado!");
            }
        })
        .catch(error => console.log('Erro ao carregar os produtos:', error));
}

// Função para atualizar o produto no localStorage
function updateProduct(productId) {
    const name = document.getElementById('product-name').value;
    const imageInput = document.getElementById('product-image');
    const image = imageInput.files[0] ? imageInput.files[0].name : '';
    const price = document.getElementById('product-price').value;

    if (name && image && price) {
        const updatedProduct = { name, image, price };

        // Envia a requisição PUT para o backend com o id do produto a ser atualizado
        fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => response.json())
        .then(() => {
            renderProductList(); // Atualiza a lista de produtos após a edição
            cancelEdit();         // Fecha a modal
        })
        .catch(error => console.log('Erro ao atualizar o produto:', error));
    } else {
        alert("Preencha todos os campos!");
    }
}


// Função para remover o produto
function removeProduct(productId) {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            // Função para remover o produto com o ID específico
            function removerID(id, arr) {
                return arr.filter(obj => obj.id !== id);
            }

            // Remove o produto
            const updatedProducts = removerID(productId, products);

            // Salva os produtos atualizados usando PUT
            return fetch('/api/products', {
                method: 'PUT', // Mudar de POST para PUT
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProducts)
            });
        })
        .then(() => renderProductList())
        .catch(error => console.log('Erro ao remover o produto:', error));
}


// Função para cancelar a edição e fechar a modal
function cancelEdit() {
    const modal = document.getElementById("product-modal");
    modal.style.display = "none"; // Fecha a modal
}

// Função para exibir a pré-visualização da imagem
document.getElementById("product-image").addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const preview = document.getElementById("image-preview");
            preview.src = e.target.result;
            preview.style.display = "block";
        }

        reader.readAsDataURL(file);
    }
});

document.addEventListener("mousemove", resetInatividadeTimer);
document.addEventListener("keypress", resetInatividadeTimer);


// Função chamada quando o documento é carregado
document.addEventListener("DOMContentLoaded", function() {
    checkLoginStatus();
    renderProductList();
    resetInatividadeTimer();
});
