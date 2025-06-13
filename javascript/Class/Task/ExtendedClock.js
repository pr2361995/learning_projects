class Clock{
  
    constructor({template}){
      this.template = template;
    }
    
    render(){
      const date = new Date();
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
      let output = this.template
        .replace("h", hours)
        .replace("m", mins)
        .replace("s", secs);
        console.log(output);
    }
    
    stop() {
      clearInterval(this.timer);
    }
    
    start() {
      this.render();
      this.timer = setInterval(() => this.render(), 1000);
    }
}

//dont edit clock
// provide a new class that extends clock and provides a new method start with a precision parameter

/*
class ExtenedClock extends Clock{
  constructor({template, precision = 1000}){
    super({template});
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
}

const clock = new ExtenedClock({template:'h:m:s', precision: 2000})
clock.start()
setTimeout(()=> clock.stop(),10000)
*/
  