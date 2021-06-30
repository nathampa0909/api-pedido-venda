const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const pedido_fornecedor = await connection('TB_ACAD_PEDIDO_FORNECEDOR').select().where('ID_PEDIDO_FORNECEDOR', id);
            return response.json(pedido_fornecedor);
        }

        const pedido_fornecedors = await connection('TB_ACAD_PEDIDO_FORNECEDOR').select();
        return response.json(pedido_fornecedors);
    },

    async create(request, response) {
        const { ID_FORNECEDOR, DATA_ENTRADA, VALOR_TOTAL, ID_FUNCIONARIO } = request.body;

        await connection
            .raw(`insert into TB_ACAD_PEDIDO_FORNECEDOR (id_fornecedor, data_entrada, valor_total, id_funcionario) values 
                  (${ID_FORNECEDOR}, to_date('${DATA_ENTRADA}', 'dd-mm-yyyy'), ${VALOR_TOTAL}, ${ID_FUNCIONARIO})`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const pedido_fornecedor = await connection('TB_ACAD_PEDIDO_FORNECEDOR').select().whereRaw(`id_fornecedor = ${ID_FORNECEDOR} and valor_total = ${VALOR_TOTAL} 
                                                                                     and data_entrada = to_date('${DATA_ENTRADA}', 'dd-mm-yyyy') and id_funcionario = ${ID_FUNCIONARIO}`);
                return response.json(pedido_fornecedor);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const pedido_fornecedor = await connection('TB_ACAD_PEDIDO_FORNECEDOR').select().where('ID_PEDIDO_FORNECEDOR', id);
        await connection('TB_ACAD_PEDIDO_FORNECEDOR').where('ID_PEDIDO_FORNECEDOR', id).delete();

        return response.status(200).json(pedido_fornecedor);
    },

    async update(request, response) {
        const { id } = request.params;
        const { ID_FORNECEDOR, DATA_ENTRADA, VALOR_TOTAL, ID_FUNCIONARIO } = request.body;
        const pedido_fornecedorExiste = Object.keys(await connection('TB_ACAD_PEDIDO_FORNECEDOR').select().where('ID_PEDIDO_FORNECEDOR', id)).length == 0;

        if (pedido_fornecedorExiste) {
            return response.status(400).json({ error: "PEDIDO_FORNECEDOR não existe!" });
        }

        await connection.raw(`update TB_ACAD_PEDIDO_FORNECEDOR set id_fornecedor = ${ID_FORNECEDOR}, valor_total = ${VALOR_TOTAL}, data_entrada = to_date('${DATA_ENTRADA}', 'dd-mm-yyyy'),
                              id_funcionario = ${ID_FUNCIONARIO} where id_pedido_fornecedor = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const pedido_fornecedor = await connection('TB_ACAD_PEDIDO_FORNECEDOR').select().where('ID_PEDIDO_FORNECEDOR', id);
                return response.json(pedido_fornecedor);
            });
    },
};