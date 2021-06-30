const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id, nome } = request.params;

        if (id) {
            const produto = await connection('TB_ACAD_PRODUTO').select().where('ID_PRODUTO', id);
            return response.json(produto);
        } else if (nome) {
            const produto = await connection('TB_ACAD_PRODUTO').select().whereRaw(`LOWER(NOME) LIKE '%${nome.toString().toLowerCase()}%'`);
            return response.json(produto);
        }

        const produtos = await connection('TB_ACAD_PRODUTO').select();
        return response.json(produtos);
    },

    async create(request, response) {
        const { NOME, DESCRICAO, ID_FORNECEDOR, VALOR_VENDA, VALOR_COMPRA, ID_CATEGORIA } = request.body;

        await connection
            .raw(`insert into TB_ACAD_PRODUTO (nome, descricao, id_fornecedor, valor_venda, valor_compra, id_categoria) values 
                  ('${NOME}', '${DESCRICAO}', ${ID_FORNECEDOR}, ${VALOR_VENDA}, ${VALOR_COMPRA}, ${ID_CATEGORIA})`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const produto = await connection('TB_ACAD_PRODUTO').select().whereRaw(`nome like '${NOME}' and descricao like '${DESCRICAO}' 
                                                                                       and id_fornecedor = ${ID_FORNECEDOR} and valor_venda = ${VALOR_VENDA}
                                                                                       and valor_compra = ${VALOR_COMPRA} and id_categoria = ${ID_CATEGORIA}`);
                return response.json(produto);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const produto = await connection('TB_ACAD_PRODUTO').select().where('ID_PRODUTO', id);
        await connection('TB_ACAD_PRODUTO').where('ID_PRODUTO', id).delete();

        return response.status(200).json(produto);
    },

    async update(request, response) {
        const { id } = request.params;
        const { NOME, DESCRICAO, ID_FORNECEDOR, VALOR_VENDA, VALOR_COMPRA, ID_CATEGORIA } = request.body;
        const produtoExiste = Object.keys(await connection('TB_ACAD_PRODUTO').select().where('ID_PRODUTO', id)).length == 0;

        if (produtoExiste) {
            return response.status(400).json({ error: "PRODUTO não existe!" });
        }

        await connection.raw(`update TB_ACAD_PRODUTO set nome = '${NOME}', descricao = '${DESCRICAO}', id_fornecedor = ${ID_FORNECEDOR},
                              valor_venda = ${VALOR_VENDA}, valor_compra = ${VALOR_COMPRA}, id_categoria = ${ID_CATEGORIA} where id_produto = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const produto = await connection('TB_ACAD_PRODUTO').select().where('ID_PRODUTO', id);
                return response.json(produto);
            });
    },
};