import { connection } from "../configs/Database.js";


const clienteRepository = {
    criar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            const sqlCli = "INSERT INTO clientes (Nome, Cpf) VALUES (?,?)";
            const valuesCli = [cliente.nome, cliente.cpf]
            const [rowsCli] = await conn.execute(sqlCli, valuesCli)
            const idCliente = rowsCli.insertId;

            const sqlTel = "INSERT INTO telefones (IdCliente, Numero) VALUES (?,?)";
            const valuesTel = [idCliente, telefone.numero]
            const [rowsTel] = await conn.execute(sqlTel, valuesTel)

            const sqlEnd = "INSERT INTO enderecos (IdCliente, Cep, Logradouro, Numero, Bairro, Cidade, Estado, Complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
            const valuesEnd = [

                idCliente,
                endereco.cep,
                endereco.logradouro,
                endereco.numero,
                endereco.bairro,
                endereco.cidade,
                endereco.estado,
                endereco.complemento ?? null // garante que não seja undefined
            ];

            const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd)



            await conn.commit();
            return { rowsCli, rowsTel, rowsEnd };
        } catch (error) {
            await conn.rollback();
            throw new Error(error);

        }
        finally {
            conn.release();
        }
    },
    selecionar: async () => {
        const sql = "SELECT * "
        const [rows] = await connection.execute(sql);
        return rows
    },


}
export default clienteRepository


