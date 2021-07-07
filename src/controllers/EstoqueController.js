const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id, nome } = request.params;

        if (id) {
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
        const { NOME } = request.body;
        
        await connection
            .raw(`insert into TB_ACAD_ESTOQUE (nome) values ('${NOME}')`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const estoque = await connection('TB_ACAD_ESTOQUE').select().whereRaw(`NOME like '${NOME}'`);
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
        const { NOME } = request.body;
        const estoqueExiste = Object.keys(await connection('TB_ACAD_ESTOQUE').select().where('ID_ESTOQUE', id)).length == 0;

        if (estoqueExiste) {
            return response.status(400).json({ error: "Estoque não existe!" });
        }

        await connection.raw(`update TB_ACAD_ESTOQUE set nome = '${NOME}' where id_estoque = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const estoque = await connection('TB_ACAD_ESTOQUE').select().where('ID_ESTOQUE', id);
                return response.json(estoque[0]);
            });
    },
};