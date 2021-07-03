const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id, nome, cpfCnpj } = request.params;

        if (id) {
            const fornecedor = await connection('TB_ACAD_FORNECEDOR').select().where('ID_FORNECEDOR', id);
            return response.json(fornecedor[0]);
        } else if (nome) {
            const fornecedor = await connection('TB_ACAD_FORNECEDOR').select().whereRaw(`LOWER(NOME) LIKE '%${nome.toString().toLowerCase()}%'`);
            return response.json(fornecedor[0]);
        } else if (cpfCnpj) {
            const fornecedor = await connection('TB_ACAD_FORNECEDOR').select().whereRaw(`CPF_CNPJ = ${cpfCnpj}`);
            return response.json(fornecedor[0]);
        }

        const fornecedors = await connection('TB_ACAD_FORNECEDOR').select();
        return response.json(fornecedors);
    },

    async create(request, response) {
        const { NOME, CPF_CNPJ, TELEFONE, EMAIL } = request.body;
        
        await connection
            .raw(`insert into TB_ACAD_FORNECEDOR (nome, cpf_cnpj, telefone, email) values ('${NOME}', ${CPF_CNPJ}, ${TELEFONE}, '${EMAIL}')`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const fornecedor = await connection('TB_ACAD_FORNECEDOR').select().whereRaw(`nome like '${NOME}' and cpf_cnpj = '${CPF_CNPJ}' 
                                                                                       and telefone = ${TELEFONE} and email = '${EMAIL}'`);
                return response.json(fornecedor[0]);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const fornecedor = await connection('TB_ACAD_FORNECEDOR').select().where('ID_FORNECEDOR', id);
        await connection('TB_ACAD_FORNECEDOR').where('ID_FORNECEDOR', id).delete();

        return response.status(200).json(fornecedor[0]);
    },

    async update(request, response) {
        const { id } = request.params;
        const { NOME, CPF_CNPJ, TELEFONE, EMAIL } = request.body;
        const fornecedorExiste = Object.keys(await connection('TB_ACAD_FORNECEDOR').select().where('ID_FORNECEDOR', id)).length == 0;

        if (fornecedorExiste) {
            return response.status(400).json({ error: "Fornecedor não existe!" });
        }

        await connection.raw(`update TB_ACAD_FORNECEDOR set nome = '${NOME}', cpf_cnpj = ${CPF_CNPJ}, telefone = ${TELEFONE}, email = '${EMAIL}' where id_fornecedor = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const fornecedor = await connection('TB_ACAD_FORNECEDOR').select().where('ID_FORNECEDOR', id);
                return response.json(fornecedor[0]);
            });
    },
};