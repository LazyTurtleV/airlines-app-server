jest.mock('../../DataAccessLayer/MySqlAccess')
const DBModel = require('../../DataAccessLayer/MySqlAccess')

const AuthorizationService = require('../../services/AuthorizationService')

describe('Authorization service', ()=>{
    let serviceInst, DBModelInst;

    beforeEach(()=>{
        serviceInst = new AuthorizationService();
    })

    test('If login&password valid and role code is ADM, session must be started', async ()=>{
        serviceInst._DBmodelInstance.getUser.mockImplementation(async ()=>({password: 'User', role_code: 'ADM'}));
        
        let response = await serviceInst.authenticateUser({
            login:  'User',
            password: 'User'
        });

        expect(response).toBeDefined();
        expect(serviceInst._sessionModelInstance.hasSession(response.session.id)).toBe(true);
    })
})