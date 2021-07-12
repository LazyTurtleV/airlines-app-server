const sessionConsts = require('../consts/session')
const Timer = require('../service_modules/Timer')

module.exports = class SessionAccess{
    constructor(){
        this.sessionsMap = new Map();

        this.deleteSession = this.deleteSession.bind(this);
    }

    addSession(sessionID, sessionInstance){
        this.sessionsMap.set(
            sessionID,
            {
                session: sessionInstance,
                idleTimer: new Timer(()=>this.deleteSession(sessionID), sessionConsts.IDLE_TIME)
            }
        );
    }

    deleteSession(sessionID){
        this.sessionsMap.get(sessionID).session.destroy();
        this.sessionsMap.delete(sessionID)
    }
    
    getSession(sessionID){
        this.sessionsMap.get(sessionID)
    }

    hasSession(sessionID){
        return this.sessionsMap.has(sessionID)
    }

    resetSessionIdleTimer(sessionID){
        this.sessionsMap.get(sessionID).idleTimer.reset()
    }
}