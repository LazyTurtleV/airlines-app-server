jest.mock('../../DataAccessLayer/MySqlAccess')
const DBModel = require('../../DataAccessLayer/MySqlAccess')

const AuthorizationService = require('../../services/AuthorizationService')

describe('Authorization service', ()=>{
    let serviceInst, DBModelInst;

    beforeEach(()=>{
        serviceInst = new AuthorizationService();
    })

    test('Encryption must generate valid hash', ()=>{
        let testData = [
            {
                input: {login: 'test1', password: 'qwerty123'},
                validHash: '6ca74ff9de8a53f661f4262558deb641'
            },
            {
                input: {login: 'test2', password: 'qweasdzxc'},
                validHash: '78d7f0e96a4350a611cea474642d044c'
            }
        ];

        for(let testCase of testData){
            expect(serviceInst._encrypt(testCase.input)).toBe(testCase.validHash)
        }
    })

    test('If login&password valid and role code is ADM, session must be started', async ()=>{
        serviceInst._DBmodelInstance.getUser.mockImplementation(async login=>{
            if(login === 'User'){
                return {password: serviceInst._encrypt({login:'User', password:'User'}), role_code: 'ADM'}
            }
        });
        
        let response = await serviceInst.authenticateUser({
            login:  'User',
            password: 'User'
        });

        expect(response).toBeDefined();
        expect(serviceInst._sessionModelInstance.hasSession(response.session?.id)).toBe(true);
    })
    
    test('If login or password ivalid, authentefication shouldn`t pass', async ()=>{
        serviceInst._DBmodelInstance.getUser.mockImplementation(async login=>{
            if(login === 'SomeUser'){
                return {password: serviceInst._encrypt({password: 'SomePassword', login: "SomeUser"}), role_code: 'ADM'}
            }
        });

        let testData = [
            {
                login:  'User',
                password: 'User'
            },
            {
                login:  'SomeUser',
                password: 'User'
            }
        ];

        for(let testCase of testData){
            let response = await serviceInst.authenticateUser(testCase);

            expect(response.isAuthentificated).toBe(false)
            expect(serviceInst._sessionModelInstance.hasSession(response.session?.id)).toBe(false);
        }
    })

})