jest.mock('../../services/AuthorizationService');

const loginController = require('../../controllers/loginController')

describe('Login controller', ()=>{
    const SESSION_ID = "LOL";

    beforeAll(()=>{
        loginController._loginService.authenticateUser.mockImplementation(async data => {
            console.log('Hello')
            
            let response = {
                isAuthentificated: false,
                err: null,
                session: null
            }
            
            if(data.login === 'User' && data.password === 'User'){
                response.isAuthentificated = true;
                response.session = {id: SESSION_ID}
            }else{
                response.err = new Error("Ivalid login data")
            }

            return response
        })
    })

    test('If login data valid, session cookie has to be created', async () => {
        let reqObj = {
            body:{
                login: 'User',
                password: 'User'
            }
        };
        let resObj = {
            signedCookies: null,
            body: null, 
            cookie: (key, value, options)=>{
                resObj.signedCookies = {
                    [key]: {
                        value,
                        MaxAge: options.MaxAge,
                        signed: options.signed
                    }
                }
            },
            send: obj=>{
                resObj.body = obj;
            }
        }

        await loginController.login(reqObj, resObj);
        expect(resObj.signedCookies.sid.value).toEqual(SESSION_ID)
    })

    test('If user session hasn`t timed out yet, user has to stay authorized', ()=>{
        loginController._loginService.isAuthorized.mockImplementation(ID=>ID === SESSION_ID);

        expect(loginController.isUserAuthorized(SESSION_ID)).toBe(true)
    })
})