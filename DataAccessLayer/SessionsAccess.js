const sessionConsts = require('../consts/session')
const Timer = require('../service_modules/Timer')

module.exports = class SessionAccess{
    constructor(){
        this._sessionsMap = new Map();

        this.deleteSession = this.deleteSession.bind(this);
    }

    addSession(sessionID, sessionInstance){
        this._sessionsMap.set(
            sessionID,
            {
                session: sessionInstance,
                idleTimer: new Timer(()=>this.deleteSession(sessionID), sessionConsts.IDLE_TIME)
            }
        );
    }

    deleteSession(sessionID){
        this._sessionsMap.delete(sessionID)
    }
    
    getSession(sessionID){
        this._sessionsMap.get(sessionID)
    }

    hasSession(sessionID){
        return this._sessionsMap.has(sessionID)
    }

    resetSessionIdleTimer(sessionID){
        this._sessionsMap.get(sessionID).idleTimer.reset()
    }
}