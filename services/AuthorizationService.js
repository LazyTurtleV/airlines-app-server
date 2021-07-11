const ServiceAccess = require('../DataAccessLayer/SessionsAccess')
const MySqlAccess = require('../DataAccessLayer/MySqlAccess')

exports = class AuthorizationService{
    constructor(){
        this.sessionModelInstance = new ServiceAccess();
        this.DBmodelInstance = new MySqlAccess();
    }
}