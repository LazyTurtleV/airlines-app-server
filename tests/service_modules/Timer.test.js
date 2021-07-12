const Timer = require('../../service_modules/Timer');

describe('Timer', ()=>{
    let timer;
    let callback;
    const TIME = 500;
    
    beforeEach(()=>{
        callback = jest.fn(()=>{})
        timer = new Timer(callback, TIME);
    })
    
    test('Timer must terminate callback call to TIME ms', async ()=>{
        await new Promise(r=>setTimeout(r, TIME));
        
        expect(callback).toBeCalled();
    })
    
    test('Reset must nullify timer', async()=>{
        await new Promise(r=>setTimeout(r, TIME/2));
        timer.reset();
        await new Promise(r=>setTimeout(r, TIME/2));

        expect(callback).not.toBeCalled();
    })

    test('Reset cannot stop timer', async()=>{
        timer.reset();
        await new Promise(r=>setTimeout(r, 2*TIME));

        expect(callback).toBeCalled();
    })
})