const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if (id) {
            const funcionario = await connection('TB_ACAD_FUNCIONARIO').select().where('ID_FUNCIONARIO', id);
            return response.json(funcionario[0]);
        }

        const funcionarios = await connection('TB_ACAD_FUNCIONARIO').select();
        return response.json(funcionarios);
    },

    async create(request, response) {
        const { USUARIO, SENHA, NOME, CARGO } = request.body;
        const sequencia = await connection('TB_ACAD_FUNCIONARIO').select('ID_FUNCIONARIO').orderBy('ID_FUNCIONARIO', 'desc').first();

        await connection
            .raw(`insert into TB_ACAD_FUNCIONARIO (usuario, senha, nome, cargo) values ('${USUARIO}', '${SENHA}', '${NOME}', ${CARGO})`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const funcionario = await connection('TB_ACAD_FUNCIONARIO').select().whereRaw(`usuario like '${USUARIO}' and senha like '${SENHA}' 
                                                                                               and nome like '${NOME}' and cargo = ${CARGO}`);
                return response.json(funcionario[0]);
            });
    },

    async delete(request, response) {
        const { id } = request.params;

        const funcionario = await connection('TB_ACAD_FUNCIONARIO').select().where('ID_FUNCIONARIO', id);
        await connection('TB_ACAD_FUNCIONARIO').where('ID_FUNCIONARIO', id).delete();

        return response.status(200).json(funcionario[0]);
    },

    async update(request, response) {
        const { id } = request.params;
        const { USUARIO, SENHA, NOME, CARGO } = request.body;
        const funcionarioExiste = Object.keys(await connection('TB_ACAD_FUNCIONARIO').select().where('ID_FUNCIONARIO', id)).length == 0;

        if (funcionarioExiste) {
            return response.status(400).json({ error: "Funcionario não existe!" });
        }

        await connection.raw(`update TB_ACAD_FUNCIONARIO set usuario = '${USUARIO}', senha = '${SENHA}', nome = '${NOME}', cargo = ${CARGO} where id_funcionario = ${id}`)
            .catch((error) => {
                return response.status(400).json(error.toString());
            })
            .then(async () => {
                const funcionario = await connection('TB_ACAD_FUNCIONARIO').select().where('ID_FUNCIONARIO', id);
                return response.json(funcionario[0]);
            });
    },
};