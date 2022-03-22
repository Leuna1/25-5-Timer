import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const INCREASE_BREAK = 'INCREASE_BREAK';
const DECREASE_BREAK = 'DECREASE_BREAK';
const RESET_BREAK = 'RESET_BREAK';

const INCREASE_SESSION = 'INCREASE_SESSION';
const DECREASE_SESSION = 'DECREASE_SESSION';
const RESET_SESSION = 'RESET_SESSION';

const SET_TIMER = 'SET_TIMER';
const DECREASE_TIMER = 'DECREASE_TIMER';
const PAUSE_PLAY_TIMER = 'PAUSE_PLAY_TIMER';
const RESET_TIMER = 'RESET_TIMER';
const SWITCH_SESSION = 'SWITCH_SESSION';

const increasingBreak = () => {
  return {
    type: INCREASE_BREAK
  }
}

const decreasingBreak = () => {
  return {
    type: DECREASE_BREAK
  }
}

const resetingBreak = () => {
  return {
    type: RESET_BREAK
  }
}

const increasingSession = () => {
  return {
    type: INCREASE_SESSION
  }
}

const decreasingSession = () => {
  return {
    type: DECREASE_SESSION
  }
}

const resetingSession = () => {
  return {
    type: RESET_SESSION
  }
}

const settingTimer = (timer) => {
  return {
    type: SET_TIMER,
    timer: timer
  }
}

const decreasingTimer = () => {
  return {
    type: DECREASE_TIMER
  }
}

const pausingPlayingTimer = () => {
  return {
    type: PAUSE_PLAY_TIMER
  }
}

const resetingTimer = (timer) => {
  return {
    type: RESET_TIMER,
    timer: timer
  }
}

const switchingSession = (timer) => {
  return {
    type: SWITCH_SESSION,
    timer: timer
  }
}

const defaultBreak = {
  breakLength: 5
}

const breakReducer = (state = defaultBreak, action) => {
  switch (action.type) {
    case INCREASE_BREAK:
      return {
        breakLength: state.breakLength < 60 ? state.breakLength + 1 : state.breakLength
      }
    case DECREASE_BREAK:
      return {
        breakLength: state.breakLength > 1 ? state.breakLength - 1 : state.breakLength
      }
    case RESET_BREAK:
      return {
        breakLength: 5
      }
    default:
      return state;
  }
}

const defaultSession = {
  sessionLength: 25
}

const sessionReducer = (state = defaultSession, action) => {
  switch (action.type) {
    case INCREASE_SESSION:
      return {
        sessionLength: state.sessionLength < 60 ? state.sessionLength + 1 : state.sessionLength
      }
    case DECREASE_SESSION:
      return {
        sessionLength: state.sessionLength > 1 ? state.sessionLength - 1 : state.sessionLength
      }
    case RESET_SESSION:
      return {
        sessionLength: 25
      }
    default:
      return state;
  }
}

const defaultTimer = {
  playing: false,
  onSession: true,
  timer: 1500
}

const timerReducer = (state = defaultTimer, action) => {
  switch (action.type) {
    case SET_TIMER:
      return {
        playing: false,
        onSession: state.onSession,
        timer: action.timer
      }
    case DECREASE_TIMER:
      return {
        playing: true,
        onSession: state.onSession,
        timer: state.timer > 0 ? state.timer - 1 : state.timer
      }
    case PAUSE_PLAY_TIMER:
      return {
        playing: !state.playing,
        onSession: state.onSession,
        timer: state.timer
      }
    case RESET_TIMER:
      return {
        playing: false,
        onSession: true,
        timer: action.timer
      }
    case SWITCH_SESSION:
      return {
        playing: true,
        onSession: !state.onSession,
        timer: action.timer
      }
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  break: breakReducer,
  session: sessionReducer,
  timer: timerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export {
  increasingBreak,
  decreasingBreak,
  resetingBreak,
  increasingSession,
  decreasingSession,
  resetingSession,
  settingTimer,
  decreasingTimer,
  pausingPlayingTimer,
  resetingTimer,
  switchingSession, 
  store
};