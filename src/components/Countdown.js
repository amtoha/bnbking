import React from 'react'
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;

function getTimeRemaining(){
  var end = new Date('May 14, 2022 14:00:00');
  var now = new Date();
  var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
  var distance = end - nowUTC;

  var days = Math.floor(distance / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);

  return {
    days,
    hours,
    minutes,
    seconds
  };
}

export default class Countdown extends React.Component {
    state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    
    componentDidMount() {
      this.interval = setInterval(() => {
        const deadline = 'May 14, 2022 17:00:00';
        const { days, hours, minutes, seconds } = getTimeRemaining(deadline)
        this.setState({ days, hours, minutes, seconds });
      }, 1000);
    }
  
    componentWillUnmount() {
      if(this.interval) {
        clearInterval(this.interval);
      }
    }
    
    render() {
      const { days, hours, minutes, seconds } = this.state;
      
      return (
        <div className="countdown">
          <div className='countdown-wrapper'>
            <div className='countdown-item'>
              <span className="number">{days}</span>
              <span>days</span>
            </div>
            <div className='countdown-item'>							
              <span className="number">{hours ? hours : "00"}</span>
              <span>hours</span>
            </div>
            <div className='countdown-item'>
              <span className="number">{minutes ? minutes : "00"}</span>
              <span>minutes</span>
            </div>
            <div className='countdown-item'>
              <span className="number">{seconds ? seconds : "00"}</span>
              <span>seconds</span>
            </div>
          </div>
        </div>
      );
    }
}