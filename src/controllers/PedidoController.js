const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const pedido = await connection('TB_ACAD_PEDIDO').select().where('ID_PEDIDO', id);
            return response.json(pedido[0]);
        }

        const pedidos = await connection('TB_ACAD_PEDIDO').select();
        return response.json(pedidos);
    },

    async create(request, response) {
        const { ID_CLIENTE, TOTAL_PEDIDO, DATA_PEDIDO, ID_FUNCIONARIO } = request.body;



        await connection
            .raw(`insert into TB_ACAD_PEDIDO (id_cliente, total_pedido, data_pedido, id_funcionario) values 
                  (${ID_CLIENTE}, ${TOTAL_PEDIDO}, to_date('${DATA_PEDIDO}', 'dd-mm-yyyy'), ${ID_FUNCIONARIO})`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const pedido = await connection('TB_ACAD_PEDIDO').select().whereRaw(`id_cliente = ${ID_CLIENTE} and total_pedido = ${TOTAL_PEDIDO} 
                                                                                     and data_pedido = to_date('${DATA_PEDIDO}', 'dd-mm-yyyy') and id_funcionario = ${ID_FUNCIONARIO}`);
                return response.json(pedido[0]);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const pedido = await connection('TB_ACAD_PEDIDO').select().where('ID_PEDIDO', id);
        await connection('TB_ACAD_PEDIDO').where('ID_PEDIDO', id).delete();

        return response.status(200).json(pedido[0]);
    },

    async update(request, response) {
        const { id } = request.params;
        const { ID_CLIENTE, TOTAL_PEDIDO, DATA_PEDIDO, ID_FUNCIONARIO } = request.body;
        const pedidoExiste = Object.keys(await connection('TB_ACAD_PEDIDO').select().where('ID_PEDIDO', id)).length == 0;

        if (pedidoExiste) {
            return response.status(400).json({ error: "PEDIDO não existe!" });
        }

        await connection.raw(`update TB_ACAD_PEDIDO set id_cliente = ${ID_CLIENTE}, total_pedido = ${TOTAL_PEDIDO}, data_pedido = to_date('${DATA_PEDIDO}', 'dd-mm-yyyy'),
                              id_funcionario = ${ID_FUNCIONARIO} where id_pedido = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const pedido = await connection('TB_ACAD_PEDIDO').select().where('ID_PEDIDO', id);
                return response.json(pedido[0]);
            });
    },
};