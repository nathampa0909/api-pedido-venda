const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id, nome, produtos } = request.params;

        if(id && produtos) {
            const produtos = await connection('TB_ACAD_MOVIMENTACAO_ESTOQUE').select().whereRaw(`id_estoque = ${id}`);
            return response.json(produtos);
        } else if (id) {
            const estoque = await connection('TB_ACAD_ESTOQUE').select().where('ID_ESTOQUE', id);
            return response.json(estoque[0]);
        } else if(nome) {
            const estoque = await connection('TB_ACAD_ESTOQUE').select().whereRaw(`LOWER(NOME) LIKE '%${nome.toString().toLowerCase()}%'`);
            return response.json(estoque[0]);
        }

        const estoques = await connection('TB_ACAD_ESTOQUE').select();
        return response.json(estoques);
    },

    async create(request, response) {
        const { NOME, ID_PRODUTO, QUANTIDADE } = request.body;
        const sequencia = await connection('TB_ACAD_ESTOQUE').select('ID_ESTOQUE').orderBy('ID_ESTOQUE', 'desc').first();

        await connection
            .raw(`insert into TB_ACAD_ESTOQUE (id_produto, quantidade, nome) values (${ID_PRODUTO}, ${QUANTIDADE}, '${NOME}')`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const estoque = await connection('TB_ACAD_ESTOQUE').select().where('ID_ESTOQUE', sequencia.ID_ESTOQUE + 1);
                return response.json(estoque[0]);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const estoque = await connection('TB_ACAD_ESTOQUE').select().where('ID_ESTOQUE', id);
        await connection('TB_ACAD_ESTOQUE').where('ID_ESTOQUE', id).delete();

        return response.status(200).json(estoque[0]);
    },

    async update(request, response) {
        const { id } = request.params;
        const { NOME, ID_PRODUTO, QUANTIDADE } = request.body;
        const estoqueExiste = Object.keys(await connection('TB_ACAD_ESTOQUE').select().where('ID_ESTOQUE', id)).length == 0;

        if (estoqueExiste) {
            return response.status(400).json({ error: "Estoque não existe!" });
        }

        await connection.raw(`update TB_ACAD_ESTOQUE set nome = '${NOME}', id_produto = ${ID_PRODUTO}, quantidade = ${QUANTIDADE} where id_estoque = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const estoque = await connection('TB_ACAD_ESTOQUE').select().where('ID_ESTOQUE', id);
                return response.json(estoque[0]);
            });
    },
};