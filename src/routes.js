const express = require('express');

const ClienteController = require('./controllers/ClienteController.js');
const CategoriaController = require('./controllers/CategoriaController.js');
const CidadeController = require('./controllers/CidadeController.js');
const EnderecoController = require('./controllers/EnderecoController.js');
const EstadoController = require('./controllers/EstadoController.js');
const EstoqueController = require('./controllers/EstoqueController.js');
const FornecedorController = require('./controllers/FornecedorController.js');
const FuncionarioController = require('./controllers/FuncionarioController.js');
const ItemPedidoController = require('./controllers/ItemPedidoController.js');
const ItemPedidoFornecedorController = require('./controllers/ItemPedidoFornecedorController.js');
const PaisController = require('./controllers/PaisController.js');
const PedidoController = require('./controllers/PedidoController.js');
const PedidoFornecedorController = require('./controllers/PedidoFornecedorController.js');
const ProdutoController = require('./controllers/ProdutoController.js');
const ProdutoMargemController = require('./controllers/ProdutoMargemController.js');

const routes = express.Router();

routes.get('/cliente', ClienteController.index);
routes.get('/cliente/:id', ClienteController.index);
routes.get('/cliente/cpf/:cpf', ClienteController.index);
routes.delete('/cliente/:id', ClienteController.delete);
routes.post('/cliente', ClienteController.create);
routes.put('/cliente/:id', ClienteController.update);

routes.get('/categoria', CategoriaController.index);
routes.get('/categoria/:id', CategoriaController.index);
routes.delete('/categoria/:id', CategoriaController.delete);
routes.post('/categoria', CategoriaController.create);
routes.put('/categoria/:id', CategoriaController.update);

routes.get('/cidade', CidadeController.index);
routes.get('/cidade/:id', CidadeController.index);
routes.delete('/cidade/:id', CidadeController.delete);
routes.post('/cidade', CidadeController.create);
routes.put('/cidade/:id', CidadeController.update);

routes.get('/endereco', EnderecoController.index);
routes.get('/endereco/:id', EnderecoController.index);
routes.get('/endereco/cep/:cep', EnderecoController.index);
routes.get('/endereco/fornecedor/:fornecedor', EnderecoController.index);
routes.delete('/endereco/:id', EnderecoController.delete);
routes.post('/endereco', EnderecoController.create);
routes.put('/endereco/:id', EnderecoController.update);

routes.get('/estado', EstadoController.index);
routes.get('/estado/:id', EstadoController.index);
routes.delete('/estado/:id', EstadoController.delete);
routes.post('/estado', EstadoController.create);
routes.put('/estado/:id', EstadoController.update);

routes.get('/estoque', EstoqueController.index);
routes.get('/estoque/:id', EstoqueController.index);
routes.get('/estoque/nome/:nome', EstoqueController.index);
routes.delete('/estoque/:id', EstoqueController.delete);
routes.post('/estoque', EstoqueController.create);
routes.put('/estoque/:id', EstoqueController.update);

routes.get('/fornecedore', FornecedorController.index);
routes.get('/fornecedore/:id', FornecedorController.index);
routes.get('/fornecedore/nome/:nome', FornecedorController.index);
routes.delete('/fornecedore/:id', FornecedorController.delete);
routes.post('/fornecedore', FornecedorController.create);
routes.put('/fornecedore/:id', FornecedorController.update);

routes.get('/funcionario', FuncionarioController.index);
routes.get('/funcionario/:id', FuncionarioController.index);
routes.delete('/funcionario/:id', FuncionarioController.delete);
routes.post('/funcionario', FuncionarioController.create);
routes.put('/funcionario/:id', FuncionarioController.update);

routes.get('/item-pedido', ItemPedidoController.index);
routes.get('/item-pedido/:id', ItemPedidoController.index);
routes.delete('/item-pedido/:id', ItemPedidoController.delete);
routes.post('/item-pedido', ItemPedidoController.create);
routes.put('/item-pedido/:id', ItemPedidoController.update);

routes.get('/item-pedido-fornecedor', ItemPedidoFornecedorController.index);
routes.get('/item-pedido-fornecedor/:id', ItemPedidoFornecedorController.index);
routes.delete('/item-pedido-fornecedor/:id', ItemPedidoFornecedorController.delete);
routes.post('/item-pedido-fornecedor', ItemPedidoFornecedorController.create);
routes.put('/item-pedido-fornecedor/:id', ItemPedidoFornecedorController.update);

routes.get('/pais', PaisController.index);
routes.get('/pais/:id', PaisController.index);
routes.delete('/pais/:id', PaisController.delete);
routes.post('/pais', PaisController.create);
routes.put('/pais/:id', PaisController.update);

routes.get('/pedido', PedidoController.index);
routes.get('/pedido/:id', PedidoController.index);
routes.delete('/pedido/:id', PedidoController.delete);
routes.post('/pedido', PedidoController.create);
routes.put('/pedido/:id', PedidoController.update);

routes.get('/pedido-fornecedor', PedidoFornecedorController.index);
routes.get('/pedido-fornecedor/:id', PedidoFornecedorController.index);
routes.delete('/pedido-fornecedor/:id', PedidoFornecedorController.delete);
routes.post('/pedido-fornecedor', PedidoFornecedorController.create);
routes.put('/pedido-fornecedor/:id', PedidoFornecedorController.update);

routes.get('/produto', ProdutoController.index);
routes.get('/produto/:id', ProdutoController.index);
routes.get('/produto/nome/:nome', ProdutoController.index);
routes.delete('/produto/:id', ProdutoController.delete);
routes.post('/produto', ProdutoController.create);
routes.put('/produto/:id', ProdutoController.update);

routes.get('/produto-margem', ProdutoMargemController.index);
routes.get('/produto-margem/:id', ProdutoMargemController.index);
routes.delete('/produto-margem/:id', ProdutoMargemController.delete);
routes.post('/produto-margem', ProdutoMargemController.create);
routes.put('/produto-margem/:id', ProdutoMargemController.update);

module.exports = routes;