const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id, idEstoque } = request.params;

        if (id) {
            const produtos = await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').select().whereRaw(`id_movimentacao = ${id}`);
            return response.json(produtos);
        } else if (idEstoque) {
            const estoqueMovimentacoes = await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').select().whereRaw(`id_estoque = ${idEstoque}`);
            return response.json(estoqueMovimentacoes);
        } else if (idProduto) {
            const estoqueMovimentacoes = await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').select().whereRaw(`id_produto = ${idEstoque}`);
            return response.json(estoqueMovimentacoes);
        }

        const produtos = await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').select();
        return response.json(produtos);
    },

    async create(request, response) {
        const { ID_ESTOQUE, ID_PRODUTO, QUANTIDADE } = request.body;

        await connection
            .raw(`insert into TB_ACAD_MOVIMENTACAO_ESTOQUE (id_estoque, id_produto, quantidade) values (${ID_ESTOQUE}, ${ID_PRODUTO}, ${QUANTIDADE})`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const estoque = await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').select().whereRaw(`id_estoque = ${ID_ESTOQUE} and 
                                                                                                    id_produto = ${ID_PRODUTO} and 
                                                                                                    quantidade = ${QUANTIDADE}`);
                return response.json(estoque[0]);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const estoque = await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').select().where('ID_MOVIMENTACAO', id);
        await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').where('ID_MOVIMENTACAO', id).delete();

        return response.status(200).json(estoque[0]);
    },

    async update(request, response) {
        const { id } = request.params;
        const { ID_ESTOQUE, ID_PRODUTO, QUANTIDADE } = request.body;
        const estoqueExiste = Object.keys(await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').select().where('ID_MOVIMENTACAO', id)).length == 0;

        if (estoqueExiste) {
            return response.status(400).json({ error: "Estoque não existe!" });
        }

        await connection.raw(`update TB_ACAD_MOVIMENTACAO_ESTOQUE set id_estoque = ${ID_ESTOQUE}, id_produto = ${ID_PRODUTO}, quantidade = ${QUANTIDADE} where id_movimentacao = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const estoque = await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').select().where('ID_MOVIMENTACAO', id);
                return response.json(estoque[0]);
            });
    },
};