const SessionAccess = require('../../DataAccessLayer/SessionsAccess')

const sessionContst = require('../../consts/session');

describe('SessionAccess', ()=>{
    let sessionLayer;
    const ID_ARR = ['aha', 'loh', 'vvv', 'qqqq']
    const deleteFn = jest.fn(()=>{});

    jest.setTimeout(10000);

    beforeEach(()=>{
        sessionContst.IDLE_TIME = 500;

        sessionLayer = new SessionAccess();

        for(let ID of ID_ARR){
            sessionLayer.addSession(ID, {destroy: deleteFn});
        }
    })
    
    test('All added UNIQUE sessions must be contained in map', ()=>{
        for(let ID of ID_ARR){
            expect(sessionLayer.hasSession(ID)).toBe(true);
        }
    })


    test('When IDLE_TIME passed, all added sessions have to be deleted', async () =>{
        await new Promise(r => setTimeout(r, sessionContst.IDLE_TIME))
        
        for(let ID of ID_ARR){
            expect(sessionLayer.hasSession(ID)).toBe(false);
        }
    })

    test('Reset session idle time function has to work correctly', async ()=>{
        await new Promise(r => setTimeout(r, sessionContst.IDLE_TIME/2));

        const ID = ID_ARR[Math.trunc(Math.random()*4)];
        sessionLayer.resetSessionIdleTimer(ID);

        await new Promise(r => setTimeout(r, sessionContst.IDLE_TIME/2));

        expect(sessionLayer.hasSession(ID)).toBe(true);
    })
})