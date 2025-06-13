class Timer{
    constructor(template){
        this.template = template;
        this.timer = null;
        this.seconds = 0;
    }

    render(){
        let hours   = Math.floor(this.seconds / 3600);
        let minutes = Math.floor((this.seconds % 3600) / 60);
        let secs    = this.seconds % 60;
        hours   = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        secs    = secs < 10 ? "0" + secs : secs;

        console.log(this.template
            .replace("h",hours)
            .replace("m",minutes)
            .replace("s",secs));
    }

    stop(){
        clearInterval(this.timer)
    }

    reset() {
        this.seconds = 0;
        this.render();
    }

    start(delay = 1000){
        this.timer = setInterval(()=> {
            this.seconds++;
            this.render();
        }, delay)
    }
}

let stopwatch = new Timer("h:m:s")
stopwatch.start()
stopwatch.stop();