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

routes.get('/clientes', ClienteController.index);
routes.get('/clientes/:id', ClienteController.index);
routes.get('/clientes/cpf/:cpf', ClienteController.index);
routes.delete('/clientes/:id', ClienteController.delete);
routes.post('/clientes', ClienteController.create);
routes.put('/clientes/:id', ClienteController.update);

routes.get('/categorias', CategoriaController.index);
routes.get('/categorias/:id', CategoriaController.index);
routes.delete('/categorias/:id', CategoriaController.delete);
routes.post('/categorias', CategoriaController.create);
routes.put('/categorias/:id', CategoriaController.update);

routes.get('/cidades', CidadeController.index);
routes.get('/cidades/:id', CidadeController.index);
routes.delete('/cidades/:id', CidadeController.delete);
routes.post('/cidades', CidadeController.create);
routes.put('/cidades/:id', CidadeController.update);

routes.get('/enderecos', EnderecoController.index);
routes.get('/enderecos/:id', EnderecoController.index);
routes.get('/enderecos/cep/:cep', EnderecoController.index);
routes.get('/enderecos/fornecedor/:fornecedor', EnderecoController.index);
routes.delete('/enderecos/:id', EnderecoController.delete);
routes.post('/enderecos', EnderecoController.create);
routes.put('/enderecos/:id', EnderecoController.update);

routes.get('/estados', EstadoController.index);
routes.get('/estados/:id', EstadoController.index);
routes.delete('/estados/:id', EstadoController.delete);
routes.post('/estados', EstadoController.create);
routes.put('/estados/:id', EstadoController.update);

routes.get('/estoques', EstoqueController.index);
routes.get('/estoques/:id', EstoqueController.index);
routes.get('/estoques/nome/:nome', EstoqueController.index);
routes.delete('/estoques/:id', EstoqueController.delete);
routes.post('/estoques', EstoqueController.create);
routes.put('/estoques/:id', EstoqueController.update);

routes.get('/fornecedores', FornecedorController.index);
routes.get('/fornecedores/:id', FornecedorController.index);
routes.get('/fornecedores/nome/:nome', FornecedorController.index);
routes.delete('/fornecedores/:id', FornecedorController.delete);
routes.post('/fornecedores', FornecedorController.create);
routes.put('/fornecedores/:id', FornecedorController.update);

routes.get('/funcionarios', FuncionarioController.index);
routes.get('/funcionarios/:id', FuncionarioController.index);
routes.delete('/funcionarios/:id', FuncionarioController.delete);
routes.post('/funcionarios', FuncionarioController.create);
routes.put('/funcionarios/:id', FuncionarioController.update);

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