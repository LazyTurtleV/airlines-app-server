const mysql = require('mysql2/promise')
const CONFIG = require('../connectionConfig.json')

module.exports = class MySqlAccess{
    async _init(){
        this._connection = await mysql.createConnection({
            host: CONFIG.dbHost,
            user: CONFIG.user,
            database: CONFIG.dbName,
            password: CONFIG.password
        })
        this._isConnectionEstablished = true;
    }

    async getUser(login){
        let sqlRequest = 'SELECT password, role_ref as role_code FROM users ' +
                         'JOIN user_roles ON users.id = user_roles.user_ref '+ 
                         `WHERE login = ?`;

        if(!this._isConnectionEstablished) await this._init();
        let [ rows, __ ] = await this._connection.query(sqlRequest, [login]); 

        return rows[0];
    }

    async closeConnection(){
        await this._connection.end();
        this._isConnectionEstablished = false;
    }
} 