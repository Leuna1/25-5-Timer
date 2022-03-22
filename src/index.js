import { Provider, connect } from "react-redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
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
  switchingSession, store
} from './redux.js';
import { Presentational } from './react.js';

const mapStateToProps = (state) => {
  return {
    breakLength: state.break.breakLength,
    sessionLength: state.session.sessionLength,
    timer: state.timer.timer,
    playing: state.timer.playing,
    onSession: state.timer.onSession
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseBreakLength: () => {
      dispatch(increasingBreak());
      if (!store.getState().timer.onSession)
        dispatch(settingTimer(store.getState().break.breakLength * 60));
    },
    increaseSessionLength: () => {
      dispatch(increasingSession());
      if (store.getState().timer.onSession)
        dispatch(settingTimer(store.getState().session.sessionLength * 60));
    },
    decreaseBreakLength: () => {
      dispatch(decreasingBreak());
      if (!store.getState().timer.onSession)
        dispatch(settingTimer(store.getState().break.breakLength * 60));
    },
    decreaseSessionLength: () => {
      dispatch(decreasingSession());
      if (store.getState().timer.onSession)
        dispatch(settingTimer(store.getState().session.sessionLength * 60));
    },
    resetClock: () => {
      dispatch(resetingSession());
      dispatch(resetingBreak());
      dispatch(resetingTimer(store.getState().session.sessionLength * 60));
    },
    playStopTimer: () => {
      dispatch(pausingPlayingTimer());
    },
    decreaseTimer: () => {
      if (store.getState().timer.timer == 0) {
        if (store.getState().timer.onSession)
          dispatch(switchingSession(store.getState().break.breakLength * 60 + 1));
        else
          dispatch(switchingSession(store.getState().session.sessionLength * 60 + 1));
      }
      dispatch(decreasingTimer());
    }
  }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-8 offset-2">
            <h1 class="text-white text-center">25 + 5 clock</h1>
            <Provider store={store}>
              <Container />
            </Provider>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));