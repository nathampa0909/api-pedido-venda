const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id, cep, fornecedor } = request.params;

        if (id) {
            const endereco = await connection('TB_ACAD_ENDERECO').select().where('ID_ENDERECO', id);
            return response.json(endereco);
        } else if(cep) {
            const endereco = await connection('TB_ACAD_ENDERECO').select().where('CEP', cep);
            return response.json(endereco);
        } else if(fornecedor) {
            const endereco = await connection('TB_ACAD_ENDERECO').select().where('ID_FORNECEDOR', fornecedor);
            return response.json(endereco);
        }

        const enderecos = await connection('TB_ACAD_ENDERECO').select();
        return response.json(enderecos);
    },

    async create(request, response) {
        const { ID_FORNECEDOR, ID_PAIS, LOGRADOURO, NUMERO, BAIRRO, ID_CIDADE, CEP, ID_ESTADO } = request.body;
        const sequencia = await connection('TB_ACAD_ENDERECO').select('ID_ENDERECO').orderBy('ID_ENDERECO', 'desc').first();

        await connection
            .raw(`insert into TB_ACAD_ENDERECO (id_fornecedor, id_pais, logradouro, numero, bairro, id_cidade, cep, id_estado) values (${ID_FORNECEDOR}, ${ID_PAIS}, 
                '${LOGRADOURO}', ${NUMERO}, '${BAIRRO}', ${ID_CIDADE}, ${CEP}, ${ID_ESTADO})`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const endereco = await connection('TB_ACAD_ENDERECO').select().where('ID_ENDERECO', sequencia.ID_ENDERECO + 1);
                return response.json(endereco);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const endereco = await connection('TB_ACAD_ENDERECO').select().where('ID_ENDERECO', id);
        await connection('TB_ACAD_ENDERECO').where('ID_ENDERECO', id).delete();

        return response.status(200).json(endereco);
    },

    async update(request, response) {
        const { id } = request.params;
        const { ID_FORNECEDOR, ID_PAIS, LOGRADOURO, NUMERO, BAIRRO, ID_CIDADE, CEP, ID_ESTADO } = request.body;
        const enderecoExiste = Object.keys(await connection('TB_ACAD_ENDERECO').select().where('ID_ENDERECO', id)).length == 0;

        if (enderecoExiste) {
            return response.status(400).json({ error: "Endereco não existe!" });
        }

        await connection.raw(`update TB_ACAD_ENDERECO set id_fornecedor = ${ID_FORNECEDOR}, id_pais = ${ID_PAIS}, logradouro = '${LOGRADOURO}', numero = ${NUMERO},
                              bairro = '${BAIRRO}', id_cidade = ${ID_CIDADE}, cep = ${CEP}, id_estado = ${ID_ESTADO} where id_endereco = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const endereco = await connection('TB_ACAD_ENDERECO').select().where('ID_ENDERECO', id);
                return response.json(endereco);
            });
    },
};