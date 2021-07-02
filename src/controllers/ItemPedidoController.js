const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const item_pedido = await connection('TB_ACAD_ITEM_PEDIDO').select().where('ID_ITEM_PEDIDO', id);
            return response.json(item_pedido[0]);
        }

        const item_pedidos = await connection('TB_ACAD_ITEM_PEDIDO').select();
        return response.json(item_pedidos);
    },

    async create(request, response) {
        const { ID_PEDIDO, ID_PRODUTO, QUANTIDADE, VALOR_UNITARIO, VALOR_TOTAL } = request.body;

        await connection
            .raw(`insert into TB_ACAD_ITEM_PEDIDO (id_pedido, id_produto, quantidade, valor_unitario, valor_total) values 
                  (${ID_PEDIDO}, ${ID_PRODUTO}, ${QUANTIDADE}, ${VALOR_UNITARIO}, ${VALOR_TOTAL})`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const item_pedido = await connection('TB_ACAD_ITEM_PEDIDO').select().whereRaw(`id_pedido = ${ID_PEDIDO} and id_produto = ${ID_PRODUTO} 
                                                                                               and quantidade = ${QUANTIDADE} and valor_unitario = ${VALOR_UNITARIO} 
                                                                                               and valor_total = ${VALOR_TOTAL}`);
                return response.json(item_pedido[0]);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const item_pedido = await connection('TB_ACAD_ITEM_PEDIDO').select().where('ID_ITEM_PEDIDO', id);
        await connection('TB_ACAD_ITEM_PEDIDO').where('ID_ITEM_PEDIDO', id).delete();

        return response.status(200).json(item_pedido[0]);
    },

    async update(request, response) {
        const { id } = request.params;
        const { ID_PEDIDO, ID_PRODUTO, QUANTIDADE, VALOR_UNITARIO, VALOR_TOTAL } = request.body;
        const item_pedidoExiste = Object.keys(await connection('TB_ACAD_ITEM_PEDIDO').select().where('ID_ITEM_PEDIDO', id)).length == 0;

        if (item_pedidoExiste) {
            return response.status(400).json({ error: "ITEM_PEDIDO não existe!" });
        }

        await connection.raw(`update TB_ACAD_ITEM_PEDIDO set id_pedido = ${ID_PEDIDO}, id_produto = ${ID_PRODUTO}, quantidade = ${QUANTIDADE},
                              valor_unitario = ${VALOR_UNITARIO}, valor_total = ${VALOR_TOTAL} where id_item_pedido = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const item_pedido = await connection('TB_ACAD_ITEM_PEDIDO').select().where('ID_ITEM_PEDIDO', id);
                return response.json(item_pedido[0]);
            });
    },
};