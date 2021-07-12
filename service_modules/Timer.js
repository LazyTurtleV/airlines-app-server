module.exports = class Timer{
    constructor(callback, time){
        this.CALLBACK = callback;
        this.TIME = time;
        this.timerHandler = setTimeout(this.CALLBACK, this.TIME);
    }

    reset(){
        clearTimeout(this.timerHandler);
        this.timerHandler = setTimeout(this.CALLBACK, this.TIME)
    }
}