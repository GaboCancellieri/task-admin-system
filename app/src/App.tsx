import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TasksScreen } from './screens';
import { TaskList, Typography } from './components';
import { colors } from './utils/theme';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header" style={{backgroundColor: colors.darkPurple}}>
          <img src='https://freeiconshop.com/wp-content/uploads/edd/task-done-flat.png' className="App-logo" alt="logo" />
          <Typography align='center' color={colors.tuscany} variant='bold' size={35}>Task Admin System</Typography>
        </div>
        <TasksScreen></TasksScreen>
      </div>
    );
  }
}

export default App;
