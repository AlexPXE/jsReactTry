export default class Timer {
    constructor(date = Date.now(), 
    callback = () => 
    console.log(`${this.days}:${this.hours}:${this.minutes}:${this.seconds}`)) {        

        this.finish = date;
        this.callback = callback;
        this.totalSeconds = 0;        
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.stop = null;
    }
    set setTime(date){

        if(this.stop){
            this.stopTimer();
        }        
        this.finish = date;
    }    
    secondsTick(){
        if(this.seconds > 0){
            this.seconds--;
        } else {
            this.seconds = 59;
            this.minutesTick();
        }
    }
    minutesTick(){
        if(this.minutes > 0){
            this.minutes--;
        } else {
            this.minutes = 59;
            this.hoursTick();
        }
    }
    hoursTick(){
        if(this.hours > 0){
            this.hours--;
        } else {
            this.hours = 23;
            this.daysTick();
        }
    }
    daysTick(){
        if(this.days > 0){
            this.days--;
        }
    }
    stopTimer(){
        clearInterval(this.stop);
        this.stop = null;
    }
    startTimer(){        
        if(!this.stop){
            let sec = ~~((+this.finish - Date.now()) / 1000);        
            let m = ~~(sec / 60);
            let h = ~~(m / 60);            

            this.totalSeconds = sec;        
            this.days = ~~(h / 24);
            this.hours = h % 24;
            this.minutes = m % 60;
            this.seconds = sec % 60;        
            Timer.timerEngine(this, this.callback);
        }
    }
    static timerEngine(obj, callback){            
        if(obj.totalSeconds > 0) {        
            callback();    
            obj.totalSeconds--;
            obj.secondsTick();                                    
            obj.stop = setTimeout(Timer.timerEngine, 1000, obj, callback);
        }
    }
}