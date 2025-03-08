// Cadastrar produto
document.getElementById('cadastroForm').onsubmit = function(e) {
    e.preventDefault();
    var nome = document.getElementById('nome').value;
    var preco = document.getElementById('preco').value;
    var descricao = document.getElementById('descricao').value;
    var quantidade = document.getElementById('quantidade').value;
    
    fetch('/produtos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nome, preco, descricao, quantidade })
    }).then(function() {
        alert('Produto cadastrado!');
        carregarProdutos();
    });
}

// Carregar produtos
function carregarProdutos() {
    fetch('/produtos').then(function(res) {
        return res.json();
    }).then(function(produtos) {
        var lista = document.getElementById('listaProdutos');
        lista.innerHTML = '';
        produtos.forEach(function(p) {
            lista.innerHTML += '<li>ID: ' + p.id + ' - ' + p.nome + ' - R$' + p.preco + ' - ' + p.descricao + ' - Estoque: ' + p.quantidade + '</li>';
        });
    });
}

// Realizar venda
document.getElementById('vendaForm').onsubmit = function(e) {
    e.preventDefault();
    var id = document.getElementById('vendaId').value;
    var quantidade = document.getElementById('vendaQuantidade').value;
    
    fetch('/venda', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: Number(id), quantidade: Number(quantidade) })
    }).then(function(res) {
        if (res.ok) {
            alert('Venda realizada!');
            carregarProdutos();
        } else {
            alert('Erro ao realizar venda');
        }
    });
}