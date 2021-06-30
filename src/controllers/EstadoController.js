const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const estado = await connection('TB_ACAD_ESTADO').select().where('ID_ESTADO', id);
            return response.json(estado);
        }

        const estados = await connection('TB_ACAD_ESTADO').select();
        return response.json(estados);
    },

    async create(request, response) {
        const { NOME, ID_PAIS } = request.body;
        const sequencia = await connection('TB_ACAD_ESTADO').select('ID_ESTADO').orderBy('ID_ESTADO', 'desc').first();

        await connection
            .raw(`insert into TB_ACAD_ESTADO (id_pais, nome) values (${ID_PAIS}, '${NOME}')`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const estado = await connection('TB_ACAD_ESTADO').select().where('ID_ESTADO', sequencia.ID_ESTADO + 1);
                return response.json(estado);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const estado = await connection('TB_ACAD_ESTADO').select().where('ID_ESTADO', id);
        await connection('TB_ACAD_ESTADO').where('ID_ESTADO', id).delete();

        return response.status(200).json(estado);
    },

    async update(request, response) {
        const { id } = request.params;
        const { NOME, ID_PAIS } = request.body;
        const estadoExiste = Object.keys(await connection('TB_ACAD_ESTADO').select().where('ID_ESTADO', id)).length == 0;

        if (estadoExiste) {
            return response.status(400).json({ error: "Estado não existe!" });
        }

        await connection.raw(`update TB_ACAD_ESTADO set nome = '${NOME}', id_pais = ${ID_PAIS} where id_estado = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const estado = await connection('TB_ACAD_ESTADO').select().where('ID_ESTADO', id);
                return response.json(estado);
            });
    },
};