const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const categoria = await connection('TB_ACAD_CATEGORIA').select().where('ID_CATEGORIA', id);
            return response.json(categoria[0]);
        }

        const categorias = await connection('TB_ACAD_CATEGORIA').select();
        return response.json(categorias);
    },

    async create(request, response) {
        const { NOME } = request.body;
        const sequencia = await connection('TB_ACAD_CATEGORIA').select('ID_CATEGORIA').orderBy('ID_CATEGORIA', 'desc').first();

        await connection
            .raw(`insert into TB_ACAD_CATEGORIA (nome) values ('${NOME}')`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const categoria = await connection('TB_ACAD_CATEGORIA').select().where('ID_CATEGORIA', sequencia.ID_CATEGORIA + 1);
                return response.json(categoria[0]);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const categoria = await connection('TB_ACAD_CATEGORIA').select().where('ID_CATEGORIA', id);
        await connection('TB_ACAD_CATEGORIA').where('ID_CATEGORIA', id).delete();

        return response.status(200).json(categoria[0]);
    },

    async update(request, response) {
        const { id } = request.params;
        const { NOME } = request.body;
        const categoriaExiste = Object.keys(await connection('TB_ACAD_CATEGORIA').select().where('ID_CATEGORIA', id)).length == 0;

        if (categoriaExiste) {
            return response.status(400).json({ error: "Categoria não existe!" });
        }

        await connection.raw(`update TB_ACAD_CATEGORIA set nome = '${NOME}' where ID_CATEGORIA = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const categoria = await connection('TB_ACAD_CATEGORIA').select().where('ID_CATEGORIA', id);
                return response.json(categoria[0]);
            });
    },
};