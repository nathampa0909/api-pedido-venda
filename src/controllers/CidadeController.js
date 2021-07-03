const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const cidade = await connection('TB_ACAD_CIDADE').select().where('ID_CIDADE', id);
            return response.json(cidade[0]);
        }

        const cidades = await connection('TB_ACAD_CIDADE').select();
        return response.json(cidades);
    },

    async create(request, response) {
        const { NOME, ID_ESTADO } = request.body;

        await connection
            .raw(`insert into TB_ACAD_CIDADE (id_estado, nome) values (${ID_ESTADO}, '${NOME}')`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const cidade = await connection('TB_ACAD_CIDADE').select().whereRaw(`id_estado = ${ID_ESTADO} and nome like '${NOME}'`);
                
                return response.json(cidade[0]);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const cidade = await connection('TB_ACAD_CIDADE').select().where('ID_CIDADE', id);
        await connection('TB_ACAD_CIDADE').where('ID_CIDADE', id).delete();

        return response.status(200).json(cidade[0]);
    },

    async update(request, response) {
        const { id } = request.params;
        const { NOME, ID_ESTADO } = request.body;
        const cidadeExiste = Object.keys(await connection('TB_ACAD_CIDADE').select().where('ID_CIDADE', id)).length == 0;

        if (cidadeExiste) {
            return response.status(400).json({ error: "Cidade não existe!" });
        }

        await connection.raw(`update TB_ACAD_CIDADE set nome = '${NOME}', id_estado = ${ID_ESTADO} where ID_CIDADE = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const cidade = await connection('TB_ACAD_CIDADE').select().where('ID_CIDADE', id);
                return response.json(cidade[0]);
            });
    },
};