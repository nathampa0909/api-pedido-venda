const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const produto_margem = await connection('TB_ACAD_PRODUTO_MARGEM').select().where('ID_PRODUTO_MARGEM', id);
            return response.json(produto_margem);
        }

        const produto_margems = await connection('TB_ACAD_PRODUTO_MARGEM').select();
        return response.json(produto_margems);
    },

    async create(request, response) {
        const { MARGEM, ID_PRODUTO } = request.body;

        await connection
            .raw(`insert into TB_ACAD_PRODUTO_MARGEM (margem, id_produto) values 
                  (${MARGEM}, ${ID_PRODUTO})`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const produto_margem = await connection('TB_ACAD_PRODUTO_MARGEM').select().whereRaw(`margem = ${MARGEM} and id_produto = ${ID_PRODUTO}`);
                return response.json(produto_margem);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const produto_margem = await connection('TB_ACAD_PRODUTO_MARGEM').select().where('ID_PRODUTO_MARGEM', id);
        await connection('TB_ACAD_PRODUTO_MARGEM').where('ID_PRODUTO_MARGEM', id).delete();

        return response.status(200).json(produto_margem);
    },

    async update(request, response) {
        const { id } = request.params;
        const { MARGEM, ID_PRODUTO } = request.body;
        const produto_margemExiste = Object.keys(await connection('TB_ACAD_PRODUTO_MARGEM').select().where('ID_PRODUTO_MARGEM', id)).length == 0;

        if (produto_margemExiste) {
            return response.status(400).json({ error: "PRODUTO_MARGEM não existe!" });
        }

        await connection.raw(`update TB_ACAD_PRODUTO_MARGEM set margem = ${MARGEM}, id_produto = ${ID_PRODUTO} where id_produto_margem = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const produto_margem = await connection('TB_ACAD_PRODUTO_MARGEM').select().where('ID_PRODUTO_MARGEM', id);
                return response.json(produto_margem);
            });
    },
};