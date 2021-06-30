const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const item_pedido_fornecedor = await connection('TB_ACAD_ITEM_PEDIDO_FORNECEDOR').select().where('ID_ITEM_PEDIDO_FORNECEDOR', id);
            return response.json(item_pedido_fornecedor);
        }

        const item_pedido_fornecedors = await connection('TB_ACAD_ITEM_PEDIDO_FORNECEDOR').select();
        return response.json(item_pedido_fornecedors);
    },

    async create(request, response) {
        const { ID_PRODUTO, VALOR_UNIDADE, VALOR_TOTAL, QUANTIDADE, ID_PEDIDO } = request.body;

        await connection
            .raw(`insert into TB_ACAD_ITEM_PEDIDO_FORNECEDOR (id_produto, valor_unidade, valor_total, quantidade, id_pedido) values 
                  (${ID_PRODUTO}, ${VALOR_UNIDADE}, ${VALOR_TOTAL}, ${QUANTIDADE}, ${ID_PEDIDO})`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const item_pedido_fornecedor = await connection('TB_ACAD_ITEM_PEDIDO_FORNECEDOR')
                                                        .select().whereRaw(`id_produto like ${ID_PRODUTO} and valor_unidade like ${VALOR_UNIDADE} 
                                                        and valor_total like ${VALOR_TOTAL} and quantidade = ${QUANTIDADE} and id_pedido = ${ID_PEDIDO}`);
                return response.json(item_pedido_fornecedor);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const item_pedido_fornecedor = await connection('TB_ACAD_ITEM_PEDIDO_FORNECEDOR').select().where('ID_ITEM_PEDIDO_FORNECEDOR', id);
        await connection('TB_ACAD_ITEM_PEDIDO_FORNECEDOR').where('ID_ITEM_PEDIDO_FORNECEDOR', id).delete();

        return response.status(200).json(item_pedido_fornecedor);
    },

    async update(request, response) {
        const { id } = request.params;
        const { ID_PRODUTO, VALOR_UNIDADE, VALOR_TOTAL, QUANTIDADE, ID_PEDIDO } = request.body;
        const item_pedido_fornecedorExiste = Object.keys(await connection('TB_ACAD_ITEM_PEDIDO_FORNECEDOR').select().where('ID_ITEM_PEDIDO_FORNECEDOR', id)).length == 0;

        if (item_pedido_fornecedorExiste) {
            return response.status(400).json({ error: "ITEM_PEDIDO_FORNECEDOR não existe!" });
        }

        await connection.raw(`update TB_ACAD_ITEM_PEDIDO_FORNECEDOR set id_produto = ${ID_PRODUTO}, valor_unidade = ${VALOR_UNIDADE}, quantidade = ${QUANTIDADE},
                              valor_unidade = ${VALOR_UNIDADE}, valor_total = ${VALOR_TOTAL}, id_pedido = ${ID_PEDIDO} where id_item_pedido_fornecedor = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const item_pedido_fornecedor = await connection('TB_ACAD_ITEM_PEDIDO_FORNECEDOR').select().where('ID_ITEM_PEDIDO_FORNECEDOR', id);
                return response.json(item_pedido_fornecedor);
            });
    },
};