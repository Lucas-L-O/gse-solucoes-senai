const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

function loadProducts() {
    try {
        const data = fs.readFileSync('products.json');  // Lê o arquivo de produtos
        return JSON.parse(data);  // Converte o conteúdo para um objeto JavaScript
    } catch (error) {
        console.error('Erro ao ler o arquivo de produtos:', error);
        return [];
    }
}

// Endpoint para obter os produtos
app.get('/api/products', (req, res) => {
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao acessar o arquivo de produtos.' });
        }
        let products = [];
        try {
            // Garantir que o arquivo seja lido corretamente como um array de objetos
            products = JSON.parse(data);
            if (!Array.isArray(products)) {
                products = [];
            }
        } catch (parseError) {
            // Se o arquivo estiver vazio ou tiver conteúdo inválido, começamos com um array vazio
            products = [];
        }
        res.json(products);
    });
});

// Endpoint para adicionar um novo produto
app.post('/api/products', (req, res) => {
    const newProduct = req.body; // Produto a ser adicionado
    newProduct.id = Date.now().toString();

    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao acessar o arquivo de produtos.' });
        }

        let products = [];

        // Se o arquivo não estiver vazio, converte para um array
        if (data.trim().length > 0) {
            try {
                products = JSON.parse(data);
                if (!Array.isArray(products)) {
                    products = []; // Garantir que é um array, caso o arquivo contenha outro tipo de dado
                }
            } catch (parseError) {
                // Caso o conteúdo seja inválido, reinicia o array
                products = [];
            }
        }

        // Adiciona o novo produto
        products.push(newProduct);

        // Salva o array de volta no arquivo
        fs.writeFile('products.json', JSON.stringify(products, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Erro ao salvar o produto.' });
            }
            res.status(201).json({ message: 'Produto adicionado com sucesso.' });
        });
    });
});

// Endpoint para atualizar um produto específico pelo ID
app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    const products = loadProducts();  // Carrega os produtos

    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        // Atualiza o produto no array
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf8');  // Salva os produtos atualizados
        res.status(200).json(products[productIndex]);  // Retorna o produto atualizado
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});


// Endpoint para remover um produto por índice e atualizar a lista de produtos
app.put('/api/products', (req, res) => {
    const updatedProducts = req.body;

    // Verifica se o corpo da requisição é um array
    if (!Array.isArray(updatedProducts)) {
        return res.status(400).json({ error: 'O corpo da requisição deve ser um array de produtos.' });
    }

    // Salva o array atualizado no arquivo
    fs.writeFile('products.json', JSON.stringify(updatedProducts, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao salvar o arquivo de produtos.' });
        }
        res.status(200).json({ message: 'Produtos atualizados com sucesso.' });
    });
});

// Iniciar o servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});