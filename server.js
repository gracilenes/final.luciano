const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let produtos = [];
let idCounter = 1;

// Cadastrar produto
app.post('/produtos', (req, res) => {
    const { nome, preco, descricao, quantidade } = req.body;
    const produto = { id: idCounter++, nome, preco, descricao, quantidade: parseInt(quantidade) };
    produtos.push(produto);
    res.status(201).json(produto);
});

// Visualizar todos os produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// Alterar produto
app.put('/produtos/:id', (req, res) => {
    const { nome, preco, descricao, quantidade } = req.body;
    const produto = produtos.find(p => p.id == req.params.id);
    if (produto) {
        produto.nome = nome;
        produto.preco = preco;
        produto.descricao = descricao;
        produto.quantidade = parseInt(quantidade);
        res.json(produto);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

// Excluir produto
app.delete('/produtos/:id', (req, res) => {
    const index = produtos.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        produtos.splice(index, 1);
        res.send('Produto excluído');
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

// Realizar venda
app.post('/venda', (req, res) => {
    const { id, quantidade } = req.body;
    const produto = produtos.find(p => p.id == id);
    if (produto) {
        if (produto.quantidade >= quantidade) {
            produto.quantidade -= quantidade;
            res.json(produto);
        } else {
            res.status(400).send('Estoque insuficiente');
        }
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});