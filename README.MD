# Projeto de loja de materiais de construção "GSE-Soluções"

Esse é um projeto do curso de Desenvolvedor Front-End do SENAI, trata-se de uma vitrine virtual para uma loja de material de construção. Por se tratar de um projeto didático para testar as habilidades com front-end não foi uma solução que segue as melhores práticas de segurança. O usuário e senha é padrão usuário: Materiais; senha: #123456 e o usuário fica salvo no local storage do navegador para simular uma autenticação. Ao acessar o painel adim é possível adicionar, editar e remover produtos que ficam salvos no arquivo 'products.json' para simular o banco de dados.
É necessário ter o Node.js instalado na máquina pois ele quem vai ser responsável por armazenar os valores no arquivo json. 

## Pré-Requisitos

- É necessário ter o Node.js instalado. Se não tiver, pode baixar e instalar a partir de [aqui](https://nodejs.org/).

## Como Rodar o Projeto

1. **Instalar as dependências**:

    No diretório do projeto, execute o seguinte comando para instalar as dependências:

    ```bash
    npm install
    ```

2. **Iniciar o servidor**:

    Para iniciar o servidor, execute o comando:

    ```bash
    npm start
    ```

    O servidor estará disponível em `http://localhost:3000`.

3. **Acessar a Interface de Administração**:

    Abra seu navegador e acesse o seguinte link para utilizar a interface de administração:

    ```plaintext
    http://localhost:3000/admin.html
    ```

    Na interface de administração, você poderá adicionar, editar e remover produtos.

## Funcionalidades

- **Adicionar Produtos**: Permite adicionar novos produtos à lista, informando o nome, imagem e preço.
- **Visualizar Produtos**: A lista de produtos é exibida na interface de administração.
- **API de Produtos**: Os produtos são armazenados em um arquivo `products.json` e podem ser acessados ou modificados via a API.

## Como Funciona

O servidor Node.js serve a interface de administração e também fornece uma API RESTful para manipular os produtos. Todos os produtos são salvos no arquivo `products.json`.

- **GET /api/products**: Retorna a lista de produtos.
- **POST /api/products**: Adiciona um novo produto à lista.

## Licença

Este projeto é licenciado sob a MIT License.
