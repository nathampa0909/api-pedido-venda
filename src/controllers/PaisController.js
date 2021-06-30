const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const pais = await connection('TB_ACAD_PAIS').select().where('ID_PAIS', id);
            return response.json(pais);
        }

        const paiss = await connection('TB_ACAD_PAIS').select();
        return response.json(paiss);
    },

    async create(request, response) {
        const { NOME, ID_PAIS } = request.body;
        const sequencia = await connection('TB_ACAD_PAIS').select('ID_PAIS').orderBy('ID_PAIS', 'desc').first();

        await connection
            .raw(`insert into TB_ACAD_PAIS (id_pais, nome) values (${ID_PAIS}, '${NOME}')`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const pais = await connection('TB_ACAD_PAIS').select().where('ID_PAIS', sequencia.ID_PAIS + 1);
                return response.json(pais);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const pais = await connection('TB_ACAD_PAIS').select().where('ID_PAIS', id);
        await connection('TB_ACAD_PAIS').where('ID_PAIS', id).delete();

        return response.status(200).json(pais);
    },

    async update(request, response) {
        const { id } = request.params;
        const { NOME } = request.body;
        const paisExiste = Object.keys(await connection('TB_ACAD_PAIS').select().where('ID_PAIS', id)).length == 0;

        if (paisExiste) {
            return response.status(400).json({ error: "Pais não existe!" });
        }

        await connection.raw(`update TB_ACAD_PAIS set nome = '${NOME}' where id_pais = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const pais = await connection('TB_ACAD_PAIS').select().where('ID_PAIS', id);
                return response.json(pais);
            });
    },
};