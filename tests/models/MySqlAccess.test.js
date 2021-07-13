const DBAccess = require('../../DataAccessLayer/MySqlAccess')

describe('DB access', ()=>{
    let DBmodelInstance;

    beforeAll(()=>{
        DBmodelInstance = new DBAccess();
    })
    
    test('Expected to return users info', async ()=>{
        let res = await DBmodelInstance.getUser('Vova'); 
        expect(res).toBeDefined();
    })

    test('Expected user info to have password&role_code fields', async ()=>{
        let res = await DBmodelInstance.getUser('Vova');
        
        expect(res).toHaveProperty('password');
        expect(res).toHaveProperty('role_code');
    })

    afterAll(()=>{
        DBmodelInstance.closeConnection();
    })
})