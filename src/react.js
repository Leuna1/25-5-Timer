import React from 'react'

class TimerWrapper extends React.Component {
  constructor(props){
    super(props);
    this.handleReset = this.handleReset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.handlePausePlay = this.handlePausePlay.bind(this);
  }
  
  handleReset = () => {
    this.props.handleReset();
    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0
  }
  
  handlePausePlay = () => {
    this.props.handlePausePlay();
  }
  
  formatTime = (timer) => {
    return Math.floor(timer/60).toString().padStart(2,'0')+':'+(timer%60).toString().padStart(2,'0');
  }
  
  componentDidMount () {
    this.interval = setInterval(() => {
      if(this.props.playing)
        this.props.handleDecrease()
      
      if(this.props.timer == 0)
        document.getElementById('beep').play();
    }, 1000);
  }
  
  render() {
    const audioSource = "https://docs.google.com/uc?export=download&id=1YGOmkIyJYwzMe6iN4uko-_drBqq45wZt";
    const label = this.props.onSession ? <p id="timer-label">Session</p> : <p id="timer-label">Break</p>
    const pausePlayIcon = this.props.playing ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>
    return (
      <div id="timer-container">
        {label}
        <p id="time-left">{this.formatTime(this.props.timer)}</p>
        <button className="btn btn-secondary" id="start_stop" type="button" onClick={() => { this.handlePausePlay() }}>
          {pausePlayIcon}
        </button>
        <button className="btn btn-secondary" id="reset" type="button" onClick={() => { this.handleReset() }}>
          <i class="fa-solid fa-arrow-rotate-left"></i>
        </button>
        <audio id='beep' src={audioSource} preload />
      </div>
    )
  }
}

class SessionWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }
  handleIncrease = () => {
    this.props.handleIncrease();
  }
  
  handleDecrease = () => {
    this.props.handleDecrease();
  }
  
  render() {
    return (
      <div id="session-container">
        <p id="session-label">Session Length</p>
        <button className="btn btn-secondary" id="session-decrement" type="button" onClick={() => {this.handleDecrease()}} disabled={this.props.playing}><i className="fa fa-angle-down"></i></button>
        <span id="session-length">{this.props.length}</span>
        <button className="btn btn-secondary" id="session-increment" type="button" onClick={() => {this.handleIncrease()}} disabled={this.props.playing}><i className="fa fa-angle-up"></i></button>
      </div>
    )
  }
}

class BreakWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }
  
  handleIncrease = () => {
    this.props.handleIncrease();
  }
  
  handleDecrease = () => {
    this.props.handleDecrease();
  }
  
  render() {
    return (
      <div id="break-container">
        <p id="break-label">Break Length</p>
        <button className="btn btn-secondary" id="break-decrement" type="button" onClick={() => {this.handleDecrease()}} disabled={this.props.playing}><i className="fa fa-angle-down"></i></button>
        <span id="break-length">{this.props.length}</span>
        <button className="btn btn-secondary" id="break-increment" type="button" onClick={() => {this.handleIncrease()}} disabled={this.props.playing}><i className="fa fa-angle-up"></i></button>
      </div>
    )
  }
}

class Presentational extends React.Component {

  render() {
    return (
      <div id="clock-container">
        <div id="options">
          <BreakWrapper playing={this.props.playing} length={this.props.breakLength} handleIncrease={this.props.increaseBreakLength} handleDecrease={this.props.decreaseBreakLength}/>
          <SessionWrapper playing={this.props.playing} length={this.props.sessionLength} handleIncrease={this.props.increaseSessionLength} handleDecrease={this.props.decreaseSessionLength} />
        </div>
        <TimerWrapper onSession={this.props.onSession} playing={this.props.playing} timer={this.props.timer} handleReset={this.props.resetClock} handlePausePlay={this.props.playStopTimer} handleDecrease={this.props.decreaseTimer}/>
      </div>
    )
  }
}

export { Presentational }