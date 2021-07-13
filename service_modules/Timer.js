module.exports = class Timer{
    constructor(callback, time){
        this._CALLBACK = callback;
        this._TIME = time;
        this._timerHandler = setTimeout(this._CALLBACK, this._TIME);
    }

    reset(){
        clearTimeout(this._timerHandler);
        this._timerHandler = setTimeout(this._CALLBACK, this._TIME)
    }
}