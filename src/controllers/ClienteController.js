const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id, cpf } = request.params;

        if (id) {
            const cliente = await connection('TB_ACAD_CLIENTE').select().where('ID_CLIENTE', id);
            return response.json(cliente);
        } else if (cpf) {
            const cliente = await connection('TB_ACAD_CLIENTE').select().where('CPF_CNPJ', cpf);
            return response.json(cliente);
        }

        const clientes = await connection('TB_ACAD_CLIENTE').select();
        return response.json(clientes);
    },

    async create(request, response) {
        const { NOME, CPF_CNPJ, DATA_NASCIMENTO, ESTADO_CIVIL, EMAIL, SEXO, DDD, NUMERO_TELEFONE, LOGRADOURO, NUMERO, BAIRRO, CIDADE, CEP, UF } = request.body;
        const ehRepetido = Object.keys(await connection('TB_ACAD_CLIENTE').select().where('CPF_CNPJ', CPF_CNPJ)).length > 0;

        if (ehRepetido) {
            return response.status(400).json({ error: "CPF já registrado!" });
        }

        await connection
            .raw(`insert into TB_ACAD_CLIENTE (nome, cpf_cnpj, data_nascimento, estado_civil, email, sexo, ddd, numero_telefone, logradouro, numero, bairro, cidade, cep, uf) 
            values ('${NOME}', ${CPF_CNPJ}, to_date('${DATA_NASCIMENTO}', 'dd-mm-yyyy'), ${ESTADO_CIVIL}, '${EMAIL}', ${SEXO}, ${DDD}, 
            ${NUMERO_TELEFONE}, '${LOGRADOURO}', ${NUMERO}, '${BAIRRO}', '${CIDADE}', ${CEP}, '${UF}')`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const cliente = await connection('TB_ACAD_CLIENTE').select().where('CPF_CNPJ', CPF_CNPJ);
                return response.json(cliente);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const cliente = await connection('TB_ACAD_CLIENTE').select().where('ID_CLIENTE', id);
        await connection('TB_ACAD_CLIENTE').where('ID_CLIENTE', id).delete();

        return response.status(200).json(cliente);
    },

    async update(request, response) {
        const { id } = request.params;
        const { NOME, CPF_CNPJ, DATA_NASCIMENTO, ESTADO_CIVIL, EMAIL, SEXO, DDD, NUMERO_TELEFONE, LOGRADOURO, NUMERO, BAIRRO, CIDADE, CEP, UF } = request.body;
        const clienteExiste = Object.keys(await connection('TB_ACAD_CLIENTE').select().where('ID_CLIENTE', id)).length = 0;

        if (clienteExiste) {
            return response.status(400).json({ error: "Cliente não existe!" });
        }

        await connection
            .raw(`update TB_ACAD_CLIENTE set nome = '${NOME}', cpf_cnpj = ${CPF_CNPJ}, data_nascimento = to_date('${DATA_NASCIMENTO}', 'dd-mm-yyyy'), 
            estado_civil = ${ESTADO_CIVIL}, email = '${EMAIL}', sexo = ${SEXO}, ddd = ${DDD}, numero_telefone = ${NUMERO_TELEFONE}, logradouro = '${LOGRADOURO}',
            numero = ${NUMERO}, bairro = '${BAIRRO}', cidade = '${CIDADE}', cep = ${CEP}, uf = '${UF}' 
            where ID_CLIENTE = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const cliente = await connection('TB_ACAD_CLIENTE').select().where('ID_CLIENTE', id);
                return response.json(cliente);
            });
    },
};